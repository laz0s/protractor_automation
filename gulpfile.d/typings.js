'use strict';

/* ---------------------------------- */
/* --- Type definition management --- */
/* ---------------------------------- */

/**
 * Registers Gulp tasks that wrap 'typings' for easy type definition management:
 * - typings: reinstall all typings.
 * - typings.main: reinstall typings used in application code.
 * - typings.unit: reinstall typings used in unit test code.
 * - typings.e2e: reinstall typings used in e2e test code.
 */

var /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    path = require('path'),
    /** @see https://github.com/moznion/gulp-typings */
    tsd = require('gulp-tsd'),

    /** --- internal --- */

    burp = require('./burp'),
    replacePaths = require('./tools/replacePaths'),

    /** --- config --- */

    project = require('./config');


module.exports = (function orchestrate() {
    // we need to fix the reference paths only for unit tests, hence the `fixReferences` task is only executed after
    // the unit typings reinstall or after re-installation of all typings.
    var main = installWith('app'),
        unit = burp.private([reinstall, 'unit'], 'util.typings.{0}'),
        e2e = installWith('e2e');

    return {
        all: gulp.series(gulp.parallel(main, unit, e2e), fixReferences),
        main: main,
        unit: gulp.series(unit, fixReferences),
        e2e: e2e
    };

    function installWith(type) {
        return burp.private([reinstall, type], 'util.typings.{0}');
    }
})();

/**
 * Reinstall all type definitions of the given scope.
 *
 * @param scope The typings scope: app, unit or e2e..
 * @param done Gulp task execution callback.
 */
function reinstall(scope, done) {
    // gulp-typings is a pretty shitty plugin: no way to efficiently use streams, hence the callback approach
    tsd({
        command: 'reinstall',
        config: project.typings.conf + scope + '.tsd.json'
    }, done);
}

/**
 * Fixes relative paths of references in unit test type definitions.
 *
 * We have three different scopes for type definitions (app, unit and e2e). Libraries in the `unit` scope will often
 * reference libraries in the `app` scope (e.g. angular-mocks references angular). Since these scopes are not a core
 * concept of `tsd` it is always assumed that all typings are in the same root dir, hence the relative paths are
 * incorrect (e.g. `angularjs/angular.d.ts` has to be corrected to `../../app/angularjs/angular.d.ts`).
 *
 * This task works by
 * - finding reference tags in the `unit` type definitions,
 * - scanning the `app` type definitions for a matching file name,
 * - resolving the relative path to that file and
 * - replacing the original path with the resolved path.
 *
 * @returns {Stream}
 */
function fixReferences() {
    // regex matching reference tags, e.g. `/// <reference path="myLib/myLib.d.ts" />`
    var referenceRE = new RegExp('\/\/\/\\s*<reference\\s+path="(.*(\\.d)?\\.ts)"\\s*\/>\\s', 'g'),
    // ignore files in the typings root dir, i.e. the generated bundle files
        unitTypings = [project.typings.unit + project.globs.typings, '!' + project.typings.unit + '*.*'],
        mainTypings = project.typings.main + project.globs.typings;

    return gulp
        .src(unitTypings)
        .pipe(replacePaths(referenceRE, replaceReference, mainTypings))
        .pipe(gulp.dest(project.typings.unit));

    /**
     * @param paths An Array of absolute paths to the `app` type definitions.
     * @param unitFile The `unit` type definition file currently being processed.
     * @returns {Function} A replacement function, see 2nd argument of String#replace
     */
    function replaceReference(paths, unitFile) {
        /**
         * @param ref The full matched reference tag, e.g. `/// <reference path="angularjs/angular.d.ts" />`
         * @param matchedPath The matched path, e.g. `angularjs/angular.d.ts`
         * @returns {string} The reference tag with a resolved relative path, if it is found in the `app` scope
         * (otherwise the tag is returned unmodified); e.g. `/// <reference path="../../app/angularjs/angular.d.ts" />`
         */
        return function replace(ref, matchedPath) {
            var mainPath = paths.filter(matchesPath)[0];
            if (!mainPath) return ref;

            var relativePath = path.relative(path.dirname(unitFile.path), mainPath);
            return ref.replace(matchedPath, relativePath);

            function matchesPath(mainPath) {
                return mainPath.indexOf(matchedPath) !== -1;
            }
        }
    }

}
