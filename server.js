const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config.dev.js');

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/',
  noInfo: true,
  stats: {
    colors: true,
  },
  hot: true,
}));

app.use(webpackHotMiddleware(compiler));


app.listen(config.devServer.port, () => {
  console.log('start app listening on port 3000!\n');
});
