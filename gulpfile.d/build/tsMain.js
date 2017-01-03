'use strict';

var path = require('path'),

    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/grncdr/merge-stream */
    merge = require('merge-stream'),
    /** @see https://github.com/floridoo/gulp-sourcemaps */
    sourcemaps = require('gulp-sourcemaps'),
    /** @see https://github.com/ivogabe/gulp-typescript */
    typescript = require('gulp-typescript'),

    lint = require('../lint').soft,
    paths = require('../paths'),
    project = require('../config');


module.exports = {
    dev: buildDevMain,
	devOrder: buildDevOrderMain,
    dist: buildDistMain
};

/**
 * Compiler config for incremental compilation of the application code.
 * For development purposes we don't care for the comments,
 * but we do need sorted output and type definitions for usage by other compile tasks.
 */
var tsMainProject = typescript.createProject({
    declarationFiles: true,
    noExternalResolve: true,
    preserveConstEnums: true,
    removeComments: true,
    sortOutput: true,
    target: 'ES5',
	outDir: project.destinations.main
});

/**
 * Generate `.js` files on the stream in the correct loading order without
 * actually writing them on disk
 *  - get all type definitions for the `app` scope (the ones in `./src/typings/app/`)
 *  - compile it
 *  - expose the generated paths to other modules
 *  - expose the type definition stream as a property of the main stream
 *
 * @returns {Stream}
 */
function buildDevOrderMain() {
	var sourceStream = gulp.src(project.sources.main + project.globs.ts);
	var tsResult = merge(sourceStream, gulp.src(project.typings.main + project.globs.typings))
		.pipe(typescript(tsMainProject));
	var result = tsResult.pipe(paths.set('main', project.globs.js));
	result.dts = tsResult.dts;
	return result;
}

/**
 * Generate `.js` files to run the application in development mode:
 *  - get all type definitions for the `app` scope (the ones in `./src/typings/app/`)
 *  - lint the application code
 *  - compile it
 *  - write to `./build/app`
 *  - generate external source maps between the .js files and their respective .ts files
 *  - expose the generated paths to other modules
 *  - expose the type definition stream as a property of the main stream
 *
 * @returns {Stream}
 */
function buildDevMain() {
    // The `sourcemaps` plugin calculates paths relative to the location of the mapped files,
    // so we calculate our way back up to the project root (e.g. 'build/app/' becomes '../../').
    var mapsFolderPath = path.relative(project.destinations.main, project.destinations.sourcemaps),
        sourceStream = gulp
            .src(project.sources.main + project.globs.ts)
            .pipe(lint());

    var tsResult = merge(sourceStream, gulp.src(project.typings.main + project.globs.typings))
        .pipe(sourcemaps.init())
        .pipe(typescript(tsMainProject));

    var result = tsResult
        .pipe(sourcemaps.write(mapsFolderPath, {
            debug: true,
            includeContent: false,
            sourceRoot: path.join(path.relative(project.destinations.main, '.'), project.sources.main)
        }))
        .pipe(gulp.dest(project.destinations.main))
        .pipe(paths.set('main', project.globs.js));

    result.dts = tsResult.dts;
    return result;
}

/**
 * Generate `.js` files for a distributable application:
 *  - get all type definitions for the `app` scope (the ones in `./src/typings/app/`)
 *  - compile the application code
 *
 * Here we keep the comments for the non-minified version of the artefact.
 * `uglify` will strip them out when creating the minified artefact.
 *
 * @returns {Stream}
 */
function buildDistMain() {
    var sources = project.sources.main + project.globs.ts,
        definitions = project.typings.main + project.globs.typings;

    // TODO use the new `out` feature to generate a single file

    return gulp
        .src([sources, definitions])
        .pipe(typescript({
            declarationFiles: true,
            noExternalResolve: true,
            preserveConstEnums: true,
            sortOutput: true,
            target: 'ES5'
        }));
}
