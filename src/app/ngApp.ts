module app {
	'use strict';

	angular.module('app', [
			'ui.router',
			'app.templates',
			'app.common',
			'app.home'
		])
		// Uncomment the following block in case you want to start with a default language other than 'en'
		/* .run((gettextCatalog: angular.gettext.gettextCatalog) => {
			gettextCatalog.setCurrentLanguage('el');
			gettextCatalog.loadRemote("translations/el.json");
		}) */
		.config(['$provide', function($provide: ng.auto.IProvideService) {
			$provide.decorator('$exceptionHandler', ['$delegate', exceptionHandler]);
		}])
		.config(['$urlRouterProvider', routes])
	;

	function exceptionHandler($delegate: ng.IExceptionHandlerService) {

		return (exception: Error, cause?: string) => {
			$delegate(exception, cause);
			throw exception;
		};

	}

	function routes($urlRouterProvider: ng.ui.IUrlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
}
