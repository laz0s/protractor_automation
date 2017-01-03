'use strict';

var _ = require('lodash-node'),
    path = require('path'),

    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/lazd/gulp-replace */
    replace = require('gulp-replace'),
    /** @see https://github.com/taptapship/wiredep */
    wiredep = require('wiredep'),

    paths = require('../paths'),
    project = require('../config');


module.exports = {
    dev: buildDevIndex,
    dist: buildDistIndex
};


/* -------------- */
/* --- public --- */
/* -------------- */

/**
 * Generate an `index.html` file for development purposes:
 *  - read `src/app/index.html`
 *  - immediately write to `build/index.html` to ensure that the subsequent call to `wiredep` will resolve relative
 *  paths to the correct location.
 *  - let `wiredep` inject the Bower dependencies in their non-minified state
 *  - inject compiled templates and sorted compiled JavaScript sources by replacing the `<!-- app:js -->` placeholder;
 *  the paths will be absolute, so first make them relative to the `build/` folder
 *  - inject the compiled non-minified stylesheet by replacing the `<!-- app:css -->` placeholder;
 *  the name of the `.css` file is derived from the main `.scss` file
 *  - write `build/index.html`
 *
 * @returns {Stream}
 */
function buildDevIndex() {
    var relativeToBuild = _.partial(path.relative, project.destinations.build),
        styleTag = toStyleTag(project.globs.stylesheet.replace('.scss', '.css')),
        scriptTags = paths
            .get('templates', 'main')
            .map(relativeToBuild)
            .map(toScriptTag)
            .join('\n    ');

    return gulp
        .src(project.sources.main + project.globs.index)
        .pipe(gulp.dest(project.destinations.build)) // DO NOT REMOVE (see docs)
        .pipe(wiredep.stream())
        .pipe(replace(placeholder('js'), scriptTags))
        .pipe(replace(placeholder('css'), styleTag))
        .pipe(gulp.dest(project.destinations.build));
}

/**
 * Generate an `index.html` file for distribution purposes:
 *  - read `src/app/index.html`
 *  - inject the Bower dependencies in their minified form as a single file,
 *  by replacing `wiredep`s `<!-- bower:js -->` placeholder
 *  - inject compiled templates and compiled JavaScript sources as a single minified file,
 *  by replacing the `<!-- app:js -->` placeholder
 *  - inject the compiled minified stylesheet by replacing the `<!-- app:css -->` placeholder
 *  - write `dist/[distType]/index.html`
 *
 * @param distType Possible values: 'release', 'ci', 'snapshot'.
 * @returns {Stream}
 */
function buildDistIndex(distType) {
    var libTag = toScriptTag(project.artefactName(distType, '.lib.js')),
        scriptTag = toScriptTag(project.artefactName(distType, '.min.js')),
        styleTag = toStyleTag(project.artefactName(distType, '.min.css'));

    return gulp
        .src(project.sources.main + project.globs.index)
        .pipe(replace(placeholder('js', 'bower'), libTag))
        .pipe(replace(placeholder('js'), scriptTag))
        .pipe(replace(placeholder('css'), styleTag))
        .pipe(gulp.dest(project.destinations.dist[distType]));
}


/* --------------- */
/* --- private --- */
/* --------------- */

/**
 * @param type Possible values: 'js', 'css'.
 * @param [scope] Possible values: 'app', 'bower'. Default value: 'app'.
 * @returns {string} A string of the form `<!-- scope:type -->`.
 */
function placeholder(type, scope) {
    scope = scope || 'app';
    return '<!-- ' + scope + ':' + type + ' -->';
}

/**
 * @param path
 * @returns {string} A string of the form `<script src="path/to/script.js"></script>`.
 */
function toScriptTag(path) {
    return '<script src="' + path + '"></script>';
}

/**
 * @param path
 * @returns {string} A string of the form `<link rel="stylesheet" href="path/to/stylesheet.css"/>`.
 */
function toStyleTag(path) {
    return '<link rel="stylesheet" href="' + path + '"/>';
}
