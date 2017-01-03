'use strict';

/* ------------------------ */
/* --- Artefact cleanup --- */
/* ------------------------ */

/**
 * Registers Gulp tasks that clean up generated artefacts:
 * - clean.build: cleans up all build artefacts (coverage reports, docs, JS sources, JS tests, source maps, karma conf).
 * - clean.dist: cleans up all distributable artefacts.
 * - clean: executes both of the former
 * Also has a public API for usage within other modules.
 */

var /** @see https://github.com/sindresorhus/del */
    del = require('del'),
    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),

    /** --- internal --- */

    burp = require('./burp'),

    /** --- config --- */

    project = require('./config');


module.exports = (function orchestrate() {
    var api = burp.ooze(createClean),
        dist = api.dist;

    api.dist = createClean('dist');
    api.dist.release = dist.release;
    api.dist.ci = dist.ci;
    api.dist.snapshot = dist.snapshot;
	api.reports = createClean('reports');
    api.all = gulp.parallel(api.build, api.dist, api.reports);

    return api;

    function createClean(scope) {
        return burp.private([clean, scope], 'clean.' + scope);
    }
})();

var globMap = {
    build: project.destinations.build,
    dist: project.destinations.dist.root,
    'dist.release': globDist('release').concat(project.destinations.dist.root + '*.docs.zip'),
    'dist.ci': globDist('ci'),
    'dist.snapshot': globDist('snapshot'),
	reports: project.destinations.reports
};

function globDist(type) {
    return [
        project.destinations.dist[type],
        project.destinations.dist.root + project.artefactName(type, 'coverage.zip')
    ];
}

function clean(scope) {
    return del(globMap[scope]);
}
