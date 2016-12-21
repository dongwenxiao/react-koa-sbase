const Koa = require('koa')
const router = require('koa-router')()
const views = require('koa-views')

// 异步方法支持
require('co')

// 导入全局配置和方法、枚举
require('./config')
require('./global')
require('./enum')

// for test
// require('./modules/dao/mysql')


// 创建Koa应用
const app = new Koa()


// 加载各种中间件
require('./middlewares')(app)


// 加载自定义路由规则
// 放在setTimeout里的目的是延迟一会儿执行，等子项目的config.MONGODB 覆盖后执行
setTimeout(() => {
	app.use(require('./routes')(router).routes())
}, 1000)


// 统一的异常错误捕获，主要是解决未知异常
app.on('error', function (err, ctx) {
	console.log('SERVER_UNHANDLE_ERROR :', err, ctx)
})


module.exports = app