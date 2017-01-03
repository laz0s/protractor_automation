'use strict';

/* --------------------- */
/* --- Version bump  --- */
/* --------------------- */

var /** @see https://github.com/stevelacy/gulp-bump */
    bump = require('gulp-bump'),
    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp')
    ;

module.exports = (function orchestrate() {

    return {
        major: createBump('major'),
        minor: createBump('minor'),
        patch: createBump('patch')
    };

    function createBump(type) {
        return function () {
            return bumpVersion(type);
        }
    }

})();


function bumpVersion(type) {
    return gulp
        .src(['./bower.json', './package.json'])
        .pipe(bump({type: type}))
        .pipe(gulp.dest('.'));
}
