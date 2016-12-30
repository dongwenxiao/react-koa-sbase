// import React, { Component } from 'react'
import { clients } from '../../../config/mounting'
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


// class App extends Component {

//     static sss = 'sss'

//     static test = (val = 'val') => {
//         App.sss + 'test xxxxxxxxxxxx ' + val
//     }

//     render () {

//         return (
//             <div>
//                 {this.props.children}
//             </div>
//         )
//     }
// }

let childRoutes = []
// console.log('clients----------')
// console.log(clients)
for (let urlPrefix in clients) {
    // console.log('urlPrefix----------')
    // console.log(urlPrefix)

    // console.log('<><><><><><><>')
    // console.log(clients.hasOwnProperty(urlPrefix))

    if (!clients.hasOwnProperty(urlPrefix)) continue

    let client = clients[urlPrefix]
    // console.log('client---------')
    // console.log(client)
    childRoutes.push(client.router)
    // console.log('childRoutes---------')
    // console.log(childRoutes)
}

const router = [{
    path: '/',
    // component: App,
    childRoutes
}]

// console.log('router----------')
// console.log(router)

router.forEach(handleIndexRoute)

export default router
