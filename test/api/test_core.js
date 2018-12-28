/*global before, sinon*/
import Straal from 'src';
import { postJsonFactory } from 'src/api/core';

describe('Test Straal.core', function() {
    it('has correct static api', function() {
        expect(Straal.core).to.have.all.deep.keys('postJson');
    });

    it('has correct api', function() {
        var straal = Straal;

        expect(straal.core).to.have.all.deep.keys('postJson');
    });

    describe('Test postJson', function() {
        before(function() {
            this.postEncodedMock = sinon.spy();
        });

        afterEach(function() {
            this.postEncodedMock.resetHistory();
        });

        it('calls postEncoded with prefixed url', function() {
            var postJson = postJsonFactory(this.postEncodedMock);

            postJson('https://api.straal.com/v1/test');

            expect(
                this.postEncodedMock.alwaysCalledWith(
                    'https://api.straal.com/v1/test'
                )
            ).to.be.true;
        });

        it('calls postEncoded with passed arguments', function() {
            var postJson = postJsonFactory(this.postEncodedMock);

            var args = [
                'https://api.straal.com/v1/test',
                { data: 'test' },
                'cryptKey',
                { success: function() {} }
            ];

            postJson.apply(null, args);

            args[0] = 'https://api.straal.com/v1/test';

            expect(this.postEncodedMock.firstCall.args).to.deep.equal(args);
        });
    });
});
