import { setStraalUrl, getStraalUrl } from 'src/core/straalUrl';

describe('Test straalUrl', function() {
    it('get default url', function() {
        expect(getStraalUrl()).eq('https://api.straal.com/v1/encrypted');
    });

    it('sets custom url', function() {
        var customUrl = 'http://custom.straal.com';

        expect(setStraalUrl(customUrl)).eq(customUrl);
        expect(getStraalUrl()).eq(customUrl);
    });
});
