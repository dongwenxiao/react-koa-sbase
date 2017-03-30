// koa 's app
export const app = require('./app')

// start server
const DEFAULT_PORT = 3000
export const run = (port = DEFAULT_PORT) => {
    const createServer = require('./server')
    createServer(app, { port }).listen(port)
}