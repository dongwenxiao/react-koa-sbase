const convert = require('koa-convert')
const koaStatic = require('koa-static')

module.exports = (path) => {
	return convert(koaStatic(path))
}