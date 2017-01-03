
class DropdownMenu {
    public static selectOptionByNum(element: protractor.ElementFinder, optionNum: number) {
        element.all(by.tagName('option'))
            .then(function(options: protractor.ElementFinder[]) {
                options[optionNum].click();
            });
    }

    public static selectArrayElementByNum(element: protractor.ElementArrayFinder, optionNum: number) {
        element.then(function(options: protractor.ElementFinder[]) {
                options[optionNum].click();
            });
    }

    public static selectOptionByBoolean(element: protractor.ElementFinder, optionNum: number) {
        element.all(by.tagName('option'))
            .then(function(options: protractor.ElementFinder[]) {
                if (optionNum === 1) {
                    options[1].click();
                }
                if (optionNum === 0) {
                    options[2].click();
                }
            });
    }

    public static selectOptionByValue(element: protractor.ElementFinder, optionValue: string) {
        element.$('[value="' + optionValue + '"]').click();
    }

    public static selectOptionByStringValue(element: protractor.ElementFinder, optionValue: string) {
        element.$('[value="string:' + optionValue + '"]').click();
    }
}
export = DropdownMenu;
