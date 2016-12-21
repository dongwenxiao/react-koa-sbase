// 处理es6\es7
// require('babel-register')
require('babel-polyfill')

// 异步方法支持
// require('co')

// 前后端同构使用统一的fetch数据方式
require('isomorphic-fetch')

// 自定义对原生JS对象的扩展
require('../ext')

// 注册 koa 应用相关逻辑
let app = require('./app')


/**
 * 创建一个被扩展的http服务
 * 
 * @param {any} extApp 一个被扩展的koa应用实例
 * @returns http服务
 */
const createServer = (extApp) => {

    // 获取logger实例
    const log4js = require('koa-log4')
    const logger = log4js.getLogger('startup')

    // 用于 apps/ 下的子项目扩展koa app，如增加中间件或者方法
    extApp && extApp(app)

    // koa 应用逻辑注册到 http 服务中
    const http = require('http')
    const server = http.createServer(app.callback())

    // http 服务监听
    server.on('error', onError)
    server.on('listening', onListening)

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error
        }
        var port = global.spConfig.APP.SERVER_PORT
        // var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.error(port + ' requires elevated privileges')
                process.exit(1)
                break
            case 'EADDRINUSE':
                logger.error(port + ' is already in use')
                process.exit(1)
                break
            default:
                throw error
        }
    }

    function onListening() {
        var addr = server.address()
        // var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
        let port = global.spConfig.APP.SERVER_PORT
        logger.info('Listening on ' + port)
    }

    return server
}


module.exports = createServer