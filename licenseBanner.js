var packages = [ require('crypto-js/package.json') ];

function getLicenseNote( pkg ) {
    var author = typeof pkg.author === 'string' ? pkg.author : get( pkg.author, 'name' ) || '';
    if( get( pkg.author, 'email' )) author += ' <' + pkg.author.email + '>';
    var note = [
        '@license',
        pkg.name + ' ' + pkg.version,
        get( pkg, 'homepage' ) || '',
        'Copyright ' + author,
        'Licensed under ' + pkg.license + ' license'
    ];

    return note.join('\n');
}

var bundleNote = packages.map( getLicenseNote );

module.exports = bundleNote.join('\n\n');

function get( obj, prop ) {
    return obj ? obj[ prop ] : undefined
}
