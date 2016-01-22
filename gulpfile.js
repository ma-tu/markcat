var gulp = require('gulp');
var babel = require('gulp-babel');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json', {});

gulp.task('compile', function() {
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject))
        .pipe(babel())
        .pipe(gulp.dest('target'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.ts','src/*.tsx'], ['compile'])
});
