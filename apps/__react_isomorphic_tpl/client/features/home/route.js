export default {
    path: '',
    name: 'home',
    childRoutes: [
        // { path: '', name: 'home-default', component: require('./DefaultPage'), isIndex: true },
        // { path: 'second', component: require('./SecondPage') },
        {
            path: '',
            name: 'home-default',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./DefaultPage').default)
                })
            },
            isIndex: true
        },
        {
            path: 'second',
            name: 'home-second',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./SecondPage').default)
                })
            }
        }
    ]
}
