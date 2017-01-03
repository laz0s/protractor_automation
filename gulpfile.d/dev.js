'use strict';

var _ = require('lodash-node'),

    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),

    buildAssets = require('./build/asset').dev,
    buildI18n = require('./i18n').dev,
    buildIndex = require('./build/index').dev,
    buildStyles = require('./build/styles').dev,
    buildTemplates = require('./build/templates').build,
    buildTSE2e = require('./build/tsE2E'),
    buildTSMain = require('./build/tsMain').dev,
    buildTSUnit = require('./build/tsUnit').dev,
    burp = require('./burp'),
    env = require('./env').env.build;


var buildMainAndUnit = burp.private(_.flow(buildTSMain, buildTSUnit), 'build.ts.main.and.unit'),
    buildTS = burp.private(gulp.parallel(buildMainAndUnit, buildTSE2e), 'build.ts'),
    buildAllJS = burp.private(gulp.parallel(buildTS, env, buildTemplates, buildI18n), 'build.jsArtefacts'),
    buildNonJS = gulp.parallel(buildIndex, buildStyles, buildAssets),
    buildAll = burp.private(gulp.series(buildAllJS, buildNonJS), 'build');

/**
 * Register Gulp tasks that build source code and resources:
 * - build: builds everything (for a pure TypeScript library this is simply an alias for `build.ts`).
 * - build.ts: builds all TypeScript sources.
 * - build.ts.main: builds only the main TypeScript sources (not the tests).
 * - build.ts.unit: builds only TypeScript test sources.
 * - build.ts.e2e: builds only TypeScript functional test sources.
 * - build.templates: creates an Angular template cache out of the source HTML files.
 * - build.jsArtefacts: builds a composed stream containing all compiled js artefacts.
 * - build.styles: compiles SASS sources into a single CSS file.
 * - build.index: builds the index.html file with sorted script tags.
 */
module.exports = {
    ts: buildTS,
    main: burp.private(buildTSMain, 'build.ts.main'),
    unit: buildMainAndUnit,
    e2e: burp.private(buildTSE2e, 'build.ts.e2e'),
    templates: burp.private(buildTemplates, 'build.templates'),
    styles: burp.private(buildStyles, 'build.styles'),
    index: burp.private(buildIndex, 'build.index'),
    allJS: buildAllJS,
    all: buildAll
};
