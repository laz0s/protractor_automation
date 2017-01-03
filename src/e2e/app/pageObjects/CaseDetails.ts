import Promise = webdriver.promise.Promise;
import DropdownMenu = require('../objectMethods/DropdownMenu');

class CaseDetails {

    /** text boxes */
    private applicationReferenceNumber: protractor.ElementFinder;
    private productName: protractor.ElementFinder;
    private companyName: protractor.ElementFinder;
    private productNumber: protractor.ElementFinder;
    private activeSubstanceName: protractor.ElementFinder;
    private atc: protractor.ElementFinder;
    private setChmpActualDate: protractor.ElementFinder;
    private getChmpActualDate: protractor.ElementFinder;

    /** drop down menu */
    private procedureType: protractor.ElementFinder;
    private productStatus: protractor.ElementFinder;

    /** radio buttons */
    private paediatric: protractor.ElementFinder;
    private orphan: protractor.ElementFinder;
    private additionalMonitoring: protractor.ElementFinder;
    private conditionalApproval: protractor.ElementFinder;
    private article58: protractor.ElementFinder;
    private biosimilar: protractor.ElementFinder;
    private exceptionalCircumstances: protractor.ElementFinder;
    private generic: protractor.ElementFinder;
    private legalAction: protractor.ElementFinder;
    private sme: protractor.ElementFinder;

    /** buttons */
    private applyChangesButton: protractor.ElementFinder;
    private editButton: protractor.ElementFinder;
    private saveButton: protractor.ElementFinder;
    private cancelButton: protractor.ElementFinder;

    /** Tabs */
    private summaryTab: protractor.ElementFinder;
    private historyTab: protractor.ElementFinder;
    private dossiersTab: protractor.ElementFinder;
    private documentsTab: protractor.ElementFinder;
    private notesTab: protractor.ElementFinder;
    private decisionTab: protractor.ElementFinder;
    private administrationTab: protractor.ElementFinder;
    private publishHistoryTab: protractor.ElementFinder;

    // Dates
    private startDate: protractor.ElementFinder;
    private chmpOpinionDate: protractor.ElementFinder;
    private todayButton: protractor.ElementFinder;
    private ecDecisionAD: protractor.ElementFinder;
    private eparPublishmentAD: protractor.ElementFinder;

    constructor() {
        /** radio button locators */
        this.paediatric = element(by.id('paediatric'));
        this.orphan = element(by.id('orphan'));
        this.additionalMonitoring = element(by.id('additionalMonitoring'));
        this.conditionalApproval = element(by.id('conditionalApproval'));
        this.article58 = element(by.id('article58'));
        this.biosimilar = element(by.id('biosimilar'));
        this.exceptionalCircumstances = element(by.id('exceptionalCircumstances'));
        this.generic = element(by.id('generic'));
        this.legalAction = element(by.id('legalAction'));
        this.sme = element(by.id('smallMediumEnterprise'));

        /** text box locators */
        this.applicationReferenceNumber = element(by.id('procedureNumber'));
        this.productName = element(by.id('productName'));
        this.companyName = element(by.id('applicantMAHName'));
        this.productNumber = element(by.id('productNumber'));
        this.activeSubstanceName = element(by.id('activeSubstance'));
        this.atc = element(by.id('ATC'));
        this.getChmpActualDate = element(by.id('actualChmpOpinionDate'));

        /** Drop down menu Locators */
        this.procedureType = element(by.id('procedureType'));
        this.productStatus = element(by.id('productStatus'));

        /** Buttons Locators */
        this.applyChangesButton = element(by.buttonText('Apply Changes'));
        this.editButton = element(by.buttonText('Edit'));
        this.saveButton = element(by.buttonText('Save'));
        this.cancelButton = element(by.buttonText('Cancel'));

        /** Tabs' Locators */
        this.summaryTab = element(by.id('summary-tab'));
        this.historyTab = element(by.id('history-tab'));
        this.dossiersTab = element(by.id('dossiers-tab'));
        this.documentsTab = element(by.id('documents-tab'));
        this.notesTab = element(by.id('notes-tab'));
        this.decisionTab = element(by.id('milestones-tab'));
        this.administrationTab = element(by.id('admin-tab'));
        this.publishHistoryTab = element(by.id('publishHistory-tab'));


        // Date Locators
        this.startDate = element(by.id('procedureStartDate-popupButton'));
        this.chmpOpinionDate = element(by.id('plannedChmpOpinionDate-popupButton'));
        this.setChmpActualDate = element(by.id('actualChmpOpinionDateInput'));
        this.ecDecisionAD = element(by.id('actualComissionDecisionDate-popupButton'));
        this.eparPublishmentAD = element(by.id('actualEparPublicationDate-popupButton'));
        this.todayButton = element(by.buttonText('Today'));
    }

