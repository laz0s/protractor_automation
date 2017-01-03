import Promise = webdriver.promise.Promise;

class PublishHistoryTab {
    private pubHistoryTable: protractor.ElementArrayFinder;

    constructor() {
        this.pubHistoryTable = element.all(by.repeater('item in ctrl.publishedDossiers'));
    }

    public getDossierLink(num: number): Promise<string> {
        return element(by.id('dossier-document-link-' + num)).getText().then((text: string) => {
            return text.trim();
        });
    }
    public isPubHistoryEmpty(): Promise<boolean> {
        return this.pubHistoryTable.count().then(function(pubHistoryElements: number) {
            if (pubHistoryElements === 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}

export= PublishHistoryTab;
