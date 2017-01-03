import Promise = webdriver.promise.Promise;
class DocumentNotesTab {
    private showDeletedButton: protractor.ElementFinder;
    private saveButton: protractor.ElementFinder;

    constructor() {
        this.showDeletedButton = element(by.id('show-deleted-notes'));
        this.saveButton = element(by.id('editNoteForm-save-add-new-note-editor'));
    }

    public getNote(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('document-show-note-' + arrayNum)).getText();
    }
    public showNoteHistory(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('document-show-note-history-' + arrayNum)).click();
    }
    public historyRecordExist(num: number, regExp: RegExp): Promise<boolean> {
        return this.getNoteHistoryRecordHeader(num).then((headerText: string) => {
            return regExp.test(headerText);
        });
    }
    public getNoteHistoryRecordContent(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('note-hist-value-idx-' + arrayNum)).getText();
    }
    public closeNoteHistory(): void {
        element(by.buttonText('Close')).click();
    }
    public editNote(num: number, text: string): void {
        let arrayNum: number = num - 1;
        this.clickEditButton(num);
        element(by.id('editNotesArea-document-edit-note-' + arrayNum)).clear();
        element(by.id('editNotesArea-document-edit-note-' + arrayNum)).sendKeys(text);
    }
    public clickEditButton(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('procedure-start-edit-note-' + arrayNum)).click();
    }
    public cancelEditedNote(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('editNoteForm-cancel-document-edit-note-' + arrayNum)).click();
    }
    private getNoteHistoryRecordHeader(num: number): Promise<string> {
        let arrayNum: number = num - 1;
        return element(by.id('note-hist-head-idx-' + arrayNum)).getText();
    }
    public saveEditedNote(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('editNoteForm-save-document-edit-note-' + arrayNum)).click();
    }
    public isSaveEditedButtonEnabled(num: number): Promise<boolean> {
        let arrayNum: number = num - 1;
        return element(by.id('editNoteForm-save-document-edit-note-' + arrayNum)).isPresent();
    }
    public deleteNote(num: number): void {
        let arrayNum: number = num - 1;
        element(by.id('procedure-delete-note-' + arrayNum)).click();
    }
    public isNotesListEmpty(): Promise<boolean> {
        return element.all(by.repeater('item in ctrl.notes')).count().then(function(listNoteElements: number) {
            if (listNoteElements === 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    public showDeletedNotes(): void {
        this.showDeletedButton.click();
    }
    public hideDeletedNotes(): void {
        this.showDeletedButton.click();
    }
    public createNewNote(): void {
        element(by.id('add-new-note')).click();
    }
    public isSaveButtonEnabled(): Promise<boolean> {
        return this.saveButton.isPresent();
    }
    public addComment(text: string): void {
        element(by.id('editNotesArea-add-new-note-editor')).sendKeys(text);
    }
    public saveNote(): void {
        element(by.id('editNoteForm-save-add-new-note-editor')).click();
    }
}
export = DocumentNotesTab;
