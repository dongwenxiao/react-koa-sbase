/*
import { middleware, router, run } from 'superproject/server'
server.middleware.use() koa-middleware中间件
server.router.use() koa-router挂载
server.run()
*/

export commonMiddlewares from './common/middlewares'

const createServer = require('./server')
const app = require('./app')


export const middleware = {
    use: (koaMiddleware) => {
        app.use(koaMiddleware)
    }
}

export const router = {
    use: (koaRouter) => {
        app.use(koaRouter.routes())
    }
}

const DEFAULT_PORT = 3000
export const run = (port = DEFAULT_PORT) => {
    createServer(app, { port }).listen(port)
}