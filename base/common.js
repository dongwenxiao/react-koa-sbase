
import { clients } from '../config/mounting'
import factoryRootReducer from './client/roots/factoryRootReducer'
import factoryConfigureStore from './client/roots/factoryConfigureStore'

export function createConfigureStore (url) {
    // url 例如 /demo/helloworld/react

    // urlPrefix ——> client
    // 默认只有1个URLPrefix是 "" 的app

    let client = null

    const urlPrefix = url.split('/')[1]

    const hasMatchClient = clients.hasOwnProperty(urlPrefix)
    // console.log('clients==========')
    // console.log(clients)
    // console.log('url==========')
    // console.log(url)
    // console.log('urlPrefix==========')
    // console.log(urlPrefix)
    if (hasMatchClient) {
        client = clients[urlPrefix]
    } else {
        if (!clients['']) throw new Error('factoryStore() 没有找到匹配的client对象。当前URL：' + url)
        client = clients['']
    }
    // console.log('client===========')
    // console.log(client)


    // rootReducer
    const rootReducer = factoryRootReducer(client.redux.reducers)


    // createConfigureStore
    const configureStore = factoryConfigureStore(rootReducer)


    return configureStore
}


