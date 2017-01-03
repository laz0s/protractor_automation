import Promise = webdriver.promise.Promise;
import DropdownMenu = require('../objectMethods/DropdownMenu');

class BdbusUserTask {

    /** radio buttons */
    private submissionAccepted: protractor.ElementFinder;
    private submissionRejected: protractor.ElementFinder;
    private complete: protractor.ElementFinder;
    private partial: protractor.ElementFinder;

    /** text boxes */
    private dossierLink: protractor.ElementFinder;
    private dreamLink: protractor.ElementFinder;
    private notes: protractor.ElementFinder;
    private otherRejectionReason: protractor.ElementFinder;
    private calendarButton: protractor.ElementFinder;
    private todayButton: protractor.ElementFinder;

    /** buttons */
    private notifyCDPButton: protractor.ElementFinder;
    private notifyApplicantButton: protractor.ElementFinder;
    private cancelButton: protractor.ElementFinder;
    private updateStatusButton: protractor.ElementFinder;
    private okButton: protractor.ElementFinder;

    /** drop down menu */
    private rejectionDropdownMenu: protractor.ElementFinder;
    private rejectionReasons: protractor.ElementArrayFinder;

    /** windows */
    private alertWindow: protractor.ElementFinder;

    constructor() {
        /** radio button locators */
        this.submissionAccepted = element(by.id('complete'));
        this.submissionRejected = element(by.id('partial'));
        this.complete = element(by.id('complete'));
        this.partial = element(by.id('partial'));

        /** text box locators */
        this.dossierLink = element(by.id('dossierLink'));
        this.dreamLink = element(by.id('dreamLink'));
        this.notes = element(by.id('notes'));
        this.otherRejectionReason = element(by.id('otherRejectionReason'));

        /** Buttons Locators */
        this.notifyCDPButton = element(by.buttonText('Notify CDP ReviewGroup'));
        this.notifyApplicantButton = element(by.buttonText('Notify Applicant'));
        this.cancelButton = element(by.buttonText('Cancel'));
        this.calendarButton = element(by.id('submissionDate-popupButton'));
        this.todayButton = element(by.buttonText('Today'));
        this.updateStatusButton = element(by.buttonText('Update Status'));
        this.okButton = element(by.buttonText('Ok'));

        /** Drop down menu Locators */
        this.rejectionDropdownMenu = element(by.id('rejectionReason'));
        this.rejectionReasons = element.all(by.repeater('reason in $select.items'));

        /** Window Locators */
        this.alertWindow = element(by.id('windowAlert'));
    }

    // Button Methods
    public acceptSubmission(): void {
        this.submissionAccepted.click();
    }
    public rejectSubmission(): void {
        this.submissionRejected.click();
        browser.sleep(1000);
    }
    public notifyCDPReviewGroup(): void {
        this.notifyCDPButton.click();
    }
    public notifyApplicant(): void {
        this.notifyApplicantButton.click();
    }
    public updateStatus(): void {
        this.updateStatusButton.click();
    }
    public cancel(): void {
        this.cancelButton.click();
    }
    public setComplete(): void {
        this.complete.click();
    }
    public closeAlertMessage(): void {
        this.okButton.click();
    }

    // Set Methods
    public setDossierLink(text: string): void {
        this.dossierLink.sendKeys(text);
    }
    public setDreamLink(text: string): void {
        this.dreamLink.sendKeys(text);
    }
    public setNotes(text: string): void {
        this.notes.sendKeys(text);
    }
    public setOtherRejectionReason(text: string): void {
        this.otherRejectionReason.sendKeys(text);
    }
    public setSubmissionDate(): void {
        this.calendarButton.click();
        this.todayButton.click();
    }
    public expandMultipleSelection(): void {
        this.rejectionDropdownMenu.click();
    }
    public setRejectionReason(num: number): void {
        var choice: number = num - 1;
        DropdownMenu.selectArrayElementByNum(this.rejectionReasons, choice);
    }
    public collapseMultipleSelection(): void {
        // Click text box in order to close dropdown menu
        this.notes.click();
    }
    public setPartial(): void {
        this.partial.click();
    }

    // Validation Methods
    public isNotifyCDPEnabled(): Promise<boolean> {
        return this.notifyCDPButton.isEnabled();
    }
    public isNotifyAppEnabled(): Promise<boolean> {
        return this.notifyApplicantButton.isEnabled();
    }
    public isUpdateStatusEnabled(): Promise<boolean> {
        return this.updateStatusButton.isEnabled();
    }
    public isAlertPresent(): Promise<boolean> {
        return this.alertWindow.isPresent();
    }
}

export = BdbusUserTask;
