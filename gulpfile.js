'use strict';
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var gulpUglify = require('gulp-uglify');
var gulpConcat = require('gulp-concat');
var gulpCleanCss = require('gulp-clean-css');
var gulpHtmlmin = require('gulp-htmlmin');
var gulpImagemin = require('gulp-imagemin');
var del = require('del');

const dev = false;
const KAISA = {
	JS : {
		MIN:[
			'js/module/kaisaApi.js',
			'js/module/kaisaCommon.js',
			'js/module/kaisaConstant.js',
			'js/module/kaisaDirective.js',
			'js/module/kaisaGrid.js',
			'js/module/kaisaGridDatepicker.js',
			'js/module/kaisaFilter.js',
			'js/module/kaisaStorage.js',
			'js/module/kaisaUrl.js',
			'js/module/kaisaPopup.js',
			'js/module/kaisaUtil.js'
	    ]
	}
};
const DEST = {
	JS: 'js/min'
};

gulp.task('watch', () => {
    let watcher = {
    	jsMin: gulp.watch(KAISA.JS.MIN, ['jsMin'])
    };
    let notify = (event) => {
        gulpUtil.log('File', gulpUtil.colors.yellow(event.path), 'was', gulpUtil.colors.magenta(event.type));
    };
    for(let key in watcher) {
        watcher[key].on('change', notify);
    }
});

gulp.task('jsMin', () => {
	if(dev){
		gulp.src(KAISA.JS.MIN).pipe(gulpConcat('kaisa.js')).pipe(gulp.dest(DEST.JS));
	}else{
		return gulp.src(KAISA.JS.MIN).pipe(gulpConcat('kaisa.js')).pipe(gulpUglify()).pipe(gulp.dest(DEST.JS));
	}
});

gulp.task('default', gulp.series('jsMin')); //TODO watch

