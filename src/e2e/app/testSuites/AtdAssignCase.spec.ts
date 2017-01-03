import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseList = require('../pageObjects/CaseList');
import CaseFilters = require('../pageObjects/CaseFilters');
import CaseDetails = require('../pageObjects/CaseDetails');
import HistoryTab = require('../pageObjects/HistoryTab');
import DocumentsTab = require('../pageObjects/DocumentsTab');
import AtdUserTask = require('../pageObjects/AtduserTask');
import dossierLink = require('../resources/dossierLinks');
import procedureStatus = require('../resources/ProcedureStatus');
import tasks = require('../resources/Tasks');
import historyMessage = require('../resources/historyMessages');
import TTactions = require('../pageObjects/TTactions');
import TaskList = require('../pageObjects/TaskList');
import Credentials = require('../resources/Credentials');

describe('ATD Assign Case to Coordinator/DM', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var caseFilters = new CaseFilters();
    var caseDetails = new CaseDetails();
    var historyTab = new HistoryTab();
    var documentsTab = new DocumentsTab();
    var atdUserTask = new AtdUserTask();
    var ttActions = new TTactions();
    var taskList = new TaskList();
    var arn: string = 'EMEA/H/C/004195/0000';
    var dreamLink: string = 'https://www.google.com';
    var note: string = 'Assign Case to Coordinator Test Note';
    let caseCoordinator: string = '';

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        loginPage.login('atd');
        // Update Submission Details - Redaction Proposal
        ttActions.updateSubmissionDetails(arn);
        // Accept Submission
        ttActions.acceptSubmission(arn);
    });

    afterAll(function() {
        navigationBar.logout();
        confirmationPopUp.confirm();
    });

    beforeEach(function() {
        caseFilters.clearFilters();
    });

    afterEach(function() {
        navigationBar.gotoProcedureCases();
    });

    it('should assign a case and cancel', function() {
        caseList.openActiveTask(arn);
        expect(atdUserTask.getDossierLink()).toBe(dossierLink[0]);
        expect(atdUserTask.getDreamLink()).toBe(dreamLink);
        expect(atdUserTask.isAssignButtonEnabled()).toBe(false);
        atdUserTask.setCaseCoordinator(Credentials.atd[0]);
        expect(atdUserTask.isAssignButtonEnabled()).toBe(false);
        atdUserTask.setDocumentManager(Credentials.atdadmin[0]);
        expect(atdUserTask.isAssignButtonEnabled()).toBe(true);
        atdUserTask.setNote(note);
        atdUserTask.cancel();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[2]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[2]);
    });

    it('should not have any records in history for case assignment', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[31])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[32])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[33])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[34])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[35])).toBe(false);
    });

    it('should task be unassigned in task list', function() {
        navigationBar.gotoTaskList();
        expect(taskList.getTaskStatus(arn)).toBe('Unassigned');
    });

    it('should assign successfully a case', function() {
        caseList.openActiveTask(arn);
        expect(atdUserTask.getDossierLink()).toBe(dossierLink[0]);
        expect(atdUserTask.getDreamLink()).toBe(dreamLink);
        expect(atdUserTask.isAssignButtonEnabled()).toBe(false);
        atdUserTask.setCaseCoordinator(Credentials.atd[0]);
        expect(atdUserTask.isAssignButtonEnabled()).toBe(false);
        atdUserTask.setDocumentManager(Credentials.atdadmin[0]);
        expect(atdUserTask.isAssignButtonEnabled()).toBe(true);
        atdUserTask.setNote(note);

        // Following expect statement ensures that caseCoordinator variable
        // value will have been set before we exit expect statement. Label of
        // case coordinator will be different in systems with different LDAP.
        // In this Test Case we set case coordinator by value and save in a
        // global Suite variable the label of it displayed in UI.
        expect(atdUserTask.getCaseCoordinator(Credentials.atd[0]).then((user: string) => {
            caseCoordinator = user;
            return null;
        })).toBeNull();

        atdUserTask.assign();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[3]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[3]);
    });

    it('should task be assigned in task list', function() {
        navigationBar.gotoTaskList();
        expect(taskList.getTaskStatus(arn)).toBe('Assigned');
        expect(taskList.getOwner(arn)).toBe(caseCoordinator);
    });

    it('should have records in history for submission acceptance', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[31])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[32])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[33])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[34])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[35])).toBe(true);
    });

    it('should allow user select Documents', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        expect(documentsTab.isDocumentSelectionEnabled(1)).toBe(true);
        expect(documentsTab.isDocumentSelectionEnabled(2)).toBe(true);
        expect(documentsTab.isDocumentSelectionEnabled(3)).toBe(true);
    });

});
