const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname, '../example/index.js'),
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    devServer: {
        overlay: {
            errors: true
        },
        open: true,
        historyApiFallback: true,
        proxy: {}
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                include: [ path.resolve(__dirname, '../src'), path.resolve(__dirname, '../example') ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader?singleton=true',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../example/index.html'),
            filename: 'index.html'
        })
    ]
}
