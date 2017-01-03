import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseFilters = require('../pageObjects/CaseFilters');
import CaseList = require('../pageObjects/CaseList');
import CaseDetails = require('../pageObjects/CaseDetails');
import HistoryTab = require('../pageObjects/HistoryTab');
import DocumentsTab = require('../pageObjects/DocumentsTab');
import DatePicker = require('../objectMethods/DatePicker');
import AtdUserTask = require('../pageObjects/AtduserTask');
import BdbusUserTask = require('../pageObjects/BdbusUserTask');
import dossierLink = require('../resources/dossierLinks');
import procedureStatus = require('../resources/ProcedureStatus');
import tasks = require('../resources/Tasks');
import historyMessage = require('../resources/historyMessages');

describe('ATD accept a submission', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var caseDetails = new CaseDetails();
    var caseFilters = new CaseFilters();
    var historyTab = new HistoryTab();
    var documentsTab = new DocumentsTab();
    var atdUserTask = new AtdUserTask();
    var bdbusUserTask = new BdbusUserTask();
    var arn: string = 'EMEA/H/C/002752/0000';
    var dreamLink: string = 'https://www.google.com';
    var note: string = 'test redaction proposal note';

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        loginPage.login('atd');
        caseList.openActiveTask(arn);
        bdbusUserTask.setDossierLink(dossierLink[0]);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        bdbusUserTask.setNotes(note);
        bdbusUserTask.notifyCDPReviewGroup();
        confirmationPopUp.confirm();
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

    it('should accept a submission and cancel', function() {
        caseList.openActiveTask(arn);
        expect(atdUserTask.getDateInfo()).toBe('Submission of Redaction Proposal Document Package on ' + DatePicker.todaysDate());
        expect(atdUserTask.getDossierLink()).toBe(dossierLink[0]);
        expect(atdUserTask.getDreamLink()).toBe(dreamLink);
        expect(atdUserTask.getRedactionProposalNote()).toBe(note);
        atdUserTask.cancel();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[1]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[1]);
    });

    it('should not have any records in history for submission acceptance', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[6])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[7])).toBe(false);
    });

    it('should have not been imported any documents before submission acceptance', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        expect(documentsTab.isDocumentListEmpty()).toBe(true);
        expect(documentsTab.getDossierLink()).toBe(dossierLink[0]);
        expect(documentsTab.getDreamLink()).toBe(dreamLink);
    });

    it('should accept a submission successfully', function() {
        caseList.openActiveTask(arn);
        atdUserTask.accept();
        confirmationPopUp.confirm();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[2]);
        expect(caseList.getActiveTask(arn)).toBe(tasks[2]);
    });

    it('should have records in history for submission acceptance', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[6])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[7])).toBe(true);
    });

    it('should have been imported documents after submission acceptance', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        expect(documentsTab.isDocumentListEmpty()).toBe(false);
        expect(documentsTab.getDossierLink()).toBe(dossierLink[0]);
        expect(documentsTab.getDreamLink()).toBe(dreamLink);
    });

    it('should not allow user select Documents', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showDocuments();
        expect(documentsTab.isDocumentSelectionEnabled(1)).toBe(false);
        expect(documentsTab.isDocumentSelectionEnabled(2)).toBe(false);
        expect(documentsTab.isDocumentSelectionEnabled(3)).toBe(false);
    });
});
