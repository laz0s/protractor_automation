import Promise = webdriver.promise.Promise;

class TaskList {
    // Find in Task List Array the Row with provided Application Reference number
    // Application Reference Number is unique for each Dossier Entry
    private findElementWithARN(arn: string): protractor.ElementFinder {
        return element(by.xpath('//table/tbody/tr/td/a[text()="' + arn + '"]'));
    }

    // Link methods
    public openCaseDetails(arn: string): void {
        this.findElementWithARN(arn).click();
    }
    public openActiveTask(arn: string): void {
        this.findElementWithARN(arn).element(by.xpath('../../td[1]/a')).click();
    }

    // Validation Methods
    public noResults(): Promise<boolean> {
        return element(by.cssContainingText('p', 'No results found that match your search criteria!')).isPresent();
    }

    // Get Methods
    public getTaskName(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[1]')).getText();
    }
    public getDocumentName(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[2]')).getText();
    }
    public getInitiationDate(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[3]')).getText();
    }
    public getDueDate(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[4]')).getText();
    }
    public getTaskStatus(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[6]')).getText();
    }
    public getOwner(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[7]')).getText();
    }
    public getProductName(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[8]')).getText();
    }
    public getCompanyName(arn: string): Promise<string> {
        return this.findElementWithARN(arn).element(by.xpath('../../td[9]')).getText();
    }

    // Count how many rows are displayed in Task List
    public countResults(): Promise<number> {
        return element.all(by.repeater('item in ctrl.tasks')).count();
    }
}
export = TaskList;
