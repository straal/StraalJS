import { toString } from 'src/utils';

export function constructError(self, name, options) {
    var temp = Error.call(self, createErrorMessage(options));
    temp.name = self.name = name;
    self.message = temp.message;
    if (options.code) self.code = options.code;

    Object.defineProperty(self, 'stack', {
        get: function() {
            return temp.stack;
        },
        configurable: true
    });
}

export function setErrorSubclass(Constructor) {
    Constructor.prototype = Object.create(Error.prototype);
    Constructor.prototype.constructor = Constructor;
}

function createErrorMessage(options) {
    var msg = toString(options.code) + ' ' + toString(options.message);
    return msg.trim();
}
