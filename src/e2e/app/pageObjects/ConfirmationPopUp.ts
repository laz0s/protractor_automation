class ConfirmationPopUp {
    // Button Methods
    public confirm(): void {
        element(by.css('[ng-click="ctrl.yes()"]')).click();
        browser.sleep(1500);
    }
    public dontCorfirm(): void {
        element(by.css('[ng-click="ctrl.no()"]')).click();
        browser.sleep(1000);
    }
}

export = ConfirmationPopUp;
