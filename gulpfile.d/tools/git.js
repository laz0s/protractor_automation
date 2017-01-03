'use strict';

var /** @see https://www.npmjs.com/package/sync-exec */
    sexec = require('sync-exec'),
/** @see https://www.npmjs.com/package/which */
    which = require('which').sync;

var shaRegex = /\b[0-9a-f]{5,40}\b/i,
    sha;

module.exports = {
    getLatestSha: getLatestSha
};

function getLatestSha(limit) {
    if (sha) return sha;
    if (!which('git')) throw new Error('git not found on your system.');

    try {
        sha = sexec('git rev-parse HEAD');
    }
    catch (e) {
        throw new Error('Could not get git status --porcelain');
    }
    // sha is now a Object
    sha = sha.stdout.trim();
    if (limit) sha = sha.substr(0, limit + 1);
    if (shaRegex.test(sha)) return sha;

    throw new Error('Malformed commit sha or no sha at all returned.');
}
