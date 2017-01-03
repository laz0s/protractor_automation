import Promise = webdriver.promise.Promise;

class DossierTab {
    // Expand Button Methods
    // User provide the number of the element to expand
    public expandSubmittedDossier(num: number): void {
        let arrayNum = num - 1;
        element(by.id('dossier-expand-' + arrayNum)).click();
    }

    // Get Methods
    // User provide the number of the expanded row from which the value of element want to be returned
    public getDossierType(num: number): Promise<string> {
        let arrayNum = num - 1;
        return element(by.id('dossier-type-' + arrayNum)).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getDossierLink(num: number): Promise<string> {
        let arrayNum = num - 1;
        return element(by.id('dossier-document-link-' + arrayNum)).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getDreamLink(num: number): Promise<string> {
        let arrayNum = num - 1;
        return element(by.id('dossier-justification-link-' + arrayNum)).getText().then((value: string) => {
            return value.trim();
        });
    }
    public getNote(num: number): Promise<string> {
        let arrayNum = num - 1;
        return element(by.id('dossier-notes-' + arrayNum)).getText();
    }
    public getPartial(num: number): Promise<string> {
        let arrayNum = num - 1;
        return element(by.id('dossier-partial-' + arrayNum)).getText();
    }
    public getDate(num: number): Promise<string> {
        let arrayNum = num - 1;
        return element(by.id('dossier-date-' + arrayNum)).getText();
    }
}

export = DossierTab;
