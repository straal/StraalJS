import { isObjectLike } from './isObjectLike';

export function buildOptions(opt) {
    if (!isObjectLike(opt)) return;

    var options = {};

    if (opt.success) options.success = opt.success;
    if (opt.error) options.error = opt.error;
    if (opt.headers) options.headers = opt.headers;

    return options;
}
