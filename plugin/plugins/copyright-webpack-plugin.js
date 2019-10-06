class CopyrightWebpackPlugin {

	apply(compiler) {
		//同步钩子
		compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
			console.log('123');
		})
		//异步钩子
		compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
			debugger; //断点
			compilation.assets['copyright.txt'] = {
				source: function() {
					return 'copyright by chen'
				},
				size: function() {
					return 17;
				}
			}
			cb();
		})
	}
}

module.exports = CopyrightWebpackPlugin;