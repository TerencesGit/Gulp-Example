"use strict";
var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		rename = require('gulp-rename'),
		eventStream = require('event-stream'),
		plumber = require('gulp-plumber'),
		sass  = require('gulp-ruby-sass'),
		gulpFilter = require('gulp-filter'),
		autoprefixer = require('gulp-autoprefixer'),
		sourcemaps = require('gulp-sourcemaps'),
		glob = require('glob'),
		concat = require('gulp-concat'),
		clean = require('gulp-clean'),
		runSequence = require('gulp-run-sequence'),
		babel = require('gulp-babel');	
var config = {
	paths: {
		html: './src/html/**/*',
		sass: './src/sass/*.scss',
		 css: './dist/static/css',
		  js: './dist/static/js'
	}
}
//html
gulp.task('html',function(){
	gulp.src(config.paths.html)
			.pipe(gulp.dest('dist/'))
})
// compile css
gulp.task('sass',function(){
	var filter = gulpFilter(['*.css','!*.map'],{restore: true});
	return sass(config.paths.sass, {
						//compass: true,
						noCache: true,
						sourcemap: true,
						style: 'expanded'
					})
					.on('error', sass.logError)
					.pipe(plumber())
					.pipe(sourcemaps.init())
					.pipe(autoprefixer({
						browsers: ['last 2 versions'],
						cascade: true,
						remove: true
					}))
					.pipe(filter)
					.pipe(sourcemaps.write('.',{includeContent: false,sourceRoot: './src/sass'}))
					.pipe(filter.restore)
					.pipe(gulp.dest(config.paths.css))
})
//browserify Single
gulp.task('browserify', function(){
	return browserify({entries: ['./src/js/main.js']})
				 .bundle()
				 .pipe(source('main.bundle.js'))
				 .pipe(gulp.dest('./dist/static/js/'))					
})
//browserify  Multiple 
gulp.task('bundles', function(done){
	glob('./src/js/main-**.js', function(err, files){
		if(err) done(err);
		var tasks = files.map(function(entry){
			return browserify({entries: [entry]})
						 .bundle()
						 .pipe(source(entry))
						 .pipe(rename({
						 	extname: '.bound.js'
						 }))
						 .pipe(gulp.dest('./dist'))
		})
		eventStream.merge(tasks).on('end',done)
	})
})
gulp.task('concat', function(){
	gulp.src('./dist/src/js/*.js')
			.pipe(concat('main.js'))
			.pipe(gulp.dest(config.paths.js))
})
gulp.task('clean',function(){
	return gulp.src('./dist/src')
						 .pipe(clean())
})
gulp.task('babel',function(){
	gulp.src('./dist/static/js/main.bundle.js')
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(gulp.dest('./dist/static/js'))
})
// gulp.task('js', function(){
// 	runSequence('bundles','concat','clean','babel')
// })
gulp.task('script', function(){
	runSequence('browserify','babel')
})

gulp.task('build',['html','sass','script'])

gulp.task('reload',function(){
	browserSync.reload()
})
gulp.task('serve', ['build'],function(){
	browserSync.init({
		server: './dist'
	})
	gulp.watch('./src/html/**/*.html',['html','reload']);
	gulp.watch('./src/sass/*.scss',['sass','reload']);
	gulp.watch('./src/js/*.js',['script','reload']);
})

gulp.task('default',['serve'])