module.exports = function (mountings) {
    const router = require('koa-router')()

    router.get('/tests', async (ctx) => {
        ctx.body = 'tests'
    })

    mountings.forEach((app) => {
        router.use(serverRouterPrefixHandle(app.appUrlPrefix), app.serverRouter.routes(), app.serverRouter.allowedMethods())
    })


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

    return router
}


