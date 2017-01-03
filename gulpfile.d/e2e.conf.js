'use strict';

/* ------------------------------------------------------- */
/* --- Configuration file for protractor (e2e testing) --- */
/* ------------------------------------------------------- */

/**
 * Configuration that achieves the following:
 * - Sets jasmine as the testing framework.
 * - Creates per-browser html test report(s) with screenshots.
 * - Creates combined JUnit XML test report.
 * - Adds enhanced console output to track the execution status.
 */

/** @see https://github.com/Kenzitron/protractor-jasmine2-html-reporter */
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter'),
	/** @see https://github.com/bcaudan/jasmine-spec-reporter */
	SpecReporter = require('jasmine-spec-reporter'),
	/** @see https://github.com/larrymyers/jasmine-reporters */
	jasmineReporters = require('jasmine-reporters'),

	/** Internal */
	project = require('./config'),
	initProjectData = require('../populateData'),
	e2eConf = require('../project.json');

var protractorConfig = project.protractor;
protractorConfig.baseUrl = protractorConfig.baseUrl || project.client.url;
protractorConfig.jasmineNodeOpts = {
	print: function() {}
};
protractorConfig.onPrepare = function() {
	if (e2eConf.externalData.import) {
		initProjectData.sendData();
	}
	return browser.getProcessedConfig().then(function(config) {
		jasmine.getEnv().addReporter(
			new Jasmine2HtmlReporter({
				savePath: project.destinations.e2e.report.summary.html + config.capabilities.browserName+'/',
				filePrefix: 'index',
				screenshotsFolder: 'images'
			})
		);
		jasmine.getEnv().addReporter(new SpecReporter({
			displayStacktrace: true
		}));
		jasmine.getEnv().addReporter(
			new jasmineReporters.JUnitXmlReporter({
				consolidateAll: true,
				savePath: project.destinations.e2e.report.summary.xml,
				filePrefix: config.capabilities.browserName+'_xmlreport',
				modifySuiteName: function(generatedSuiteName, suite) {
					return '[' + config.capabilities.browserName + '] ' + generatedSuiteName;
				}
			})
		);
	});
}
exports.config = protractorConfig;
