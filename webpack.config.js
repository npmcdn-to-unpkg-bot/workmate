var path = require('path');
var webpack = require("webpack");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


module.exports = {
    entry: {
        'vendor': './workmate/static/workmate/ng/vendor.ts',
        'boot': './workmate/static/workmate/ng/boot.ts'
    },
    output: {
        path: './workmate/static/workmate/js',
        filename: '[name].js',
        pathinfo: true
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader', exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]}
        ]
    },
    plugins: [
        new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity})
    ]
};
