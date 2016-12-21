const convert = require('koa-convert')
const minify = require('koa-html-minifier')({
    collapseWhitespace: true
})
module.exports = convert(minify)
