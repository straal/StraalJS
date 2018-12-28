import { isString } from 'src/utils';

var __straalUrl = 'https://api.straal.com/v1/encrypted';

export function setStraalUrl(straalUrl) {
    if (!isString(straalUrl)) return __straalUrl;

    __straalUrl = straalUrl;
    return __straalUrl;
}

export function getStraalUrl() {
    return __straalUrl;
}
