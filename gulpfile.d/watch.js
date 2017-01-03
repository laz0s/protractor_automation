'use strict';

/* ----------------------- */
/* --- File monitoring --- */
/* ----------------------- */

/**
 * Registers Gulp tasks to continuously monitor files and execute tasks on changes:
 * - tdd: same as `dev`, but simultaneously runs the `karma` task which will rerun unit tests when the generated JS
 * files change.
 * - build.watch: watches all sources (including tests) and incrementally recompiles when any of them change.
 *
 * There are two ways to use these tasks in TDD:
 * - single terminal: just run `gulp dev`
 * - two terminals:
 *  - one where you run `gulp dev.build` to compile the sources
 *  - one where you run `gulp dev.unit` to watch the former and rerun unit tests
 */

var _ = require('lodash-node'),
    /** @see http://www.browsersync.io */
    browserSync = require('browser-sync'),
    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
	/** @see https://github.com/alexmingoia/gulp-file */
	file = require('gulp-file'),
    fs = require('fs'),
    /** @see https://github.com/floatdrop/gulp-watch */
    watch = require('gulp-watch'),

    /** --- internal --- */

    build = require('./dev'),
    paths = require('./paths'),
    test = require('./test'),
    i18n = require('./i18n'),
    /** --- config --- */

    project = require('./config');


/**
 * Glob patterns of the files to watch.
 * @type {String[]}
 */
var sourceGlobs = [
    ['main', 'index'],
    ['main', 'templates'],
    ['main', 'styles'],
    ['main', 'ts'],
    ['i18n', 'translations'],
    ['unit', 'ts'],
    ['e2e', 'ts']
].map(toGlob);

/**
 * Maps globs to the tasks that should be executed when that glob pattern is matched.
 * @type {Object}
 */
var taskMap = _.zipObject(sourceGlobs, [
	[build.index, browserSync.reload],
	[build.templates, browserSync.reload],
	[build.styles, browserSync.reload],
    [build.unit, build.index, test.conf, browserSync.reload, generateFinishBuildFile],
	[i18n.dev, browserSync.reload],
    [build.unit, test.conf, generateFinishBuildFile],
    [build.e2e]
]);

var jsArtefactTasks = [build.unit, build.e2e, build.templates, i18n.dev],
	watchAll = _.partial(watch, sourceGlobs, {'base': process.cwd()}, handleFileEvent),
    executeTaskQueue = _.debounce(executeTasks, 500),
    queue = [];

browserSync.reload.displayName = 'browserSync.reload';

module.exports = {
    build: gulp.series(build.all, gulp.parallel(startBrowserSync, test.conf, watchAll)),
    tdd: gulp.series(build.all, gulp.parallel(startBrowserSync, test.continuous, test.conf, watchAll))
};

/**
 * @param keys An Array of project config keys, e.g. ['main', 'index'].
 * @returns {String} A glob pattern, e.g. './src/app/index.html'.
 */
function toGlob(keys) {
    return project.sources[keys[0]] + project.globs[keys[1]];
}

/**
 * @param key
 * @returns {Function[]} An array of tasks matching the given key.
 */
function toTask(key) {
    return taskMap[key];
}

/**
 * Executed whenever any watched file changes.
 * The task key matching the file that just changed is pushed onto a queue for debounced execution.
 * The debouncing is necessary to avoid duplicate task execution and Karma crashes
 * (see [TRFS-38](https://pmo.trasys.be/jira/browse/TRFS-38)).
 * When a TypeScript source file is removed, delete its matching JavaScript file.
 *
 * @param touchedFile
 */
function handleFileEvent(touchedFile) {
    queue.push(_.find(sourceGlobs, _.partial(paths.match, touchedFile)));

    switch (touchedFile.event) {
        case 'add':
        case 'change':
            break;
        case 'unlink':
            deleteJSFile(touchedFile);
            break;
        default:
            throw 'Unknown event: ' + file.event
    }

    executeTaskQueue();
}

/**
 * Assert that the given file is a TypeScript file, find the JavaScript file that matches it and delete it.
 *
 * @param tsFile
 */
function deleteJSFile(tsFile) {
    if (_.contains(tsFile, '.ts'))
        fs.unlink(project.destinationPath('main', tsFile.relative));
}

/**
 * Take the task keys currently in the `queue`, convert it into a list of unique tasks, resolve their execution order
 * and execute them. This is how the task resolution goes:
 * - find all the tasks that generate .js artefacts and execute them in parallel before anything else (if any)
 * - then execute all tasks that generate other artefacts (if any)
 * - and finally reload the browser window (doesn't apply if there's only test compilation tasks in the queue)
 */
function executeTasks() {
    var tasks = _.flow(_.map, _.flatten, _.uniq)(queue, toTask),
        jsTasks = _.intersection(tasks, jsArtefactTasks),
        nonJsTasks = _.difference(tasks, jsArtefactTasks, [browserSync.reload]),
        reload = _.first(_.intersection(tasks, [browserSync.reload])),
		finish = _.first(_.intersection(tasks, [generateFinishBuildFile]));

    queue.length = 0;

    if (jsTasks.length > 1) jsTasks = gulp.parallel(jsTasks);
    if (nonJsTasks.length > 1) nonJsTasks = gulp.parallel(nonJsTasks);
    tasks = _.flow(_.flatten, _.compact)([jsTasks, nonJsTasks, reload, finish]);

    gulp.series(tasks)();
}

/**
 * Configure and start the BrowserSync server.
 * Set up routes to serve libraries directly from `bower_components` and TypeScript source files from their location.
 */
function startBrowserSync() {
    var options = {
        server: {
            baseDir: project.destinations.build,
            routes: {
                "/bower_components": "bower_components",
                "/src/app": project.sources.main
            },
            directory: false
        },
        ghostMode: false,
        logFileChanges: true,
        notify: true,
        reloadDelay: 0
    };

    browserSync(options);
}

function generateFinishBuildFile() {
	return file(project.destinations.doneFile.name, "", { src: true }).pipe(gulp.dest(project.destinations.build));
}
