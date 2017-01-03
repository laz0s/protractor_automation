import Promise = webdriver.promise.Promise;

class NotesTab {
    // Buttons
    private saveButton: protractor.ElementFinder;
    private cancelButton: protractor.ElementFinder;
    private showDeletedButton: protractor.ElementFinder;
    // Lists of Elements
    private listOfNotes: protractor.ElementArrayFinder;

    constructor() {
        // Button Locators
        this.saveButton = element(by.id('editNoteForm-save-add-new-note-editor'));
        this.cancelButton = element(by.id('editNoteForm-cancel-add-new-note-editor'));
        this.showDeletedButton = element(by.id('show-deleted-notes'));
        // List of Elements locators
        this.listOfNotes = element.all(by.repeater('item in ctrl.notes'));
    }

    // Button Methods
    public createNewNote(): void {
        element(by.id('add-new-note')).click();
    }
    public addComment(text: string): void {
        element(by.id('editNotesArea-add-new-note-editor')).sendKeys(text);
    }
    public saveNote(): void {
        this.saveButton.click();
    }
    public cancelNote(): void {
        this.cancelButton.click();
    }
    public closeNoteHistory(): void {
        element(by.buttonText('Close')).click();
    }
    public expandNote(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('procedure-expand-note-' + arrayNum)).click();
    }
    public collapseNote(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('procedure-collapse-note-' + arrayNum)).click();
    }
    public saveEditedNote(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('editNoteForm-save-procedure-edit-note-' + arrayNum)).click();
    }
    public cancelEditedNote(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('editNoteForm-cancel-procedure-edit-note-' + arrayNum)).click();
    }
    public clickEditButton(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('procedure-start-edit-note-' + arrayNum)).click();
    }
    public deleteNote(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('procedure-delete-note-' + arrayNum)).click();
    }
    public showNoteHistory(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('procedure-show-note-history-' + arrayNum)).click();
    }
    public showDeletedNotes(): void {
        this.showDeletedButton.click();
    }
    public hideDeletedNotes(): void {
        this.showDeletedButton.click();
    }

    // Validation Methods
    /** Returns true if save button is disabled */
    public isSaveButtonEnabled(): Promise<boolean> {
        return this.saveButton.isPresent();
    }
    public isNotesListEmpty(): Promise<boolean> {
        return this.listOfNotes.count().then(function(listNoteElements: number) {
            if (listNoteElements === 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    public historyRecordExist(num: number, regExp: RegExp): Promise<boolean> {
        return this.getNoteHistoryRecordHeader(num).then((headerText: string) => {
            return regExp.test(headerText);
        });
    }

    // Set Methods
    /** This function make editable a note, clear the old comment, and send to
        the displayed textarea a comment given by the user.
        Description of editNote's function parameters:
        - First parameter 'num' specifies which note to be opened. If user provide
            num=3 then the third note of the displayed note's list will be edited.
        - Second Parameter 'text' specifies the comment the user provides */
    public editNote(num: number, text: string): void {
        let arrayNum: number = num - 1;
        this.clickEditButton(num);
        element(by.id('editNotesArea-procedure-edit-note-' + arrayNum)).clear();
        element(by.id('editNotesArea-procedure-edit-note-' + arrayNum)).sendKeys(text);
    }

    // Get methods
    /** The content of a comment is returned. User must specify in the parameter
        which comment's content to be returned*/
    public getNote(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('procedure-show-note-' + arrayNum)).getText();
    }
    public getNoteHistoryRecordContent(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('note-hist-value-idx-' + arrayNum)).getText();
    }
    private getNoteHistoryRecordHeader(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('note-hist-head-idx-' + arrayNum)).getText();
    }
}
export = NotesTab;
