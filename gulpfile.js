var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var install = require('gulp-install')
var useref = require('gulp-useref')
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');
var packager = require('electron-packager');
var electronServer = require('electron-connect').server;

var srcDir      = 'src';
var distDir     = 'dist';
var releaseDir  = 'release';

gulp.task('clean:dist', function (done) {
  return del(distDir);
});

gulp.task('clean:release', function (done) {
  return del(releaseDir);
});

gulp.task('clean', ['clean:dist', 'clean:release']);

gulp.task('concat:css:thema-normal', function () {
  return gulp.src([
    srcDir + "/renderer/css/markcat.css",
    srcDir + '/renderer/css/markcat-normal.css',
    'node_modules/github-markdown-css/github-markdown.css',
    'node_modules/highlight.js/styles/github.css'])
    .pipe(concat('thema-normal.css'))
    .pipe(gulp.dest(distDir + "/renderer/css"));
});

gulp.task('concat:css:thema-dark', function () {
  return gulp.src([
    srcDir + "/renderer/css/markcat.css",
    srcDir + '/renderer/css/markcat-dark.css',
    srcDir + '/renderer/css/github-markdown-dark.css',
    srcDir + '/renderer/css/github-dark.css'])
    .pipe(concat('thema-dark.css'))
    .pipe(gulp.dest(distDir + "/renderer/css"));
});

gulp.task('concat:css', ['concat:css:thema-normal', 'concat:css:thema-dark']);

gulp.task('serve:html', function() {
  return gulp.src(srcDir + '/**/*.html')
    .pipe(gulp.dest(distDir))
    ;
});

gulp.task('serve:app-js', function() {
  return gulp.src(srcDir + '/app.js')
    .pipe(gulp.dest(distDir))
    ;
});

gulp.task('serve:compile', function() {
  var tsProject = ts.createProject('tsconfig.json', {});
  return tsProject.src(srcDir + '/**/*.{js,jsx,ts,tsx}')
    .pipe(ts(tsProject))
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(distDir))
    ;
});

gulp.task('serve:wait', function (done) {
  var electron = electronServer.create();
  electron.start();

  gulp.watch(srcDir + '/**/*.html', ['serve:html']);
  gulp.watch(srcDir + '/app.js', ['serve:app-js']);
  gulp.watch(srcDir + '/**/*.{js,jsx,ts,tsx}', ['serve:compile']);
  gulp.watch(srcDir + '/css/*.css', ['concat:css']);

  gulp.watch(distDir + '/app.js', electron.restart);
  gulp.watch([distDir + '/**/*.html', distDir + '/renderer/**/*.js', distDir + '/services/**/*.js', distDir + '/**/*.css'], electron.reload);
  done;
});

gulp.task('serve', function(callback) {
  runSequence('clean:dist',
              ['serve:html', 'serve:app-js', 'concat:css', 'serve:compile'],
              'serve:wait',
              callback);
});

gulp.task('build:html', function() {
  return gulp.src(srcDir + '/**/*.html')
    .pipe(useref())
    .pipe(gulp.dest(distDir))
    ;
});

gulp.task('build:app-js', function() {
  return gulp.src(srcDir + '/app.js')
    .pipe(useref())
    .pipe(gulp.dest(distDir))
    ;
});

gulp.task('build:compile', function() {
  var tsProject = ts.createProject('tsconfig.json', {});
  return tsProject.src(srcDir + '/**/*.{js,jsx,ts,tsx}')
    .pipe(ts(tsProject))
    .pipe(babel())
    .pipe(gulp.dest(distDir))
    ;
});

gulp.task('build:package-json', function() {
  return gulp.src(srcDir + '/package/package.json')
    .pipe(gulp.dest(distDir))
    ;
});

gulp.task('build:install-dependencies', ['build:package-json'], function() {
  return gulp.src(distDir + '/package.json')
    .pipe(gulp.dest('dist/'))
    .pipe(install({production: true}))
    ;
});

gulp.task('build:package', ['win32'/*, 'darwin', 'linux'*/].map(function (platform) {
  var taskName = 'package:' + platform;
  gulp.task(taskName, function (done) {
    packager({
      dir: distDir,
      name: 'MarkCat',
      arch: 'x64',
      platform: platform,
      out: releaseDir + '/' + platform,
      version: '0.36.4',
      icon: 'resource/markcat-multi.ico',
      overwrite: true
    }, function (err) {
      done();
    });
  });
  return taskName;
}));

gulp.task('build', function(callback) {
  runSequence('clean',
              ['build:html', 'build:app-js', 'concat:css', 'build:compile', 'build:install-dependencies'],
              'build:package',
              callback);
});
