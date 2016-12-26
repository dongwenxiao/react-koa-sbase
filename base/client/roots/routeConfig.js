import React, { Component } from 'react'
import mountings from '../../../mounting'
// import {router as subrouter} from '../../../apps/demo/helloworld/client'

/**
 * 处理默认路由
 * Handle isIndex property of route config:
 *  1. remove the first child with isIndex=true from childRoutes
 *  2. assign it to the indexRoute property of the parent.
 * @param {any} route
 * @returns void
 */
function handleIndexRoute (route) {

    if (!route.childRoutes || !route.childRoutes.length) {
        return
    }

    route.childRoutes = route.childRoutes.filter(child => { // eslint-disable-line
        if (child && child.isIndex) {

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



class App extends Component {

    static sss = 'sss'

    static test = (val = 'val') => {
        App.sss + 'test xxxxxxxxxxxx ' + val
    }

    render () {

        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


const routes = [{
    path: '/',
    component: App,
    childRoutes: mountings.map((app) => (app.clientRouter))
}]

routes.forEach(handleIndexRoute)

export default routes
