import Promise = protractor.promise.Promise;
class HistoryTab {

    public historyRecordExist(regexp: RegExp): Promise<boolean> {

        return element.all(by.repeater('item in ctrl.historyEntries')).then(function(records: protractor.ElementFinder[]) {
            let historyRecords = [];
            for (let i = 0; i < records.length; i++) {
                historyRecords.push(records[i].element(by.xpath('./td[2]')).getText());
            }
            return protractor.promise.all(historyRecords).then((params: string[]) => {
                for (const historyRecordText of params) {
                    if (regexp.test(historyRecordText)) {
                        return true;
                    }
                }
                return false;
            });
        });
    }
}
export = HistoryTab;
