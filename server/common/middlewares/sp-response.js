module.exports = function(ctx, next) {
    ctx.spResponse = (code = 200, data = {}, msg = '') => ({ code, data, msg })
    return next()
}