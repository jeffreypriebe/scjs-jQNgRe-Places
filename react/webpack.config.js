/*eslint-disable no-var */
var fs = require('fs'),
	path = require('path'),
	webpack = require('webpack');

var clientDir = '/js';
var rootPath = __dirname + clientDir;

module.exports = {

    devtool: 'inline-source-map',

    entry: fs.readdirSync(rootPath).reduce(function(entries, dir) {
        if (fs.statSync(path.join(rootPath, dir)).isDirectory()) return entries;

        if (/app\.jsx?$/i.test(dir)) {
            entries[dir] = path.join(rootPath, dir);
        }

        return entries;
    }, {}),

     output: {
        path: __dirname + '/__build__',
        filename: '[name]',
        chunkFilename: '[id].chunk.js',
        publicPath: '/__build__/'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            { test: /\.css$/, loader: 'style!css' }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        // new webpack.ProvidePlugin({
        //     'Promise': 'promise-polyfill'
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })//,
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    ]

}
