// https://www.npmjs.com/package/koa-logger
// Development style logger middleware for koa.

const convert = require('koa-convert')
const logger = require('koa-logger')

module.exports = convert(logger())