'use strict';

    /** @see https://github.com/gulpjs/gulp */
var gulp = require('gulp'),
    /** @see https://github.com/gabegorelick/gulp-angular-gettext */
    gettext = require('gulp-angular-gettext'),

    paths = require('./paths'),

    project = require('./config');


module.exports = {
    dev: buildDevI18n,
    dist: buildDistI18n,
    extract: extract
};

function extract() {
    return gulp.src(project.globs.templates)
        .pipe(gettext.extract('templates.pot'))
        .pipe(gulp.dest(project.sources.i18n));
}

function buildDevI18n() {
    return buildI18n(project.destinations.translations);
}

function buildDistI18n(distType) {
    return buildI18n(project.destinations.dist[distType]);
}

/**
 * Never mind the docs: this approach is doomed.
 */
function buildI18n(dest) {
    return gulp.src(project.sources.i18n + project.globs.translations)
        .pipe(gettext.compile({
            format: "json"
        }))
        .pipe(gulp.dest(dest))
        .pipe(paths.set('translations'))
}
