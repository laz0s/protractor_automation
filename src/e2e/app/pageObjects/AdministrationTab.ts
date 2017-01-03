class AdministrationTab {
    public publishProcedureCase(): void {
        element(by.id('btnAdvanceWorkflow')).click();
    }
    public watermarkProcedureCase(): void {
        element(by.id('btnPassWatermark')).click();
    }
    public cancelCase(): void {
        element(by.id('btnCancel')).click();
    }
    public reopenCase(): void {
        element(by.id('btnReopen')).click();
    }
    public replaceFinalPackage(): void {
        element(by.id('btnRequest')).click();
    }
    public setCancellationReason(text: string): void {
        element(by.id('cancellationReason')).sendKeys(text);
    }
    public startNotice(): void {
        element(by.id('btnPublish')).click();
    }
}

export = AdministrationTab;
