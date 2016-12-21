// 使用super_project基础服务代码
const baseServer = require('../../../server/server')


// 当前子app扩展部分
let app = require('./app')
if (module.hot) {
    module.hot.accept('./app', () => {
        app = require('./app')
    })
}


// 启动服务
const server = baseServer(app)
server.listen(global.spConfig.APP.SERVER_PORT)
