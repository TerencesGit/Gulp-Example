
module.exports = {
	browsersync: {
		develpment: {
			server: {
				baseDir: './dist'
			},
			port: 9999,
			files: [
				'./dist/**/*'
			]
		}
	},
	// browserify: {
	// 	debug: true,
	// 	extensions: [],
	// 	bundleConfig:[{
	// 		entries: './'+ src,
	// 		dest: develpment + '/js',
	// 		outputName: 'head.js'
	// 	}]
	// },
	sass: {
		src: 'src/sass/*.scss',
		dest: 'dist/static/css',
		options:{
			//noCache: true,
			compass: true,
			sourcemap: true,
			style: 'expanded'
		}
	},
	autoprefixer: {
		browsers: [
		'last 2 versions'
		//'ie 8'
		],
		cascade: true
	}
}