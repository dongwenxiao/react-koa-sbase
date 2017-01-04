export default {
    path: 'about',
    name: 'about',
    childRoutes: [
        {
            path: 'index',
            name: 'about.index',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./AboutPage').default)
                }, 'about.index')
            },
            isIndex: true
        }
    ]

}
