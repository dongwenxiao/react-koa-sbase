// 创建Koa应用
const Koa = require('koa')
const app = new Koa()

// 统一的异常错误捕获，主要是解决未知异常
app.on('error', function (err, ctx) {
    console.log('SERVER_UNHANDLE_ERROR :', err, ctx)
})

module.exports = app
