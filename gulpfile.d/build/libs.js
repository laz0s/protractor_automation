'use strict';

var /** @see https://github.com/wearefractal/gulp-concat */
    concat = require('gulp-concat'),
    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/terinjokes/gulp-uglify */
    uglify = require('gulp-uglify'),
    /** @see https://github.com/taptapship/wiredep */
    wiredep = require('wiredep'),

    project = require('../config');


/**
 * Generate a `.lib.js` file for distribution purposes:
 *  - take the Bower JavaScript dependencies
 *  - minify and concatenate them
 *  - write the resulting file to `dist/[distType]/[project].[version].lib.js`
 *
 * @param distType Possible values: 'release', 'ci', 'snapshot'.
 * @returns {Stream}
 */
module.exports = function buildDistLibs(distType) {
    return gulp
        .src(wiredep().js)
        .pipe(uglify())
        .pipe(concat(project.artefactName(distType, '.lib.js')))
        .pipe(gulp.dest(project.destinations.dist[distType]));
};
