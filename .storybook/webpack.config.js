const path = require('path');
const webpack = require('webpack');

module.exports = {
	module: {
		loaders: [
			{ test: /\.(js)$/, exclude: [ /node_modules/ ], loader: 'babel' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
		]
	},

	resolve: {
		root: path.resolve(__dirname),
		extensions: ['', '.js']
	},

	devServer: {
		stats: 'minimal'
	},

	devtool: 'source-map'
};
