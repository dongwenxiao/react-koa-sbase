/*
挂载app
每个app都是一个对象
{
    appUrlPrefix,   // 挂载URL(/app)
    clientRouter,   // 客户端路由(React router)
    serverRouter    // 服务端路由(Koa router)
}
*/

import * as demo from './apps/demo'

module.exports = [
    demo
]
