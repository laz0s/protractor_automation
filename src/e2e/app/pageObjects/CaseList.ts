import Promise = webdriver.promise.Promise;

class CaseList {
    // Buttons
    private newCaseButton: protractor.ElementFinder;

    constructor() {
        // Button Locators
        this.newCaseButton = element(by.css('[title="Add a new Procedure Case"]'));
    }

    // Button Methods
    public clickNewCaseButton(): void {
        this.newCaseButton.click();
    }

    // Find in Case List Array the Row with provided Application Reference number
    // Application Reference Number is unique for each Dossier Entry
    private findElementWithARN(arn: string): protractor.ElementFinder {
        return element(by.xpath('//table/tbody/tr/td/a[text()="' + arn + '"]'));
    }

    // Link methods
    public openCaseDetails(arn: string): void {
        this.findElementWithARN(arn).click();

    }
    public openActiveTask(arn: string): void {
        this.findElementWithARN(arn).element(by.xpath('../../td[17]/a')).click();
        browser.sleep(1000);
    }
    public expandActionButton(arn: string): void {
        this.findElementWithARN(arn).element(by.xpath('../../td[18]/div/button')).click();
    }
    public reassignProcedure(id: string): void {
        element(by.id('assign-' + id)).click();
    }

    // Validation Methods
    public noResults(): Promise<boolean> {
        return element(by.cssContainingText('p', 'No results found that match your search criteria!')).isPresent();
    }
    public isActiveTaskClickable(arn: string): Promise<boolean> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[17]/a')).isPresent().then((state: boolean) => {
            return state;
        });
    }

    // Get Methods
    // User provide Application Reference Number and Method return specific column
    // value of the row with the provided Application Reference Number
    public getCaseIndicator(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[1]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getProcedureType(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[4]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getProductName(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[5]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getCompanyName(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[6]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getSME(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[7]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getOGB(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[8]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getActiveSubstanceName(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[9]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getCHMPDate(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[10]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getECDate(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[11]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getEPARPublish(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[12]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getRPSubmissionDate(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[13]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getFinalSubmissionDate(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[14]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getProductStatus(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[15]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getProcedureStatus(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[16]')).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getActiveTask(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[17]/a')).getText().then((value: string) => {
            return value.trim();
        });
    }

    // Count how many rows are displayed in Task List
    public countResults(): Promise<number> {
        return element.all(by.repeater('item in ctrl.entries')).count();
    }
}

export = CaseList;
