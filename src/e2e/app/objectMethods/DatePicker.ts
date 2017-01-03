class DatePicker {
    public static todaysDate(): string {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; // January is 0!
        var yyyy = today.getFullYear();

        var DD: string;
        var MM: string;
        var TODAY: string;

        if (dd < 10) {
            DD = '0' + dd;
        }
        else {
            DD = '' + dd;
        }


        if (mm < 10) {
            MM = '0' + mm;
        }
        else {
            MM = '' + mm;
        }

        TODAY = DD + '/' + MM + '/' + yyyy;
        return TODAY;
    }
}

export = DatePicker;
