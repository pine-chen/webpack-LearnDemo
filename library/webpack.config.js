const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	//忽略某个打包库
	externals: 'lodash',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'library.js',
		//通过script标签引入的js，在全局标签增加一个变量，可通过全局调用
		library: 'root',
		//不管用import，common.js，amd语法引入库，保障正确引用
		libraryTarget: 'umd'
	}
}