    /** Button Methods */
    public clickPaediatric(): void {
        this.paediatric.click();
    }
    public clickOrphan(): void {
        this.orphan.click();
    }
    public clickAdditionalMonitoring(): void {
        this.additionalMonitoring.click();
    }
    public clickConditionalApproval(): void {
        this.conditionalApproval.click();
    }
    public clickArticle58(): void {
        this.article58.click();
    }
    public clickBiosimilar(): void {
        this.biosimilar.click();
    }
    public clickExceptionalCircumstances(): void {
        this.exceptionalCircumstances.click();
    }
    public clickGeneric(): void {
        this.generic.click();
    }
    public clickLegalAction(): void {
        this.legalAction.click();
    }
    public clickSME(): void {
        this.sme.click();
    }
    public applyChanges(): void {
        this.applyChangesButton.click();
    }
    public edit(): void {
        this.editButton.click();
        browser.sleep(1000);
    }
    public save(): void {
        this.saveButton.click();
        browser.sleep(1000);
    }
    public cancel(): void {
        this.cancelButton.click();
        browser.sleep(1000);
    }
    public closeAlertWindow(): void {
        element(by.buttonText('Ok')).click();
    }
    /** Get Methods */
    public isPaediatricSelected(): Promise<boolean> {
        return this.paediatric.isSelected();
    }
    public isOrphanSelected(): Promise<boolean> {
        return this.orphan.isSelected();
    }
    public isConditionalApprovalSelected(): Promise<boolean> {
        return this.conditionalApproval.isSelected();
    }
    public isArticle58Selected(): Promise<boolean> {
        return this.article58.isSelected();
    }
    public isBiosimilarSelected(): Promise<boolean> {
        return this.biosimilar.isSelected();
    }
    public isExceptionalCircumstancesSelected(): Promise<boolean> {
        return this.exceptionalCircumstances.isSelected();
    }
    public isGenericSelected(): Promise<boolean> {
        return this.generic.isSelected();
    }
    public isLegalActionSelected(): Promise<boolean> {
        return this.legalAction.isSelected();
    }
    public isSMESelected(): Promise<boolean> {
        return this.sme.isSelected();
    }
    public getApplicationReferenceNumber(): Promise<string> {
        return element(by.id('summary_procedureNumber')).getText();
    }
    public getProductName(): Promise<string> {
        return element(by.id('summary_productName')).getText();
    }
    public getCompanyName(): Promise<string> {
        return element(by.id('summary_mah')).getText();
    }
    public getProductNumber(): Promise<string> {
        return element(by.id('summary_productNumber')).getText();
    }
    public getActiveSubstanceName(): Promise<string> {
        return element(by.id('summary_activeSubstance')).getText();
    }
    public getATC(): Promise<string> {
        return element(by.id('summary_atc')).getText();
    }
    public getProcedureType(): Promise<string> {
        return element(by.id('summary_procedureType')).getText();
    }
    public getProductStatus(): Promise<string> {
        return element(by.id('summary_productStatus')).getText();
    }
    public getCHMPDate(): Promise<string> {
        return element(by.id('summary_chmpDate')).getText();
    }
    public getECDecision(): Promise<string> {
        return element(by.id('summary_ecDate')).getText();
    }
    public getEPARPublication(): Promise<string> {
        return element(by.id('summary_eparDate')).getText();
    }
    public getPlannedReductionProposalReceipt(): Promise<string> {
        return element(by.id('milestone-row-0')).element(by.className('plannedDate')).getText();
    }
    public getPlannedAssignment(): Promise<string> {
        return element(by.id('milestone-row-1')).element(by.className('plannedDate')).getText();
    }
    public getPlannedValidation(): Promise<string> {
        return element(by.id('milestone-row-2')).element(by.className('plannedDate')).getText();
    }
    public getPlannedAssessment(): Promise<string> {
        return element(by.id('milestone-row-3')).element(by.className('plannedDate')).getText();
    }
    public getPlannedReductionConclusion(): Promise<string> {
        return element(by.id('milestone-row-4')).element(by.className('plannedDate')).getText();
    }
    public getPlannedFinalRedactedDocumentPackage(): Promise<string> {
        return element(by.id('milestone-row-5')).element(by.className('plannedDate')).getText();
    }
    public getPlannedPublish(): Promise<string> {
        return element(by.id('milestone-row-6')).element(by.className('plannedDate')).getText();
    }
    public getCurrentCoordinator(): Promise<string> {
        return element(by.id('coordinator')).getText();
    }
    public getCurrentDocumentManager(): Promise<string> {
        return element(by.id('documentManager')).getText();
    }

