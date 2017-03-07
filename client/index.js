import React from 'react'
import { render } from 'react-dom'
// import thunk from 'redux-thunk'
import { browserHistory, match, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'


import * as rootReducer from './reducer'
import * as rootRouter from './router'
import * as reduxMiddleware from './middleware'
import { factoryConfigureStore } from './configureStore'


/*
import { redux, router, run } from 'superproject/client'
client.redux.use() redux中间件
client.redux.reducer.use() redux的reducer挂载
client.router.use() react-router挂载
client.run()
*/

export const CHANGE_LANGUAGE = rootReducer.CHANGE_LANGUAGE
export const TELL_ME_URL = rootReducer.TELL_ME_URL

export const redux = {
    use: (middleware) => {
        reduxMiddleware.add(middleware)
    },

    reducer: {
        use: (name, reducer) => {
            rootReducer.init()
            rootReducer.add(name, reducer)
        }
    }
}


// 扩展客户端路由属性
let __ext = {}
export const router = {
    use: (router) => {
        rootRouter.add(router)
    },
    get: () => rootRouter.get(),

    // 扩展客户端路由
    ext: (ext) => {
        Object.assign(__ext, ext)
    }
}


export const createConfigureStore = () => {
    const reducers = rootReducer.get()
    const middlewares = reduxMiddleware.get()
    return factoryConfigureStore(reducers, middlewares)
}

// export const configureStore = createConfigureStore()

export const run = () => {

    // redux
    // const reducers = rootReducer.get()
    // const middlewares = reduxMiddleware.get()
    // const configureStore = factoryConfigureStore(reducers, middlewares)
    const configureStore = createConfigureStore()
    const store = configureStore(window.__REDUX_STATE__)

    // 默认添加的redux中间件
    // redux.use(thunk)
    // redux.use(routerMiddleware(browserHistory))


    // react-router
    const routes = rootRouter.get()
    // 用react-router-redux增强history
    const history = syncHistoryWithStore(browserHistory, store)

    match({ history, routes }, (err, redirectLocation, renderProps) => {

        if (err) {
            console.log(err.stack)
        }

        render(
            <Provider store={store}>
                <Router history={history} {...__ext}>
                    {routes}
                </Router>
            </Provider>,
            document.getElementById('root')
        )
    })
}