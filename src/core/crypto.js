import AES from 'crypto-js/aes';
import ModeCFB from 'crypto-js/mode-cfb';
import ZeroPadding from 'crypto-js/pad-zeropadding';
import Utf8 from 'crypto-js/enc-utf8';
import Hex from 'crypto-js/enc-hex';

import { isObjectLike, isString, toString } from 'src/utils';
import { InvalidCryptKey, InvalidCryptoMessage } from 'src/errors';
import {
    lengthValidator,
    hexStringValidator,
    cryptKeyValidator
} from './validators';

export function parseCryptKey(cryptKey) {
    cryptKey = toString(cryptKey);
    if (!cryptKeyValidator(cryptKey)) throw new InvalidCryptKey();

    return {
        id: cryptKey.slice(0, 16),
        key: cryptKey.slice(16, 80),
        iv1: cryptKey.slice(80, 112),
        iv2: cryptKey.slice(112, 144)
    };
}

export function encrypt(message, keyHex, ivHex) {
    if (isObjectLike(message)) message = JSON.stringify(message);
    if (!isString(message)) throw new InvalidCryptoMessage();

    var keyAndIv = parseKeyAndIv(keyHex, ivHex);

    message = Utf8.parse(message);

    var options = {
        iv: keyAndIv.iv,
        mode: ModeCFB,
        padding: ZeroPadding
    };

    var encrypted = AES.encrypt(message, keyAndIv.key, options);
    return Hex.stringify(encrypted.ciphertext);
}

function parseKeyAndIv(keyHex, ivHex) {
    if (
        !hexStringValidator(keyHex) ||
        !lengthValidator(64)(keyHex) ||
        !hexStringValidator(ivHex) ||
        !lengthValidator(32)(ivHex)
    )
        throw new InvalidCryptKey();

    return {
        key: Hex.parse(keyHex),
        iv: Hex.parse(ivHex)
    };
}
