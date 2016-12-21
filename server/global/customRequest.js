const https = require('https')
const http = require('http')
    //
    //  自定义HTTP、HTTPS请求
    //  options参数参考 node 的 HTTP对象参数
    //  http://nodejs.cn/doc/node/http.html#http_http_request_options_callback
    //  如果不传入callback,返回promise对象
    //  callback(response, err)
const customRequest = (options, callback) => {

    // 配置HTTP/HTTPS请求的基本信息

    options = Object.assign({
        https: false,
        hostname: 'baidu.com',
        port: 443,
        path: '',
        method: 'GET',
        data: '',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(options.data)
        }
    }, options)

    const useHttp = options.https ? https : http


    if (callback) {

        // 发送请求

        const req = useHttp.request(options, (res) => {

            let resArr = []
            res.on('data', (d) => {
                resArr.push(d)
            })
            res.on('end', () => {
                callback(resArr.join(''))
            })
        })

        // 写入请求数据

        options.data && req.write(options.data)

        req.end()

        req.on('error', (e) => {
            // 错误，返回的数据
            callback(false, e)
        })
    } else {
        return new Promise((resolve, reject) => {

            // 发送请求

            const req = useHttp.request(options, (res) => {

                let resArr = []
                res.on('data', (d) => {
                    resArr.push(d)
                })
                res.on('end', () => {
                    resolve(resArr.join(''))
                })
            })

            // 写入请求数据

            options.data && req.write(options.data)

            req.end()

            req.on('error', (e) => {
                // 错误，返回的数据
                reject(e)
            })
        })
    }
}

module.exports = customRequest
