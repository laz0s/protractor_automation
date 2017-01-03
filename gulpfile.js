'use strict';

require('./gulpfile.d/burp').lazy(
    'clean', 'clean up all development and distributable artefacts',
    'clean', 'all'
).lazy(
    'dev', 'watch all sources (including tests), incrementally recompile when any of them change and rerun unit tests',
    'watch', 'tdd'
).lazy(
    'dev.build', 'watch all sources (including tests) and incrementally recompile when any of them change',
    'watch', 'build'
).lazy(
    'dev.unit', 'monitor changes in the generated JS sources and rerun unit tests when necessary',
    'test', 'continuous'
).lazy(
    'e2e.build', 'builds all e2e tests', 'e2e', 'build'
).lazy(
    'e2e.run', 'runs all e2e tests', 'e2e', 'run'
).lazy(
    'dist.release', 'generate all distributable artefacts in the ./dist/release/ folder',
    'dist', 'release'
).lazy(
    'dist.ci', 'generate all distributable artefacts in the ./dist/ci/ folder',
    'dist', 'ci'
).lazy(
    'dist.snapshot', 'generate all distributable artefacts in the ./dist/snapshot/ folder',
    'dist', 'snapshot'
).lazy(
    'env.init', 'initialize the env.json file from the "environment" section in file project.json',
    'env', 'env.init'
).lazy(
    'env.release', 'generate the env.js angular module in the ./dist/release/ folder',
    'env', 'env.dist.release'
).lazy(
    'env.ci', 'generate the env.js angular module in the ./dist/ci/ folder',
    'env', 'env.dist.ci'
).lazy(
    'env.snapshot', 'generate the env.js angular module in the ./dist/snapshot/ folder',
    'env', 'env.dist.snapshot'
).lazy(
    'bump.major', 'bump the major version number in bower.json and package.json',
    'bump', 'major'
).lazy(
    'bump.minor', 'bump the minor version number in bower.json and package.json',
    'bump', 'minor'
).lazy(
    'bump.patch', 'bump the patch version number in bower.json and package.json',
    'bump', 'patch'
).lazy(
    'typings', 'reinstall all typings',
    'typings', 'all'
).lazy(
    'i18n.extract', 'extract translation strings',
    'i18n', 'extract'
).lazy(
    'help', 'display this help message', 'help'
).lazy(
    'default', 'display this help message', 'help'
);
