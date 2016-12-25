const fs = require('fs')
const LOG_PATH = `${global.spConfig.RUN_PATH}/logs`


// log目录不能自动创建
if (!fs.existsSync(LOG_PATH)) {
    fs.mkdirSync(LOG_PATH)
}

// log4js.levels.INFO
// trace, debug, info, warn, error, fatal
/*
{
 ALL: new Level(Number.MIN_VALUE, "ALL"),
 TRACE: new Level(5000, "TRACE"),
 DEBUG: new Level(10000, "DEBUG"),
 INFO: new Level(20000, "INFO"),
 WARN: new Level(30000, "WARN"),
 ERROR: new Level(40000, "ERROR"),
 FATAL: new Level(50000, "FATAL"),
 MARK: new Level(9007199254740992, "MARK"), // 2^53
 OFF: new Level(Number.MAX_VALUE, "OFF")
}
 */
module.exports = {
    LOG_PATH,
    APPENDERS: {
        appenders: [{
            type: "console"
        }, {
            type: "clustered",
            appenders: [{
                type: "file",
                filename: "startup.log",
                maxLogSize: 10485760,
                category: "startup"
            }, {
                type: "dateFile",
                filename: "http",
                alwaysIncludePattern: true,
                pattern: "-yyyy-MM-dd.log",
                category: "http"
            }, {
                type: "file",
                filename: "app.log",
                maxLogSize: 10485760,
                numBackups: 5
            }, {
                type: "logLevelFilter",
                level: "ERROR",
                appender: {
                    type: "file",
                    filename: "errors.log"
                }
            }, {
                type: 'file',
                filename: 'custom.log',
                category: 'custom'
            }]
        }],
        replaceConsole: true, //替换console.log
        levels: {
            console: 'ALL',
            startup: 'ALL',
            http: 'ALL'
        }
    }

}
