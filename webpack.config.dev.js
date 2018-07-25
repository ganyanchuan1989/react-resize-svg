const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const extractLESS = new ExtractTextPlugin('[name].css');


const config = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    './example/index.jsx',

  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    // sourceMapFilename: '[name].js.map',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias:{
      'react-resize-svg': path.resolve(__dirname, './src/index.js')
    }
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/i,
        use: extractLESS.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          }],
        }),
      },
      { test: /\.(eot|woff|woff2|svg|ttf|png|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20, // 20K
              fallback: 'file-loader', // default
              name: '[path][name]-[hash:8].[ext]',
              // publicPath: 'assets/',
              outputPath: './imgs/',
              useRelativePath: false, // true : outputPath 失效
            },
          }],
      },
    ],
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('development'),
    // }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template/index_dev.html',
      title: 'react-boilerplate-dev',
      // chunks: ['app'], //指定要加入的entry实例,
      inject: 'body',
    }),
    extractLESS,
    new OpenBrowserPlugin({url: 'http://localhost:3000/'})
  ],
};

module.exports = config;
