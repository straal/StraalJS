export function isFunction( data ) {
    return Object.prototype.toString.call( data ) == '[object Function]';
}
