const gulp = require('gulp');
const sass = require('gulp-sass');
const bro = require('gulp-bro');
const minify = require('gulp-minify');


// files
const sassFiles = './src/sass/*.scss';
const jsFiles = './src/_includes/assets/*.js';


// JS
function jsCompile(cb) {

	gulp.src(jsFiles)
		.pipe(bro())
		.pipe(minify({
			ext:{
				src:'',
				min:'.min.js'
			}
		}))
		.pipe(gulp.dest('./build/js/'));

	cb();

}


// SASS

function sassCompile(cb) {

	gulp.src(sassFiles)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('./build/css/'));

	cb();
}



// gulp tasks
exports.default = gulp.series(jsCompile, sassCompile);

exports.build = gulp.series(jsCompile, sassCompile);

exports.watch = function () {
	gulp.watch(
		sassFiles, 
		{ ignoreInitial: false }, 
		sassCompile
	);

	gulp.watch(
		jsFiles, 
		{ ignoreInitial: false }, 
		jsCompile
	);
}
