'use strict';

/* --------------------------------------- */
/* --- Functional (end-to-end) testing --- */
/* --------------------------------------- */

/**
 * Registers Gulp tasks for functional testing:
 * - e2e: single run of all functional tests.
 */

var /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/mllrsohn/gulp-protractor */
    protractor = require('gulp-protractor'),

    buildE2E = require('./dev').e2e,
    project = require('./config');


module.exports = {
    build: buildE2E,
    run: gulp.series(protractor.webdriver_update, runTests)
};

function runTests() {

    // Command line arguments:
    // 0 -> node
    // 1 -> gulp
    // 2 -> e2e.run
    var args = process.argv.slice(3);

    return gulp
        .src(project.destinations.e2e.build + project.globs.specjs)
		.pipe(protractor.protractor({configFile: './gulpfile.d/e2e.conf.js', args: args}));
}
