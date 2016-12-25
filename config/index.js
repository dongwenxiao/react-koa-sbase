/**
 * spConfig
 * 服务端全局的配置
 */

global.spConfig = {
    RUN_PATH: process.cwd()
}

Object.assign(global.spConfig, {
    APP: require('./app'),
    LOG4JS: require('./log4js'),
    MONGODB: require('./mongodb'),
    MYSQL: require('./mysql'),
    REDIS: require('./redis')
})
