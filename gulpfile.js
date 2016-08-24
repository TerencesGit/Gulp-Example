"use strict";
 var gulp=require('gulp'),
		 jade=require('gulp-jade'),
		 sass=require('gulp-ruby-sass'),
		 compass=require('gulp-compass'),
		 cssmin=require('gulp-minify-css'),
		 rename=require('gulp-rename'),
		 uglify=require('gulp-uglify'),
		 clean=require('gulp-clean'),
		 browserSync=require('browser-sync');
		 // connect=require('gulp-connect');
gulp.task('html',function(){
	gulp.src('src/*.jade')
		.pipe(jade({
			pretty:true
		}))
		.pipe(gulp.dest('dist/'))
})
gulp.task('css',function(){
		gulp.src('./src/sass/*.scss')
	  .pipe(compass({
				config_file: './src/config.rb',
				sass: './src/sass/',
				css: './dist/css/'
		}))
		.pipe(cssmin())
	  .pipe(rename(function(path){
	  	 path.basename += '.min'
	  }))
	  //  .pipe(rename({
	  // 		 suffix: '.min'
	  // 	}))
		.pipe(gulp.dest('./dist/css/'))
 })

gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
})
gulp.task('images',function(){
	gulp.src('src/images/*.?(jpg|png|gif)')
		//.pipe(imagemin())
		.pipe(gulp.dest('dist/images/'))
})
gulp.task('build',['html','css','js','images']);

gulp.task('clean',function(){
	return gulp.src('dist')
			   .pipe(clean())
})
gulp.task('reload',function(){
	browserSync.reload();
})
gulp.task('auto',['html','css']);
gulp.task('serve',['auto'],function(){
	browserSync.init({
		server:"./dist"
	})
	gulp.watch('src/*.jade',['html','reload']);
	gulp.watch('src/sass/*.scss',['css','reload']);
	gulp.watch('src/js/*.js',['js','reload']);
	gulp.watch('src/images/*.?(jpg|png|gif)',['images','reload']);
})
gulp.task('default',['serve'])