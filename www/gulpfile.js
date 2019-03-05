/*
install 
1. skapa mappar 
2. kÃ¶r bower init. fyll i allt optional
3. installera foundation: bower install foundation --save -dev
4. npm init
5. npm install --save-dev gulp gulp-sass gulp-autoprefixer gulp-rename gulp-clean-css gulp-sourcemaps webpack-stream
6. skapa gulpfile.js nedan med länkar till bower foundation
*/


var gulp = require('gulp'),
    sass = require('gulp-sass'),	
    autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
    minifycss = require('gulp-clean-css'),		
	sourcemaps = require('gulp-sourcemaps'),    
	path = require('path');

	/*
	sÃ¤tter sÃ¶kvÃ¤gar till mapptrÃ¤det
	*/
	var srcPath={		
		'scss': './sass',	
		'publik': './css',
        'devjs':'./_dev/devjs'
	}
	
	
gulp.task('SassToCssSrc', function() {
    gulp.src(srcPath.scss +'/**/*.scss')  
        .pipe(sass().on('error', sass.logError))		
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(srcPath.publik +'/'));
		
});

gulp.task('SassToCssSrcPub', function () {
    gulp.src(srcPath.scss +'/**/*.scss')
    .pipe(sass({
            style: 'compressed',
            sourceComments: 'false'
		}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // pass the file through autoprefixer 
	.pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
	.pipe(gulp.dest(srcPath.publik + '/'));
    
});

 

//Watch task
gulp.task('default',function() {
    gulp.watch(srcPath.scss +'/**/*.scss', ['SassToCssSrc']); 	      
   
});

gulp.task('publicera',function() {
    gulp.watch(srcPath.scss +'/**/*.scss', ['SassToCssSrcPub']);   
});
