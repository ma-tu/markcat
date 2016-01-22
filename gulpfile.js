var gulp = require('gulp');
var babel = require('gulp-babel');
var ts = require('gulp-typescript');
var packager = require('electron-packager');

var tsProject = ts.createProject('tsconfig.json', {});

gulp.task('compile', function() {
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject))
        .pipe(babel())
        .pipe(gulp.dest('target'));
});

gulp.task('package', ['win32'/*, 'darwin', 'linux'*/].map(function (platform) {
  var taskName = 'package:' + platform;
  gulp.task(taskName, ['compile'], function (done) {
    packager({
      dir: './',
      name: 'MarkCat',
      arch: 'x64',
      platform: platform,
      out: 'release/' + platform,
      version: '0.36.4',
      overwrite: true
    }, function (err) {
      done();
    });
  });
  return taskName;
}));
