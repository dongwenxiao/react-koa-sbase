// https://www.npmjs.com/package/koa-onerror
/*
onerror(app, options);
all: if options.all exist, ignore negotiation
text: text error handler
json: json error handler
html: html error handler
template: default html error handler template path
redirect: if accepct html, can redirect to another error page
*/
const convert = require('koa-convert')
const onerror = require('koa-onerror')

module.exports = convert(onerror)