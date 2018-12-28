import { toString } from 'src/utils';

var _hex_regex = /^[0-9A-F]{2,}$/i;

export function lengthValidator( length ) {
    return function( data ) {
        var strVal = toString( data );
        return strVal.length === length;
    };
}

export function cryptKeyValidator( data ){
    return _hex_regex.test( data ) && lengthValidator( 144 )( data );
}

export function hexStringValidator( data ){
    return _hex_regex.test( data );
}
