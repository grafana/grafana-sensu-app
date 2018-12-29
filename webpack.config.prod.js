/*jshint esversion: 6 */

const baseWebpackConfig = require('./webpack.config');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var conf = baseWebpackConfig;
conf.mode = 'production';
conf.watch = false;

conf.plugins.push(new ngAnnotatePlugin());
// NOTE: uglify will remove/disable debugger statements

/*
conf.plugins.push(
  new UglifyJSPlugin({
  sourceMap: true,
  })
);
*/
module.exports = conf;
