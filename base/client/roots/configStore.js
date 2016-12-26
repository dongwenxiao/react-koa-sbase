import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'


const middlewares = [
    thunk,
    routerMiddleware(browserHistory)
]

let devToolsExtension = (f) => f

if (__CLIENT__) {
    if (window.devToolsExtension) {
        devToolsExtension = window.devToolsExtension()
    }
}


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
