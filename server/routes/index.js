module.exports = (router) => {
    
    // import sub router
    const api = require('./api')(router)

    // handle sub router
    router.use('/api', api.routes())

    return router
}
