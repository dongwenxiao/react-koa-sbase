import { createStore, applyMiddleware, compose } from 'redux'


// redux调试
let devToolsExtension = (f) => f
if (__CLIENT__ && __DEV__) {
    if (window.devToolsExtension) {
        devToolsExtension = window.devToolsExtension()
    }
}


export function factoryConfigureStore(reducers, middlewares = []) {
    return (initialState) => {
        let store
        if (__DEV__) {
            store = createStore(reducers, initialState, compose(
                applyMiddleware(...middlewares),
                devToolsExtension
            ))
        } else {
            store = createStore(reducers, initialState, compose(
                applyMiddleware(...middlewares)
            ))
        }
        return store
    }
}