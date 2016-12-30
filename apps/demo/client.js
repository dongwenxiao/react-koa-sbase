import {App, PageNotFound} from './components'

import { clientRouter as helloworldRouter, clientReducer as helloworldReducer } from './helloworld'

// 客户端路由挂件
export default {
    router: {
        path: '',  // 在app暴露index.js里配置了
        component: App,
        childRoutes: [
            helloworldRouter,
            { path: '*', name: 'Page not found', component: PageNotFound }
        ]
    },
    redux: {
        reducers: [
            helloworldReducer
        ]
    }
}
