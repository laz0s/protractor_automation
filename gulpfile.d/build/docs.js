'use strict';

var /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/rogierschouten/gulp-typedoc */
    typedoc = require('gulp-typedoc'),

    archive = require('../archive'),
    project = require('../config');


/**
 * For distribution we take the output of buildDocs and archive it into `dist/[project].[version].docs.zip`.
 */
var buildDistDocs = gulp.series(buildDocs, archive.docs);

module.exports = {
    dev: buildDocs,
    dist: buildDistDocs
};

/**
 * Generate HTML documentation using `typedoc`.
 * The resulting files are written to `build/docs`.
 *
 * @returns {Stream}
 */
function buildDocs() {
    var typings = project.typings.main + 'tsd.d.ts',
        sources = project.sources.main + project.globs.ts;

    return gulp
        .src([typings, sources])
        .pipe(typedoc({
            out: project.destinations.docs,
            mode: 'file',
            name: project.description,
            target: 'es5',
            includeDeclarations: typings,
            excludeExternals: typings,
            readme: project.sources.readme
        }));
}
