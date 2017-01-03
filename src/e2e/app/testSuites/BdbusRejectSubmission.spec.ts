import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseList = require('../pageObjects/CaseList');
import CaseDetails = require('../pageObjects/CaseDetails');
import CaseFilters = require('../pageObjects/CaseFilters');
import BdbusUserTask = require('../pageObjects/BdbusUserTask');
import HistoryTab = require('../pageObjects/HistoryTab');
import NotesTab = require('../pageObjects/NotesTab');
import DossierTab = require('../pageObjects/DossierTab');
import procedureStatus = require('../resources/ProcedureStatus');
import tasks = require('../resources/Tasks');
import historyMessage = require('../resources/historyMessages');
import dossierLink = require('../resources/dossierLinks');
import DatePicker = require('../objectMethods/DatePicker');

describe('BDBUS reject a submission', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var caseDetails = new CaseDetails();
    var caseFilters = new CaseFilters();
    var bdbusUserTask = new BdbusUserTask();
    var historyTab = new HistoryTab();
    var dossierTab = new DossierTab();
    var notesTab = new NotesTab();
    var arn: string = 'EMEA/H/C/004059/X/0001';
    var note: string = 'test rejection note';
    var reason: string = 'Test Rejection Reason';

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        loginPage.login('bdbus');
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

    it('should reject a submission and cancel', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.rejectSubmission();
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[0]);
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.expandMultipleSelection();
        bdbusUserTask.setRejectionReason(3);
        bdbusUserTask.collapseMultipleSelection();
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[0]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[0]);
    });

    it('should not have any records in history for submission rejection', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[2])).toBe(false);
    });

    it('should reject a submission and Notify Applicant', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.rejectSubmission();
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[0]);
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.expandMultipleSelection();
        bdbusUserTask.setRejectionReason(3);
        bdbusUserTask.collapseMultipleSelection();
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.notifyApplicant();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[0]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[0]);
    });

    it('should have records in history for submission rejection', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[2])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[30])).toBe(false);
    });

    it('should have records in dossier tab for rejection', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDossiers();
        dossierTab.expandSubmittedDossier(1);
        expect(dossierTab.getDate(1)).toBe(DatePicker.todaysDate());
        expect(dossierTab.getDossierType(1)).toBe('Rejected');
        expect(dossierTab.getDossierLink(1)).toBe(dossierLink[0]);
        expect(dossierTab.getNote(1)).toBe(note);
    });

    it('should display rejection note in Notes Tab', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showNotes();
        expect(notesTab.isNotesListEmpty()).toBe(false);
        expect(notesTab.getNote(1)).toBe(note);
    });

    it('should reject a submission with multiple rejection reasons and Notify Applicant', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.rejectSubmission();
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[0]);
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.expandMultipleSelection();
        bdbusUserTask.setRejectionReason(1);
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.setRejectionReason(3);
        bdbusUserTask.collapseMultipleSelection();
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.setOtherRejectionReason(reason);
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyAppEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.notifyApplicant();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[0]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[0]);
    });

    it('should have records in history for submission rejection with multiple reasons', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[30])).toBe(true);
    });
});
