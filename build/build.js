const path = require('path')

module.exports = {
    mode: 'production',
    devtool: false,
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'ReactPictureViewer.min.js',
        library: 'ReactPictureViewer',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader?singleton=true',
                    'css-loader'
                ]
            }
        ]
    }
}
