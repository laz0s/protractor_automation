import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseList = require('../pageObjects/CaseList');
import CaseDetails = require('../pageObjects/CaseDetails');
// import HistoryTab = require('../pageObjects/HistoryTab');
import DocumentTab = require('../pageObjects/DocumentsTab');
import AtdUserTask = require('../pageObjects/AtduserTask');
// import TaskList = require('../pageObjects/TaskList');
// import TaskFilters = require('../pageObjects/TaskFilters');
import CaseFilters = require('../pageObjects/CaseFilters');
// import procedureStatus = require('../resources/ProcedureStatus');
// import tasks = require('../resources/Tasks');
// import historyMessage = require('../resources/historyMessages');
import TTactions = require('../pageObjects/TTactions');

describe('ATD User Validate Procedure Case', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var caseDetails = new CaseDetails();
    // var historyTab = new HistoryTab();
    var documentTab = new DocumentTab();
    var atdUserTask = new AtdUserTask();
    // var taskList = new TaskList();
    // var taskFilters = new TaskFilters();
    var caseFilters = new CaseFilters();
    var ttActions = new TTactions();
    var arn: string = 'EMEA/H/C/001109/II/0044';
    // var taskTypeValue1: string = 'completeDocumentValidation';
    // var taskTypeValue2: string = 'completeDocumentAssessment';
    var caseCoordinator;
    var documentManager;
    var assignee1;
    var assignee2;
    var caseID;

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        loginPage.login('atd');
        caseFilters.clearFilters();
        // Update Submission Details - Redaction Proposal
        ttActions.updateSubmissionDetails(arn);
        // Accept Submission
        ttActions.acceptSubmission(arn);
        // Assign Case to Coordinator/DM
        ttActions.assignCaseToCoordinator(arn);
        // Confirm List Of Documents
        ttActions.confirmListOfDocuments(arn);
    });

    afterEach(function() {
        navigationBar.gotoProcedureCases();
    });

    it('should select all documents of the Procedure Case', function() {
        caseList.openCaseDetails(arn);
        caseCoordinator = caseDetails.getCurrentCoordinator();
        caseDetails.showDocuments();
        documentTab.selectDocument(1);
        documentTab.selectDocument(3);
        expect(documentTab.getAssignee(1)).toBe(caseCoordinator);
        expect(documentTab.getAssignee(2)).toBe(caseCoordinator);
        expect(documentTab.getAssignee(3)).toBe(caseCoordinator);
    });

    it('should validate two documents', function() {
        caseList.openCaseDetails(arn);
        documentManager = caseDetails.getCurrentDocumentManager();
        caseDetails.showDocuments();
        documentTab.clickDocumentTask(2);
        atdUserTask.completeTask();
        confirmationPopUp.confirm();
        documentTab.clickDocumentTask(3);
        atdUserTask.completeTask();
        confirmationPopUp.confirm();
        expect(documentTab.getAssignee(2)).toBe(documentManager);
        expect(documentTab.getAssignee(3)).toBe(documentManager);
    });

    it('should reassign CC and DM and verify valid owners of documents', function() {
        caseList.openCaseDetails(arn);
        // Get Case Id splitting URL Path
        browser.getCurrentUrl().then(function(actualUrl: string) {
            let x: string[] = actualUrl.split('/');
            caseID = x[x.length - 2];
            caseCoordinator = caseDetails.getCurrentCoordinator();
            documentManager = caseDetails.getCurrentDocumentManager();
            browser.sleep(2000);
            caseDetails.showDocuments();
            documentTab.setAssignee(2, 'testatd');
            assignee1 = documentTab.getAssignee(1);
            assignee2 = documentTab.getAssignee(2);
            navigationBar.gotoProcedureCases();
            caseList.expandActionButton(arn);
            caseList.reassignProcedure(caseID);
            atdUserTask.setCaseCoordinator('atd');
            atdUserTask.setDocumentManager('atdadmin');
            atdUserTask.assign();
            confirmationPopUp.confirm();
            caseList.openCaseDetails(arn);
            caseCoordinator = caseDetails.getCurrentCoordinator();
            documentManager = caseDetails.getCurrentDocumentManager();
            browser.sleep(2000);
            caseDetails.showDocuments();
            expect(documentTab.getAssignee(1)).toBe(assignee1);
            expect(documentTab.getAssignee(2)).toBe(assignee2);
            expect(documentTab.getAssignee(3)).toBe(documentManager);

        });
    });
});
