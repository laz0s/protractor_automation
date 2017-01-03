import Promise = webdriver.promise.Promise;
import DropdownMenu = require('../objectMethods/DropdownMenu');

class DocumentsTab {
    // Links
    private dossierLink: protractor.ElementFinder;
    private dreamLink: protractor.ElementFinder;
    // Buttons
    private saveButton: protractor.ElementFinder;
    private cancelButton: protractor.ElementFinder;

    constructor() {
        // Link Locators
        this.dossierLink = element(by.id('dossier-document-list-link-proposal'));
        this.dreamLink = element(by.id('dossier-document-list-link-justification'));
        // Button Locators
        this.cancelButton = element(by.css('span[class="glyphicon glyphicon-remove"]'));
        this.saveButton = element(by.css('span[class="glyphicon glyphicon-ok"]'));
    }

    // Get Methods
    public getDossierLink(): Promise<string> {
        return this.dossierLink.getText().then((message: string) => {
            return message.trim();
        });
    }
    public getDreamLink(): Promise<string> {
        return this.dreamLink.getText().then((message: string) => {
            return message.trim();
        });
    }

    // User provide the number of the row in Document List that Document is displayed
    public getDocumentTitle(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('td-title-' + arrayNum)).getText();
    }
    public getJustificationTableLink(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('td-justificationTable-' + arrayNum)).getText();
    }
    public getAssignee(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('td-assignee-' + arrayNum)).getText();
    }
    public getCCIStatus(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('td-cciStatus-' + arrayNum)).getText();
    }
    public getPPDStatus(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('td-ppdStatus-' + arrayNum)).getText();
    }
    public getDocumentTask(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('td-doc-doc-tasks-' + arrayNum)).getText();
    }
    public getDocumentStatus(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('td-doc-tasks-' + arrayNum)).getText();
    }

    // Validation Methods
    // User provide the number of the row in Document List that Document is displayed
    public isDocumentListEmpty(): Promise<boolean> {
        return element(by.id('no-res-found')).isPresent();
    }
    public isDocumentSelectionEnabled(num: number): Promise<boolean> {
        let arrayNum: number = num - 1;
        return element(by.id('td-selected-' + arrayNum)).element(by.css('input[type="checkbox"]')).isEnabled();
    }

    // Select Documents Methods
    // User provide the number of the row in Document List that Document is displayed
    public selectDocument(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('td-selected-' + arrayNum)).element(by.css('input[type="checkbox"]')).click();
    }

    // Set Methods
    // User provide the number of the row in Document List that Document is displayed
    // and the value the user want to set
    public setJustificationTableLink(num: number, text: string): void {
        let arrayNum: number = num - 1;
        element(by.id('td-justificationTable-' + arrayNum)).element(by.xpath('./a')).click().then();
        element(by.id('td-justificationTable-' + arrayNum)).element(by.xpath('./form/div/input')).sendKeys(text);
        this.saveButton.click();
    }
    public setAssignee(num: number, text: string): void {
        let arrayNum: number = num - 1;
        element(by.id('td-assignee-' + arrayNum)).element(by.xpath('./a')).click();
        DropdownMenu.selectOptionByValue(element(by.id('td-assignee-' + arrayNum)).element(by.xpath('./form/div/select')), text);
        this.saveButton.click();
    }

    // Action Button Methods
    public expandActionButton(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('simple-btn-keyboard-nav-' + arrayNum)).click();
    }
    public clickAddNoteButton(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('add-note-' + arrayNum)).click();
    }
    public clickViewNotesButton(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('view-notes-' + arrayNum)).click();
    }
    public clickDocumentTask(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('td-doc-doc-tasks-' + arrayNum)).element(by.xpath('./a')).click();
    }
}

export = DocumentsTab;
