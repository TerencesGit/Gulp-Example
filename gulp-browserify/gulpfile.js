
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
	  config = require('./config');		

gulp.task('html',function(){
	gulp.src('src/views/**/*')
			.pipe(gulp.dest('dist/'))
})
gulp.task('browserify', function(){
	return browserify({entries: ['./src/js/main.js']})
				 .bundle()
				 .pipe(source('main.boundle.js'))
				 .pipe(gulp.dest('./dist/js/'))					
})
gulp.task('browser', function(done){
	glob('./src/js/main-**.js', function(err, files){
		if(err) done(err);
		var tasks = files.map(function(entry){
			return browserify({entries: [entry]})
						 .bundle()
						 .pipe(source(entry))
						 .pipe(rename({
						 	extname: '.bound.js'
						 }))
						 .pipe(gulp.dest('./dist/'))
		})
		eventStream.merge(tasks).on('end',done)
	})
})
gulp.task('concat', function(){
	gulp.src('./dist/src/js/*.js')
			.pipe(concat('main.js'))
			.pipe(gulp.dest('./dist/static/js'))
})
gulp.task('clean',function(){
	return gulp.src('./dist/src')
						  .pipe(clean())
})
gulp.task('js',function(){
	runSequence('browser','concat','clean')
})
gulp.task('sass', function(){
	var sassConfig = config.sass.options;
	sassConfig.onErrer = browserSync.notify;
	var filter = gulpFilter(['*.css','!*.map'],{restore: true});
	browserSync.notify('Compling Sass');
	return sass(config.sass.src, sassConfig)
					.pipe(plumber())
					.pipe(sourcemaps.init())
					.pipe(autoprefixer(config.autoprefixer))
					.pipe(filter)
					.pipe(sourcemaps.write('.',{includeContent: false,sourceRoot: './src/sass'}))
					.pipe(filter.restore)
					.pipe(gulp.dest(config.sass.dest))
})
gulp.task('css',function(){
	return sass('./src/sass/*.scss',{
							sourcemap: true,
							noCache: true,
							compass: true,
							style: 'compressed'
						})
						//.on('error', sass.logError)
						.pipe(gulp.dest('./dist/css'))	
})
gulp.task('build',['html','sass','js'])
gulp.task('browserSync', ['build'],function(){
	browserSync(config.browsersync.develpment)
})
gulp.task('reload',function(){
	browserSync.reload()
})
gulp.task('watch',['browserSync'],function(){
	gulp.watch('./src/*.html',['html','reload']);
	gulp.watch('./src/sass/*.scss',['sass','reload']);
	gulp.watch('./src/js/*.js',['browserify','reload']);
})
gulp.task('default',['watch'])