'use strict'

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jasmine = require('gulp-jasmine');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');

var fs = require('fs');
var path = require('path');
var recursiveread = require('recursive-readdir');

/**
 * Setup
 */

// File paths.
var JS_SRC = 'src/**/*.js';
var JS_DIST = 'dist/**/*.js';
var MAP_DIST = 'dist/**/*.map';
var DIST = 'dist/';
var SPECS = 'test/*Spec.js';

/**
 * Tasks
 */

// Group tasks by development process.
gulp.task('default', []);
gulp.task('test', ['unitSpecs']);
gulp.task('build', ['updateSourceMapPaths']);

// Run all units tests.
gulp.task('unitSpecs', function() {
    return gulp.src(SPECS)
        .pipe(jasmine());
});

// Clear the distribution directory in case files/folders were removed from last build.
gulp.task('cleanDist', ['test'], function() {
    return gulp.src(DIST, {
            read: false
        })
        .pipe(clean())
        .pipe(gulp.dest('./'));
});

// Minify JS with source maps and generate source maps.
gulp.task('compress', ['cleanDist'], function() {
    return gulp.src(JS_SRC)
        .pipe(rename(function(path) {
            path.extname = '.min.js'
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./', {
            sourceRoot: '../src'
        }))
        .pipe(gulp.dest(DIST));
});

// Rename .min.js.map files to .min.map.
gulp.task('renameSourceMaps', ['compress'], function() {
    return gulp.src(MAP_DIST)
        .pipe(rename(function(path) {
            path.basename = path.basename.split('.')[0],
                path.extname = '.min.map'
        }))
        .pipe(gulp.dest(DIST));
});

// Clean up .min.js.map files.
gulp.task('cleanSourceMaps', ['renameSourceMaps'], function() {
    return gulp.src(DIST + '*.min.js.map', {
            read: false
        })
        .pipe(clean())
        .pipe(gulp.dest(DIST));
});

// Fixes sourcemap linking.
gulp.task('updateSourceMapPaths', ['cleanSourceMaps'], function(cb) {
    recursiveread('./dist/', ['node_modules', 'bower_components', '.git'], function(err, files) {
        for (var i = 0; i < files.length; i++) {
            var filePath = files[i];
            // Grab map file to alter.
            if (filePath.indexOf('.map') !== -1) {
                // Read file.
                var buff = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                // Clear invlaid sources.
                var sources = buff['sources'] = [];
                // Get the file name.
                // Keep relative path for nested files in src/
                // Rip off dist/
                var fileName = filePath.split('\\');
                fileName.shift();
                fileName = fileName.join('\\');
                fileName = fileName.split('.');
                fileName = fileName[0];
                // Make file type js
                fileName += '.js';
                // Add the source file to the map sources.
                sources.push(fileName);
                // Back to JSON
                buff = JSON.stringify(buff);
                // Write the new .map file.
                fs.writeFile(filePath, buff);
            }

            // Grab minified js file to change .map link path.
            if (filePath.indexOf('.js') !== -1) {
                // Read file.
                var buff = fs.readFileSync(filePath, 'utf8').toString();
                // Get file name
                //var fileName = filePath.split('\\');
                //fileName = fileName[fileName.length - 1];
                var sourceMappingKey = '//# sourceMappingURL=';
                var filePathIndex = buff.indexOf(sourceMappingKey);
                if (filePathIndex !== -1) {
                    var currSourceFileName = buff.substring(filePathIndex + sourceMappingKey.length, buff.length);
                    var buff = buff.substring(0, filePathIndex + sourceMappingKey.length);
                    // Take out .js.
                    currSourceFileName = currSourceFileName.split('.');
                    currSourceFileName.splice(2, 1);
                    currSourceFileName = currSourceFileName.join('.');
                    // Update file with new path.
                    buff += currSourceFileName;
                    // Write the new .js file.
                    fs.writeFile(filePath, buff);
                }
            }
        }
    });

    return cb();
});
