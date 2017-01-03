'use strict';

/**
 * Provides a set of convenience functions on top of Gulp.
 */

var /** @see https://github.com/gulpjs/gulp */
    gulp,
    /** @see https://github.com/mariocasciaro/gulp-clone */
    clone,
	/** @see https://github.com/jking90/validate-node-version */
	validatEnv,
	/** @see https://github.com/npm/node-semver */
	semver,

	/** --- internal --- */
	log,
	util;

module.exports = {
    lazy: lazy,
    private: internal,
    ooze: ooze
};

function lazy(taskName, description, moduleName, fn) {
    gulp = gulp || require('gulp');
	validatEnv = validatEnv || require('validate-node-version')();
	log = log || require('./tools/log');
	semver = semver || require('semver');

    runTask.description = description;
    runTask.displayName = taskName;
    gulp.task(taskName, runTask);

    return module.exports;

    function runTask(done) {
		if (!checkVersion()) {
			return done();
		}

        var module = require('./' + moduleName);
        return (fn || '').split('.').reduce(getTask, module)(done);
    }
}

/**
 * Check the developer's NodeJS version to be compatible with the version range specified in the package.json file of the project.
 * False will be returned when the dev's version is lower than the minimum version.
 * True will be returned when the dev's version is between or greater than the range.
 *
 * @returns {boolean} A boolean that indicates if the developers NodeJS version is compatible with the seed.
 */
function checkVersion() {
	if (!validatEnv.satisfies) {
		if (semver.ltr(validatEnv.actual, validatEnv.expected)) {
			log.error("NodeJS", validatEnv.message);
			return false;
		} else {
			log.warn("NodeJS", validatEnv.message);
		}
	}

	return true;
}

function getTask(host, fnName) {
    return host[fnName] || host;
}

/**
 * Register an internal task. This task will *not* be exposed in the public Gulp API.
 * However if it is called through task orchestration, the provided `name` wil be displayed in the command line output.
 *
 * @param {Function|Array} fn
 * @param {string} [name]
 * @returns {Function} The original function with a `displayName` property tagged onto it.
 */
function internal(fn, name) {
    util = util || require('util');
    if (util.isArray(fn)) return taskFactory(internal, fn, name);

    fn.displayName = name;
    return fn;
}

/**
 * Creates a standard burp API of the following form:
 * ```
 * {
 *  build: *,
 *  dist: {
 *      release: *,
 *      ci: *,
 *      snapshot: *
 *  }
 * }
 * ```
 * For each of the nodes `fn` is executed with the corresponding task prefix.
 * `fn` is expected to be a factory function that executes `burp.private`, but anything goes really.
 *
 * @param fn A task factory function.
 * @param [moreApi] More API configurations that will be merged into the standard API object.
 * @returns {{build: *, dist: {release: *, ci: *, snapshot: *}}}
 */
function ooze(fn, moreApi) {
    var api = {
        build: fn('build'),
        dist: {
            release: fn('dist.release'),
            ci: fn('dist.ci'),
            snapshot: fn('dist.snapshot')
        }
    };

    if (moreApi) Object.keys(moreApi).forEach(merge);

    return api;

    function merge(key) {
        api[key] = moreApi[key];
    }
}

/**
 * Constructs a task while injecting it with arguments. The `parts` Array's first element should be the task function
 * reference; all of the other elements are arguments to be applied to that function.
 * Note that `name` and `description` can contain tokens like `{0}`. These will be replaced with the string value of
 * the task's argument at that index.
 *
 * *Example:* `burp.public([fn, 'hello'], '{0}.world', 'description');`
 * will result in a task with `displayName` `hello.world`.
 *
 * @param {Function} task
 * @param {Array} parts
 * @param {string} name
 * @param {string} [description]
 * @returns {Function} A wrapper function with a `displayName` and a `description` property tagged onto it.
 */
function taskFactory(task, parts, name, description) {
    // intentionally using an anonymous function here:
    // this is currently the only way that Gulp will use `displayName` instead of the function's name
    var factory = function (done) {
        return parts[0].apply(null, parts.slice(1).concat(done));
    };

    return task(factory, replace(name), replace(description));

    function replace(s) {
        return s ? s.replace(/{(\d)}/g, replaceTokens) : s;
    }

    function replaceTokens(token, index) {
        return parts[parseInt(index, 10) + 1];
    }
}
