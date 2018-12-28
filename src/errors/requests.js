import { constructError, setErrorSubclass } from './errorsFactory';

export function InvalidRequestMessage() {
    constructError(this, 'InvalidRequestMessage', {
        message: 'Invalid message to post.'
    });
}

setErrorSubclass(InvalidRequestMessage);

export function InvalidUrl() {
    constructError(this, 'InvalidUrl', {
        message: 'Invalid url.'
    });
}

setErrorSubclass(InvalidUrl);

export function RequestTimeout(timeoutSeconds) {
    constructError(this, 'RequestTimeout', {
        message: 'Request timeout after ' + timeoutSeconds + ' seconds.'
    });
}

setErrorSubclass(RequestTimeout);
