export function objectHas( object, key ) {
    return object != null && hasOwnProperty.call(object, key)
}
