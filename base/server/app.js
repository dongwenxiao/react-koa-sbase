import { servers } from '../../config/mounting'

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
app.use((require('./routes')(servers)).routes())

// 挂载客户端路由规则
// const clientRoutes = require('../client/roots/routeConfig').default

// TODO
// 跟进URL挂载同构中间件，不是没个请求都做同构中间件
// 根据不同的URL传入不同的store
// 默认会有一个空store，app可以把自己的store替换上
// 如果app变了，必须刷新页面，重置成新app的store
// app.use(require('./middlewares/common/isomorphic-react-redux')(clientRoutes, configStore))

// 统一的异常错误捕获，主要是解决未知异常
app.on('error', function (err, ctx) {
    console.log('SERVER_UNHANDLE_ERROR :', err, ctx)
})

module.exports = app
