import App from './helloworld/client/components/App'
import { clientRouter as helloworldRouter, clientReducer as helloworldReducer } from './helloworld'

// 客户端路由挂件
export default {
    router: {
        path: '',  // 在app暴露index.js里配置了
        component: App,
        childRoutes: [
            helloworldRouter
        ]
    },
    redux: {
        reducers: [
            helloworldReducer
        ]
    }
}
