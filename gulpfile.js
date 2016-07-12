var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var wiredep = require('wiredep').stream;
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var groupConcat = require('gulp-group-concat');

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
