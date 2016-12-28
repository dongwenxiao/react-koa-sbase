import { clientRouter as helloworldRouter } from './helloworld'

// 客户端路由挂件
export default {
    router: [
        helloworldRouter
    ],
    redux: {
        reducers: [], // TODO
        initState: {}
    }
}
