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

        var deferredPost = function() {
            return post(postUrl, jsonData, cryptKey, options);
        };

        return window.dftp ? window.dftp.profile(deferredPost) : deferredPost();
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

export function init(options) {
    if (!options) return;

    var nethone = options.nethone;
    var profilerURL = nethone.profilerURL;
    var sensitiveFields = nethone.sensitiveFields || [];
    // var extra = nethone.extra || { secretFields: [] };

    if (profilerURL) {
        var script = document.createElement('script');
        script.src = profilerURL;
        document.head.append(script);

        script.onload = function() {
            window.dftp.init(sensitiveFields); //, extra);
        };

        script.onerror = function() {
            console.error('Error loading ' + this.src);
        };
    }
}

export default {
    postJson: postJson,
    sendEncrypted: sendEncrypted,
    init: init
};
