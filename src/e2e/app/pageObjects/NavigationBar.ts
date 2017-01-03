import Promise = webdriver.promise.Promise;
class NavigationBar {
    // Links
    private procedureLink: protractor.ElementFinder;
    private taskLink: protractor.ElementFinder;
    // Text Info
    private userName: protractor.ElementFinder;
    // Buttons
    private logoutButton: protractor.ElementFinder;

    constructor() {
        // Links Locators
        this.procedureLink = element(by.id('nav-publications'));
        this.taskLink = element(by.id('nav-tasks'));
        // Text info locator
        this.userName = element(by.id('user-name'));
        // Button Locators
        this.logoutButton = element(by.id('logout'));
    }

    // get methods
    public getUsername(): Promise<string> {
        return this.userName.getText().then((username: string) => {
            return username.trim();
        });
    }

    // Link Methods
    public gotoProcedureCases(): void {
        this.procedureLink.click();
    }
    public gotoTaskList(): void {
        this.taskLink.click();
    }

    // Button methods
    public logout(): void {
        this.logoutButton.click();
    }

}

export = NavigationBar;
