import routes from '../client/common/routeConfig'

import webpack from 'webpack'
// import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'

// const compile = webpack(global.spConfig.webpack.server.dev)
// try{

// require('.aaa')
// }catch(e){
// 	console.log(e)
// }

module.exports = function (app) {

	// app.use(devMiddleware(compile, {
	// 	// display no info to console (only warnings and errors) 
	// 	noInfo: false,

	// 	// display nothing to the console 
	// 	quiet: false,

	// 	// switch into lazy mode 
	// 	// that means no watching, but recompilation on every request 
	// 	lazy: true,

	// 	// watch options (only lazy: false) 
	// 	watchOptions: {
	// 		aggregateTimeout: 300,
	// 		poll: true
	// 	},

	// 	// public path to bind the middleware to 
	// 	// use the same as in webpack 
	// 	publicPath: "/assets/",

	// 	// custom headers 
	// 	headers: { "X-Custom-Header": "yes" },

	// 	// options for formating the statistics 
	// 	stats: {
	// 		colors: true
	// 	}
	// }))
	// app.use(hotMiddleware(compile, {
	// 	// log: console.log, 
	// 	// path: '/__webpack_hmr', 
	// 	// heartbeat: 10 * 1000 
	// }))

	// use middlewares
	app.use(require('./middlewares/isomorphic-react-redux')(routes))
	// webpack dashboard 和 webpack2 兼容不太好，暂时不用这个方法
	// app.use(require('./middlewares/webpack')(require('../webpack.config.js')))

	// require('./middlewares/webpack').default(app)



	// router
	const test = require('./routes/test')
	const router = require('koa-router')()
	router.use('/test', test.routes(), test.allowedMethods())
	app.use(router.routes(), router.allowedMethods())
}