
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function(env) {
  if (env && env.build && env.build === 'build') {
    return require('./webpack.config.build.js');
  }
  else if(env && env.analyzer && env.analyzer === 'analyzer'){
    var config = require('./webpack.config.build.js');
    config.plugins.push(new BundleAnalyzerPlugin());
    return config;
  }
};