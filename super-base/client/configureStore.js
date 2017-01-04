import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from './rootReducer'
// import { browserHistory } from 'react-router'
// import { routerMiddleware } from 'react-router-redux'


// const middlewares = [
//     thunk,
//     routerMiddleware(browserHistory)
// ]

let devToolsExtension = (f) => f

if (__CLIENT__) {
    if (window.devToolsExtension) {
        devToolsExtension = window.devToolsExtension()
    }
}


// export default function configStore(initialState) {

//     const store = createStore(rootReducer, initialState, compose(
//         applyMiddleware(...middlewares),
//         devToolsExtension
//     ))

//     return store
// }

export function factoryConfigureStore (reducers, middlewares = []) {

    return (initialState) => {
        const store = createStore(reducers, initialState, compose(
            applyMiddleware(...middlewares),
            devToolsExtension
        ))

        return store
    }
}
