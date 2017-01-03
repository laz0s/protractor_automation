'use strict';

var _ = require('lodash-node'),

    /** @see https://github.com/stevelacy/gulp-bump */
    bump = require('gulp-bump'),
    /** @see https://github.com/wearefractal/gulp-concat */
    concat = require('gulp-concat'),
    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/teambition/merge2 */
    merge = require('merge2'),
    /** @see https://github.com/terinjokes/gulp-uglify */
    uglify = require('gulp-uglify'),

    /** --- internal --- */

    archive = require('./archive'),
    build = require('./dev'),
    burp = require('./burp'),
    clean = require('./clean'),
    compileAssets = require('./build/asset').dist,
    compileDocs = require('./build/docs').dist,
    compileI18n = require('./i18n').dist,
    compileIndex = require('./build/index').dist,
    compileLibs = require('./build/libs'),
    compileStyles = require('./build/styles').dist,
    compileTemplates = require('./build/templates').build,
    compileTSMain = require('./build/tsMain').dist,
    minify = require('./tools/minify'),
    test = require('./test'),

    /** --- config --- */

    project = require('./config');


module.exports = {
    release: createDist('release'),
    ci: createDist('ci'),
    snapshot: createDist('snapshot')
};

/**
 * Create a task that generates all distributable artefacts in the dist folder:
 *  - A single concatenated JavaScript file.
 *  - A minified version of the former.
 *  - A source map that maps the minified JS file to the original one.
 *  - A single concatenated CSS file.
 *  - A minified version of the former.
 *  - A source map that maps the minified CSS file to the original one.
 *  - The documentation in a .zip archive.
 *  - Test reports (summary and coverage) in a .zip archive.
 *
 * @param distType
 * @returns {*}
 */
function createDist(distType) {
    var cleanTask = clean.dist[distType],
        prepareTasks = [cleanTask, gulp.series(build.allJS, test.single, archive.reports(distType))];

    if (distType === 'release') prepareTasks.push(compileDocs);

    var tasks = [compileLibs, buildDistJS, compileI18n, compileStyles, compileIndex]
        .map(_.partial(compileTask, distType))
        .concat(compileAssets(distType));

    var prepare = burp.private(gulp.parallel(prepareTasks), 'dist.prepare'),
        compile = burp.private(gulp.parallel(tasks), 'dist.build.' + distType);

    return gulp.series(prepare, compile);
}

/**
 * Makes a private task by wrapping a function and giving it a display name.
 *
 * @param distType
 * @param fn
 * @returns {Function}
 */
function compileTask(distType, fn) {
    // use the function name and strip off the word 'buildDist', so `buildDistLibs` becomes `dist.ci.libs`
    var name = fn.toString();
    name = name.substr(18, name.indexOf('(') - 18).toLowerCase();
    return burp.private([fn, distType], 'dist.{0}.' + name);
}

/**
 * Take all generated application .js files and the generated templateCache and merge it into a single minified file.
 *
 * @param distType
 * @returns {Stream}
 */
function buildDistJS(distType) {
    var dest = project.destinations.dist[distType];

    return merge(compileTemplates(), compileTSMain())
        .pipe(concat(project.artefactName(distType, '.js')))
        .pipe(gulp.dest(dest))
        .pipe(minify(uglify, distType, '.min.js')())
        // Don't leave gulp.dest up to lazypipe: https://github.com/OverZealous/lazypipe/issues/14
        .pipe(gulp.dest(dest));
}
