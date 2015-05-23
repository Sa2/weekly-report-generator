var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');

gulp.task('default', function(){
  console.log('Hello World');
});

gulp.task('minify', function(){
  gulp.src('./src/*.js')
  .pipe(uglify())
  .pipe(gulp.dest("dist"));
});

gulp.task('lint',function(){
    return gulp.src(['./src/**.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
