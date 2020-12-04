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

export function getBrowserParamsFactory() {
    return function getBrowserParams(){
        return {
            language: navigator.language,
            javascript_enabled: true,
            java_enabled: window.navigator.javaEnabled(),
            color_depth: window.screen.colorDepth, 
            screen_height: window.screen.height,
            screen_width: window.screen.width,
            timezone: new Date().getTimezoneOffset()
        }
    }
}

export var postJson = postJsonFactory(postEncoded);
export var sendEncrypted = sendEncryptedFactory();
export var getBrowserParams = getBrowserParamsFactory();

export default {
    postJson: postJson,
    sendEncrypted: sendEncrypted,
    getBrowserParams: getBrowserParams
};
