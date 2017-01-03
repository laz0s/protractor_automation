'use strict';

var _ = require('lodash-node'),
    path = require('path'),

    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),

    burp = require('../burp'),
    project = require('../config');


module.exports = {
    dev: createCopiers('build'),
    dist: createDistCopiers
};

/**
 * Create all copy tasks given a certain `distType`.
 *
 * @param {String} distType Possible values: 'release', 'ci', 'snapshot'.
 * @returns {gulp.parallel}
 */
function createDistCopiers(distType) {
    return createCopiers('dist.' + distType);
}

/**
 * Dynamically create a set of copy tasks which will be executed in parallel.
 * There will be a task for every node in `config.assets`;
 * by default these will include the application images and the application fonts.
 * When other nodes are added to `project.json` they will generate more tasks.
 * Overrides of existing nodes in `project.json` will only affect which files will be copied by the existing task.
 *
 * @param {String} prefix Possible values: 'build', 'dist.release', 'dist.ci', 'dist.snapshot'.
 * @returns {gulp.parallel}
 */
function createCopiers(prefix) {
    return gulp.parallel(Object.keys(project.assets).map(toTask));

    function toTask(collection) {
        return burp.private([copyAssetCollection, collection, prefix], '{1}.copy.{0}');
    }
}

/**
 * Copy the assets determined by the `collection` key into the target directory determined by the `prefix`:
 * make a list of all possible combinations of collection directories and extension globs
 * and use these to feed `gulp.src`.
 *
 * **Example:**
 * The default collection `fonts` will generate the following combinations:
 * ```
 * [ 'src/app/assets/fonts/.eot',
 *   'src/app/assets/fonts/.svg',
 *   'src/app/assets/fonts/.ttf',
 *   'src/app/assets/fonts/.woff',
 *   'src/app/assets/fonts/.woff2' ]
 * ```
 *
 * @param {String} collection
 * @param {String} prefix
 * @returns {Stream}
 */
function copyAssetCollection(collection, prefix) {
    var config = project.assets[collection],
        join = _.ary(path.join, 2),
        dest = join(project.get('destinations', prefix), config.destination),
        assetSources = _.reduce(config.sources, function (flatList, dir) {
            return flatList.concat(_.map(config.globs, _.partial(join, dir)));
        }, []);

    return gulp
        .src(assetSources)
        .pipe(gulp.dest(dest));
}
