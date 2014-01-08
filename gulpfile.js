/*
  This is an EXAMPLE gulpfile.js
  You'll want to change it to match your project.
  Find plugins at https://npmjs.org/browse/keyword/gulpplugin
*/
var gulp = require('gulp');
var uglify = require('gulp-less');

var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  gulp
    .src('./less/*.less')
    .pipe(less({
      paths: ['less']
    }))
    .pipe(gulp.dest('./css'));
});



// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('less');

  // Watch files and run tasks if they change
  gulp.watch('./less/*.less', function(event) {
    gulp.run('less');
  });
});