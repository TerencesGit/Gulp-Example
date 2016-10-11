var gulp = require('gulp'),
		browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		reactify = require('reactify');

gulp.task('combine', function(){
	browserify({
		entries: ['./app.jsx'],
		transform : [reactify]
	})
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./'))
})
gulp.task('default',['combine'])