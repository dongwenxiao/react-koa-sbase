/*
// 挂载feature
// 每个feature都是一个对象，需要暴露如下接口：

{
    server: {
        router
    },
    client: {
        redux: {
            reducers,
            initState
        },
        router
    },
    urlPrefix
}
*/

import client from './client'
import server from './server'

// TODO  ./redux
client.redux.store = {}


const urlPrefix = 'demo'

// 设置client router urlPrefix
client.router.path = urlPrefix
client.router.name = urlPrefix

export {
    urlPrefix,
    client,
    server
}
