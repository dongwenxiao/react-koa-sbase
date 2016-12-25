const argv = require('yargs').argv
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')

const CLIENT_DEV_PORT = 3001

// 描述环境
// dev 开发， dist 部署
const env = argv.env


// 描述场景
// client 客户端， server 服务端
const stage = argv.stage

// 生产标准配置文件格式
const factoryConfig = (config) => {

    const defaultConfigStruct = {
        client: {
            dev: {},
            dist: {}
        },
        server: {
            dev: {},
            dist: {}
        }
    }

    // 生产配置
    Object.assign(config, defaultConfigStruct)

    return config
}

const run = (config) => {

    // 程序启动路径，作为查找文件的基础
    let appPath = process.cwd()

    // 配置非空处理
    if (config === undefined) config = {}

    // 标准化配置
    config = factoryConfig(config)

    // 客户端开发模式
    if (stage === 'client' && env === 'dev') {

        let wcd = require('./client.dev')(appPath, CLIENT_DEV_PORT)
        Object.assign(wcd, config.client.dev)

        const compiler = webpack(wcd)
        const dashboard = new Dashboard()

        compiler.apply(new DashboardPlugin(dashboard.setData))

        // more config
        // http://webpack.github.io/docs/webpack-dev-server.html
        const server = new WebpackDevServer(compiler, {
            quiet: true,
            hot: true,
            inline: true,
            contentBase: './',
            publicPath: '/dist/',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })

        server.listen(CLIENT_DEV_PORT)
    }

    // 客户端打包
    if (stage === 'client' && env === 'dist') {

        let wcd = require('./client.dist')(appPath)
        Object.assign(wcd, config.client.dist)

        const compiler = webpack(wcd)
        compiler.run((err, stats) => {
            if (err) console.log(`webpack dist error: ${err}`)

            console.log(stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }))
        })
    }

    // 服务端开发环境
    if (stage === 'server' && env === 'dev') {

        let wsd = require('./server.dev')(appPath)
        Object.assign(wsd, config.server.dev)

        webpack(wsd, (err, stats) => {
            if (err) console.log(`webpack dev error: ${err}`)

            console.log(stats.toString({
                chunks: false,
                colors: true
            }))
        })
    }

    // 服务端打包
    if (stage === 'server' && env === 'dist') {

        let wsd = require('./server.dist')(appPath)
        Object.assign(wsd, config.server.dist)

        webpack(wsd, (err, stats) => {
            if (err) console.log(`webpack dist error: ${err}`)

            console.log(stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }))
        })
    }

}

run()
