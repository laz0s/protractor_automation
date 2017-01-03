'use strict';

var /** @see https://github.com/OverZealous/lazypipe */
    lazypipe = require('lazypipe'),
    /** @see https://github.com/hparra/gulp-rename */
    rename = require('gulp-rename'),
    /** @see https://github.com/floridoo/gulp-sourcemaps */
    sourcemaps = require('gulp-sourcemaps'),

    project = require('../config');


/**
 * @param minifier A minifier instance: typically either a CSS, an HTML or a JS minifier.
 * @param distType Determines the file name of the generated artefact.
 * @param extension Determines the file name of the generated artefact.
 * @returns {lazypipe} A `lazypipe` that minifies the files on the stream, renames them and generates appropriate
 * source maps.
 */
module.exports = function minify(minifier, distType, extension) {
    return lazypipe()
        .pipe(sourcemaps.init)
        .pipe(minifier)
        .pipe(rename, project.artefactName(distType, extension))
        .pipe(sourcemaps.write, './', {
            debug: true,
            includeContent: false
        });
        // Don't leave gulp.dest up to lazypipe: https://github.com/OverZealous/lazypipe/issues/14
        // .pipe(gulp.dest, project.destinations.dist[distType]);
};
