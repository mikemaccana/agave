// Run 'gulp' to do the important stuff
var gulp = require('gulp');
var uglify = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  gulp
    .src('./less/*.less')
    .pipe(less({
      paths: ['less']
    }))
    .pipe(prefixer('last 2 versions', 'ie 9'))
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