module.exports = function (app) {
    require('./onerror')(app)

    app.use(require('./response-time'))
    app.use(require('./logger'))
    app.use(require('./session'))
    // app.use(require('./auth-simple'))
    app.use(require('./bodyparser'))
    app.use(require('./json'))
    app.use(require('./static-folder')(global.spConfig.APP.STATIC_PATH[0]))
    app.use(require('./static-folder')(global.spConfig.APP.STATIC_PATH[1]))
    app.use(require('./compress'))
    app.use(require('./html-minify')) // 依赖于compress，必须在其中间件下面
}
