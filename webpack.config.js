const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpackAngularExternals = require('webpack-angular-externals');


module.exports = {
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  mode: 'development',
  watch: false,
  watchOptions: {
    poll: 1000,
    ignored: ['src/**/*.js', 'node_modules', 'bower_components']
  },
  node: {
    fs: 'empty'
  },
  context: path.join(__dirname, 'src'),
  entry: {
    'module': './module.ts',
    'datasource/sensu/module' : path.resolve(__dirname, 'src/datasource/sensu/module.ts'),
    'panels/common/utils' : path.resolve(__dirname, 'src/panels/common/utils.ts'),
    'panels/sensu-overview/module' : path.resolve(__dirname, 'src/panels/sensu-overview/module.ts'),
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'amd'
  },
  externals: [
   { 'angular': 'angular' },
    //webpackAngularExternals(),
   {
    lodash : {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_' // indicates global variable
    },
   },
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
    //new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: 'plugin.json', to: '.' },
      { from: '../README.md', to: '.' },
      { from: '../LICENSE', to: '.' },
      { from: 'partials/*', to: '.' },
      { from: 'img/*', to: '.' },
      { from: 'dashboards/*', to: '.' },
      { from: 'components/config/*.html', to: '.' },
      { from: 'panels/sensu-overview/*.json', to: '.' },
      { from: 'panels/sensu-overview/partials/*', to: '.' },
      { from: 'datasource/sensu/*.json', to: '.' },
      { from: 'datasource/sensu/partials/*', to: '.' },
    ]),
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: [
          {
            loader: 'babel-loader',
        'options': {
          //'plugins': ['lodash'],
          'presets': [['env', { 'modules': false, 'targets': { 'node': 6 } }]]
        }
          },
          'ts-loader'
        ],
        exclude: [/(node_modules)/],
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
      }
    ]
  }
}
