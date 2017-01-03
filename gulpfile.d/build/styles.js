'use strict';

var path = require('path'),

    /** @see https://github.com/sindresorhus/gulp-autoprefixer */
    autoprefixer = require('gulp-autoprefixer'),
    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/OverZealous/lazypipe */
    lazypipe = require('lazypipe'),
    /** @see https://github.com/jonathanepollack/gulp-minify-css */
    minifyCss = require('gulp-minify-css'),
    /** @see https://github.com/hparra/gulp-rename */
    rename = require('gulp-rename'),
    /** @see https://github.com/dlmanning/gulp-sass */
    sass = require('gulp-sass'),
    /** @see https://github.com/floridoo/gulp-sourcemaps */
    sourcemaps = require('gulp-sourcemaps'),
    /** @see https://github.com/taptapship/wiredep */
    wiredep = require('wiredep'),

    minify = require('../tools/minify'),
    project = require('../config');


module.exports = {
    dev: buildDevStyles,
    dist: buildDistStyles
};


/* --------------- */
/* --- private --- */
/* --------------- */

/**
 *  A lazy pipe to:
 *  - inject CSS dependencies (Bootstrap, Ionic, etc.); note that this might fail if the Bower dependency does not
 *  properly describe a main .scss file in its package descriptor
 *  - compile with SASS into a single .css file; libsass is used here: the C-based implementation lacks some
 *  features compared to the original Ruby one, but it is way faster and doesn't require installing Ruby
 *  - inject browser prefixes if needed
 */
var compile = lazypipe()
    .pipe(wiredep.stream)
    .pipe(sass, {
        errLogToConsole: true,
        precision: 8
    })
    .pipe(autoprefixer, {
        browsers: ['> 1%', 'last 4 versions'],
        cascade: false
    });


/* -------------- */
/* --- public --- */
/* -------------- */

/**
 * Generate an `master.css` file for development purposes:
 *  - take `src/app/master.scss` as the entry point
 *  - @see compile
 *  - generate source maps between the separate .scss files and the single .css file
 *  - write to `build/master.css`
 *
 * @returns {Stream}
 */
function buildDevStyles() {
    var mapsFolderPath = path.relative(project.destinations.build, project.destinations.sourcemaps),
        sourceRoot = path.join(path.relative(project.destinations.main, '.'), project.sources.main);

    return gulp
        .src(project.sources.main + project.globs.stylesheet)
        .pipe(sourcemaps.init())
        .pipe(compile())
        .pipe(sourcemaps.write(mapsFolderPath, {
            debug: true,
            includeContent: false,
            sourceRoot: sourceRoot
        }))
        .pipe(gulp.dest(project.destinations.build));
}

/**
 * Generate an `.css` file for distribution purposes:
 *  - take `src/app/master.scss` as the entry point
 *  - @see compile
 *  - write to `dist/[distType]/[project].[version].css`
 *  - minify the file and write to `dist/[distType]/[project].[version].min.css`
 *  - generate a source map between these two
 *
 * @param distType Possible values: 'release', 'ci', 'snapshot'.
 * @returns {Stream}
 */
function buildDistStyles(distType) {
    var dest = project.destinations.dist[distType];

    return gulp
        .src(project.sources.main + project.globs.stylesheet)
        .pipe(compile())
        .pipe(rename(project.artefactName(distType, '.css')))
        .pipe(gulp.dest(dest))
        .pipe(minify(minifyCss, distType, '.min.css')())
        // Don't leave gulp.dest up to lazypipe: https://github.com/OverZealous/lazypipe/issues/14
        .pipe(gulp.dest(dest));
}
