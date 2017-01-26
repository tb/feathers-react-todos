const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const devBuild = nodeEnv == 'development';
const prodBuild = nodeEnv == 'production';

const config = {
  entry: {
    vendor: './src/vendor.js',
    index: './src/index.js',
  },

  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader'],
        }),
      },
      {
        test: /\.js/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons-[hash].js',
      minChunks: 2,
    }),

    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './src/index.ejs',
      environment: nodeEnv,
    }),
  ],

};

if (devBuild) {
  console.log('Webpack dev build');

  config.devtool = 'eval-source-map';

  config.plugins = config.plugins.concat([
    new ExtractTextPlugin('[name]-bundle.css'),
  ]);

  config.devServer = {
    host: '0.0.0.0',
    port: 3000,
    stats: 'normal',
    proxy: {
      '/socket.io/**': {
        target: 'http://localhost:3030',
        ws: true,
      },
    }
  };
}

if (prodBuild) {
  console.log('Webpack prod build');

  config.output.filename = '[name]-bundle-[hash].js';

  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({}),
    new ExtractTextPlugin('[name]-bundle-[hash].css'),
  ]);
}

module.exports = config;
