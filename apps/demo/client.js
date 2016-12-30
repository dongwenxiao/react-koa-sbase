import { clientRouter as helloworldRouter } from './helloworld'

// 客户端路由挂件
export default {
    router: {
        path: '',  // 在app暴露index.js里配置了
        childRoutes: [
            helloworldRouter
        ]
    },
    redux: {
        reducers: [], // TODO
        initState: {}
    }
}
