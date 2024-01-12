const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './app.js',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: '../dist',
		host: '0.0.0.0',
		port: 31512,
		public: "curie.whatquentindoes.fr:31512"
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
					}
				}
			},
			{	
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "DEV Pirate Game Jam - KiwiOuiOui - KiwiOuiOui DEV",
			template: 'index.html'
		})
	]
};