'use strict';

var chalk = require('chalk');

module.exports = {
    error: log.bind(null, chalk.red),
    warn: log.bind(null, chalk.yellow)
};

function log(level, context /*, ...lines */) {
    var lines = [].slice
        .call(arguments, 2)
        .map(miniMark)
        .map(prefix.bind(null, level, context))
        .join('\n');

    console.log(lines);
    return lines;
}

function miniMark(s) {
    return s.replace(/\*(.+?)\*/g, function () {
        return chalk.bold(arguments[1]);
    });
}

function prefix(level, context, line) {
    return '[' + level(context) + '] ' + line;
}
