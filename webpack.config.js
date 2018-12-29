/*jshint esversion: 6 */

const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackAngularExternals = require('webpack-angular-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractTextPluginLight = new ExtractTextPlugin('./css/light.css');
const ExtractTextPluginDark = new ExtractTextPlugin('./css/dark.css');


module.exports = {
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  devtool: "inline-source-map",
  mode: 'development',
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: ['src/**/*.js', 'node_modules']
  },
  node: {
    fs: 'empty'
  },
  target: 'node',
  context: path.join(__dirname, 'src'),
  entry: {
    'module': './module.ts',
    'components/config/config' : path.resolve(__dirname, 'src/components/config/config.ts'),
    'components/servers/servers' : path.resolve(__dirname, 'src/components/servers/servers.ts'),
    'datasource/sensu/module' : path.resolve(__dirname, 'src/datasource/sensu/module.ts'),
    'panels/sensu-overview/module' : path.resolve(__dirname, 'src/panels/sensu-overview/module.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'amd'
  },
  externals: [
   { 'angular': 'angular' },
    'lodash',
    'react',
    'react-dom',
    'app/core/utils/kbn',
    function (context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    }
  ],
  plugins: [
    new CleanWebpackPlugin('dist', { allowExternal: true }),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: 'plugin.json', to: '.' },
      { from: '../README.md', to: '.' },
      { from: '../LICENSE', to: '.' },
      { from: 'partials/*', to: '.' },
      { from: 'img/*', to: '.' },
      { from: 'dashboards/*', to: '.' },
      { from: 'components/config/*.html', to: '.' },
      { from: 'components/servers/partials/*', to: '.' },
      { from: 'panels/external/*', to: '.' },
      { from: 'panels/sensu-overview/*.json', to: '.' },
      { from: 'panels/sensu-overview/partials/*', to: '.' },
      { from: 'datasource/sensu/*.json', to: '.' },
      { from: 'datasource/sensu/css/*', to: '.' },
      { from: 'datasource/sensu/img/*', to: '.' },
      { from: 'datasource/sensu/partials/*', to: '.' },
    ]),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/,
          loaders: [
            "ts-loader"
          ],
          exclude: [/(node_modules)/],
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/],
        use: {
          loader: 'html-loader'
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.light\.scss$/,
        exclude: [/node_modules/],
        use: ExtractTextPluginLight.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      },
      {
        test: /\.dark\.scss$/,
        exclude: [/node_modules/],
        use: ExtractTextPluginDark.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      }
    ]
  }
};
