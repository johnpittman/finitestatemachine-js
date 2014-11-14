'use strict'

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jasmine = require('gulp-jasmine');

/**
 * Setup
 */

// File paths.
var JS_SRC = 'src/**/*.js';
var DIST = 'dist';
var SPECS = 'test/*Spec.js';

// Setup to terminate the deploy process on task errors.
var exitCode = 0;

gulp.on('err', function(err) {
    process.nextTick(function() {
        process.exit(exitCode)
    })
});

/**
 * Tasks
 */

gulp.task('default', ['test', 'build']);

// Minify JS
gulp.task('compress', function() {
    return gulp.src(JS_SRC)
        .pipe(uglify())
        .pipe(gulp.dest(DIST));
});

// Test JS
gulp.task('unitSpecs', function() {
    return gulp.src(SPECS)
        .pipe(jasmine())
        .on('close', function(code, signal) {
            if (code) 
            	exitCode = code;
            done();
        });
});

gulp.task('build', ['compress']);
gulp.task('test', ['unitSpecs']);
