'use strict';

var /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/grncdr/merge-stream */
    merge = require('merge-stream'),
    /** @see https://github.com/ivogabe/gulp-typescript */
    typescript = require('gulp-typescript'),

    lint = require('../lint').soft,
    paths = require('../paths'),
    project = require('../config');


/**
 * Compiler config for incremental compilation of unit test code.
 */
var tsUnitProject = typescript.createProject({
    declarationFiles: false,
    noExternalResolve: false,
    target: 'ES5',
    sortOutput: false,
	outDir: project.destinations.unit.build
});

module.exports = {
	dev: buildTSUnit,
	devOrder: buildTSOrderUnit
};

/**
 * Generate `.js` files for testing purposes:
 *  - get all type definitions for the `app` and `unit` scopes
 *  - get the type definition for the application under test
 *  - lint the unit test code
 *  - compile it
 *  - write to `./build/unit`
 *  - expose the generated paths to other modules
 *
 * @param mainStream We require the main compilation stream because of its generated type definition.
 * @returns {Stream}
 */
function buildTSUnit(mainStream) {
    if (!mainStream || !mainStream.dts) raiseDependencyError();

    var externalDefinitionStream = gulp.src([
            project.typings.main + project.globs.typings,
            project.typings.unit + project.globs.typings
        ]),
        testSourceStream = gulp
            .src(project.sources.unit + project.globs.ts)
            .pipe(lint());

    var result = merge(testSourceStream, mainStream.dts, externalDefinitionStream)
        .pipe(typescript(tsUnitProject))
        .pipe(gulp.dest(project.destinations.unit.build))
        .pipe(paths.set('unit'));

    // merge back with the main stream or the task will finish too soon
    return merge(mainStream, result);
}

/**
 * Generate `.js` files on the stream in the correct loading order without
 * actually writing them on disk:
 *  - get all type definitions for the `app` and `unit` scopes
 *  - get the type definition for the application under test
 *  - compile the unit test code
 *  - expose the generated paths to other modules
 *
 * @param mainStream We require the main compilation stream because of its generated type definition.
 * @returns {Stream}
 */
function buildTSOrderUnit(mainStream) {
	if (!mainStream || !mainStream.dts) raiseDependencyError();

	var externalDefinitionStream = gulp.src([
			project.typings.main + project.globs.typings,
			project.typings.unit + project.globs.typings
		]),
		testSourceStream = gulp
			.src(project.sources.unit + project.globs.ts);
	var result = merge(testSourceStream, mainStream.dts, externalDefinitionStream)
		.pipe(typescript(tsUnitProject))
		.pipe(paths.set('unit'));
	return merge(mainStream, result);
}

function raiseDependencyError() {
    var err = new Error('\nCompiling unit tests requires the main sources to be compiled first.\n');
    err.name = 'Burp::TaskDependencyException';
    throw err;
}
