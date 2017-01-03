module app.home {
    'use strict';

    angular.module('app.home', ['ui.router', 'app.templates' , 'app.common'])
        .controller('HomeCtrl', HomeCtrl)
        .config(['$stateProvider', routes])
        ;

    function routes($stateProvider: ng.ui.IStateProvider) {

        $stateProvider.state('home', {
            url: '/',
            controller: HomeCtrl,
            controllerAs: 'home',
            templateUrl: 'home/home.tpl.html'
        });
    }

}
