'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ctxDir = path.resolve(__dirname);
const srcDir = path.resolve(ctxDir, 'src');
const vendorDir = path.resolve(ctxDir, 'vendor');
const outDir = path.resolve(ctxDir, 'dist');

module.exports = {
    devtool: 'cheap-module-source-map',
    context: ctxDir,
    entry: {
        app: [srcDir]
    },
    output: {
        path: outDir,
        filename: '[name].[hash].min.js'
    },
    resolve: {
        alias: {
            '~': srcDir,
            '^': vendorDir
        },
        extensions: ['.js'],
        modules: [
            srcDir,
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [vendorDir, /node_modules/],
                loaders: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                include: [vendorDir, /node_modules/],
                loaders: [
                    'style-loader',
                    'css-loader?importLoaders=2',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                include: [srcDir],
                loaders: [
                    'style-loader',
                    'css-loader'
                        + '?modules'
                        + '&localIdentName=[local]-[hash:base64:5]'
                        + '&importLoaders=1',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                include: [srcDir],
                loaders: [
                    'style-loader',
                    'css-loader'
                        + '?modules'
                        + '&localIdentName=[local]-[hash:base64:5]'
                        + '&importLoaders=2',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(eot|woff|ttf|svg|jpg|ico)$/,
                use: ['url-loader?limit=10000']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
