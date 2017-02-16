module.exports = function(ctx, next) {
    ctx.spResponse = (code = 200, data = {}, msg = '') => {
        ctx.body = { code, data, msg }
    }
    return next()
}