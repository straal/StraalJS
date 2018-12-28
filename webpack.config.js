/*eslint-env node*/
var path = require('path');
var webpack = require('webpack');
var licenseBanner = require('./licenseBanner');

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
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            comments: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin(licenseBanner)
    ]
};
