var webpack = require("webpack");


module.exports = {
    entry: {
        'agile'     : './workmate/static/ng/agile',
        'contacts'  : './workmate/static/ng/contacts',
        'vendor'    : './workmate/static/ng/vendor'
    },
    output: {
        path: './workmate/static/dist/js',
        filename: 'ng-[name].js'
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
            minChunks: Infinity
        }),
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
