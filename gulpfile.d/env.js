'use strict';

/* ----------------------------- */
/* --- Environment variables --- */
/* ----------------------------- */

/**
 * Registers Gulp tasks that generate environment variables for the application:
 * - util.env.init: initializes the env.json file from the "environment" section in project.json.
 * - build.env: generates the env.js angular module in the build/ folder.
 * - dist.release.env: generates the env.js angular module in the dist/release/ folder.
 * - dist.ci.env: generates the env.js angular module in the dist/ci/ folder.
 * - dist.snapshot.env: generates the env.js angular module in the dist/snapshot/ folder.
 */

var /** @see https://github.com/alexmingoia/gulp-file */
    file = require('gulp-file'),
    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),

    /** --- internal --- */

    burp = require('./burp'),
    paths = require('./paths'),

    /** --- config --- */

    project = require('./config');


module.exports = {
	env: (function orchestrate() {
		return burp.ooze(createEnvGenerator, {
			init: init
		});

		function createEnvGenerator(destination) {
			return burp.private([createEnvJs, destination], '{0}.env');
		}
	})(),
	outputPathStream: outputPathStream
};

/**
 * Get the output path for the environment constant js file as a Stream and
 * expose it to other modules.
 *
 * @returns {Stream}
 */
function outputPathStream() {
	var outputStream = gulp.src(project.destinations.build + 'env.js');
	outputStream.pipe(paths.set('env'));
	return outputStream;
}

function init() {
	var envContent = {};
	envContent.environment = project.getEnvironment(true);
	var content = JSON.stringify(envContent, null, 2);
	return file('env.json', content, {src: true}).pipe(gulp.dest('.'))
}

function createEnvJs(destination) {
    return file('env.js', createEnvModule(project.getEnvironment()), {src: true})
        .pipe(gulp.dest(project.get('destinations', destination)))
        .pipe(paths.set('env'));
}

function createEnvModule(env) {
    var constants = Object.keys(env).map(toConstant).join('\n');
    return 'angular.module("env", [])\n' + constants + '\n  ;';

    function toConstant(key) {
        return '  .constant("' + key + '", ' + JSON.stringify(env[key]) + ')';
    }
}
