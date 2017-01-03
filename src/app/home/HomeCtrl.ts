module app.home {

    'use strict';

    export class HomeCtrl {

        greeting :string;
        greeted :string;
        greetings :string[];
        thingsCount: number = 1;

        constructor() {
            this.greeting = 'Hello';
            this.greeted = 'World';
            this.greetings = [
                'Hello',
                'Welcome',
                'Hi'
            ];
        }

        addGreeting(text:string) {
            this.greetings.push(text);
        }

        removeGreeting(text: string) {
            var index = this.greetings.indexOf(text);
            if (index > -1) {
                this.greetings.splice(index, 1);
            }
        }

    }
}
