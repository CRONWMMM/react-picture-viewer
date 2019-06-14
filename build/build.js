const path = require('path')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: false,
    entry: [ '@babel/polyfill', path.resolve(__dirname, '../src/index.js')],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/ReactPictureViewer.min.js'
    },
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
                include: [path.resolve(__dirname, '../src')],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [
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
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/ReactPictureViewer.min.css',
            allChunks: true
        }),
        new OptimizeCss()
    ]
}