'use strict';

require('dotenv').config({ silent: true });

const { pick, flow, entries, reduce } = require('lodash/fp'),
	path = require('path'),
	webpack = require('webpack');

const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin,
	CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
	DefinePlugin = webpack.DefinePlugin,
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	ManifestPlugin = require('webpack-manifest-plugin'),
	UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
	ModuleConcatenationPlugin = webpack.optimize.ModuleConcatenationPlugin,
	WebpackChunkHash = require('webpack-chunk-hash');

// Composed Functions
const getClientEnv = flow(
	pick([
		'NODE_ENV',
		'SERVICE_WORKER_ENABLED'
	]),
	entries,
	reduce((envVars, [key, value]) => {

		return Object.assign({}, envVars, {
			[key]: JSON.stringify(value)
		});
}, {}));

// Config Vars
const dev = process.env.NODE_ENV === 'development',
	// TODO: Gather from config.
	publicPath = `/public/`,
	// NOTE: This needs to be relative to the JS output.
	splitChunks = [
		'dashboard',
		'monitoring',
		'admin'
	],
	// TODO: Gather from config.
	outPath = path.resolve(__dirname, `./dist/server/${ publicPath }`),
	basePlugins = [
		new DefinePlugin({
			'PUBLIC_PATH': publicPath,
			'process.env': getClientEnv(process.env)
		}),
		// NOTE: Create vendors bundle.
		new CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		// NOTE: Creates shared bundle, note split chunks need to be manually identified.
		new CommonsChunkPlugin({
			name: 'shared',
			chunks: splitChunks,
			minChunks: splitChunks.length
		}),
		new WebpackChunkHash(),
		new ManifestPlugin({
			fileName: 'asset-manifest.json',
			publicPath
		}),
		new ExtractTextPlugin({
			filename: dev ? '[name].css' : '[name].[contenthash].css',
			allChunks: true
		})
	];

// Webpack Config
module.exports = {
	devtool: dev ? 'inline-source-map' : 'source-map',
	entry: {
		vendor: [
			'lodash',
			'react',
			'react-dom',
			'react-router',
			'react-router-dom',
			'react-redux',
			'redux',
			'redux-thunk'
		],
		main: [
			'normalize.css',
			'main.scss',
			'index.tsx',
			'manifest.json'
		]
	},
	output: {
		path: outPath,
		publicPath,
		filename: dev ? '[name].js' : '[name].[chunkhash].js',
		chunkFilename: dev ? '[name].js' : '[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.scss', '.json'],
		modules: [
			'node_modules',
			// TODO: Gather from config.
			'./client/',
			'./client/styles',
			'./shared'
		]
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts)$/,
				exclude: /node_modules/,
				use: {
					loader: 'awesome-typescript-loader',
					options: {
						// TODO: Gather from config.
						configFileName: './client/tsconfig.json'
					}
				}
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			},
			{
				test: /\.(json|png|jpg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: dev ? '[name].[ext]' : '[name].[hash].[ext]',
						}
					}
				]
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								// TODO: Gather from config.
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: [
									// TODO: Gather from config.
									'./client/styles'
								],
								sourceMap: true
							}
						}
					]
				})
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
