import dao from '../modules/dao/mongodb'
const cors = require('../middlewares/cors-simple') // 跨域用的小中间件
const mongo = global.spConfig.MONGODB


/**
 * api统一返回类型
 * response:{data,code,msg}
 */
const restResponse = (type = json, code, data, msg) => {

    if (type === 'json') {
        return {
            code,
            data,
            msg
        }
    }
}



module.exports = (router) => {

    router
        .get('/', (ctx, next) => {
            ctx.body = 'this is api handle'
        })
        .get('/test', async(ctx) => {
            const result = await dao.find('user', {
                    _limit: undefined,
                    _skip: undefined,
                    _query: undefined,
                    _filter: undefined
                })
                // console.log(result)
            ctx.body = result
        })


    if (mongo.db) {
        for (var collection in mongo.collections) {

            // 跟进collection的名字创建路由

            ((collection) => {

                router


                    .options(`*`, cors, async(ctx) => {
                        // 
                        // 跨域设置
                        // 
                        ctx.status = 204;
                    })


                // 请求参数
                // {
                //      key1: val1,   // 过滤条件
                //      key2: val2,
                //      skip: 5,    // 跳过5个记录
                //      limit: 10,  // 取10个记录
                //      filter: {   // 子集合过滤
                //          s_key: s_val
                //      }
                // }
                .get(`/${collection}`, cors, async(ctx) => {

                        /*switch (this.accepts('json', 'html', 'text')) {
                          case 'json': break;
                          case 'html': break;
                          case 'text': break;
                          default: this.throw(406, 'json, html, or text only');
                        }*/

                        let _query = {},
                            _skip = undefined,
                            _limit = undefined,
                            _filter = undefined

                        for (let key in ctx.query) {
                            if (key == 'skip') {
                                _skip = ctx.query[key] - 0
                            } else if (key == 'limit') {
                                _limit = ctx.query[key] - 0
                            } else {
                                let _val = ctx.query[key]
                                if (key.charAt(key.length-1) == '!') {
                                    key = key.slice(0, key.length-1)
                                    _query[key] = { $ne: _val }
                                } else if (key.charAt(key.length-1) == '>') {
                                    key = key.slice(0, key.length-1)
                                    _query[key] = { $gt: parseInt(_val) }
                                } else if (key.charAt(key.length-1) == '<') {
                                    key = key.slice(0, key.length-1)
                                    _query[key] = { $lt: _val }
                                } else if (key.charAt(key.length-1) == '%') {
                                    key = key.slice(0, key.length-1)
                                    _query[key] = { $regex: _val, $options: 'i' }
                                } else {
                                    _query[key] = _val
                                }
                            }
                        }

                        const result = await dao.find(collection, {
                            _query,
                            _skip,
                            _limit,
                            _filter
                        })

                        ctx.body = ctx.body = restResponse('json', 200, result, '')

                    })
                    .get(`/${collection}/:id`, cors, async(ctx) => {

                        let _query = { _id: ctx.params.id }

                        const result = await dao.find(collection, {
                            _query
                        })

                        ctx.body = restResponse('json', 200, result[0], '')

                    })
                    // body 里是 json 格式的 doc
                    .post(`/${collection}`, cors, async(ctx) => {
                        let data = ctx.request.body;
                        for (let _key in data) {
                            if (mongo.collections[collection][_key] == 'number') {
                                data[_key] = parseInt(data[_key])
                            }
                        }
                        const result = await dao.insert(collection, data)

                        if (result.result.ok === 1) {
                            ctx.body = restResponse('json', 200, {
                                id: result.insertedIds[1]
                            }, 'success')
                        } else {
                            ctx.body = restResponse('json', 200, {
                                id: ''
                            }, 'fail')
                        }


                    })
                    .put(`/${collection}`,cors, async(ctx) => {
                        let selecter = {},
                            doc = ctx.request.body

                        for (let key in ctx.query) {
                            selecter[key] = ctx.query[key]
                        }
                        for (let _key in doc) {
                            if (mongo.collections[collection][_key] == 'number') {
                                doc[_key] = parseInt(doc[_key])
                            }
                        }

                        const { result } = await dao.update(collection, selecter, doc)

                        if (result.ok > 0) {
                            ctx.body = restResponse('json', 200, { affect: result.n }, 'success')
                        } else {
                            ctx.body = restResponse('json', 200, { affect: result.n }, 'fail')
                        }

                    })
                    .put(`/${collection}/:id`, cors, async(ctx) => {

                        let selecter = { _id: ctx.params.id },
                            doc = ctx.request.body
                        for (let _key in doc) {
                            if (mongo.collections[collection][_key] == 'number') {
                                doc[_key] = parseInt(doc[_key])
                            }
                        }

                        const { result } = await dao.update(collection, selecter, doc)

                        if (result.ok > 0) {
                            ctx.body = restResponse('json', 200, { affect: result.n }, 'success')
                        } else {
                            ctx.body = restResponse('json', 200, { affect: result.n }, 'fail')
                        }

                    })
                    // body 里无内容
                    .delete(`/${collection}/:id`, cors, async(ctx) => {

                        let selecter = { _id: ctx.params.id }

                        const { result } = await dao.delete(collection, selecter)

                        if (result.ok > 0) {
                            ctx.body = restResponse('json', 200, { affect: result.n }, 'success')
                        } else {
                            ctx.body = restResponse('json', 200, { affect: result.n }, 'fail')
                        }

                    })

            })(collection)
        }
    }

    return router
}



// 1 消息（1字头）
// ▪ 100 Continue
// ▪ 101 Switching Protocols
// ▪ 102 Processing
// 2 成功（2字头）
// ▪ 200 OK
// ▪ 201 Created
// ▪ 202 Accepted
// ▪ 203 Non-Authoritative Information
// ▪ 204 No Content
// ▪ 205 Reset Content
// ▪ 206 Partial Content
// 3 重定向（3字头）
// ▪ 300 Multiple Choices
// ▪ 301 Moved Permanently
// ▪ 302 Move temporarily
// ▪ 303 See Other
// ▪ 304 Not Modified
// ▪ 305 Use Proxy
// ▪ 306 Switch Proxy
// ▪ 307 Temporary Redirect
// 4 请求错误（4字头）
// ▪ 400 Bad Request
// ▪ 401 Unauthorized
// ▪ 403 Forbidden
// ▪ 404 Not Found
// ▪ 405 Method Not Allowed
// ▪ 406 Not Acceptable
// ▪ 407 Proxy Authentication Required
// ▪ 408 Request Timeout
// ▪ 409 Conflict
// ▪ 410 Gone
// ▪ 411 Length Required
// ▪ 412 Precondition Failed
// ▪ 413 Request Entity Too Large
// ▪ 414 Request-URI Too Long
// ▪ 415 Unsupported Media Type
// ▪ 416 Requested Range Not Satisfiable
// ▪ 417 Expectation Failed
// ▪ 422 Unprocessable Entity
// ▪ 423 Locked
// ▪ 424 Failed Dependency
// ▪ 425 Unordered Collection
// ▪ 426 Upgrade Required
// ▪ 449 Retry With
// 5 服务器错误（5、6字头）
// ▪ 500 Internal Server Error
// ▪ 501 Not Implemented
// ▪ 502 Bad Gateway
// ▪ 503 Service Unavailable
// ▪ 504 Gateway Timeout
// ▪ 505 HTTP Version Not Supported
// ▪ 506 Variant Also Negotiates
// ▪ 507 Insufficient Storage
// ▪ 509 Bandwidth Limit Exceeded
// ▪ 510 Not Extended
// ▪ 600 Unparseable Response Headers
