import { constructError, setErrorSubclass } from './errorsFactory';

export function InvalidCryptKey() {
    constructError(this, 'InvalidCryptKey', {
        message:
            'Invalid cryptKey value. It should be 80 chars long, hex string.'
    });
}

setErrorSubclass(InvalidCryptKey);

export function InvalidCryptoMessage() {
    constructError(this, 'InvalidCryptoMessage', {
        message: 'Invalid message value. It should be an Object or a String.'
    });
}

setErrorSubclass(InvalidCryptoMessage);
