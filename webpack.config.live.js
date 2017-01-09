'use strict';

const webpack = require('webpack');
const config = require('./webpack.config.js');

config.entry.main.push(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server'
);

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
);

module.exports = config;

