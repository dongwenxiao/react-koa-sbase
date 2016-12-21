const webpack = require('webpack')
const webpackMiddleware = require('koa-webpack-dev-middleware')


module.exports = (config) => {
	return webpackMiddleware(webpack(config))
}
