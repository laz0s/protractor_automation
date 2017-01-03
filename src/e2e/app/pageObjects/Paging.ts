class Paging {
    // User provide the number of page to be displayed
    public goToPage(num: number) {
        element(by.id('publication-cases-paginator-goto-' + num)).click();
    }
}
export = Paging;
