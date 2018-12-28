/*eslint-env node*/
var path = require('path');

module.exports = function(config) {
    config.set({
        files: [
            'test/**/test_*.js'
        ],

        preprocessors: {
            'test/**/test_*.js': [ 'webpack' ]
        },

        webpack: {
            resolve: {
                extensions: [ '.js' ],
                modules: [
                    __dirname,
                    path.resolve( __dirname, './node_modules' )
                ]
            },
            devtool: 'inline-source-map'
        },

        autoWatch: true,
        singleRun: false,
        port: 9876,
        colors: true,
        concurrency: Infinity,

        browsers: [ 'PhantomJS' ],
        frameworks: [ 'mocha', 'chai', 'sinon' ],
        reporters: [ 'mocha' ],
    });
};
