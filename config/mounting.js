/*
// 挂载app
// 每个app都是一个对象，需要暴露如下接口：

{
    server: {
        router
    },
    client: {
        redux: {
            store,
            reducers
        },
        router
    }
    urlPrefix
}
*/

// TODO 测试分开导入与合并导入是否在打包的时候有差别？
// import {client, server, urlPrefix} from './apps/demo'

import * as demo from '../apps/demo'

const clients = {}
clients[demo.urlPrefix] = demo.client

const servers = {}
servers[demo.urlPrefix] = demo.server

export {
    clients,
    servers
}
