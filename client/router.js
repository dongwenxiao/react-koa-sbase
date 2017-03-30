import React, { Component } from 'react'
import { ImportStyleRoot } from 'sp-css-import'

// react-router 的根路由结点
export let rootRouter = null

// 添加react router
export const add = (router) => {
    init()
    rootRouter.childRoutes.push(router)

    /**
     * 初始化react root router
     *
     * @returns root router
     */
    function init() {
        if (!rootRouter) {
            rootRouter = {
                path: '/',
                component: App,
                childRoutes: []
            }
        }
        return rootRouter
    }
}

// 获取已挂载的react router
export const get = () => {
    let routes = [rootRouter]
    routes.forEach(handleIndexRoute)
    return routes
}


// TODO 把根样式的处理移动到sp-boilerplate的App里，显示处理
@ImportStyleRoot()
class App extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

/**
 * 处理默认路由
 *
 * @param {any} route
 */
function handleIndexRoute(route) {
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
