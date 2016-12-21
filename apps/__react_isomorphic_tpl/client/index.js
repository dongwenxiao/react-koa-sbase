// 为了使用es7的async function 添加 babel-polyfill
// 打包后的client.js 增加了100k左右（270k -> 370k）
// 后续再寻找更好的办法减小体积
import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer as HotContainer } from 'react-hot-loader'
import Root from './containers/Root'
import { browserHistory, match } from 'react-router'
import { syncHistoryWithStore, push } from 'react-router-redux'

// config
import routes from './common/routeConfig'
import configStore from './common/configStore'

// add js ext
require('../../../ext/index')

const store = configStore(window.__REDUX_STATE__)
// setTimeout(()=>{
//     console.log('!!!!!')
//     store.dispatch(push('/profile/about'))
// },3000)
const history = syncHistoryWithStore(browserHistory, store)

// 客户端渲染的时候也需要匹配路由
// 否则会提示server render 和 client render不匹配
match({ routes, location }, () => {

    /*
    render(
        <Provider store={store}>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </Provider>,
        document.getElementById('root')
    )*/

    const root = document.getElementById('root')
    render(
        <HotContainer>
            <Root store={store} history={history}></Root>
        </HotContainer>,
        root
    )
})

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NextRoot = require('./containers/Root').default; // eslint-disable-line
        render(
            <HotContainer>
                <NextRoot store={store} history={history} />
            </HotContainer>,
            root
        )
    })
}
