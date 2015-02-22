var gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  del = require('del'),
  browserify = require('gulp-browserify')

var path = require('path');

gulp.task('sass', function () {
  gulp
    .src('./scss/style.scss')
    .pipe(sass({
      paths: ['scss']
    }))
    .pipe(prefixer('last 2 versions', 'ie 9'))
    .pipe(gulp.dest('./css'));
});

// Delete old JS files
gulp.task('clean', function(done) {
  del(['./js/dist'], done);
});

// Browserify our code
gulp.task('js', ['clean'], function() {
  // Browserify/bundle the JS.
  gulp.src('./js/src/index.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : ! gulp.env.production
    }))
    .pipe(gulp.dest('./js/dist'))
});



// The default task (called when you run `gulp`)
gulp.task('default', ['sass', 'js'], function() {

  // Watch files and run tasks if they change
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./js/src/*.js', ['js']);

});

