'use strict';

describe('The generated environment constants module', () => {

    var url;

    beforeEach(module('env'));
    beforeEach(inject((_API_URL_:string) => {
        url = _API_URL_;
    }));

    it('has a correct API_URL', () => {
        expect(url).toBe('http://localhost:8080/api/v2/');
    });

});
