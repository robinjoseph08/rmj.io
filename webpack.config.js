const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path              = require('path');
const Webpack           = require('webpack');

const PLUGINS = [
  new Webpack.ProvidePlugin({
    PropTypes: 'prop-types',
    React: 'react'
  }),
  new HtmlWebpackPlugin({
    template: './app/index.html',
    filename: 'index.html',
    inject: 'body'
  })
];

module.exports = {
  entry: ['babel-polyfill', './app/index.jsx'],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }]
  },
  plugins: PLUGINS
};
