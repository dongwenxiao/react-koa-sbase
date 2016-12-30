/*
featrue 暴露挂载接口
*/


import { router as clientRouter, reducers } from './client'
import { router as serverRouter } from './server'

// 功能URL前缀
const urlPerfix = 'helloworld'
clientRouter.path = urlPerfix
clientRouter.name = urlPerfix

let clientReducer = {}
clientReducer[urlPerfix] = reducers

export {
    urlPerfix,
    clientRouter,
    serverRouter,
    clientReducer
}
