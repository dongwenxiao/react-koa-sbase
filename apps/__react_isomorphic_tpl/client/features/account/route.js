export default {
    path: 'account',
    name: 'account',
    childRoutes: [
        {
            path: 'login',
            name: 'account.login',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./LoginPage').default)
                }, 'account.login')
            },
            isIndex: false
        }
    ]

}
