'use strict';

var /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/grncdr/merge-stream */
    merge = require('merge-stream'),
    /** @see https://github.com/ivogabe/gulp-typescript */
    typescript = require('gulp-typescript'),

    lint = require('../lint').soft,
    project = require('../config');


/**
 * Compiler config for incremental compilation of end-to-end test code.
 * E2E test code requires `CommonJS` style modules.
 */
var tsE2eProject = typescript.createProject({
    declarationFiles: false,
    noExternalResolve: false,
    target: 'ES5',
    sortOutput: false,
    module: 'commonjs'
});

/**
 * Generate `.js` files for testing purposes:
 *  - get all type definitions for the `e2e` scope (the ones in `./src/typings/e2e/`)
 *  - lint the E2E test code
 *  - compile it and
 *  - write to `./build/e2e/`
 *
 * Note that there is no dependency on application or unit test code/typings:
 * end-to-end tests should operate like a black box and read the DOM of a running application.
 *
 * @returns {Stream}
 */
module.exports = function buildTSE2e() {
    var externalDefinitionStream = gulp.src(project.typings.e2e + project.globs.typings),
        e2eSourceStream = gulp.src(project.sources.e2e + project.globs.ts).pipe(lint());

    return merge(e2eSourceStream, externalDefinitionStream)
        .pipe(typescript(tsE2eProject))
        .pipe(gulp.dest(project.destinations.e2e.build));
};
