'use strict';

var /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/jonathanepollack/gulp-minify-html */
    minifyHtml = require('gulp-minify-html'),
    /** @see https://github.com/miickel/gulp-angular-templatecache */
    templatecache = require('gulp-angular-templatecache'),

    paths = require('../paths'),
    project = require('../config');


module.exports = {
	build: buildTemplates,
	outputPathStream: outputPathStream
};

/**
 * Generate an Angular template cache for development or distribution purposes:
 *  - find all template files (`.tpl.html`)
 *  - minify them, making sure not to remove empty attributes which are very common in Angular
 *  - compile them into a single JavaScript file, creating a new Angular module called `app.templates`
 *  - write to `dist/app/templates.js` and
 *  - expose that path to other modules
 *
 * @returns {Stream}
 */
function buildTemplates() {
	return gulp
		.src(project.sources.main + project.globs.templates)
		.pipe(minifyHtml({
			empty: true
		}))
		.pipe(templatecache(project.templates))
		.pipe(gulp.dest(project.destinations.main))
		.pipe(paths.set('templates'));
}

/**
 * Get the output path for the template cache js file as a Stream and
 * expose it to other modules.
 *
 * @returns {Stream}
 */
function outputPathStream() {
	var outputStream = gulp.src(project.destinations.main + 'templates.js');
	outputStream.pipe(paths.set('templates'));
	return outputStream;
}
