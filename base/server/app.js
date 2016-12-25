// 自定义对原生JS对象的扩展
require('../ext')

// 异步方法支持
require('co')

// 导入全局配置和方法、枚举
require('../../config')

// 创建Koa应用
const Koa = require('koa')
const app = new Koa()

// 加载各种中间件
require('./middlewares/common')(app)

// 挂载服务端路由规则
const mountings = require('../../mounting')
app.use((require('./routes')(mountings)).routes())

// 挂载客户端路由规则
const clientRoutes = require('../client/roots/routeConfig').default
app.use(require('./middlewares/common/isomorphic-react-redux')(clientRoutes))

// 统一的异常错误捕获，主要是解决未知异常
app.on('error', function (err, ctx) {
    console.log('SERVER_UNHANDLE_ERROR :', err, ctx)
})

module.exports = app
