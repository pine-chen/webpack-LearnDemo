const webpack = require('webpack');

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

const devConfig = {
	mode: 'development',
	//devtool控制映射关系，将打包代码和开发代码映射，可以查看出开发代码中的错误位置
	//开发环境：devtool: 'cheap-module-eval-source-map'
	//生产环境：devtool: 'cheap-module-source-map',
	devtool: 'cheap-module-eval-source-map',
	//自动打包刷新页面
	devServer: {
		contentBase: './dist',
		open: true, //是否自动打开浏览器
		port: 8080,
		hot: true,
		hotOnly: true
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader', {
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
				'style-loader',
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
	plugins: [
		// //清除dist文件夹的内容
		// new CleanWebpackPlugin(),
		// //HtmlWebpackPlugin在打包结束后自动生成一个html文件，并把打包生成的js自动引入到html文件中
		// //使用模板可以生成带有id="root"的html文件
		// new HtmlWebpackPlugin({
		// 	template: 'src/index.html'
		// }),
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		//打包多个文件时按文件名导出
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
	}
}

module.exports = devConfig