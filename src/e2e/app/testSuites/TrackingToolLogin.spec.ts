import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import Credentials = require('../resources/Credentials');

describe('Tracking Tool LogIn', function() {

    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var loginPageMessage: string = 'EMA Tracking Tool';
    browser.driver.manage().window().maximize();

    it('should LogIn as bd-bus User', function() {
        loginPage.login('bdbus');
        expect(navigationBar.getUsername()).toBe(Credentials.bdbus[0]);
        navigationBar.logout();
        confirmationPopUp.confirm();
        expect(loginPage.getSignInText()).toBe(loginPageMessage);
    });

    it('should LogIn as atd User', function() {
        loginPage.login('atd');
        expect(navigationBar.getUsername()).toBe(Credentials.atd[0]);
        navigationBar.logout();
        confirmationPopUp.confirm();
        expect(loginPage.getSignInText()).toBe(loginPageMessage);
    });

    it('should LogIn as atd manager User', function() {
        loginPage.login('atdadmin');
        expect(navigationBar.getUsername()).toBe(Credentials.atdadmin[0]);
        navigationBar.logout();
        confirmationPopUp.confirm();
        expect(loginPage.getSignInText()).toBe(loginPageMessage);
    });

    it('should LogIn as superuser User', function() {
        loginPage.login('superuser');
        expect(navigationBar.getUsername()).toBe(Credentials.superuser[0]);
        navigationBar.logout();
        confirmationPopUp.confirm();
        expect(loginPage.getSignInText()).toBe(loginPageMessage);
    });

    it('should LogIn with case Insensitive credentials but display uid from ldap', function() {
        loginPage.login('BDBUS');
        expect(navigationBar.getUsername()).toBe(Credentials.bdbus[0]);
        navigationBar.logout();
        confirmationPopUp.confirm();
        expect(loginPage.getSignInText()).toBe(loginPageMessage);
    });

    it('should not LogOut if user do not confirm', function() {
        loginPage.login('superuser');
        expect(navigationBar.getUsername()).toBe(Credentials.superuser[0]);
        navigationBar.logout();
        confirmationPopUp.dontCorfirm();
        expect(navigationBar.getUsername()).toBe(Credentials.superuser[0]);
        navigationBar.logout();
        confirmationPopUp.confirm();
        expect(loginPage.getSignInText()).toBe(loginPageMessage);
    });

    it('should not LogIn with invalid credentials', function() {
        loginPage.login('invalid');
        expect(loginPage.getLoginErrorMessage()).toBe('Username or password invalid');
        expect(loginPage.getSignInText()).toBe(loginPageMessage);
    });
});
