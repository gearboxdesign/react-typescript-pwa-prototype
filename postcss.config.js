'use strict';

const dev = process.env.NODE_ENV === 'development';

module.exports = {
	plugins: Object.assign({
		'autoprefixer': {
			browsers: 'last 2 versions'
		},
		'css-mqpacker': {},
		'postcss-assets': {
			cacheBuster: true,
			loadPaths: [
				// TODO: Gather from config.
				'./client/images/**'
			]
		},
		'postcss-inline-svg': {
			// TODO: Gather from config.
			path: './client/images'
		}
	}, !dev && {
		'cssnano': {
			safe: true
		}
	})
};