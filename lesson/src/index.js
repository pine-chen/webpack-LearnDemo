// import "@babel/polyfill";

//Tree Shaking只支持 ES module引用 

//异步加载,可实现懒加载
// async function getComponent() {
// 	const {
// 		default: _
// 	} = await
// 	import ( /* webpackChunkName:"lodash" */ 'lodash');
// 	return element;
// }

// document.addEventListener('click', () => {
// 	const element = document.createElement('div');
// 	element.innerHTML = 'chen song';
// 	document.body.appendChild(element);
// 	// getComponent().then(element => {
// 	// 	document.body.appendChild(element);
// 	// });
// })

//同步加载
// import _ from 'lodash';

// var element = document.createElement('div');
// element.innerHTML = _.join(['chen', 'song'], '-');
// document.body.appendChild(element);

// console.log('hello chen');

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker.register('/service-worker.js')
// 			.then(registration => {
// 				console.log('service-worker registed');
// 			}).catch(error => {
// 				console.log('service-worker registed error');
// 			})
// 	})
// }


import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';

class App extends Component {
	render() {
		return (
			<div>
				<div>This is App</div>
			</div>
		)
	}
}

ReactDom.render(<App />, document.getElementById('root'));