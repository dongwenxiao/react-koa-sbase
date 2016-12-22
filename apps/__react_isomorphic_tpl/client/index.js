// 为了使用es7的async function 添加 babel-polyfill
// 打包后的client.js 增加了100k左右（270k -> 370k）
// 后续再寻找更好的办法减小体积
import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
// TODO: 在生成环境移除这个组件
import { AppContainer as HotContainer } from 'react-hot-loader'
import Root from './containers/Root'
import { browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './common/routeConfig'
import configStore from './common/configStore'

// 添加js原生扩展
require('../../../ext/index')

// 获取server端写的默认state
const store = configStore(window.__REDUX_STATE__)

// 用react-router-redux增强history
const history = syncHistoryWithStore(browserHistory, store)

// 客户端渲染的时候也需要匹配路由
// 否则会提示server render 和 client render不匹配
match({ history, routes }, (err, redirectLocation, renderProps) => {

    if (err) {
        console.log(err.stack)
    }

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
            <Root {...{store, history, routes}} ></Root>
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
