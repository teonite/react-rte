/*eslint-env node */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var loaders = [
    {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
    },
    {
        test: /\.css$/,
        exclude: /\.global\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]'),
    },
    {test: /\.global\.css$/, loader: 'style!raw'},
];

module.exports = [{
    entry: './src/RichTextEditor.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-rte.js',
        libraryTarget: 'commonjs2',
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
    },
    module: {loaders: loaders},
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            comments: true,
            mangle: false,
            compress: {
                dead_code: true,
            },
        }),
        new ExtractTextPlugin('[name].css'),
    ],
}, {
    entry: './src/demo.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'demo.js',
    },
    module: {loaders: loaders},
    plugins: [
        new ExtractTextPlugin('demo_[name].css'),
    ]
}];
