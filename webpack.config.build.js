const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const extractCSS = new ExtractTextPlugin("[name]-[contenthash:8].css");

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
	entry: {
    index: "./src/index.js"
  },
	output: {
		path: `${__dirname}/dist`,
		filename: "[name].js", // [name]-[chunkhash:8].bundle.js
		publicPath: "./",
		library: "react-resize-svg",
		libraryTarget: "umd",
		sourceMapFilename: "[name]-[chunkhash:8].bundle.map"
		// devtoolModuleFilenameTemplate: "webpack:///[resource-path]?[loaders]"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	externals: {
      'react': 'react',
			'react-dom': 'react-dom',
  },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: extractCSS.extract({
					use: [
						{
							loader: "css-loader",
							options: {
								modules: true,
								localIdentName:
									"[name]__[local]--[hash:base64:5]"
							}
						}
					]
				})
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf|png|jpg|jpeg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10, // 20K
							fallback: "file-loader", // default
							name: "[name]-[hash:8].[ext]",
							// publicPath: 'assets/',
							outputPath: "./images/",
							useRelativePath: false // true : outputPath 失效
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		// 定义全局变量
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
    }),
		extractCSS,
		// new BundleAnalyzerPlugin(),
	]
};

module.exports = config;
