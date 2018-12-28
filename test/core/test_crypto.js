import { encrypt } from 'src/core/crypto';

import * as errors from 'src/errors';

var cryptoData = require('json-loader!test/fixt/cryptoData.json');

describe('Test Crypto', function() {
    it('works the same as a python version', function() {
        cryptoData.forEach(function(data) {
            var jsEncrypted = encrypt(data['message'], data['key'], data['iv']);
            expect(jsEncrypted).eq(data['encrypted']);
        });
    });

    it('encrypt throws InvalidCryptKey', function() {
        expect(function() {
            encrypt('foo', '<<Invalid key>>', cryptoData[0]['iv']);
        }).to.throw(errors.InvalidCryptKey);
    });

    it('encrypt throws InvalidCryptoMessage', function() {
        expect(function() {
            encrypt(null, cryptoData[0]['key'], cryptoData[0]['iv']);
        }).to.throw(errors.InvalidCryptoMessage);
    });
});
