var webpack = require("webpack");


module.exports = {
    entry: {
        'vendor': './workmate/static/workmate/ng/vendor.ts',
        'contacts': './workmate/static/workmate/ng/contacts.ts'
    },
    output: {
        path: './workmate/static/workmate/dist',
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
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        new webpack.optimize.UglifyJsPlugin({sourceMap: false})
    ]
};
