import path from 'path'
import { servers, clients } from '../../config/mounting'
import factoryRootReducer from '../client/roots/factoryRootReducer'
import factoryConfigureStore from '../client/roots/factoryConfigureStore'
import clientRootRouter from '../client/roots/router'

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

// 读取html用的模板文件路径
let htmlFilename = path.resolve(global.spConfig.RUN_PATH, './index.html')
if (!__DEV__) {
    htmlFilename = path.resolve(global.spConfig.RUN_PATH, './dist/index.html')
}

function createConfigureStore (url) {
    // url 例如 /demo/helloworld/react

    // urlPrefix ——> client
    // 默认只有1个URLPrefix是 "" 的app

    let client = null

    const urlPrefix = url.split('/')[1]

    const hasMatchClient = clients.hasOwnProperty(urlPrefix)
    // console.log('clients==========')
    // console.log(clients)
    // console.log('url==========')
    // console.log(url)
    // console.log('urlPrefix==========')
    // console.log(urlPrefix)
    if (hasMatchClient) {
        client = clients[urlPrefix]
    } else {
        if (!clients['']) throw new Error('factoryStore() 没有找到匹配的client对象。当前URL：' + url)
        client = clients['']
    }
    // console.log('client===========')
    // console.log(client)


    // rootReducer
    const rootReducer = factoryRootReducer(client.redux.reducers)


    // createConfigureStore
    const configureStore = factoryConfigureStore(rootReducer)


    return configureStore
}

app.use(require('./middlewares/common/isomorphic-react-redux')(clientRootRouter, createConfigureStore, htmlFilename))


// 统一的异常错误捕获，主要是解决未知异常
app.on('error', function (err, ctx) {
    console.log('SERVER_UNHANDLE_ERROR :', err, ctx)
})

module.exports = app
