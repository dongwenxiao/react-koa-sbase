/*
featrue 暴露挂载接口
*/


import { router as clientRouter } from './client'
import { router as serverRouter } from './server'

// 功能URL前缀
const urlPerfix = 'helloworld'
clientRouter.path = urlPerfix

export {
    urlPerfix,
    clientRouter,
    serverRouter
}
