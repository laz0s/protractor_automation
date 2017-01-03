import DropdownMenu = require('../objectMethods/DropdownMenu');

class TaskFilters {

    /** buttons */
    private clearFilterButton: protractor.ElementFinder;
    private filterTasksButton: protractor.ElementFinder;
    private expandButton: protractor.ElementFinder;

    /** text box filters */
    private applicationReferenceNumber: protractor.ElementFinder;
    private companyName: protractor.ElementFinder;
    private productName: protractor.ElementFinder;
    private taskCreationDate: protractor.ElementFinder;

    /** drop down menu filters */
    private taskType: protractor.ElementArrayFinder;

    constructor() {

        /** button's locators */
        this.clearFilterButton = element(by.id('tasks-clear'));
        this.filterTasksButton = element(by.id('tasks-filter'));
        this.expandButton = element(by.css('a[data-toggle="collapse"]'));
        /** text box locators */

        this.applicationReferenceNumber = element(by.id('procedureNumber'));
        this.companyName = element(by.id('mah'));
        this.productName = element(by.id('productName'));
        this.taskCreationDate = element(by.id('createdSince'));

        /** Drop down menu Locators */
        this.taskType = element.all(by.repeater('taskTypeStatus in $select.items'));

    }
    /** button methods */
    public clearFilters(): void {
        this.clearFilterButton.click();
    }
    public filterTasks(): void {
        this.filterTasksButton.click();
    }
    public expandTaskFilters(): void {
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
    public setTaskCreationDate(date: string): void {
        this.taskCreationDate.sendKeys(date);
    }
    public setTaskTypeFilter(num: number): void {
        this.expandProcedureStatus();
        var choice: number = num - 1;
        DropdownMenu.selectArrayElementByNum(this.taskType, choice);
        element(by.id('mah')).click();
    }
    private expandProcedureStatus(): void {
        element(by.id('taskType')).click();
    }
}

export = TaskFilters;
