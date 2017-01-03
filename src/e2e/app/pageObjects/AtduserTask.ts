import Promise = webdriver.promise.Promise;
import DropDownMenu = require('../objectMethods/DropdownMenu');

class AtdUserTask {
    // Text Boxes
    private notes: protractor.ElementFinder;
    private redactionProposalNote: protractor.ElementFinder;
    // Buttons
    private completeTaskButton: protractor.ElementFinder;
    private cancelButton: protractor.ElementFinder;
    private acceptButton: protractor.ElementFinder;
    private assignButton: protractor.ElementFinder;
    // Drop Down Menus
    private coordinator: protractor.ElementFinder;
    private documentManager: protractor.ElementFinder;
    // Information Elements
    private dateMessage: protractor.ElementFinder;
    private dossierLink: protractor.ElementFinder;
    private dreamLink: protractor.ElementFinder;
    private infoMessage: protractor.ElementFinder;
    private warningMessage: protractor.ElementFinder;

    constructor() {
        // Text Box Locators
        this.notes = element(by.id('notes'));
        this.redactionProposalNote = element(by.id('redactionProposalNotes'));
        // Buttons Locators
        this.completeTaskButton = element(by.buttonText('Complete Task'));
        this.cancelButton = element(by.buttonText('Cancel'));
        this.acceptButton = element(by.buttonText('Accept'));
        this.assignButton = element(by.buttonText('Assign'));
        // Drop Down Menu Locators
        this.coordinator = element(by.id('coordinator'));
        this.documentManager = element(by.id('documentManager'));
        // Information Elements Locators
        this.dateMessage = element(by.id('redactionProposalDate'));
        this.dossierLink = element(by.id('redactionProposalDossierLink'));
        this.dreamLink = element(by.id('redactionProposalJustificationLink'));
        this.infoMessage = element(by.id('numDocumentsMessage'));
        this.warningMessage = element(by.id('resultMessage'));

    }

    // Set Methods
    public setNote(text: string): void {
        this.notes.sendKeys(text);
    }
    public setCaseCoordinator(text: string): void {
        DropDownMenu.selectOptionByValue(this.coordinator, text);
    }
    public setDocumentManager(text: string): void {
        DropDownMenu.selectOptionByValue(this.documentManager, text);
    }

    // Button Methods
    public completeTask(): void {
        this.completeTaskButton.click();
    }
    public accept(): void {
        this.acceptButton.click();
    }
    public cancel(): void {
        this.cancelButton.click();
    }
    public assign(): void {
        this.assignButton.click();
    }

    // Get Methods
    public getDateInfo(): Promise<string> {
        return this.dateMessage.getText().then((value: string) => {
            return value.trim();
        });
    }
    public getDossierLink(): Promise<string> {
        return this.dossierLink.getText().then((value: string) => {
            return value.trim();
        });
    }
    public getDreamLink(): Promise<string> {
        return this.dreamLink.getText().then((value: string) => {
            return value.trim();
        });
    }
    public getRedactionProposalNote(): Promise<string> {
        return this.notes.getText().then((value: string) => {
            return value.trim();
        });
    }
    public getInfoMessage(): Promise<string> {
        return this.infoMessage.getText().then((value: string) => {
            return value.trim();
        });
    }
    public getWarningMessage(): Promise<string> {
        return this.warningMessage.getText().then((value: string) => {
            return value.trim();
        });
    }

    public getCaseCoordinator(optionValue: string): Promise<string> {
        return this.coordinator.$('[value="' + optionValue + '"]').getText();
    }

    // Validation Methods
    public isAssignButtonEnabled(): Promise<boolean> {
        return this.assignButton.isEnabled();
    }
    public isCompleteTaskButtonEnabled(): Promise<boolean> {
        return this.completeTaskButton.isEnabled();
    }
}

export = AtdUserTask;
