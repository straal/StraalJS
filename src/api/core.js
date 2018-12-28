import { postEncoded } from 'src/core/requests';
import { getStraalUrl } from 'src/core/straalUrl';
import { isString } from 'src/utils';
import { InvalidUrl } from 'src/errors';

export function postJsonFactory(post) {
    return function postJson(url, jsonData, cryptKey, options) {
        var postUrl;
        if (url !== null) {
            if (!isString(url)) throw new InvalidUrl();
            postUrl = url;
        } else {
            postUrl = getStraalUrl();
        }

        return post(postUrl, jsonData, cryptKey, options);
    };
}

export function sendEncryptedFactory() {
    var postJson = postJsonFactory(postEncoded);
    return function sendEncrypted(cryptKey, jsonData, options) {
        postJson(null, jsonData, cryptKey, options);
    };
}

export var postJson = postJsonFactory(postEncoded);
export var sendEncrypted = sendEncryptedFactory();

export default {
    postJson: postJson,
    sendEncrypted: sendEncrypted
};
