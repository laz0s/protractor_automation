import CaseList = require('./CaseList');
import BdbusUserTask = require('./BdbusUserTask');
import ConfirmationPopUp = require('./ConfirmationPopUp');
import AtdUserTask = require('./AtduserTask');
import CaseDetails = require('../pageObjects/CaseDetails');
import DocumentsTab = require('../pageObjects/DocumentsTab');
import NavigationBar = require('../pageObjects/NavigationBar');
import TaskFilters = require('../pageObjects/TaskFilters');
import TaskList = require('../pageObjects/TaskList');
import CaseFilters = require('../pageObjects/CaseFilters');
import Credentials = require('../resources/Credentials');

import dossierLink = require('../resources/dossierLinks');

const dreamLink: string = 'https://www.google.com';
// const note1: string = 'test redaction proposal note';
// const note2: string = 'Assign Case to Coordinator Test Note';

class TTactions {
    private caseList = new CaseList();
    private bdbusUserTask = new BdbusUserTask();
    private confirmationPopUp = new ConfirmationPopUp();
    private atdUserTask = new AtdUserTask();
    private caseDetails = new CaseDetails();
    private documentsTab = new DocumentsTab();
    private navigationBar = new NavigationBar();
    private taskFilters = new TaskFilters();
    private taskList = new TaskList();
    private caseFilters = new CaseFilters();

    public updateSubmissionDetails(arn: string): void {
        this.caseList.openActiveTask(arn);
        this.bdbusUserTask.setDossierLink(dossierLink[0]);
        this.bdbusUserTask.setDreamLink(dreamLink);
        this.bdbusUserTask.setSubmissionDate();
        // this.bdbusUserTask.setNotes(note1);
        this.bdbusUserTask.notifyCDPReviewGroup();
        this.confirmationPopUp.confirm();
    }
    public acceptSubmission(arn: string): void {
        this.caseList.openActiveTask(arn);
        this.atdUserTask.accept();
        this.confirmationPopUp.confirm();
    }
    public assignCaseToCoordinator(arn: string): void {
        this.caseList.openActiveTask(arn);
        this.atdUserTask.setCaseCoordinator(Credentials.atd[0]);
        this.atdUserTask.setDocumentManager(Credentials.atdadmin[0]);
        // this.atdUserTask.setNote(note2);
        this.atdUserTask.assign();
        this.confirmationPopUp.confirm();
    }
    public selectDocument(arn: string, docNum: number): void {
        this.caseList.openCaseDetails(arn);
        this.caseDetails.showDocuments();
        this.documentsTab.selectDocument(docNum);
        this.navigationBar.gotoProcedureCases();
    }
    public confirmListOfDocuments(arn: string): void {
        this.caseList.openActiveTask(arn);
        this.atdUserTask.completeTask();
        this.confirmationPopUp.confirm();
    }
    public completeTaskValidation(arn: string): void {
        this.caseList.openActiveTask(arn);
        this.atdUserTask.completeTask();
        this.confirmationPopUp.confirm();
    }
    public completeDocumentAssessment(arn: string): void {
        this.navigationBar.gotoTaskList();
        this.taskFilters.expandTaskFilters();
        this.taskFilters.setApplicationReferenceNumberFilter(arn);
        this.taskFilters.setTaskTypeFilter(11);
        this.taskFilters.filterTasks();
        this.taskList.openActiveTask(arn);
        this.atdUserTask.completeTask();
        this.confirmationPopUp.confirm();
        this.navigationBar.gotoProcedureCases();
    }
    public confirmRedactionConclusionSent(arn: string): void {
        this.caseList.openActiveTask(arn);
        this.atdUserTask.completeTask();
        this.confirmationPopUp.confirm();
    }
    public confirmReceivedAgreement(arn: string): void {
        this.caseList.openActiveTask(arn);
        this.atdUserTask.completeTask();
        this.confirmationPopUp.confirm();
    }
    public setSiamedDates(arn: string): void {
        this.caseFilters.clearFilters();
        this.caseList.openCaseDetails(arn);
        this.caseDetails.edit();
        this.caseDetails.setECDecisionAD();
        this.caseDetails.setEPARpublishmentAD();
        this.caseDetails.save();
        this.confirmationPopUp.confirm();
    }
}

export = TTactions;
