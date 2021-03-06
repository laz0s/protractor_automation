import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseList = require('../pageObjects/CaseList');
import CaseDetails = require('../pageObjects/CaseDetails');
import HistoryTab = require('../pageObjects/HistoryTab');
import DocumentTab = require('../pageObjects/DocumentsTab');
import AtdUserTask = require('../pageObjects/AtduserTask');
import TaskList = require('../pageObjects/TaskList');
import TaskFilters = require('../pageObjects/TaskFilters');
import CaseFilters = require('../pageObjects/CaseFilters');
import procedureStatus = require('../resources/ProcedureStatus');
import tasks = require('../resources/Tasks');
import historyMessage = require('../resources/historyMessages');
import TTactions = require('../pageObjects/TTactions');

describe('ATD User Validate Document Case', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var caseDetails = new CaseDetails();
    var historyTab = new HistoryTab();
    var documentTab = new DocumentTab();
    var atdUserTask = new AtdUserTask();
    var taskList = new TaskList();
    var taskFilters = new TaskFilters();
    var caseFilters = new CaseFilters();
    var ttActions = new TTactions();
    var arn: string = 'EMEA/H/C/004059/X/0003';
    var coordinator;
    var documentManager;
    var ppdReviewStatus;
    var cdpReviewStatus;

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        loginPage.login('atd');
        // Update Submission Details - Redaction Proposal
        ttActions.updateSubmissionDetails(arn);
        // Accept Submission
        ttActions.acceptSubmission(arn);
        // Assign Case to Coordinator/DM
        ttActions.assignCaseToCoordinator(arn);
        // Confirm List Of Documents
        ttActions.confirmListOfDocuments(arn);
    });

    beforeEach(function() {
        caseFilters.clearFilters();
    });

    afterEach(function() {
        navigationBar.gotoProcedureCases();
    });

    it('should exist document Task with name Complete Document Validation', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(10);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(false);
        expect(taskList.countResults()).toBe(1);
        taskFilters.clearFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(11);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(true);
    });

    it('should validate Document Task and cancel', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        caseList.openActiveTask(arn);
        atdUserTask.cancel();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[3]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[9]);
    });

    it('should have no records in history for Document Validation', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[41])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[42])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[43])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[45])).toBe(false);
    });

    it('should be able to select documents and valid info are displayed in document\'s tab before validation', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        expect(documentTab.isDocumentSelectionEnabled(1)).toBe(true);
        expect(documentTab.isDocumentSelectionEnabled(2)).toBe(true);
        expect(documentTab.isDocumentSelectionEnabled(3)).toBe(true);
        expect(documentTab.getDocumentTask(1)).toBe('');
        expect(documentTab.getDocumentTask(2)).toBe(tasks[11]);
        expect(documentTab.getDocumentTask(3)).toBe('');
        expect(documentTab.getDocumentStatus(1)).toBe('');
        expect(documentTab.getDocumentStatus(2)).toBe(procedureStatus[3]);
        expect(documentTab.getDocumentStatus(3)).toBe('');
    });

    it('should exist document Case with status Validation in Process after canceling validation', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(false);
        expect(caseList.countResults()).toBe(1);
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[3]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[9]);
    });

    it('should exist document Task with name Complete Document Validation after canceling validation', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(10);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(false);
        expect(taskList.countResults()).toBe(1);
        taskFilters.clearFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(11);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(true);
    });

    it('should successfully validate Document Task', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        caseList.openActiveTask(arn);
        atdUserTask.completeTask();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[4]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[10]);
        caseFilters.clearFilters();
        expect(caseList.isActiveTaskClickable(arn)).toBe(false);
    });

    it('should have records in history for Document Validation', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[41])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[42])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[43])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[44])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[45])).toBe(true);
    });

    it('should be able to select documents and valid info are displayed in document\'s tab after validation', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        expect(documentTab.isDocumentSelectionEnabled(1)).toBe(true);
        expect(documentTab.isDocumentSelectionEnabled(2)).toBe(true);
        expect(documentTab.isDocumentSelectionEnabled(3)).toBe(true);
        expect(documentTab.getDocumentTask(1)).toBe('');
        expect(documentTab.getDocumentTask(2)).toBe(tasks[12]);
        expect(documentTab.getDocumentTask(3)).toBe('');
        expect(documentTab.getDocumentStatus(1)).toBe('');
        expect(documentTab.getDocumentStatus(2)).toBe(procedureStatus[4]);
        expect(documentTab.getDocumentStatus(3)).toBe('');
    });

    it('should exist document Case with status Assessment In-Process after validation', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(false);
        expect(caseList.countResults()).toBe(1);
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[4]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[10]);
    });

    it('should all document tasks have changed name to Complete Document Assessment', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(10);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(true);
        taskFilters.clearFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(11);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(false);
        expect(taskList.countResults()).toBe(1);
        navigationBar.gotoProcedureCases();
    });

    it('should be able to add document after completing Task Validation', function() {
        caseList.openCaseDetails(arn);
        var coordinator = caseDetails.getCurrentCoordinator();
        caseDetails.showDocuments();
        documentTab.selectDocument(1);
        expect(documentTab.getDocumentStatus(1)).toBe(procedureStatus[3]);
        expect(documentTab.getDocumentTask(1)).toBe(tasks[11]);
        expect(documentTab.getAssignee(1)).toBe(coordinator);
    });

    it('should exist Document Case for selected Document in Case List', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.countResults()).toBe(2);
    });

    it('should exist Document Task for selected Document in Task List', function() {
        caseList.openCaseDetails(arn);
        coordinator = caseDetails.getCurrentCoordinator();
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(10);
        taskFilters.filterTasks();
        expect(taskList.countResults()).toBe(1);
        expect(taskList.getOwner(arn)).toBe(coordinator);
    });

    it('should be able to deselect an already selected Document', function() {
        caseList.openCaseDetails(arn);
        documentManager = caseDetails.getCurrentDocumentManager();
        caseDetails.showDocuments();
        ppdReviewStatus = documentTab.getPPDStatus(2);
        cdpReviewStatus = documentTab.getCCIStatus(2);
        documentTab.selectDocument(2);
        confirmationPopUp.confirm();
        expect(documentTab.getDocumentStatus(2)).toBe('');
        expect(documentTab.getDocumentTask(2)).toBe('');
        expect(documentTab.getAssignee(2)).toBe('');
        expect(documentTab.getCCIStatus(2)).toBe('');
        expect(documentTab.getPPDStatus(2)).toBe('');
    });

    it('should not exist Document Case for unselected Document in Case List', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.countResults()).toBe(1);
    });

    it('should not exist Document Task for unselected Document in Task List', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(11);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(true);
    });

    it('should be able to reselect an already unselected Document', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        documentTab.selectDocument(2);
        expect(documentTab.getDocumentStatus(2)).toBe(procedureStatus[4]);
        expect(documentTab.getDocumentTask(2)).toBe(tasks[12]);
        expect(documentTab.getAssignee(2)).toBe(documentManager);
        expect(documentTab.getCCIStatus(2)).toBe(cdpReviewStatus);
        expect(documentTab.getPPDStatus(2)).toBe(ppdReviewStatus);
    });

    it('should exist Document Case for reselected Document in Case List', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.countResults()).toBe(2);
    });

    it('should exist Document Task for reselected Document in Task List', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(11);
        taskFilters.filterTasks();
        expect(taskList.countResults()).toBe(1);
        expect(taskList.getOwner(arn)).toBe(documentManager);
    });
});
