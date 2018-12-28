import { isString } from './isString';
import { isArray } from './isArray';


export function toString( data ) {
    if( data == null ) return '';
    if( isString( data )) return data;
    if( isArray( data )) return data.map( toString ).join(',');

    var result = '' + data;
    return (result == '0' && (1 / data) == -( 1/0 )) ? '-0' : result;
}
