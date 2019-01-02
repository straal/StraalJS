/*eslint-env node*/
const path = require('path');
const webpack = require('webpack');
const licenseBanner = require('./licenseBanner');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'straaljs.bundle': ['src/index.js'],
        'straaljs.min': ['src/index.js']
    },
    output: {
        path: path.join(__dirname, 'lib'),
        filename: '[name].js',
        library: 'Straal',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js'],
        modules: [__dirname, path.resolve(__dirname, './node_modules')]
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(process.env.npm_package_version)
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJSPlugin({
            uglifyOptions: {
                comments: false,
                compress: {
                    warnings: false
                }
            }
        }),
        new webpack.BannerPlugin(licenseBanner)
    ]
};
