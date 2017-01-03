'use strict';

var /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp'),
    /** @see https://github.com/rvagg/through2 */
    through = require('through2');


/**
 * @param {RegExp|string} search The token to replace.
 * @param {Function} toString A parser that takes an array of absolute paths as an argument and returns a replacement
 * string or function (the return value is the same as what you'd use as the second argument of `String#replace`).
 * @param {Stream|string} fileStreamOrGlob A stream containing Vinyl files or a glob to create that stream from.
 * @returns {Stream} A stream that - For all the files in the parent stream - replaces a given token in their contents
 * with the paths from the files of the given `fileStream`, using `toString` to format them.
 */
module.exports = function replacePaths(search, toString, fileStreamOrGlob) {
    var fileStream = typeof fileStreamOrGlob === 'string' ? gulp.src(fileStreamOrGlob) : fileStreamOrGlob,
        paths = [];

    return through.obj(pathsFromStream);

    function pathsFromStream(targetFile, enc, outerDone) {
        var outer = this;

        // need to collect paths from the inner stream only once
        if (paths.length) replace();
        else fileStream.pipe(through.obj(addPath, replace));

        function addPath(file, enc, done) {
            paths.push(file.path);
            done();
        }

        function replace(done) {
            var contents = String(targetFile.contents);
            contents = contents.replace(search, toString(paths, targetFile));

            targetFile.contents = new Buffer(contents);
            outer.push(targetFile);

            if (done) done();
            outerDone();
        }
    }

};
