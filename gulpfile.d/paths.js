'use strict';

var _ = require('lodash-node'),
    /** @see https://github.com/isaacs/minimatch */
    minimatch = require('minimatch'),
    /** @see https://github.com/sindresorhus/vinyl-paths */
    paths = require('vinyl-paths');

var collections = {};

function initCollection(name) {
    collections[name] = [];
    return collections[name];
}

/**
 * Checks to see if the provided path collection is already set.
 *
 * @param name The path to check.
 * @returns {*}
 */
function exists(name) {
	return collections[name];
}

function collection(name) {
    if (!collections[name]) raiseDependencyError(name);
    return collections[name];
}

function set(collection, glob) {
    collection = initCollection(collection);
    return paths(addToCollection);

    function addToCollection(path) {
        var canAdd = !glob || minimatch(path, glob, {dot: true});
        if (canAdd) collection.push(path);
        return Promise.resolve();
    }
}

/**
 * Check to see if the provided collection path(s) are already recorded.
 * This method does not fail if a collection is not already set.
 *
 * @returns {*}
 */
function check() {
	var collections = [].slice.call(arguments).map(exists);
	return _.compact(collections).length;
}

function get() {
    var collections = [].slice.call(arguments).map(collection);
    return _.flatten(collections);
}

function match(file, glob) {
    return minimatch('./' + file.relative, glob, {dot: true});
}

var generatedArtefacts = {
    templates: 'templateCache',
    env: 'environment configuration module',
    main: 'application sources',
    unit: 'unit test sources'
};

function raiseDependencyError(name) {
    var msg = '\nThe task that generates the {0} must be executed before you can access its generated paths.\n'
        .replace('{0}', generatedArtefacts[name]);

    var err = new Error(msg);
    err.name = 'Burp::TaskDependencyException';
    throw err;
}

module.exports = {
    get: get,
	check: check,
    set: set,
    match: match
};
