/* global VERSION XDomainRequest*/

import { objectHas, isString, isObjectLike, isFunction } from 'src/utils';
import {
    UnsupportedBrowser,
    InvalidRequestMessage,
    InvalidUrl
} from 'src/errors';

import { parseCryptKey, encrypt } from './crypto';

export function postEncoded(url, jsonData, cryptKey, options) {
    var parsedCryptKey = parseCryptKey(cryptKey);
    var encryptedData =
        parsedCryptKey.id +
        encrypt(jsonData, parsedCryptKey.key, parsedCryptKey.iv1);

    return post(url, encryptedData, {
        success: function(response, reqObj) {
            if (!objectHas(options, 'success') || !isFunction(options.success))
                return;

            try {
                options.success(reqObj);
            } catch (err) {
                if (options.fail && isFunction(options.fail))
                    options.fail(reqObj);
                else throw err;
            }
        },
        fail: function(reqObj) {
            if (objectHas(options, 'fail') && isFunction(options.fail))
                options.fail(reqObj);
        }
    });
}

export function post(url, data, options) {
    if (!isString(data)) throw new InvalidRequestMessage();
    if (!isString(url)) throw new InvalidUrl();

    if (!isObjectLike(options)) options = {};

    if (!isObjectLike(options.headers)) options.headers = {};
    options.headers['Content-Type'] = 'text/plain; charset=utf-8';
    options.headers['straal-straaljs-version'] = VERSION;

    var xhr = null,
        xdr = null,
        req = null;

    xhr = getCORSXHR();
    if (xhr === null) xdr = getXDR();
    req = xhr || xdr;

    if (xhr !== null) {
        xhr.open('POST', url, true);

        Object.keys(options.headers).forEach(function(key) {
            var value = options.headers[key];

            xhr.setRequestHeader(key, value);
        });

        xhr.onreadystatechange = successCallback;
    } else if (xdr !== null) {
        xdr.open('POST', url);

        xdr.onload = successCallback;
        xdr.error = errorCallback;
    } else {
        throw new UnsupportedBrowser();
    }

    req.send(data);
    return req;

    function successCallback() {
        if (xdr !== null) {
            options.success(xdr.responseText, req);
        } else if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var locationHeader = xhr.getResponseHeader('Location');
                if (locationHeader && locationHeader !== '') {
                    window.location = locationHeader;
                } else {
                    options.success(xhr.responseText, req);
                }
            } else if (xhr.status === 0) {
                options.fail(req);
            } else {
                var rawHeaders = xhr.getAllResponseHeaders(),
                    headers = {},
                    reHeader = /([\w-_]+):\s+(.*)$/gm,
                    tmp;
                while ((tmp = reHeader.exec(rawHeaders))) {
                    headers[tmp[1]] = tmp[2];
                }

                options.fail(req);
            }
        }
    }

    function errorCallback() {
        options.fail(req);
    }
}

function getCORSXHR() {
    var xhr = new XMLHttpRequest();

    return 'withCredentials' in xhr ? xhr : null;
}

function getXDR() {
    try {
        return new XDomainRequest();
    } catch (error) {
        return null;
    }
}
