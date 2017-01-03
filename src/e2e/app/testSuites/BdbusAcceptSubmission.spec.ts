import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseList = require('../pageObjects/CaseList');
import CaseDetails = require('../pageObjects/CaseDetails');
import BdbusUserTask = require('../pageObjects/BdbusUserTask');
import CaseFilters = require('../pageObjects/CaseFilters');
import HistoryTab = require('../pageObjects/HistoryTab');
import DatePicker = require('../objectMethods/DatePicker');
import DossierTab = require('../pageObjects/DossierTab');
import dossierLink = require('../resources/dossierLinks');
import procedureStatus = require('../resources/ProcedureStatus');
import task = require('../resources/Tasks');
import historyMessage = require('../resources/historyMessages');


describe('BDBUS accept a submission', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var caseDetails = new CaseDetails();
    var bdbusUserTask = new BdbusUserTask();
    var historyTab = new HistoryTab();
    var caseFilters = new CaseFilters();
    var dossierTab = new DossierTab();
    var arn: string = 'EMEA/H/C/004214/0000';
    var dreamLink: string = 'https://www.google.com';
    var note: string = 'test redaction proposal note';

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

    it('should Accept dossier link: Y:\\ectd\\5digits\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[5]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(true);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should Accept dossier link: Y:\\ectd\\5digits_EMEA_ASF\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[6]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(true);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should Accept dossier link: Y:\\ectd\\6digits\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[7]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(true);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should Accept dossier link: Y:\\ectd\\6digits_1digit\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[8]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(true);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should Accept dossier link: Y:\\ectd\\6digits_2digit\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[9]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(true);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should not Accept dossier link: Y:\\ectd\\somethingvalid\\3digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[10]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should not Accept dossier link: Y:\\ectd\\somethingvalid\\5digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[11]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should not Accept dossier link: Y:\\ectd\\6digits_\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[12]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should not Accept dossier link: Y:\\ectd\\6digits_3digits\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[13]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should not Accept dossier link: Y:\\ectd\\4digits\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[14]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should not Accept dossier link: Y:\\ectd\\4digits_EMEA_ASF\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[15]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should not Accept dossier link: Y:\\ectd\\6digits_EMEA_ASF\\4digits', function() {
        caseList.openActiveTask(arn);
        bdbusUserTask.setDreamLink(dreamLink);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[16]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should not update submission details if provided dossier does not exist', function() {
        caseList.openActiveTask(arn);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setComplete();
        bdbusUserTask.setDossierLink(dossierLink[5]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDreamLink(dreamLink);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.notifyCDPReviewGroup();
        confirmationPopUp.confirm();
        expect(bdbusUserTask.isAlertPresent()).toBe(true);
        bdbusUserTask.closeAlertMessage();
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
    });

    it('should accept a submission and cancel', function() {
        caseList.openActiveTask(arn);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[0]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDreamLink(dreamLink);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.cancel();
        confirmationPopUp.confirm();
        expect(caseList.isActiveTaskClickable(arn)).toBe(true);
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[0]);
        expect(caseList.getActiveTask(arn)).toBe(task[0]);
    });

    it('should not have any records in history for submission acceptance', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[3])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[4])).toBe(false);
        expect(historyTab.historyRecordExist(historyMessage[5])).toBe(false);
    });

    it('should accept a submission and Notify CDP Review Group', function() {
        caseList.openActiveTask(arn);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDossierLink(dossierLink[0]);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setDreamLink(dreamLink);
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(false);
        bdbusUserTask.setSubmissionDate();
        expect(bdbusUserTask.isNotifyCDPEnabled()).toBe(true);
        bdbusUserTask.setNotes(note);
        bdbusUserTask.notifyCDPReviewGroup();
        confirmationPopUp.confirm();
        caseFilters.clearFilters();
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[1]);
        expect(caseList.getRPSubmissionDate(arn)).toEqual(DatePicker.todaysDate());
        expect(caseList.isActiveTaskClickable(arn)).toBe(false);
    });

    it('should have records in history for submission acceptance', function() {
        caseFilters.clearFilters();
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[3])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[4])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[5])).toBe(true);
    });

    it('should have records in dossier tab for redaction proposal', function() {
        caseFilters.clearFilters();
        caseList.openCaseDetails(arn);
        caseDetails.showDossiers();
        dossierTab.expandSubmittedDossier(1);
        expect(dossierTab.getDate(1)).toBe(DatePicker.todaysDate());
        expect(dossierTab.getDossierType(1)).toBe('Redaction Proposal Document Package');
        expect(dossierTab.getDossierLink(1)).toBe(dossierLink[0]);
        expect(dossierTab.getDreamLink(1)).toBe(dreamLink);
        expect(dossierTab.getNote(1)).toBe(note);
    });
});
