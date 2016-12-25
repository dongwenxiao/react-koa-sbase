/*
featrue 暴露挂载接口
*/


import { routes as clientRouter } from './client'
import { router as serverRouter } from './server'

// 功能URL前缀
const featureUrlPerfix = 'helloworld'
// const featureUrlPerfix = ''
clientRouter.path = featureUrlPerfix

export {
    featureUrlPerfix,
    clientRouter,
    serverRouter
}
