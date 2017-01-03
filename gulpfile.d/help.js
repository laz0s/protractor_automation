'use strict';

/* ------------ */
/* --- Help --- */
/* ------------ */

/**
 * Registers a Gulp task that displays a help message.
 * This is also the default task, so running `gulp` will print out help instructions.
 */

var /** https://github.com/sindresorhus/chalk */
    chalk = require('chalk'),
    /** @see https://github.com/gulpjs/gulp */
    gulp = require('gulp');

module.exports = help;

function help(done) {
    [].concat(header(), tasks(), workflow(), '').forEach(printLine);
    done();

    function printLine(line) {
        console.log(line);
    }
}

function header() {
    var ascii = '\n' +
        '                                    -+hNNh+-\n' +
        '                               `:odMMMMMMMMMMds:`\n' +
        '                           ./ymMMMMMMMMMMMMMMMMMMmy/.\n' +
        '                       -+hNMMNmhyso++//////++osyhmNMMNho-\n' +
        '              |```| `:sdmhs+:.`                      `.:+shmds:`|```|\n' +
        '              ./oss+:`                                   `.:/sso+.\n' +
        '         `-///:`     |..--`                          `.--.`|      `:+//-`\n' +
        '     `----`              |.:::-..`             `.-:::-`|               `----`\n' +
        ' ``..`                      |`.:/++///::::://+++/-.|                        `..``\n' +
        '`                               |`-:++++++++/:.|                                 `\n' +
        '                                    |.-//:.`|\n' +
        '\n\n' +
        '                         |===                        ===|\n' +
        '------------------------ |===| Trasys front-end stack |===| ------------------------\n' +
        '                         |===                        ===|\n\n';

    return ascii.replace(/\|(.+?)\|/gm, function () {
        return chalk.green.bold(arguments[1]);
    });
}


function tasks() {
    return [
        chalk.underline.yellow('1./ Available Tasks\n'),
        'You will typically use these tasks on a day-to-day basis.\n'
    ].concat(
        [
            gulp.task('clean'),
            gulp.task('dev'), gulp.task('dev.build'), gulp.task('dev.unit'),
            gulp.task('e2e.build'), gulp.task('e2e.run'),
            gulp.task('dist.snapshot'), gulp.task('dist.ci'), gulp.task('dist.release'),
            gulp.task('env.init'), gulp.task('env.snapshot'), gulp.task('env.ci'), gulp.task('env.release'),
            gulp.task('bump.patch'), gulp.task('bump.minor'), gulp.task('bump.major'),
            gulp.task('typings'),
            gulp.task('i18n.extract'),
            gulp.task('help')
        ].map(describe)
    );

    function describe(task) {
        return '   - ' + chalk.cyan(task.displayName) + '\t' + task.description;
    }
}

function workflow() {
    return [
        chalk.underline.yellow('\n\n2./ Typical workflow\n'),
        'For development you have two workflows at your disposal:',
        chalk.underline('\nAll in one'),
        'Just run ' + chalk.bold('`gulp dev`') + ' and the system will continuously monitor all your sources and ' +
        'resources for changes. When a change is detected, the concerned file is rebuilt, quality checks are ' +
        'performed and unit tests are run.',
        chalk.underline('\nTwo terminals'),
        'You might like to keep the building of the sources separate from the quality checks. ' +
        'In that case run ' + chalk.bold('`gulp dev.build`') + ' in one terminal ' +
        'and ' + chalk.bold('`gulp dev.unit`') + ' in another.',
        chalk.underline('\nReleasing'),
        'When you\'re ready to make a new release, take the following actions:',
        '- run one of the semver bump tasks, e.g. ' + chalk.bold('`gulp bump.major`'),
        '- run ' + chalk.bold('`gulp dist.release`'),
        '- merge your code on the ' + chalk.bold('master') + ' branch',
        '- make an annotated tag and push it to origin'
    ];
}
