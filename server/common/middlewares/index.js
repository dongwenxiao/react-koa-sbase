import { spResponse } from 'sp-response'

export default function(app) {

    app.use(require('./response-time'))
    app.use(spResponse)
        // app.use(require('./logger'))
    app.use(require('./session'))
    app.use(require('./bodyparser'))
    app.use(require('./json'))
        // app.use(require('./static-folder')(global.spConfig.APP.STATIC_PATH[0]))
        // app.use(require('./static-folder')(global.spConfig.APP.STATIC_PATH[1]))
    app.use(require('./compress'))
    app.use(require('./html-minify')) // 依赖于compress，必须在其中间件下面

    // app.use(require('./isomorphic-react-redux')(clientRouter))
}