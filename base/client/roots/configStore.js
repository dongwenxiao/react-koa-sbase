import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

// redux 配置中间件
const middlewares = [
    thunk,
    routerMiddleware(browserHistory)
]

// 添加开发者工具
let devToolsExtension = (f) => f
if (__CLIENT__) {
    if (window.devToolsExtension) {
        devToolsExtension = window.devToolsExtension()
    }
}

// 生产store
export default function configStore (initialState) {

    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares),
        devToolsExtension
    ))

    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const nextReducer = require('./rootReducer').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}


/*
export default function configStore (initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const nextReducer = require('./rootReducer').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
*/
