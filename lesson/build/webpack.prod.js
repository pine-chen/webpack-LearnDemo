// "presets": [
// 	['@babel/preset-env', {
// 		targets: {
// 			edge: "17",
// 			firefox: "60",
// 			chrome: "67",
// 			safari: "11.1",
// 		},
// 		//按需根据业务代码决定加载polyfill的转化代码
// 		useBuiltIns: 'usage'
// 	}]
// ]
//polyfill会污染全局环境，plugin-transform-runtime不会,
// {
// 	"plugins": [["@babel/plugin-transform-runtime", {
// 		"absoluteRuntime": false,
// 		"corejs": 2,
// 		"helpers": true,
// 		"regenerator": true,
// 		"useESModules": false
// 	}]]
// }
// {
// 	test: /\.svg|png|jpg|gif$/,
// 	use: {
// 		loader: 'file-loader',
// 		options: {
// 			name: '[name]_[hash].[ext]',
// 			outputPath: 'images/'
// 		}
// 	}


const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const prodConfig = {
	mode: 'production',
	//devtool控制映射关系，将打包代码和开发代码映射，可以查看出开发代码中的错误位置
	//开发环境：devtool: 'cheap-module-eval-source-map'
	//生产环境：devtool: 'cheap-module-source-map',
	devtool: 'cheap-module-source-map',
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader, {
					loader: 'css-loader',
					options: {
						//在scss中import引入的scss文件也通过sass-loader和postcss-loader
						importLoaders: 2
						//模块化打包
						// modules: true
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}, {
			test: /\.eot|ttf|svg|woff$/,
			use: {
				loader: 'file-loader'
			}
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		}),
		//PWA技术,在服务器断开连接仍有缓存
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		})
	],
	output: {
		//打包多个文件时按文件名导出
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js',
	}
}

module.exports = prodConfig