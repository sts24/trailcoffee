var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// files
let sassFiles = './src/sass/*.scss';


// SASS

function sassCompile(cb) {
	cb();

	gulp.src(sassFiles)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulp.dest('./build/css/'));


}



// gulp tasks
exports.default = gulp.series(sassCompile);

exports.build = gulp.series(sassCompile);

exports.watch = function () {
	gulp.watch('./src/sass/**/*.scss', sassCompile);
}