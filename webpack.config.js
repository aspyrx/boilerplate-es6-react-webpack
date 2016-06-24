/* eslint-env node */

const config = require('./webpack.config.base.js');

if (!config.module.preLoaders) {
    config.module.preLoaders = [];
}

config.module.preLoaders.push(
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
    }
);

module.exports = config;

