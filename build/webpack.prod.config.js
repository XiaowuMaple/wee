const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const BabelMinify = require('babel-minify-webpack-plugin');
const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = merge(base, {
	devtool: 'source-map',
	plugins: [
		// Short-circuits all Vue.js warning code
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),

		// TODO: look more into this
		// new webpack.optimize.CommonsChunkPlugin('common'),

		// Minify with dead-code elimination
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),

		// Uglify cannot minify bundle properly
		new BabelMinify(),

		// Minify images
		new ImageminPlugin({
			pngquant: {
				quality: '99'
			},
		}),
	]
});
