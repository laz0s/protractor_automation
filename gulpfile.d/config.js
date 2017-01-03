'use strict';

var _ = require('lodash-node');
var git = require('./tools/git');
var log = require('./tools/log');
var path = require('path');

var pkg = require('../package.json');
var config = require('./config.json');
var project = require('../project.json');
var env = getEnvironmentConfig(true);

module.exports = pkg;

pkg.sources = config.sources;
pkg.globs = config.globs;
pkg.typings = config.typings;
pkg.assets = config.assets;
pkg.destinations = config.destinations;
pkg.client = {
	url: (env.client && env.client.url) || project.client.url || config.url
};
pkg.templates = _.assign(config.templates, project.templates);
pkg.getEnvironment = getEnvironment;
pkg.get = get;
pkg.artefactName = artefactName;
pkg.destinationPath = destinationPath;
pkg.protractor = _.assign(config.protractor, project.protractor, env.protractor);

Object.keys(project.assets).forEach(configureAssetCollection);

/**
 * @param [silent] Suppresses the warning if its value is `true`.
 * @returns {*} If `env.json` exists the parsed contents of its `environment` property are returned;
 * if it doesn't, we use the project default `environment` property.
 */
function getEnvironment(silent) {
    var env = getEnvironmentConfig(silent).environment;
    if (!env) throw new Error(log.error('config', 'Failed to read *env.json*: missing node "*environment*"'));
    return env;
}

/**
 * @param [silent] Suppresses the warning if its value is `true`.
 * @returns {*} If `env.json` exists the parsed contents are returned; if it doesn't, we use the project defaults.
 */
function getEnvironmentConfig(silent) {
    try {
        return require('../env.json');
    }
    catch (e) {
        if (!silent) log.warn('config',
            'Failed to read *env.json*, defaulting to *project.json*.',
            'You can generate the env.json file by running:',
            '> *gulp env.init*'
        );

        return project;
    }
}

/**
 * Takes a property chain (or a list of them) and returns the value of the matching nested property in the
 * configuration file.
 * Example: `config.get('destinations', 'dist.ci')` will return "./dist/ci/" for the default configuration;
 * the result is exactly the same when calling `config.get('destinations.dist.ci')`
 *
 * @param {...string}
 * @returns {*} The value of the nested property.
 */
function get() {
    return Array.prototype.slice.apply(arguments)
        .join('.')
        .split('.')
        .reduce(getProperty, pkg);
}

function getProperty(host, propertyName) {
    return host[propertyName];
}


/**
 * Asset collections can be extended or defined in project.json
 *
 * For existing asset collections the globs and sources arrays may be extended with the
 * values provided in project.json. The destination cannot be overridden.
 *
 * For new asset collections, the globs, sources and destination must be defined.
 * Note that the destination path is relative to the target build folder.
 *
 * @param {string} collection The asset collection name,
 *                 used as a configuration key, and often folder name as well
 */
function configureAssetCollection(collection) {
  var prj = project.assets[collection];

  var merged = pkg.assets[collection] || {
        globs : [],
        sources : [],
        destination: prj.destination || ("assets/" + collection)
      };

  if ( prj.sources ) {
    merged.sources = merged.sources.concat(prj.sources);
  }

  if ( merged.sources.length === 0 ) {
    merged.sources.push("src/app/assets/" + collection);
  }

  if ( prj.globs ) {
    merged.globs = merged.globs.concat(prj.globs);
  }

  if ( merged.globs.length === 0 ) {
    merged.globs.push("**/*.*");
  }

  pkg.assets[collection] = merged;
}

function artefactName(distType, extension) {
    return [pkg.name, version(distType), extension].join('.').replace(/\.+/g, '.');
}

function version(distType) {
    switch (distType) {
        case 'release':
            return pkg.version;
        case 'ci':
            return git.getLatestSha(6);
        case 'snapshot':
            return 'SNAPSHOT';
    }
}

function destinationPath(folderName, file) {
    var sourcePath = path.relative(this.sources[folderName], file);
    var targetPath = path.join(this.destinations[folderName], sourcePath);
    return targetPath.slice(0, -path.extname(targetPath).length) + '.js';
}
