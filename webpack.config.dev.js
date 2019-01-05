/*jshint esversion: 6 */

const baseWebpackConfig = require('./webpack.config');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const webpack = require('webpack');

var conf = baseWebpackConfig;
conf.mode = 'development';
conf.devtool = "inline-source-map";

conf.plugins.push(new ngAnnotatePlugin());
conf.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = conf;