    /** Set Methods */
    public setApplicationReferenceNumber(text: string): void {
        this.applicationReferenceNumber.clear();
        this.applicationReferenceNumber.sendKeys(text);
    }
    public setProductName(text: string): void {
        this.productName.clear();
        this.productName.sendKeys(text);
    }
    public setCompanyName(text: string): void {
        this.companyName.clear();
        this.companyName.sendKeys(text);
    }
    public setProductNumber(text: string): void {
        this.productNumber.clear();
        this.productNumber.sendKeys(text);
    }
    public setActiveSubstanceName(text: string): void {
        this.activeSubstanceName.clear();
        this.activeSubstanceName.sendKeys(text);
    }
    public setATC(text: string): void {
        this.atc.clear();
        this.atc.sendKeys(text);
    }
    public setProcedureType(choice: string): void {
        DropdownMenu.selectOptionByStringValue(this.procedureType, choice);
    }
    public setProductStatus(choice: string): void {
        DropdownMenu.selectOptionByStringValue(this.productStatus, choice);
    }
    public setStartDate(): void {
        this.startDate.click();
        this.todayButton.click();
    }
    public setCHMPDate(): void {
        this.chmpOpinionDate.click();
        this.todayButton.click();
    }
    public setCHMPActualDate(date: string): void {
        this.setChmpActualDate.sendKeys(date);
    }
    public setECActualDate(date: string): void {
        element(by.id('actualComissionDecisionDateInput')).sendKeys(date);
    }
    public setECDecisionAD(): void {
        this.ecDecisionAD.click();
        this.todayButton.click();
    }
    public setEPARpublishmentAD(): void {
        this.eparPublishmentAD.click();
        this.todayButton.click();
    }

    /** Validation Methods*/
    public isApplyButtonEnabled(): Promise<boolean> {
        return this.applyChangesButton.isEnabled();
    }
    public isARNDupicateAlertDisplayed(): Promise<boolean> {
        return element(by.id('arnAlert')).isPresent();
    }
    public isEditButtonEnabled(): Promise<boolean> {
        return this.editButton.isEnabled();
    }

    /** Tabs's Actions */
    public showSummary(): void {
        this.summaryTab.click();
        browser.sleep(1000);
    }
    public showHistory(): void {
        this.historyTab.click();
        browser.sleep(1000);
    }
    public showDossiers(): void {
        this.dossiersTab.click();
        browser.sleep(1000);
    }
    public showNotes(): void {
        this.notesTab.click();
        browser.sleep(1000);
    }
    public showDocuments(): void {
        this.documentsTab.click();
        browser.sleep(1000);
    }
    public showDecisions(): void {
        this.decisionTab.click();
        browser.sleep(1000);
    }
    public showAdministration(): void {
        this.administrationTab.click();
        browser.sleep(1000);
    }
    public showPublishHistory(): void {
        this.publishHistoryTab.click();
        browser.sleep(1000);
    }
}

export = CaseDetails;
