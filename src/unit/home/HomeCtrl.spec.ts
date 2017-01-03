module app.home {
    'use strict';

    describe('The application controller', () => {

        var createController:() => HomeCtrl;

        beforeEach(module('app.home', 'app.templates'));

        beforeEach(inject(function ($controller:ng.IControllerService) {
            createController = () => {

                var ctrl:HomeCtrl = $controller('HomeCtrl');
                return ctrl;
            };
        }));

        it('should have three greetings', () => {
            var ctrl:HomeCtrl = createController();
            expect(ctrl.greetings.length).toBe(3);
        });

        it('should add a new greeting', () => {
            var ctrl:HomeCtrl = createController();
            ctrl.addGreeting('hello from test');
            expect(ctrl.greetings.length).toBe(4);
        });

        it('should remove an existing greeting', () => {
            var ctrl:HomeCtrl = createController();
            ctrl.removeGreeting('hello from test');
            expect(ctrl.greetings.length).toBe(3);
        });

        it('should not break when removing non existing greeting', () => {
            var ctrl:HomeCtrl = createController();
            ctrl.removeGreeting('hello from test 3');
            expect(ctrl.greetings.length).toBe(3);
        });

    });

}
