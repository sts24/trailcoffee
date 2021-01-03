const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require("gulp-uglify");

// files
let sassFiles = './src/sass/*.scss';


// SASS

function sassCompile(cb) {

	gulp.src(sassFiles)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('./build/css/tc.css'));

	cb();
}



// gulp tasks
exports.default = gulp.series(sassCompile);

exports.build = gulp.series(sassCompile);

exports.watch = function () {
	gulp.watch(
		'./src/sass/**/*.scss', 
		{ ignoreInitial: false }, 
		sassCompile
	);
}
