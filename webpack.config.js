var webpack = require("webpack");


module.exports = {
    entry: {
        'agile'     : './workmate/static/workmate/ng/agile',
        'contacts'  : './workmate/static/workmate/ng/contacts',
        'vendor'    : './workmate/static/workmate/ng/vendor'
    },
    output: {
        path: './workmate/static/workmate/dist',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [
                    /\.(spec|e2e)\.ts$/,
                    /node_modules\/(?!(ng2-.+))/
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            beautify: true,
            mangle: true,
            unused: true,
            compress: {
                screw_ie8: true,
                keep_fnames: true,
                drop_debugger: false,
                dead_code: true,
                unused: true
            },
            comments: false
        })
    ]
};
