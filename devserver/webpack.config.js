const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	entry: {
		main: './src/index.js'
		// sub: './src/index.js'
	},
	devServer: {
		//错误提示在浏览器页面
		overlay: true,
		contentBase: './dist',
		// open: true, //是否自动打开浏览器
		port: 8080,
		hot: true,
		hotOnly: true,
		historyApiFallback: true,
		//代理请求转发
		proxy: {
			'/react/api/': {
				target: 'http://www.dell-lee.com',
				secure: false,
				pathRewrite: {
					'header.json': 'demo.json'
				},
				changeOrigin: true,
				headers: {
					host: 'http://www.dell-lee.com'
				}
			}
		}
	},
	module: {
		rules: [{
			//es6语法转化为es5
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
					loader: 'babel-loader',
				}
				//eslint规范化代码
				// , {
				// 	loader: 'eslint-loader'
				// }
				//  {//将模块中的this指向从模块指向window
				// loader: 'imports-loader?this=>window'}
			]

		}, {
			test: /\.svg|png|jpg|gif$/,
			use: {
				//url-loader会打包到bundle.js中
				loader: 'url-loader',
				options: {
					//打包后的文件名以原文件名加hash值及相同后缀显示
					name: '[name]_[hash].[ext]',
					//打包的路径
					outputPath: 'images/',
					//大于limit打包到images中，小于则打包到bundle.js
					limit: 20480
				}
			}
		}, {
			test: /\.eot|ttf|svg|woff$/,
			use: {
				loader: 'file-loader'
			}
		}, {
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
		//清除dist文件夹的内容
		new CleanWebpackPlugin(),
		//HtmlWebpackPlugin在打包结束后自动生成一个html文件，并把打包生成的js自动引入到html文件中
		//使用模板可以生成带有id="root"的html文件
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
		//自动在模块中引入jquery等模块
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	_: 'lodash'
		// })
	],
	output: {
		filename: '[name].js',
		//将打包后的js标签加一个src地址
		// publicPath: '/',
		path: path.resolve(__dirname, 'dist')
	}
}