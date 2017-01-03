module app.common {
	'use strict';

	export class LanguageSwitcher {
		languages: string[] = [ 'en' , 'el' ];

		static $inject = [
			'gettextCatalog'
		];

		constructor(private gettextCatalog: angular.gettext.gettextCatalog) {

		}

		public get language(): string {
			return this.gettextCatalog.getCurrentLanguage();
		}

		public set language(language: string) {
			this.gettextCatalog.setCurrentLanguage(language);
			this.gettextCatalog.loadRemote('translations/' + language + '.json').error(() => {
				this.gettextCatalog.setCurrentLanguage('en');
			});
		}

		static directive() {
			return {
				restrict: 'E',
				templateUrl: 'common/LanguageSwitcher.tpl.html',
				controller: LanguageSwitcher,
				controllerAs: 'component',
				bindToController: true,
				scope: {}
			};
		}
	}
}
