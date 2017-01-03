import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseList = require('../pageObjects/CaseList');
import CaseDetails = require('../pageObjects/CaseDetails');
import HistoryTab = require('../pageObjects/HistoryTab');
import AtdUserTask = require('../pageObjects/AtduserTask');
import DocumentsTab = require('../pageObjects/DocumentsTab');
import AdministrationTab = require('../pageObjects/AdministrationTab');
import TaskFilters = require('../pageObjects/TaskFilters');
import CaseFilters = require('../pageObjects/CaseFilters');
import TaskList = require('../pageObjects/TaskList');
import procedureStatus = require('../resources/ProcedureStatus');
import tasks = require('../resources/Tasks');
import historyMessage = require('../resources/historyMessages');
import TTactions = require('../pageObjects/TTactions');

describe('ATD User Confirm List of Documents', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var caseDetails = new CaseDetails();
    var historyTab = new HistoryTab();
    var atdUserTask = new AtdUserTask();
    var documentsTab = new DocumentsTab();
    var administrationTab = new AdministrationTab();
    var taskFilters = new TaskFilters();
    var caseFilters = new CaseFilters();
    var taskList = new TaskList();
    var ttActions = new TTactions();
    var arn: string = 'EMEA/H/C/003790/0000';
    var justDreamLink: string = 'https://www.google.com';

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        loginPage.login('atd');
        // Update Submission Details - Redaction Proposal
        ttActions.updateSubmissionDetails(arn);
        // Accept Submission
        ttActions.acceptSubmission(arn);
        // Assign Case to Coordinator/DM
        ttActions.assignCaseToCoordinator(arn);
    });

    beforeEach(function() {
        caseFilters.clearFilters();
    });

    afterEach(function() {
        navigationBar.gotoProcedureCases();
    });

    it('should not be able to confirm list of zero documents', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        // Second document is unselected because it is automated preselected
        documentsTab.selectDocument(2);
        navigationBar.gotoProcedureCases();
        caseList.openActiveTask(arn);
        expect(atdUserTask.isCompleteTaskButtonEnabled()).toBe(false);
        expect(atdUserTask.getInfoMessage()).toBe('0 documents of 3 have been selected to be processed.');
        expect(atdUserTask.getWarningMessage()).toBe('Please select documents from the documents tab of the case.');
        atdUserTask.cancel();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[3]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[3]);
    });

    it('should confirm list of Documents and cancel for three selected Documents', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        // select all documents
        documentsTab.selectDocument(1);
        documentsTab.selectDocument(2);
        documentsTab.selectDocument(3);
        navigationBar.gotoProcedureCases();
        caseList.openActiveTask(arn);
        expect(atdUserTask.isCompleteTaskButtonEnabled()).toBe(true);
        expect(atdUserTask.getInfoMessage()).toBe('3 documents of 3 have been selected to be processed.');
        expect(atdUserTask.getWarningMessage()).toBe('Please confirm to proceed.');
        atdUserTask.cancel();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[3]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[3]);
    });

    it('should not have any records in history for confirmation List of Documents', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[36])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[37])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[38])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[39])).toBe(false);
    });

    it('should not have been created Document Tasks in Case List', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(true);
    });

    it('should not have been created Document Tasks in Task List', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(10);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(true);
    });

    it('should deselect two Document and successfully confirm list of documents', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        documentsTab.selectDocument(1);
        documentsTab.selectDocument(3);
        navigationBar.gotoProcedureCases();
        caseList.openActiveTask(arn);
        expect(atdUserTask.isCompleteTaskButtonEnabled()).toBe(true);
        expect(atdUserTask.getInfoMessage()).toBe('1 documents of 3 have been selected to be processed.');
        expect(atdUserTask.getWarningMessage()).toBe('Please confirm to proceed.');
        atdUserTask.completeTask();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[3]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[4]);
    });

    it('should have record in history for confirmation List of Documents', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[36])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[37])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[38])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[39])).toBe(true);
    });

    it('should have been created Document Tasks in Case List', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(false);
        expect(caseList.countResults()).toBe(1);
    });

    it('should have been created Document Tasks in Task List', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(10);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(false);
        expect(taskList.countResults()).toBe(1);
    });

    it('should be able to select or deselect documents', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        expect(documentsTab.isDocumentSelectionEnabled(1)).toBe(true);
        expect(documentsTab.isDocumentSelectionEnabled(2)).toBe(true);
        expect(documentsTab.isDocumentSelectionEnabled(3)).toBe(true);
    });

    it('should edit Justification Table Link', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        documentsTab.setJustificationTableLink(2, justDreamLink);
        expect(documentsTab.getJustificationTableLink(2)).toBe(justDreamLink);
    });

    it('should exist history record for editting of Justification Table Link', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[40])).toBe(true);
    });

    it('should cancel a Procedure case with open Document Tasks', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showAdministration();
        administrationTab.setCancellationReason('Dummy Cancellation Reason');
        administrationTab.cancelCase();
        confirmationPopUp.confirm();
    });

    it('should not display cancelled case in Case List', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(true);
        caseFilters.clearFilters();
    });

    it('should not display cancelled case\'s Task in Task List', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(true);
        taskFilters.clearFilters();
    });

    it('should display only Procedure Case if case list is filtered with Procedure Status \'Canceled\'', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setProcedureStatusFilter(12);
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(false);
        expect(caseList.countResults()).toBe(1);
        expect(caseList.isActiveTaskClickable(arn)).toBe(false);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(true);
        caseFilters.clearFilters();
    });

    it('should have records in history for Procedure Case cancellation', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setProcedureStatusFilter(12);
        caseFilters.filterCases();
        caseList.openCaseDetails(arn);
        expect(caseDetails.isEditButtonEnabled()).toBe(false);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[64])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[65])).toBe(true);
    });

    it('should reopen a cancelled case', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setProcedureStatusFilter(12);
        caseFilters.filterCases();
        caseList.openCaseDetails(arn);
        caseDetails.showAdministration();
        administrationTab.reopenCase();
        confirmationPopUp.confirm();
    });

    it('should display reopened case in Case List', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(false);
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[0]);
        caseFilters.clearFilters();
    });

    it('should not display previous document tasks of the reopened case in Case List', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(true);
        caseFilters.clearFilters();
    });

    it('should display reopened case\'s Task in Task List', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(false);
        taskFilters.clearFilters();
    });

    it('should have history Records for case reopen', function() {
        caseList.openCaseDetails(arn);
        expect(caseDetails.isEditButtonEnabled()).toBe(true);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[66])).toBe(true);
    });
});
