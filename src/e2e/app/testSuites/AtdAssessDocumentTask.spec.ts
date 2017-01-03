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

describe('ATD User Assess Document Case', function() {
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
    var arn: string = 'EMEA/H/C/001109/II/0043';

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
        // Validate Document Case
        ttActions.completeTaskValidation(arn);
    });

    beforeEach(function() {
        caseFilters.clearFilters();
    });

    afterEach(function() {
        navigationBar.gotoProcedureCases();
    });

    it('should exist document Task with name Complete Document Assessment', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(11);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(false);
        expect(taskList.countResults()).toBe(1);
    });

    it('should Assess Document Task and cancel', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        caseList.openActiveTask(arn);
        atdUserTask.cancel();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[4]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[10]);
    });

    it('should have no records in history for Document Assessment', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[49])).toBe(false);
    });

    it('should be able to select documents and valid info are displayed in document\'s tab before assessment', function() {
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

    it('should exist document Case with status Assessment in Process after canceling Assessment', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(false);
        expect(caseList.countResults()).toBe(1);
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[4]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[10]);
    });

    it('should exist document Task with name Complete Document Assessment after canceling Assessment', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(11);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(false);
        expect(taskList.countResults()).toBe(1);
    });

    it('should successfully Assess Document Task', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        caseList.openActiveTask(arn);
        atdUserTask.completeTask();
        confirmationPopUp.confirm();
        caseFilters.clearFilters();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[4]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[5]);
        expect(caseList.isActiveTaskClickable(arn)).toBe(true);
    });

    it('should have records in history for Document Assessment', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[49])).toBe(true);
    });

    it('should be able to select documents and valid info are displayed in document\'s tab after Assessment', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        expect(documentTab.isDocumentSelectionEnabled(1)).toBe(false);
        expect(documentTab.isDocumentSelectionEnabled(2)).toBe(false);
        expect(documentTab.isDocumentSelectionEnabled(3)).toBe(false);
        expect(documentTab.getDocumentStatus(1)).toBe('');
        expect(documentTab.getDocumentStatus(2)).toBe(procedureStatus[11]);
        expect(documentTab.getDocumentStatus(3)).toBe('');
    });

    it('should not exist document Case with status Assessment In-Process after Assessment', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setDocumentCaseType();
        caseFilters.filterCases();
        expect(caseList.noResults()).toBe(true);
    });

    it('should not exist document task after Assessment', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn);
        taskFilters.setTaskTypeFilter(11);
        taskFilters.filterTasks();
        expect(taskList.noResults()).toBe(true);
    });
});
