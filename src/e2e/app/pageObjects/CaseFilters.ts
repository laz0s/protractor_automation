import DropdownMenu = require('../objectMethods/DropdownMenu');

class CaseFilters {
    /** buttons */
    private clearFilterButton: protractor.ElementFinder;
    private filterCasesButton: protractor.ElementFinder;
    private expandButton: protractor.ElementFinder;

    /** text box filters */
    private applicationReferenceNumber: protractor.ElementFinder;
    private companyName: protractor.ElementFinder;
    private productName: protractor.ElementFinder;
    private activeSubstanceName: protractor.ElementFinder;

    /** drop down menu filters */
    private procedureType: protractor.ElementFinder;
    private productStatus: protractor.ElementFinder;
    private procedureStatus: protractor.ElementArrayFinder;
    private SME: protractor.ElementFinder;
    private artice58: protractor.ElementFinder;
    private generics: protractor.ElementFinder;
    private biosimilar: protractor.ElementFinder;
    private orphan: protractor.ElementFinder;
    private caseType: protractor.ElementFinder;

    constructor() {
        /** button's locators */
        this.clearFilterButton = element(by.id('clear-cases'));
        this.filterCasesButton = element(by.id('filter-cases'));
        this.expandButton = element(by.css('a[data-toggle="collapse"]'));
        /** text box locators */
        this.applicationReferenceNumber = element(by.id('procedureNumber'));
        this.companyName = element(by.id('mah'));
        this.productName = element(by.id('productName'));
        this.activeSubstanceName = element(by.id('activeSubstance'));
        /** Drop down menu Locators */
        this.procedureType = element(by.id('procedureType'));
        this.productStatus = element(by.id('productStatus'));
        this.procedureStatus = element.all(by.repeater('pubstatus in $select.items'));
        this.SME = element(by.id('smallMediumEnterprise'));
        this.artice58 = element(by.id('article58'));
        this.generics = element(by.id('generic'));
        this.biosimilar = element(by.id('biosimilar'));
        this.orphan = element(by.id('orphan'));
        this.caseType = element(by.id('caseType'));
    }

    /** Button methods */
    public clearFilters(): void {
        this.clearFilterButton.click();
    }
    public filterCases(): void {
        this.filterCasesButton.click();
    }
    public expandCaseFilters(): void {
        this.expandButton.click();
    }

    /** Set Methods */
    public setApplicationReferenceNumberFilter(text: string): void {
        this.applicationReferenceNumber.sendKeys(text);
    }
    public setCompanyNameFilter(text: string): void {
        this.companyName.sendKeys(text);
    }
    public setProductNameFilter(text: string): void {
        this.productName.sendKeys(text);
    }
    public setActiveSubstanceNameFilter(text: string): void {
        this.activeSubstanceName.sendKeys(text);
    }
    public setProcedureTypeFilter(choice: number): void {
        DropdownMenu.selectOptionByNum(this.procedureType, choice);
    }
    public setProductStatusFilter(choice: number): void {
        DropdownMenu.selectOptionByNum(this.productStatus, choice);
    }
    public setProcedureStatusFilter(num: number): void {
        this.expandProcedureStatus();
        var choice: number = num - 1;
        DropdownMenu.selectArrayElementByNum(this.procedureStatus, choice);
    }
    public setSMEfilter(choice: number): void {
        DropdownMenu.selectOptionByBoolean(this.SME, choice);
    }
    public setArticle58filter(choice: number): void {
        DropdownMenu.selectOptionByBoolean(this.artice58, choice);
    }
    public setGenericsFilter(choice: number): void {
        DropdownMenu.selectOptionByBoolean(this.generics, choice);
    }
    public setBiosimilarFilter(choice: number): void {
        DropdownMenu.selectOptionByBoolean(this.biosimilar, choice);
    }
    public setOrphanFilter(choice: number): void {
        DropdownMenu.selectOptionByBoolean(this.orphan, choice);
    }
    public setDocumentCaseType(): void {
        DropdownMenu.selectOptionByStringValue(this.caseType, 'DOCUMENT');
    }
    public setProcedureCaseType(): void {
        DropdownMenu.selectOptionByStringValue(this.caseType, 'PROCEDURE');
    }
    private expandProcedureStatus(): void {
        element(by.id('publicationStatus')).click();
    }

}

export = CaseFilters;
