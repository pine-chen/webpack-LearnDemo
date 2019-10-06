const path = require('path');
// const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');

const commonConfig = {
	entry: {
		main: './src/index.js'
		// sub: './src/index.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		//对于引入的文件夹先找index，再找demo
		mainFiles: ['index', 'demo'],
		//当遇到chen路径时，实际引入的是../src/chen
		alias: {
			chen: path.resolve(__dirname, '../src/chen')
		}
	},
	module: {
		rules: [{
			//es6语法转化为es5
			test: /\.jsx?$/,
			//只有在文件夹下的模块才进行打包
			//include: path.resolve(__dirname, '.../src')
			exclude: /node_modules/,
			use: [{
					loader: 'babel-loader',
				}
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
		}]
	},
	plugins: [
		//清除dist文件夹的内容
		new CleanWebpackPlugin(),
		//HtmlWebpackPlugin在打包结束后自动生成一个html文件，并把打包生成的js自动引入到html文件中
		//使用模板可以生成带有id="root"的html文件
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
		//引入打包好的第三方库代码文件
		// new AddAssetHtmlWebpackPlugin({
		// 	filename: path.resolve(__dirname, '../dll/demo.dll.js')
		// }),
		//webpack.DllReferencePlugin({
		//manifest: path.resolve(__dirname, '../dll/demo.manifest.js')
		//}),
		//自动在模块中引入jquery等模块
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	_: 'lodash'
		// })
	],
	optimization: {
		//按需引用的方法来打包对应的方法
		usedExports: true,
		//自动代码分割
		splitChunks: { //不配置会使用默认项
			chunks: "all", //代码分割只对异步生效
			// 	minSize: 30000, //根据引入的模块大小进行分割
			// 	minChunks: 1, //模块至少被用了多少次进行代码分割
			// 	maxAsyncRequests: 5, //同时加载的模块数
			// 	maxInitialRequests: 3, //网站入口文件代码分割的数目
			// 	automaticNameDelimiter: '~', //文件生成的连接符
			// 	name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/, //模块是否在node_modules里
					priority: -10,
					name: 'vendors'
				}
				// 		default: {
				// 			priority: -20,
				// 			reuseExistingChunk: true,
				// 			filename: 'common.js',
				// 		}
			}
		}
	},
	performance: false,
	output: {
		//将打包后的js标签加一个src地址
		// publicPath: '/',
		path: path.resolve(__dirname, '../dist')
	}
}

module.exports = (env) => {
	if (env && env.production) {
		return merge(commonConfig, prodConfig);
	} else {
		return merge(commonConfig, devConfig);
	}
}