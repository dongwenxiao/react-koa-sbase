/*

有webpack打包在执行过程中的require还不识别
所以暂时无法简写

const routeFactory = (mapping) => (mapping.map((one) => ({
    path: one.path,
    name: one.name,
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            cb(null, require(one.module).default)
        })
    },
    isIndex: !!one.index
})))

*/

import Layout from './Layout'

export default {
    path: 'profile',
    name: 'profile',
    component: Layout,
    childRoutes: [
        {
            path: 'home',
            name: 'profile.home',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./HomePage').default)
                }, 'profile.home')
            },
            isIndex: false
        },
        {
            path: 'about',
            name: 'profile.about',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./AboutPage').default)
                }, 'profile.about')
            },
            isIndex: false
        },
        {
            path: 'past',
            name: 'profile.past',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./PastPage').default)
                }, 'profile.past')
            },
            onEnter: requireAuth,
            isIndex: false
        },
        {
            path: 'demo',
            name: 'profile.demo',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./DemoPage').default)
                }, 'profile.demo')
            },
            isIndex: false
        },
        {
            path: 'link',
            name: 'profile.link',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./LinkPage').default)
                }, 'profile.link')
            },
            isIndex: false
        }
    ]
}
function requireAuth(nextState, replace) {
  if (1) {
      console.log('onEnter!!!')
    // replace({
    //   pathname: '/login',
    //   state: { nextPathname: nextState.location.pathname }
    // })
  }
}
