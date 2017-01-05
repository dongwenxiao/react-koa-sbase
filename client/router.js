import React, { Component } from 'react'
import { ImportStyleRoot } from 'react-import-style'

let rootRouter = null

export const init = () => {

    if (!rootRouter) {
        rootRouter = {
            path: '/',
            component: App,
            childRoutes: []
        }
    }

    return rootRouter
}

@ImportStyleRoot()
class App extends Component {
    render () {
        return (
            <div>{this.props.children}</div>
        )
    }
}

export const add = (router) => {
    init()
    rootRouter.childRoutes.push(router)
}

export const get = () => {
    let routes = [rootRouter]
    routes.forEach(handleIndexRoute)
    return routes
}


// 处理默认路由

// Handle isIndex property of route config:
//  1. remove the first child with isIndex=true from childRoutes
//  2. assign it to the indexRoute property of the parent.
function handleIndexRoute (route) {
    if (!route.childRoutes || !route.childRoutes.length) {
        return
    }

    route.childRoutes = route.childRoutes.filter(child => { // eslint-disable-line
        if (child.isIndex) {

            /* istanbul ignore next */
            if (process.env.NODE_ENV === 'dev' && route.indexRoute) {
                console.error('More than one index route: ', route)
            }

            /* istanbul ignore else */
            if (!route.indexRoute) {
                delete child.path; // eslint-disable-line
                route.indexRoute = child; // eslint-disable-line
                return false
            }
        }
        return true
    })

    route.childRoutes.forEach(handleIndexRoute)
}
