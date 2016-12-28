import { urlPerfix, serverRouter } from './helloworld'


// 服务端路由挂件
const koaRouter = require('koa-router')()
const routers = [
    serverRouter
]


routers.forEach((router) => {
    koaRouter.use(
        serverRouterPrefixHandle(urlPerfix),
        router.routes(),
        router.allowedMethods())
})


/**
 * 处理服务端路由规则，如果前面是空，则去掉斜杠 /
 * @param {any} prefix
 * @returns
 */
function serverRouterPrefixHandle (prefix) {
    if (prefix === '') return prefix
    else return '/' + prefix
}

export default {
    router: koaRouter
}
