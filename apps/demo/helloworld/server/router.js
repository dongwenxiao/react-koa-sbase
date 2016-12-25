const router = require('koa-router')()

router.get('/koa', async (ctx) => {
    ctx.body = 'koa page'
})

export default router
