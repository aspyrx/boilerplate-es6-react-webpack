/* eslint-env node */

const path = require('path');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
    eslint: {
        configFile: path.join(__dirname, '.eslintrc.json')
    },
    postcss: () => [autoprefixer],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'postcss']
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'postcss', 'less']
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
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
