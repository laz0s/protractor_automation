import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseList = require('../pageObjects/CaseList');
import TaskList = require('../pageObjects/TaskList');
import CaseDetails = require('../pageObjects/CaseDetails');
import CaseFilters = require('../pageObjects/CaseFilters');
import HistoryTab = require('../pageObjects/HistoryTab');
import historyMessage = require('../resources/historyMessages');
import task = require('../resources/Tasks');
import procedureStatus = require('../resources/procedureStatus');
import DatePicker = require('../objectMethods/DatePicker');
import dates = require('../resources/dates');

describe('Procedure Case Editing', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var taskList = new TaskList();
    var caseDetails = new CaseDetails();
    var caseFilters = new CaseFilters();
    var historyTab = new HistoryTab();
    var arn: string = 'App Ref Num';
    var productName: string = 'Product Name';
    var companyName: string = 'Company Name';
    var productNumber: string = 'Product Number';
    var asn: string = 'Active Substance Name';
    var atc: string = 'ATC';
    var editted:string = 'editted ';

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        loginPage.login('superuser');
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

    it('should create manually a new Procedure Case', function() {
        caseList.clickNewCaseButton();
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setApplicationReferenceNumber(arn);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setProductName(productName);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setProcedureType('INITIAL_MA');
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setProductStatus('VALID');
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setCompanyName(companyName);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setProductNumber(productNumber);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setActiveSubstanceName(asn);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setATC(atc);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setStartDate();
        expect(caseDetails.isApplyButtonEnabled()).toBe(true);
        caseDetails.setCHMPDate();
        expect(caseDetails.isApplyButtonEnabled()).toBe(true);
        caseDetails.clickPaediatric();
        caseDetails.clickOrphan();
        caseDetails.clickConditionalApproval();
        caseDetails.clickArticle58();
        caseDetails.clickBiosimilar();
        caseDetails.clickExceptionalCircumstances();
        caseDetails.clickGeneric();
        caseDetails.clickLegalAction();
        caseDetails.clickSME();
        expect(caseDetails.isApplyButtonEnabled()).toBe(true);
        caseDetails.applyChanges();
    });

    it('should exist valid record in Procedure Case list for case created', function() {
        expect(caseList.getCaseIndicator(arn)).toBe('P');
        expect(caseList.getProcedureType(arn)).toBe('Initial MA');
        expect(caseList.getProductName(arn)).toBe(productName);
        expect(caseList.getCompanyName(arn)).toBe(companyName);
        expect(caseList.getSME(arn)).toBe('Y');
        expect(caseList.getOGB(arn)).toBe('O/G/B');
        expect(caseList.getActiveSubstanceName(arn)).toBe(asn);
        expect(caseList.getCHMPDate(arn)).toBe('');
        expect(caseList.getECDate(arn)).toBe('');
        expect(caseList.getEPARPublish(arn)).toBe('');
        expect(caseList.getRPSubmissionDate(arn)).toBe('');
        expect(caseList.getFinalSubmissionDate(arn)).toBe('');
        expect(caseList.getProductStatus(arn)).toBe('Authorised');
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[0]);
        expect(caseList.getActiveTask(arn)).toBe(task[0]);
        expect(caseList.isActiveTaskClickable(arn)).toBe(true);
    });

    it('should exist valid record in Task list for case created', function() {
        navigationBar.gotoTaskList();
        expect(taskList.getTaskName(arn)).toBe(task[0]);
        expect(taskList.getDocumentName(arn)).toBe('N/A');
        expect(taskList.getInitiationDate(arn)).toBe(DatePicker.todaysDate());
        expect(taskList.getCompanyName(arn)).toBe(companyName);
        expect(taskList.getProductName(arn)).toBe(productName);
        expect(taskList.getOwner(arn)).toBe('- - -');
        expect(taskList.getTaskStatus(arn)).toBe('Unassigned');
    });

    it('should exist valid record in Case Details for case created', function() {
        caseList.openCaseDetails(arn);
        expect(caseDetails.getApplicationReferenceNumber()).toBe(arn);
        expect(caseDetails.getProductName()).toBe(productName);
        expect(caseDetails.getProcedureType()).toBe('Initial MA');
        expect(caseDetails.getProductStatus()).toBe('Authorised');
        expect(caseDetails.getCompanyName()).toBe(companyName);
        expect(caseDetails.getProductNumber()).toBe(productNumber);
        expect(caseDetails.getActiveSubstanceName()).toBe(asn);
        expect(caseDetails.getATC()).toBe(atc);
        caseDetails.edit();
        expect(caseDetails.isSMESelected()).toBe(true);
        expect(caseDetails.isBiosimilarSelected()).toBe(true);
        expect(caseDetails.isLegalActionSelected()).toBe(true);
        expect(caseDetails.isGenericSelected()).toBe(true);
        expect(caseDetails.isArticle58Selected()).toBe(true);
        expect(caseDetails.isOrphanSelected()).toBe(true);
        expect(caseDetails.isPaediatricSelected()).toBe(true);
        expect(caseDetails.isConditionalApprovalSelected()).toBe(true);
        expect(caseDetails.isExceptionalCircumstancesSelected()).toBe(true);
        caseDetails.cancel();
        confirmationPopUp.confirm();
    });

    it('should find history records for Case Creation', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[0])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[1])).toBe(true);
    });

    it('should edit the metadata of a case', function() {
        caseList.openCaseDetails(arn);
        caseDetails.edit();
        caseDetails.setProductName(editted + productName);
        caseDetails.setProcedureType('LINE_EXTENSION');
        caseDetails.setProductStatus('WITHDRAWN');
        caseDetails.setCompanyName(editted + companyName);
        caseDetails.setProductNumber(editted + productNumber);
        caseDetails.setActiveSubstanceName(editted + asn);
        caseDetails.setATC(editted + atc);
        caseDetails.clickPaediatric();
        caseDetails.clickOrphan();
        caseDetails.clickConditionalApproval();
        caseDetails.clickArticle58();
        caseDetails.clickBiosimilar();
        caseDetails.clickExceptionalCircumstances();
        caseDetails.clickGeneric();
        caseDetails.clickLegalAction();
        caseDetails.clickSME();
        caseDetails.save();
        confirmationPopUp.confirm();
    });

    it('should exist valid record in Procedure Case list for editted case', function() {
        expect(caseList.getCaseIndicator(arn)).toBe('P');
        expect(caseList.getProcedureType(arn)).toBe('Line Extension');
        expect(caseList.getProductName(arn)).toBe(editted + productName);
        expect(caseList.getCompanyName(arn)).toBe(editted + companyName);
        expect(caseList.getSME(arn)).toBe('N');
        expect(caseList.getOGB(arn)).toBe('');
        expect(caseList.getActiveSubstanceName(arn)).toBe(editted + asn);
        expect(caseList.getCHMPDate(arn)).toBe('');
        expect(caseList.getECDate(arn)).toBe('');
        expect(caseList.getEPARPublish(arn)).toBe('');
        expect(caseList.getRPSubmissionDate(arn)).toBe('');
        expect(caseList.getFinalSubmissionDate(arn)).toBe('');
        expect(caseList.getProductStatus(arn)).toBe('Withdrawn');
        expect(caseList.getProcedureStatus(arn)).toBe(procedureStatus[0]);
        expect(caseList.getActiveTask(arn)).toBe(task[0]);
        expect(caseList.isActiveTaskClickable(arn)).toBe(true);
    });

    it('should exist valid record in Task list for editted case', function() {
        navigationBar.gotoTaskList();
        expect(taskList.getTaskName(arn)).toBe(task[0]);
        expect(taskList.getDocumentName(arn)).toBe('N/A');
        expect(taskList.getInitiationDate(arn)).toBe(DatePicker.todaysDate());
        expect(taskList.getCompanyName(arn)).toBe(editted + companyName);
        expect(taskList.getProductName(arn)).toBe(editted + productName);
        expect(taskList.getOwner(arn)).toBe('- - -');
        expect(taskList.getTaskStatus(arn)).toBe('Unassigned');
    });

    it('should exist valid record in Case Details for editted case', function() {
        caseList.openCaseDetails(arn);
        expect(caseDetails.getApplicationReferenceNumber()).toBe(arn);
        expect(caseDetails.getProductName()).toBe(editted + productName);
        expect(caseDetails.getProcedureType()).toBe('Line Extension');
        expect(caseDetails.getProductStatus()).toBe('Withdrawn');
        expect(caseDetails.getCompanyName()).toBe(editted + companyName);
        expect(caseDetails.getProductNumber()).toBe(editted + productNumber);
        expect(caseDetails.getActiveSubstanceName()).toBe(editted + asn);
        expect(caseDetails.getATC()).toBe(editted + atc);
        caseDetails.edit();
        expect(caseDetails.isSMESelected()).toBe(false);
        expect(caseDetails.isBiosimilarSelected()).toBe(false);
        expect(caseDetails.isLegalActionSelected()).toBe(false);
        expect(caseDetails.isGenericSelected()).toBe(false);
        expect(caseDetails.isArticle58Selected()).toBe(false);
        expect(caseDetails.isOrphanSelected()).toBe(false);
        expect(caseDetails.isPaediatricSelected()).toBe(false);
        expect(caseDetails.isConditionalApprovalSelected()).toBe(false);
        expect(caseDetails.isExceptionalCircumstancesSelected()).toBe(false);
        caseDetails.cancel();
        confirmationPopUp.confirm();
    });

    it('should find history records for Case Editting', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[14])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[15])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[16])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[17])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[18])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[19])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[20])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[21])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[22])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[23])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[24])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[25])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[26])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[27])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[28])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[29])).toBe(true);
    });

    it('should not create Procedure Case with application reference number that exist', function() {
        caseList.clickNewCaseButton();
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setApplicationReferenceNumber(arn);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setProductName(productName);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setProcedureType('INITIAL_MA');
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setProductStatus('VALID');
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setCompanyName(companyName);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setProductNumber(productNumber);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setActiveSubstanceName(asn);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setATC(atc);
        expect(caseDetails.isApplyButtonEnabled()).toBe(false);
        caseDetails.setStartDate();
        expect(caseDetails.isApplyButtonEnabled()).toBe(true);
        caseDetails.setCHMPDate();
        expect(caseDetails.isApplyButtonEnabled()).toBe(true);
        caseDetails.applyChanges();
        expect(caseDetails.isARNDupicateAlertDisplayed()).toBe(true);
        caseDetails.closeAlertWindow();
    });

    it('should update CHMP opinion actual date', function() {
        caseList.openCaseDetails(arn);
        caseDetails.edit();
        caseDetails.setCHMPActualDate(dates[0]);
        caseDetails.save();
        confirmationPopUp.confirm();
        expect(caseDetails.getCHMPDate()).toBe(dates[0]);
    });

    it('should have valid values for all Key Milestones planned dates', function() {
        caseList.openCaseDetails(arn);
        expect(caseDetails.getECDecision()).toBe(dates[1]);
        expect(caseDetails.getEPARPublication()).toBe(dates[2]);
        expect(caseDetails.getPlannedReductionProposalReceipt()).toBe(dates[3]);
        expect(caseDetails.getPlannedAssignment()).toBe(dates[4]);
        expect(caseDetails.getPlannedValidation()).toBe(dates[5]);
        expect(caseDetails.getPlannedAssessment()).toBe(dates[6]);
        expect(caseDetails.getPlannedReductionConclusion()).toBe(dates[7]);
        expect(caseDetails.getPlannedFinalRedactedDocumentPackage()).toBe(dates[8]);
        expect(caseDetails.getPlannedPublish()).toBe(dates[9]);
    });

    it('should find history records for Milestone Updates', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[52])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[53])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[54])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[55])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[56])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[57])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[58])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[59])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[60])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[61])).toBe(true);
    });

    it('should receive EC Decision actual date and update Publish planned date', function() {
        caseList.openCaseDetails(arn);
        expect(caseDetails.getPlannedPublish()).toBe(dates[9]);
        caseDetails.edit();
        caseDetails.setECActualDate(dates[0]);
        caseDetails.save();
        confirmationPopUp.confirm();
        expect(caseDetails.getECDecision()).toBe(dates[0]);
        expect(caseDetails.getPlannedPublish()).toBe(dates[10]);
    });

    it('should find history records for received EC Decision and Publish planned date update', function() {
        caseList.openCaseDetails(arn);
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[62])).toBe(true);
        expect(historyTab.historyRecordExist(historyMessage[63])).toBe(true);
    });
});
