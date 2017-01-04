// https://www.npmjs.com/package/koa-json
// http 的 response 可以是 json

const convert = require('koa-convert')
const json = require('koa-json')

module.exports = convert(json())
