import Credentials = require('../resources/Credentials');

class LoginPage {

    private credentials;
    // Text boxes
    private usernameObj: protractor.ElementFinder;
    private passwordObj: protractor.ElementFinder;
    // Buttons
    private loginButton: protractor.ElementFinder;
    // Error message
    private singinHeadingText: protractor.ElementFinder;

    constructor() {
        // Test Box locators
        this.usernameObj = element(by.name('j_username'));
        this.passwordObj = element(by.name('j_password'));
        // Button locators
        this.loginButton = element(by.id('LogInButton'));
        // Dummy credentials constructor
        this.credentials = Credentials;
        // Error message locator
        this.singinHeadingText = element(by.css('h3[class="form-signin-heading text-center"]'));
    }

    // User provide a string to identify the credentials to login
    // The credentials are stored in an object in file with directory ../resources/Credetials.ts
    public login(group: string): void {
        browser.ignoreSynchronization = true;
        browser.get('login.html');
        expect(browser.getTitle()).toEqual('Tracking tool');

        this.usernameObj.sendKeys(this.credentials[group][0]);
        this.passwordObj.sendKeys(this.credentials[group][1]);
        this.loginButton.click();

        browser.ignoreSynchronization = false;
    }

    public getLoginErrorMessage() {
        browser.ignoreSynchronization = true;
        return element(by.css('h4[class="text-center"]')).getText().then((errorMesssage: string) => {
            browser.ignoreSynchronization = false;
            return errorMesssage;
        });
    }

    public getSignInText() {
        browser.ignoreSynchronization = true;
        return this.singinHeadingText.getText().then((signinMesssage: string) => {
            browser.ignoreSynchronization = false;
            return signinMesssage;
        });
    }
}

export = LoginPage;
