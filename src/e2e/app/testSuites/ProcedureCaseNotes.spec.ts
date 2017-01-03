import LoginPage = require('../pageObjects/LoginPage');
import NavigationBar = require('../pageObjects/NavigationBar');
import ConfirmationPopUp = require('../pageObjects/ConfirmationPopUp');
import CaseList = require('../pageObjects/CaseList');
import CaseDetails = require('../pageObjects/CaseDetails');
import CaseFilters = require('../pageObjects/CaseFilters');
import NotesTab = require('../pageObjects/NotesTab');
import DocumentNotesTab = require('../pageObjects/DocumentNotesTab');
import DummyText = require('../resources/TextSource');
import HistoryTab = require('../pageObjects/HistoryTab');
import DocumentTab = require('../pageObjects/DocumentsTab');
import historyMessage = require('../resources/historyMessages');
import TTactions = require('../pageObjects/TTactions');


describe('Publication Case Notes', function() {
    var loginPage = new LoginPage();
    var navigationBar = new NavigationBar();
    var confirmationPopUp = new ConfirmationPopUp();
    var caseList = new CaseList();
    var caseDetails = new CaseDetails();
    var caseFilters = new CaseFilters();
    var notesTab = new NotesTab();
    var documentNotesTab = new DocumentNotesTab();
    var historyTab = new HistoryTab();
    var documentTab = new DocumentTab();
    var ttActions = new TTactions();
    var dummyText = DummyText;
    var text1: string = 'Test Note';
    var text2: string = 'Editted Note';
    var arn: string = 'EMEA/H/C/000481/II/0146';

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        loginPage.login('superuser');
        // Update Submission Details - Redaction Proposal
        ttActions.updateSubmissionDetails(arn);
        // Accept Submission
        ttActions.acceptSubmission(arn);
        // Assign Case to Coordinator/DM
        ttActions.assignCaseToCoordinator(arn);
        // Confirm List Of Documents
        ttActions.confirmListOfDocuments(arn);
        caseFilters.setApplicationReferenceNumberFilter(arn);
        caseFilters.setProcedureCaseType();
    });

    afterAll(function() {
        navigationBar.logout();
        confirmationPopUp.confirm();
    });

    beforeEach(function() {
        caseList.openCaseDetails(arn);
    });

    afterEach(function() {
        navigationBar.gotoProcedureCases();
    });


    it('should not add a new note if cancel button is pushed in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.createNewNote();
        expect(notesTab.isSaveButtonEnabled()).toBe(false);
        notesTab.addComment(text1);
        expect(notesTab.isSaveButtonEnabled()).toBe(true);
        notesTab.cancelNote();
        expect(notesTab.isNotesListEmpty()).toBe(true);
    });

    it('should not have history record for note creation in history Tab', function() {
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[8])).toBe(false);
    });

    it('should add a note successfully in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.createNewNote();
        expect(notesTab.isSaveButtonEnabled()).toBe(false);
        notesTab.addComment(text1);
        expect(notesTab.isSaveButtonEnabled()).toBe(true);
        notesTab.saveNote();
        expect(notesTab.isNotesListEmpty()).toBe(false);
        expect(notesTab.getNote(1)).toBe(text1);
    });

    it('should have history record for note creation in history Tab', function() {
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[8])).toBe(true);
    });

    it('should exist Note\'s history record for note creation ', function() {
        caseDetails.showNotes();
        notesTab.showNoteHistory(1);
        expect(notesTab.historyRecordExist(1, historyMessage[11])).toBe(true);
        expect(notesTab.getNoteHistoryRecordContent(1)).toBe(text1);
        notesTab.closeNoteHistory();
    });

    it('should edit a note and press cancel button in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.editNote(1, text2);
        notesTab.cancelEditedNote(1);
        expect(notesTab.getNote(1)).toBe(text1);
    });

    it('should not have history record for note editting in history Tab', function() {
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[9])).toBe(false);
    });

    it('should not be able to save a note whose content was deleted in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.editNote(1, '');
        expect(notesTab.isSaveButtonEnabled()).toBe(false);
        notesTab.cancelEditedNote(1);
    });

    it('should edit a note and press save button in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.editNote(1, text2);
        notesTab.saveEditedNote(1);
        confirmationPopUp.confirm();
        expect(notesTab.getNote(1)).toBe(text2);
    });

    it('should have history record for note editting in history Tab', function() {
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[9])).toBe(true);
    });

    it('should exist Note\'s history record for note modification ', function() {
        caseDetails.showNotes();
        notesTab.showNoteHistory(1);
        expect(notesTab.historyRecordExist(2, historyMessage[12])).toBe(true);
        expect(notesTab.getNoteHistoryRecordContent(2)).toBe(text2);
        notesTab.closeNoteHistory();
    });

    it('should save the first 4000 characters if provided text is over 4000 characters in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.editNote(1, dummyText.overLimit);
        notesTab.saveEditedNote(1);
        confirmationPopUp.confirm();
        expect(notesTab.getNote(1)).toBe(dummyText.underLimit);
    });

    it('should edit a note if provided text is 4000 characters in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.editNote(1, dummyText.underLimit);
        notesTab.saveEditedNote(1);
        confirmationPopUp.confirm();
        expect(notesTab.getNote(1)).toBe(dummyText.underLimit);
    });

    it('should not delete a note if user do not confirm in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.deleteNote(1);
        confirmationPopUp.dontCorfirm();
        expect(notesTab.isNotesListEmpty()).toBe(false);
    });

    it('should not have history record for note deletion in history Tab', function() {
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[10])).toBe(false);
    });

    it('should delete a note if user confirm in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.deleteNote(1);
        confirmationPopUp.confirm();
        expect(notesTab.isNotesListEmpty()).toBe(true);
    });

    it('should display deleted notes in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.showDeletedNotes();
        expect(notesTab.isNotesListEmpty()).toBe(false);
        notesTab.hideDeletedNotes();
        expect(notesTab.isNotesListEmpty()).toBe(true);
    });

    it('should have history record for note deletion in history Tab', function() {
        caseDetails.showHistory();
        expect(historyTab.historyRecordExist(historyMessage[10])).toBe(true);
    });

    it('should exist Note\'s history record for note Deletion in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.showDeletedNotes();
        notesTab.showNoteHistory(1);
        expect(notesTab.historyRecordExist(4, historyMessage[13])).toBe(true);
        expect(notesTab.getNoteHistoryRecordContent(4)).toBe(dummyText.underLimit);
        notesTab.closeNoteHistory();
        notesTab.hideDeletedNotes();
    });

    it('should create Note with first 4000 characters if user provide text over 4000 characters in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.createNewNote();
        expect(notesTab.isSaveButtonEnabled()).toBe(false);
        notesTab.addComment(dummyText.overLimit);
        expect(notesTab.isSaveButtonEnabled()).toBe(true);
        notesTab.saveNote();
        expect(notesTab.isNotesListEmpty()).toBe(false);
        expect(notesTab.getNote(1)).toBe(dummyText.underLimit);
    });

    it('should create Note if provided text has 4000 characters in case Note\'s Tab', function() {
        caseDetails.showNotes();
        notesTab.createNewNote();
        expect(notesTab.isSaveButtonEnabled()).toBe(false);
        notesTab.addComment(dummyText.underLimit);
        expect(notesTab.isSaveButtonEnabled()).toBe(true);
        notesTab.saveNote();
        expect(notesTab.isNotesListEmpty()).toBe(false);
        expect(notesTab.getNote(2)).toBe(dummyText.underLimit);
    });

    ///////// Document Case Details Note Tab /////////

    it('should add a document note from document\'s action button', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickAddNoteButton(1);
        expect(notesTab.isSaveButtonEnabled()).toBe(false);
        notesTab.addComment(text1);
        expect(notesTab.isSaveButtonEnabled()).toBe(true);
        notesTab.saveNote();
        confirmationPopUp.confirm();
    });

    it('should be able to view note in document case details note\'s tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        expect(documentNotesTab.getNote(1)).toBe(text1);
    });

    it('should exist Note\'s history record for note creation in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.showNoteHistory(1);
        expect(documentNotesTab.historyRecordExist(1, historyMessage[11])).toBe(true);
        expect(documentNotesTab.getNoteHistoryRecordContent(1)).toBe(text1);
        documentNotesTab.closeNoteHistory();
    });

    it('should edit a note and press cancel button in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.editNote(1, text2);
        documentNotesTab.cancelEditedNote(1);
        expect(documentNotesTab.getNote(1)).toBe(text1);
    });

    it('should not be able to save a note whose content was deleted in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.editNote(1, '');
        expect(documentNotesTab.isSaveEditedButtonEnabled(1)).toBe(false);
        documentNotesTab.cancelEditedNote(1);
    });

    it('should edit a note and press save button in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.editNote(1, text2);
        documentNotesTab.saveEditedNote(1);
        confirmationPopUp.confirm();
        expect(documentNotesTab.getNote(1)).toBe(text2);
    });

    it('should exist Note\'s history record for note modification in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.showNoteHistory(1);
        expect(documentNotesTab.historyRecordExist(2, historyMessage[12])).toBe(true);
        expect(documentNotesTab.getNoteHistoryRecordContent(2)).toBe(text2);
        documentNotesTab.closeNoteHistory();
    });

    it('should save the first 4000 characters if provided text is over 4000 characters in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.editNote(1, dummyText.overLimit);
        documentNotesTab.saveEditedNote(1);
        confirmationPopUp.confirm();
        expect(documentNotesTab.getNote(1)).toBe(dummyText.underLimit);
    });

    it('should not delete a note if user do not confirm in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.deleteNote(1);
        confirmationPopUp.dontCorfirm();
        expect(documentNotesTab.isNotesListEmpty()).toBe(false);
    });

    it('should delete a note if user confirm in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.deleteNote(1);
        confirmationPopUp.confirm();
        expect(documentNotesTab.isNotesListEmpty()).toBe(true);
    });

    it('should display deleted notes in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.showDeletedNotes();
        expect(documentNotesTab.isNotesListEmpty()).toBe(false);
        documentNotesTab.hideDeletedNotes();
        expect(documentNotesTab.isNotesListEmpty()).toBe(true);
    });

    it('should exist Note\'s history record for note Deletion in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.showDeletedNotes();
        documentNotesTab.showNoteHistory(1);
        expect(documentNotesTab.historyRecordExist(4, historyMessage[13])).toBe(true);
        expect(documentNotesTab.getNoteHistoryRecordContent(4)).toBe(dummyText.underLimit);
        documentNotesTab.closeNoteHistory();
        documentNotesTab.hideDeletedNotes();
    });

    it('should create Note with first 4000 characters if user provide text over 4000 characters in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.createNewNote();
        expect(documentNotesTab.isSaveButtonEnabled()).toBe(false);
        documentNotesTab.addComment(dummyText.overLimit);
        expect(documentNotesTab.isSaveButtonEnabled()).toBe(true);
        documentNotesTab.saveNote();
        expect(documentNotesTab.isNotesListEmpty()).toBe(false);
        expect(documentNotesTab.getNote(1)).toBe(dummyText.underLimit);
    });

    it('should create Note if provided text has 4000 characters in document details Note\'s Tab', function() {
        caseDetails.showDocuments();
        documentTab.expandActionButton(1);
        documentTab.clickViewNotesButton(1);
        documentNotesTab.createNewNote();
        expect(documentNotesTab.isSaveButtonEnabled()).toBe(false);
        documentNotesTab.addComment(dummyText.underLimit);
        expect(documentNotesTab.isSaveButtonEnabled()).toBe(true);
        documentNotesTab.saveNote();
        expect(documentNotesTab.isNotesListEmpty()).toBe(false);
        expect(documentNotesTab.getNote(2)).toBe(dummyText.underLimit);
    });
});
