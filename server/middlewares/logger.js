const log4js = require('koa-log4')

// 装载配置
log4js.configure(global.spConfig.LOG4JS.APPENDERS, { cwd: global.spConfig.LOG4JS.LOG_PATH })

module.exports = log4js.koaLogger(log4js.getLogger('http'))
