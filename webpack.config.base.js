/* eslint-env node */

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    debug: true,
    context: path.resolve(__dirname),
    entry: {
        app: [ './src/index.js' ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[hash].min.js'
    },
    resolve: {
        root: path.resolve(__dirname, 'src'),
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules']
    },
    postcss: () => [autoprefixer],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css?localIdentName=[name]-[hash:base64:5]', 'postcss']
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css?localIdentName=[name]-[hash:base64:5]', 'postcss', 'less']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.(eot|woff|ttf|svg|jpg|ico)$/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
