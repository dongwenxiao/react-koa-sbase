/*const convert = require('koa-convert')
const webpack = require('webpack')
const webpackMiddleware = convert(require('koa-webpack-dev-middleware'))
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')


module.exports = (config) => {

    const compiler = webpack(config)
    const dashboard = new Dashboard()

    compiler.apply(new DashboardPlugin(dashboard.setData))

    return webpackMiddleware(compiler, {
        // contentBase: webpackConf.output.path,
        // publicPath: webpackConf.output.publicPath,
        hot: true,
        stats: {
            colors: true
        }
    })
}
*/

const webpack = require('webpack')
const convert = require('koa-convert')
const koaWebpackDevMiddleware = convert(require('koa-webpack-dev-middleware'))
const koaWebpackHotMiddleware = require("koa-webpack-hot-middleware")
const config = require('../../../../webpack/webpack.client.dev')

export default (app) => {

    const compiler = webpack(config)
    
    app.use(koaWebpackDevMiddleware(compiler, {
        quiet: true,
        hot: true,
        inline: true,
        contentBase: './',
        publicPath: '/dist/',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }))

    app.use(koaWebpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }))
}