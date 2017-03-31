
// 处理es6\es7
require('babel-polyfill')

// 前后端同构使用统一的fetch数据方式
require('isomorphic-fetch')


// koa 's app
export const app = require('./app')

// start server
const DEFAULT_PORT = 3000
export const run = (port = DEFAULT_PORT) => {
    const createServer = require('./server')
    createServer(app, { port }).listen(port)
}