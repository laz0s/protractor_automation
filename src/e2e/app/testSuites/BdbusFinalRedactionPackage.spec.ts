import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseList = require('../pageObjects/CaseList');
import CaseDetails = require('../pageObjects/CaseDetails');
import BdbusUserTask = require('../pageObjects/BdbusUserTask');
import AtdUserTask = require('../pageObjects/AtduserTask');
import HistoryTab = require('../pageObjects/HistoryTab');
import DatePicker = require('../objectMethods/DatePicker');
import CaseFilters = require('../pageObjects/CaseFilters');
import TaskFilters = require('../pageObjects/TaskFilters');
import TaskList = require('../pageObjects/TaskList');
import DossierTab = require('../pageObjects/DossierTab');
import AdministrationTab = require('../pageObjects/AdministrationTab');
import PublishHistoryTab = require('../pageObjects/PublishHistory');
import dossierLink = require('../resources/dossierLinks');
import TTactions = require('../pageObjects/TTactions');
import procedureStatus = require('../resources/ProcedureStatus');
import task = require('../resources/Tasks');
import historyMessage = require('../resources/historyMessages');

describe('BD-BUS user update submission details in final redacted package', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var caseDetails = new CaseDetails();
    var bdbusUserTask = new BdbusUserTask();
    var atdUserTask = new AtdUserTask();
    var historyTab = new HistoryTab();
    var administrationTab = new AdministrationTab();
    var caseFilters = new CaseFilters();
    var taskFilters = new TaskFilters();
    var taskList = new TaskList();
    var dossierTab = new DossierTab();
    var publishHistoryTab = new PublishHistoryTab();
    var ttActions = new TTactions();
    var arn1: string = 'EMEA/H/W/003799/0000';
    var arn2: string = 'EMEA/H/C/000958/X/0049/G';
    var note: string = 'Final Redaction Package Test Note';
    var dossierType: string = 'Final Redacted Version';

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        loginPage.login('atd');

        // Update Submission Details - Redaction Proposal
        ttActions.updateSubmissionDetails(arn1);
        // Accept Submission
        ttActions.acceptSubmission(arn1);
        // Assign Case to Coordinator/DM
        ttActions.assignCaseToCoordinator(arn1);
        // Confirm List Of Documents
        ttActions.confirmListOfDocuments(arn1);
        // Complete Validation
        ttActions.completeTaskValidation(arn1);
        // Complete Document Assessment
        ttActions.completeDocumentAssessment(arn1);
        // Confirm Redaction Conclusion sent
        ttActions.confirmRedactionConclusionSent(arn1);
        // Confirm Received Agreement
        ttActions.confirmReceivedAgreement(arn1);

        // -----------------------------------------//
        // Update Submission Details - Redaction Proposal
        ttActions.updateSubmissionDetails(arn2);
        // Accept Submission
        ttActions.acceptSubmission(arn2);
        // Assign Case to Coordinator/DM
        ttActions.assignCaseToCoordinator(arn2);
        // Confirm List Of Documents
        ttActions.confirmListOfDocuments(arn2);
        // Complete Validation
        ttActions.completeTaskValidation(arn2);
        // Complete Document Assessment
        ttActions.completeDocumentAssessment(arn2);
        // Confirm Redaction Conclusion sent
        ttActions.confirmRedactionConclusionSent(arn2);
        // Confirm Received Agreement
        ttActions.confirmReceivedAgreement(arn2);

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

    it('should not update final submission details if provided dossier does not exist', function() {
        navigationBar.logout();
        confirmationPopUp.confirm();
        loginPage.login('bdbus');
        caseList.openActiveTask(arn1);
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(false);
        bdbusUserTask.setComplete();
        bdbusUserTask.setDossierLink(dossierLink[5]);
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.updateStatus();
        confirmationPopUp.confirm();
        expect(bdbusUserTask.isAlertPresent()).toBe(true);
        bdbusUserTask.closeAlertMessage();
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should update final submission details and cancel', function() {
        caseList.openActiveTask(arn1);
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(false);
        bdbusUserTask.setComplete();
        bdbusUserTask.setDossierLink(dossierLink[0]);
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
        expect(caseList.isActiveTaskClickable(arn1)).toBe(true);
        expect(caseList.getProcedureStatus(arn1)).toBe(procedureStatus[6]);
        expect(caseList.getActiveTask(arn1)).toBe(task[7]);
    });

    it('should not have any records in history for update final submission details', function() {
        caseList.openCaseDetails(arn1);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[46])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[47])).toBe(false);
    });

    it('should successfully update final submission details with complete package and not SIAMED Dates given', function() {
        caseList.openActiveTask(arn1);
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(false);
        bdbusUserTask.setComplete();
        bdbusUserTask.setDossierLink(dossierLink[0]);
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.updateStatus();
        confirmationPopUp.confirm();
        caseFilters.clearFilters();
        expect(caseList.isActiveTaskClickable(arn1)).toBe(false);
        expect(caseList.getProcedureStatus(arn1)).toBe(procedureStatus[7]);
        expect(caseList.getFinalSubmissionDate(arn1)).toEqual(DatePicker.todaysDate());
        expect(caseList.getECDate(arn2)).toEqual('');
        expect(caseList.getEPARPublish(arn2)).toEqual('');
    });

    it('should have records in history for update final submission details', function() {
        caseList.openCaseDetails(arn1);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[46])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[47])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[51])).toBe(false);
    });

    it('should have records in dossier tab for final submission details with complete package', function() {
        caseList.openCaseDetails(arn1);
        caseDetails.showDossiers();
        dossierTab.expandSubmittedDossier(1);
        expect(dossierTab.getDate(1)).toBe(DatePicker.todaysDate());
        expect(dossierTab.getDossierType(1)).toBe(dossierType);
        expect(dossierTab.getDossierLink(1)).toBe(dossierLink[0]);
        expect(dossierTab.getNote(1)).toBe(note);
        expect(dossierTab.getPartial(1)).toBe('no');
    });

    it('should have status Ready To Publish if article58 is selected and no SIAMED Dates are given', function() {
        caseList.openCaseDetails(arn1);
        caseDetails.edit();
        caseDetails.clickArticle58();
        caseDetails.save();
        confirmationPopUp.confirm();
        navigationBar.gotoProcedureCases();
        caseFilters.clearFilters();
        expect(caseList.isActiveTaskClickable(arn1)).toBe(false);
        expect(caseList.getProcedureStatus(arn1)).toBe(procedureStatus[8]);
        expect(caseList.getECDate(arn1)).toBe('');
        expect(caseList.getEPARPublish(arn1)).toEqual('');
    });

    it('should successfully watermark a Procedure Case', function() {
        caseList.openCaseDetails(arn1);
        caseDetails.showAdministration();
        administrationTab.watermarkProcedureCase();
        confirmationPopUp.confirm();
        caseFilters.clearFilters();
        expect(caseList.isActiveTaskClickable(arn1)).toBe(false);
        expect(caseList.getProcedureStatus(arn1)).toBe(procedureStatus[9]);
    });

    it('should have records in history for Procedure Case watermarking', function() {
        caseList.openCaseDetails(arn1);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[51])).toBe(true);
    });

    it('should not have record in Publication History for Procedure Case watermarking', function() {
        caseList.openCaseDetails(arn1);
        caseDetails.showPublishHistory();
        expect(publishHistoryTab.isPubHistoryEmpty()).toBe(true);
    });

    it('should not have records in history before update final submission details', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[46])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[48])).toBe(false);
    });

    it('should successfully update final submission details with partial package and SIAMED Dates given', function() {
        ttActions.setSiamedDates(arn2);
        navigationBar.gotoProcedureCases();
        caseList.openActiveTask(arn2);
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(false);
        bdbusUserTask.setPartial();
        bdbusUserTask.setDossierLink(dossierLink[2]);
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isUpdateStatusEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.updateStatus();
        confirmationPopUp.confirm();
        caseFilters.clearFilters();
        expect(caseList.isActiveTaskClickable(arn2)).toBe(false);
        expect(caseList.getProcedureStatus(arn2)).toBe(procedureStatus[8]);
        expect(caseList.getFinalSubmissionDate(arn2)).toEqual(DatePicker.todaysDate());
        expect(caseList.getECDate(arn2)).toEqual(DatePicker.todaysDate());
        expect(caseList.getEPARPublish(arn2)).toEqual(DatePicker.todaysDate());
    });

    it('should have records in history for update final submission details', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[46])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[48])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[50])).toBe(false);
    });

    it('should have records in dossier tab for final submission details with partial package', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showDossiers();
        dossierTab.expandSubmittedDossier(1);
        expect(dossierTab.getDate(1)).toBe(DatePicker.todaysDate());
        expect(dossierTab.getDossierType(1)).toBe(dossierType);
        expect(dossierTab.getDossierLink(1)).toBe(dossierLink[2]);
        expect(dossierTab.getNote(1)).toBe(note);
        expect(dossierTab.getPartial(1)).toBe('yes');
    });

    it('should have no record in Publication History for Case Publishing', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showPublishHistory();
        expect(publishHistoryTab.isPubHistoryEmpty()).toBe(true);
    });

    it('should successfully publish a Case', function() {
        navigationBar.logout();
        confirmationPopUp.confirm();
        loginPage.login('atd');
        caseList.openCaseDetails(arn2);
        caseDetails.showAdministration();
        administrationTab.publishProcedureCase();
        confirmationPopUp.confirm();
        caseFilters.clearFilters();
        expect(caseList.isActiveTaskClickable(arn2)).toBe(false);
        expect(caseList.getProcedureStatus(arn2)).toBe(procedureStatus[10]);
    });

    it('should have records in history for case publishing', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[50])).toBe(true);
    });

    it('should have record in Publication History for Case Publishing', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showPublishHistory();
        expect(publishHistoryTab.isPubHistoryEmpty()).toBe(false);
        expect(publishHistoryTab.getDossierLink(0)).toBe(dossierLink[2]);
    });

    it('should successfully handle replacement of final package', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showAdministration();
        administrationTab.replaceFinalPackage();
        confirmationPopUp.confirm();
    });

    it('should display reopened case in case list with correct info', function() {
        caseFilters.setApplicationReferenceNumberFilter(arn2);
        caseFilters.filterCases();
        expect(caseList.countResults()).toBe(1);
        expect(caseList.getProcedureStatus(arn2)).toBe(procedureStatus[6]);
        expect(caseList.getActiveTask(arn2)).toBe(task[7]);
        expect(caseList.getFinalSubmissionDate(arn2)).not.toBe('');
    });

    it('should display reopened task in task list with correct info', function() {
        navigationBar.gotoTaskList();
        taskFilters.expandTaskFilters();
        taskFilters.setApplicationReferenceNumberFilter(arn2);
        taskFilters.filterTasks();
        expect(taskList.getTaskName(arn2)).toBe(task[7]);
        expect(taskList.getTaskStatus(arn2)).toBe('Unassigned');
        expect(taskList.getOwner(arn2)).toBe('- - -');
    });

    it('should cancel a case to select a notice', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showAdministration();
        administrationTab.startNotice();
        confirmationPopUp.confirm();
    });

    it('should exist cancelled case in Case list with status Awaiting notice to be selected', function() {
        expect(caseList.getProcedureStatus(arn2)).toBe(procedureStatus[12]);
        expect(caseList.getActiveTask(arn2)).toBe(task[13]);
    });

    it('should exist cancelled case\'s Task in Task list', function() {
        navigationBar.gotoTaskList();
        expect(taskList.getTaskName(arn2)).toBe(task[13]);
        expect(taskList.getTaskStatus(arn2)).toBe('Unassigned');
        expect(taskList.getOwner(arn2)).toBe('- - -');
    });

    it('should history record for cancelled case to be noticed', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[67])).toBe(true);
    });

    it('should select a Notice', function() {
        caseList.openActiveTask(arn2);
        atdUserTask.completeTask();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn2)).toBe(procedureStatus[8]);
        expect(caseList.isActiveTaskClickable(arn2)).toBe(false);
    });

    it('should history record for selecting a notice', function() {
        caseList.openCaseDetails(arn2);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[68])).toBe(true);
    });
});
