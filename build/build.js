const path = require('path')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')

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
                enforce: 'pre',
                loader: 'eslint-loader?fix=false',
                exclude: /node_modules|libs/
            },
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
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-cssnext')()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new OptimizeCss()
    ]
}
