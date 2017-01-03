'use strict';

/* ------------------------------- */
/* --- TypeScript code linting --- */
/* ------------------------------- */

/**
 * Registers only one Gulp task called `util.lint` which will lint the TypeScript source code.
 * Also has a public API for usage within other modules.
 *
 * Example usage:
 * `gulp.src(src/main.ts).pipe(lint.soft());`
 */

var /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/OverZealous/lazypipe */
    lazypipe = require('lazypipe'),
    /** @see https://github.com/panuhorsmalahti/gulp-tslint */
    tslint = require('gulp-tslint'),

    /** --- internal --- */

    burp = require('./burp'),

    /** --- config --- */

    project = require('./config');


module.exports = {
    /** @returns A stream that will only warn you about linting errors. */
    soft: burp.private(lazyLint(false)),
    /** @returns A stream that will make the entire stream fail hard if there are any linting errors. */
    hard: burp.private(lazyLint(true)),
    task: burp.private(lint, 'util.lint')
};

function lint() {
    return gulp
        .src(project.sources.main + project.globs.ts)
        .pipe(module.exports.hard());
}

function lazyLint(emitError) {
    return lazypipe()
        .pipe(tslint)
        .pipe(tslint.report, 'verbose', {emitError: emitError});
}
