import { middleware, router, run, commonMiddlewares } from '../server'
import { router as reactRouter, createConfigureStore } from './client'

// koa middleware
// middleware.use(commonMiddlewares)
commonMiddlewares(middleware)

const isomorphic = require('./isomorphic-react-redux-middleware')
const configureStore = createConfigureStore()
middleware.use(isomorphic(reactRouter.get(), configureStore))

const convert = require('koa-convert')
const koaStatic = require('koa-static')
middleware.use(convert(koaStatic(process.cwd() + '/dist/public')))

//
run()
