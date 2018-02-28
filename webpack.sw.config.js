'use strict';

require('dotenv').config({ silent: true });

const { pick, flow, entries, reduce } = require('lodash/fp'),
	uuid = require('uuid/v1'),
	path = require('path'),
	webpack = require('webpack');

const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin,
	DefinePlugin = webpack.DefinePlugin,
	UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
	ModuleConcatenationPlugin = webpack.optimize.ModuleConcatenationPlugin;

// Composed Functions
const getClientEnv = flow(
	pick([
		'NODE_ENV'
	]),
	entries,
	reduce((envVars, [key, value]) => {

		return Object.assign({}, envVars, {
			[key]: JSON.stringify(value)
		});
}, {}));

// Config Vars
const dev = process.env.NODE_ENV === 'development',
	timestamp = uuid(),
	// TODO: Gather from config.
	publicPath = `/public/`,
	// TODO: Gather from config.
	outPath = path.resolve(__dirname, `./dist/server`),
	basePlugins = [
		new DefinePlugin({
			'CACHE_NAMES': JSON.stringify({
				'ASSET_CACHE': `asset-cache-${ timestamp }`,
				'API_CACHE': `api-cache-${ timestamp }`,
				'BASE_CACHE': `index-cache-${ timestamp }`
			}),
			'PUBLIC_PATH': publicPath,
			'process.env': getClientEnv(process.env)
		})
	]
	
// Webpack Config
module.exports = {
	devtool: dev ? 'inline-source-map' : 'source-map',
	entry: 'index.ts',
	output: {
		path: outPath,
		// publicPath,
		filename: 'sw.js'
	},
	resolve: {
		extensions: ['.js', '.ts'],
		modules: [
			'node_modules',
			// TODO: Gather from config.
			'./sw/'
		]
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts)$/,
				exclude: /node_modules/,
				use: {
					'loader': 'awesome-typescript-loader',
					'options': {
						// TODO: Gather from config.
						configFileName: './sw/tsconfig.json'
					}
				}
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			}
		]
	},
	plugins: basePlugins.concat(dev ? [] : [
		new AggressiveMergingPlugin(),   
		new webpack.optimize.ModuleConcatenationPlugin(),
		new UglifyJsPlugin({
			mangle: false,
			minimize: true,
			compressor: {
				warnings: false
			}
		})
	])
};
