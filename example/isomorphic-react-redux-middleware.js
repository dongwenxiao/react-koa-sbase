
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
//
// import configStore from '../../client/common/configStore'

const asyncMatch = (location) => new Promise((resolve, reject) => {
    match(location, (error, redirectLocation, renderProps) => {
        if (error) {
            return reject(error)
        }

        resolve({ redirectLocation, renderProps })
    })
})

const asyncStore = async (store, renderProps) => {


    let prefetchTasks = []
    for (let component of renderProps.components) {

        // component.WrappedComponent 是redux装饰的外壳
        if (component && component.WrappedComponent && component.WrappedComponent.fetch) {
            const _tasks = component.WrappedComponent.fetch(store.getState(), store.dispatch)
            if (Array.isArray(_tasks)) {
                prefetchTasks = prefetchTasks.concat(_tasks)
            } else if (_tasks.then) {
                prefetchTasks.push(_tasks)
            }
        }
    }

    await Promise.all(prefetchTasks)

}

function renderHtml (html, state) {

    let template = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <title>React Template</title>
        </head>

        <body>
            <div id="root">
                <div><script>//inject_html</script></div>
            </div>

            <script>//inject_redux_state</script>
            <script>//inject_js</script>

        </body>

        </html>
    `

    // 序列化的redux状态
    const reduxState = `<script>window.__REDUX_STATE__ = ${JSON.stringify(state)};</script>`

    // 跟进环境，注入的js链接
    const jsLink = ((isDev) => {
        if (isDev) return '<script src="http://localhost:3001/dist/client.js"></script>'
        else return '<script src="/client/client.js"></script>'
    })(__DEV__)

    // 返回给浏览器的html
    const responseHtml = template
        .replace('<script>//inject_html</script>', html)
        .replace('<script>//inject_redux_state</script>', reduxState)
        .replace('<script>//inject_js</script>', jsLink)

    return responseHtml
}


module.exports = function (routes, configStore) {
    // console.log(JSON.stringify(routes))

    return async (ctx, next) => {
        try {
            const memoryHistory = createMemoryHistory(ctx.url)
            const store = configStore(memoryHistory)
            const history = syncHistoryWithStore(memoryHistory, store)
            const { redirectLocation, renderProps } = await asyncMatch({ history, routes, location: ctx.url })

            if (redirectLocation) {

                ctx.redirect(redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {

                await asyncStore(store, renderProps)

                ctx.body = renderHtml(
                    renderToString(
                        <Provider store={store}><RouterContext {...renderProps} /></Provider>
                    ), store.getState()
                )
            } else {
                await next()
            }

        } catch (e) {
            console.error('Server-Render Error Occures: %s', e.stack)
            ctx.status = 500
            ctx.body = e.message
        }
    }
}
