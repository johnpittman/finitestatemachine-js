'use strict'

var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var jasmine = require('gulp-jasmine');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

/**
 * Setup
 */

// File paths.
var JS_SRC = 'src/**/*.js';
var DIST = 'dist/';
var SPECS = 'test/*Spec.js';

/**
 * Tasks
 */

// Group tasks by development process.
gulp.task('default', []);
gulp.task('test', ['unitSpecs']);
gulp.task('build', ['cleanDotMinFiles']);

// Clear the distribution directory in case files/folders were removed from last build.
gulp.task('cleanDist', ['unitSpecs'], function() {
    return gulp.src(DIST, {read: false})
        .pipe(clean())
        .pipe(gulp.dest('./'));
});

// Minify JS with source maps
gulp.task('compress', ['cleanDist'], function() {
    return gulp.src(JS_SRC)
        .pipe(rename(function(path) {
                path.extname = '.min'
        }))
        .pipe(uglify({
            outSourceMap: true
        }))
        .pipe(gulp.dest(DIST));
});

// Put the .js back onto the minified files after compressed with source maps.
gulp.task('rename', ['compress'], function() {
    return gulp.src(DIST + '*.min')
        .pipe(rename(function(path) {
            path.extname = '.min.js'
        }))
        .pipe(gulp.dest(DIST));
});

// Remove all .min files since they copied as .min.js.
gulp.task('cleanDotMinFiles', ['rename'], function() {
    return gulp.src(DIST + '*.min', {read: false})
        .pipe(clean())
        .pipe(gulp.dest(DIST));
});

// Run all units tests.
gulp.task('unitSpecs', function() {
    return gulp.src(SPECS)
        .pipe(jasmine())
        .on('close', function(code, signal) {
            if (code)
                exitCode = code;
            done();
        });
});