'use strict';

/* -------------------- */
/* --- Unit testing --- */
/* -------------------- */

/**
 * Registers Gulp tasks for unit testing:
 * - test.continuous: monitors changes in the generated JS sources and reruns unit tests when necessary.
 *                    This also emits html reports for the unit test summary and the coverage.
 * - test.single: single run that additionally generates coverage and summary reports for a CI server.
 * - test.conf: generates a Karma config file to use with IDE integration.
 */

var _ = require('lodash-node'),
	/** @see https://github.com/alexmingoia/gulp-file */
    file = require('gulp-file'),
    /** @see https://github.com/gulpjs/gulp */
	fs = require('fs'),
    gulp = require('gulp'),
    /** @see https://github.com/karma-runner/karma */
    karma = require('karma'),
    /** @see https://github.com/lazd/gulp-replace */
    replace = require('gulp-replace'),
    /** @see https://github.com/taptapship/wiredep */
    wiredep = require('wiredep'),
	/** @see https://github.com/grncdr/merge-stream */
	merge = require('merge-stream'),
	path = require('path'),

    /** --- internal --- */

    burp = require('./burp'),
    paths = require('./paths'),
	orderTSMain = require('./build/tsMain').devOrder,
	orderTSUnit = require('./build/tsUnit').devOrder,
	templatePathStream = require('./build/templates').outputPathStream,
	envPathStream = require('./env').outputPathStream,

    /** --- config --- */

    project = require('./config');


module.exports = {
	continuous: burp.private(gulp.series(setupStreams, continuous), 'test.continuous'),
	single: burp.private(gulp.series(setupStreams, single), 'test.single'),
	conf: burp.private(gulp.series(setupStreams, confForIde), 'test.conf')
};

var cfg = {
	singleRun: true,
	autoWatch: false,
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    preprocessors: {},
    reporters: ['progress', 'coverage', 'html'],
    coverageReporter: {
        dir: project.destinations.unit.report.coverage.root,
        // output summary to console; we need the subdir or Karma will create unwanted folders for no good reason
        reporters: [
            {type: 'text-summary', subdir: '.'},
            {type: 'html', subdir: project.destinations.unit.report.coverage.html}
        ]
    },
    /** @see https://github.com/dtabuenc/karma-html-reporter */
    htmlReporter: {
        outputDir: project.destinations.unit.report.summary.html,
        focusOnFailures: true,
        namedFiles: true,
        pageTitle: 'Unit test summary',
        urlFriendlyName: false,
        preserveDescribeNesting: true,
        foldAll: true,
        reportName: 'index'
    },
    /** @see https://github.com/karma-runner/karma-junit-reporter */
    junitReporter: {
        outputDir: project.destinations.unit.report.summary.xml,
        outputFile: undefined,
        suite: ''
    }
};

var lastRun;

function continuous(done) {
	//setup the file watcher, if no file exists the first event will be triggered when te file is created.
	fs.watchFile(project.destinations.doneFile.path, _.partial(triggerUnitTests, done));
	// trigger the tests for the first  time only
	triggerUnitTests(done, {mtime:new Date()});
}

function triggerUnitTests(done, curr) {
	if (!lastRun || curr.mtime.getTime() > lastRun.getTime()) {
		lastRun = curr.mtime;
		runUnitTests(done);
	}
}

function single(done) {
	// Add also a JUnit XML summary report.
	cfg.reporters = cfg.reporters.concat(['junit']);
	// Add also lcov and cobertura coverage reporting.
	cfg.coverageReporter.reporters = cfg.coverageReporter.reporters.concat([
		{type: 'lcovonly', subdir: '.', file: project.destinations.unit.report.coverage.lcov},
		{type: 'cobertura', subdir: '.', file: project.destinations.unit.report.coverage.cobertura}
	]);

	runUnitTests(done, true);
}

/**
 * Function that checks all required source paths are available before configuring
 * and starting up karma.
 *
 * @param done Callback that is called if all required paths are already present.
 * @returns {*}
 */
function setupStreams(done) {
	// Check that the required paths are already setup.
	if (paths.check('templates', 'env', 'main', 'unit')) {
		done();
	} else {
		// Load the streams.
		var mainStream = orderTSMain();
		var unitStream = orderTSUnit(mainStream);
		var templatesStream = templatePathStream();
		var envStream = envPathStream();
		// Merge so that all piping is completed upon return.
		return merge(mainStream, unitStream, templatesStream, envStream);
	}
}

function getFilePaths() {
	var specArray = wiredep({devDependencies: true}).js
		.concat(paths.get('templates', 'env', 'main', 'unit'));
	// Add js wildcards for source and spec files so that new files are picked up by karma.
	specArray.push(path.resolve(project.destinations.main + project.globs.js));
	specArray.push(path.resolve(project.destinations.unit.build + project.globs.js));
	return specArray;
}

function runUnitTests(done) {
    cfg.files = getFilePaths();
	cfg.logLevel = 'warn';
	cfg.preprocessors[path.resolve(project.destinations.main + project.globs.js)] = ['coverage'];

	new karma.Server(cfg, done).start();
}

function confForIde() {
    var content = 'module.exports = function(config) { config.set({app:js}); };';
    cfg.files = getFilePaths();
	cfg.logLevel = 'info';
	cfg.preprocessors[path.resolve(project.destinations.main + project.globs.js)] = ['coverage'];

	return file(project.destinations.karma, content, {src: true})
        .pipe(replace('{app:js}', JSON.stringify(cfg)))
        .pipe(gulp.dest(project.destinations.unit.build));
}
