import App from './containers/App'
import { PageNotFound, Test, SayPage } from './components'

export default {
    path: '', // 在feature暴露index.js里配置了
    component: App,
    childRoutes: [
        { path: 'react', name: 'react', component: Test },
        { path: 'say', name: 'say', component: SayPage },
        { path: '*', name: 'Page not found', component: PageNotFound }
    ]
}


/*



// import Feature from './components/Feature'
// import { Test, SayPage } from './components'

export default {
    path: '', // 在feature暴露index.js里配置了
    // component: Feature, // 这里可放feature的公共container
    childRoutes: [
        {
            path: 'react',
            name: 'react',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./components').Test)
                }, 'demo.helloworld.react')
            }
        },
        {
            path: 'say',
            name: 'say',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./components').SayPage)
                }, 'demo.helloworld.say')
            }
        }

        // { path: 'react', name: 'react', component: Test },
        // { path: 'say', name: 'say', component: SayPage },
        // { path: '*', name: 'Page not found', component: PageNotFound }
    ]
}
*/