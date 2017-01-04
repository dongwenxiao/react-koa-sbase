
let middlewares = null


export const init = () => {
    if (!middlewares) middlewares = []
    return middlewares
}

export const add = (middleware) => {
    init()
    middlewares.push(middleware)
}

export const get = () => middlewares

// const middlewares = [
//     thunk,
//     routerMiddleware(browserHistory)
// ]

// let devToolsExtension = (f) => f

// if (__CLIENT__) {
//     if (window.devToolsExtension) {
//         devToolsExtension = window.devToolsExtension()
//     }
// }


