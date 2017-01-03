'use strict';

var _ = require('lodash-node'),
    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/sindresorhus/gulp-zip */
    zip = require('gulp-zip'),

    /** --- internal --- */

    burp = require('./burp'),

    /** --- config --- */

    project = require('./config');


module.exports = {
	reports: _.partial(archive, 'reports'),
    docs: archive('docs', 'release')
};

/** Maps archive scopes to build destinations. */
var destinations = {
    docs: project.destinations.docs,
	reports: project.destinations.reports
};

/**
 * @param scope The archive scope. Possible values: ['docs', 'reports']
 * @param distType The distribution type. Possible values: ['release', 'ci', 'snapshot']
 * @returns {Function} A task that takes all files from the scope's build destination and compresses them into a
 * .zip file.
 */
function archive(scope, distType) {
    var fileName = project.artefactName(distType, scope + '.zip');

    return burp.private(function () {
        return gulp
            .src(destinations[scope] + project.globs.all)
            .pipe(zip(fileName))
            .pipe(gulp.dest(project.destinations.dist.root));
    }, 'archive.' + scope);

}
