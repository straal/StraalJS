import { constructError, setErrorSubclass } from './errorsFactory';

export function UnsupportedBrowser() {
    constructError(this, 'UnsupportedBrowser', {
        message: 'Unsupported browser.'
    });
}

setErrorSubclass(UnsupportedBrowser);
