

/**
 * 配置跨域小中间件
 * 
 * @param {any} ctx
 * @param {any} next
 */
module.exports =  async(ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    await next()
}