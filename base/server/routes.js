module.exports = function (servers) {
    const router = require('koa-router')()

    router.get('/tests', async (ctx) => {
        ctx.body = 'tests'
    })


    for (let url in servers) {

        if (!servers.hasOwnProperty(url)) continue

        let server = servers[url]

        url = serverRouterPrefixHandle(url)
        router.use(url, server.router.routes())
    }

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


