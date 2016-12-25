/*
app 暴露挂载接口

app url prefix
clinet router[routes]
server router[routes]

*/

import {
    clientRouter as helloworldClientRouter,
    serverRouter as helloworldServerRouter,
    featureUrlPerfix as helloworldUrlPerfix
} from './helloworld'

// 应用URL前缀
const appUrlPrefix = 'demo'
// const appUrlPrefix = ''

// 客户端路由挂件
const clientRouter = {
    path: appUrlPrefix,
    childRoutes: [
        helloworldClientRouter
    ]
}

// 服务端路由挂件
const serverRouter = require('koa-router')()
serverRouter.use(serverRouterPrefixHandle(helloworldUrlPerfix), helloworldServerRouter.routes(), helloworldServerRouter.allowedMethods())

/**
 * 处理服务端路由规则，如果前面是空，则去掉斜杠 /
 *
 * @param {any} prefix
 * @returns
 */
function serverRouterPrefixHandle (prefix) {
    if (prefix === '') return prefix
    else return '/' + prefix
}

export {
    appUrlPrefix,
    clientRouter,
    serverRouter
}
