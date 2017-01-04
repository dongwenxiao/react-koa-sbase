/*
import { middleware, router, run } from 'superproject/server'
server.middleware.use() koa-middleware中间件
server.router.use() koa-router挂载
server.run()
*/


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

export const run = () => {
    createServer(app).listen(3000)
}

export const commonMiddlewares = require('./common/middlewares')

