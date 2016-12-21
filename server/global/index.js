global.spFun = {
    
}


// const _ = require('underscore')
// const path = require('path')
// const defaultRequire = require('./defaultRequire')
// // const customRequest = require('./customRequest')


// //
// // 配置文件读取
// //
// // const defaultPath = path.resolve(process.cwd(), '../../config') + '/'
// const defaultPath = path.resolve(__ROOT__, '../../config') + '/'
// const appPath = `${__ROOT__}/config/`
// // const appPath = path.resolve(process.cwd(), './config') + '/' // path.resolve('./') == process.cwd()
// const spConfig = {}

// let root = null
// if (global) root = global
// else root = window

// //
// // 全局变量
// //
// _.extend(root, {
//     spConfig,
//     spFun: {
//         defaultRequire
//     }
// })
// // console.log('=========>')
// // console.log(appPath + 'app')
// // console.log(defaultPath + 'app')
// spConfig.app = defaultRequire(appPath + 'app', defaultPath + 'app')
// spConfig.logger = defaultRequire(appPath + 'log4js', defaultPath + 'log4js')
// spConfig.mongodb = defaultRequire(appPath + 'mongodb', defaultPath + 'mongodb')
// spConfig.mysql = defaultRequire(appPath + 'mysql', defaultPath + 'mysql')
// spConfig.redis = defaultRequire(appPath + 'redis', defaultPath + 'redis')
// spConfig.acl = defaultRequire(appPath + 'acl.simple', defaultPath + 'acl.simple')
// spConfig.storage = {
//     disk: defaultRequire(appPath + 'storage.disk', defaultPath + 'storage.disk'),
//     qiniu: defaultRequire(appPath + 'storage.qiniu', defaultPath + 'storage.qiniu')
// }
// spConfig.webpack = {
//     client: {
//         base: defaultRequire(appPath + 'webpack.client.base', defaultPath + 'webpack.client.base', true),
//         dev: defaultRequire(appPath + 'webpack.client.dev', defaultPath + 'webpack.client.dev', true),
//         dist: defaultRequire(appPath + 'webpack.client.dist', defaultPath + 'webpack.client.dist', true)
//     },
//     server: {
//         dist: defaultRequire(appPath + 'webpack.server.dist', defaultPath + 'webpack.server.dist', true),
//         dev: defaultRequire(appPath + 'webpack.server.dev', defaultPath + 'webpack.server.dev', true)
//     }
// }

