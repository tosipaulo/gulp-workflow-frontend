var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    wiredep = require('wiredep').stream,
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin');

var args = require('yargs')
    .default('production', false)
    .alias('p', 'production')
    .argv;

gulp.task('bower', function(){
	return gulp.src('index.html')
		.pipe(wiredep())
		.pipe(gulp.dest('.'))
});

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(args.production, sass({outputStyle: 'compressed'} )))
    .pipe(gulp.dest('css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('concat', function(){
  return gulp.src('js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js'))
})


gulp.task('build', function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});