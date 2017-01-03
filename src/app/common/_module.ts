module app.common {
	'use strict';

	angular
		.module('app.common', [ 'gettext'] )
		.directive('langSwitcher', LanguageSwitcher.directive)
	;
}
