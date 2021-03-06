'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ctxDir = path.resolve(__dirname);
const srcDir = path.resolve(ctxDir, 'src');
const vendorDir = path.resolve(ctxDir, 'vendor');
const loadersDir = path.resolve(ctxDir, 'loaders');
const publicDir = path.resolve(ctxDir, 'public');
const outDir = path.resolve(ctxDir, 'dist');
const publicPath = '/';

module.exports = {
    devtool: 'cheap-module-source-map',
    context: ctxDir,
    entry: {
        main: [srcDir],
        lib: ['babel-polyfill', 'react', 'react-dom', 'react-router']
    },
    output: {
        path: outDir,
        publicPath,
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            '~': srcDir,
            '^': vendorDir,
            'public': publicDir
        },
        modules: [
            srcDir,
            'node_modules'
        ]
    },
    resolveLoader: {
        alias: {
            '>': loadersDir
        }
    },
    module: {
        rules: [{
            include: [publicDir],
            use: [{
                loader: '>/public-loader',
                options: {
                    publicPath,
                    publicDir
                }
            }]
        }, {
            test: /\.css$/,
            include: [vendorDir, /node_modules/],
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: { importLoaders: 1 }
            }, {
                loader: 'postcss-loader'
            }]
        }, {
            test: /\.less$/,
            include: [vendorDir, /node_modules/],
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: { importLoaders: 2 }
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'less-loader'
            }]
        }, {
            test: /\.css$/,
            include: [srcDir],
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]-[hash:base64:5]',
                    importLoaders: 1
                }
            }, {
                loader: 'postcss-loader'
            }]
        }, {
            test: /\.less$/,
            include: [srcDir],
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]-[hash:base64:5]',
                    importLoaders: 2
                }
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'less-loader'
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.md$/,
            use: [{
                loader: '>/markdown-react-loader'
            }]
        }, {
            test: /\.csv$/,
            use: [{
                loader: 'dsv-loader'
            }]
        }, {
            test: /\.(eot|woff|ttf|svg|jpg|ico)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['lib', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
