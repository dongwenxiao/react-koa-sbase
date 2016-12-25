const acl = require('../../config/acl.simple')

// role in session
const check = (role, url) => {

    // 如果是首页，默认可以访问
    if (url.length === 1 && url === '/')
        return true

    // 非首页情况
    // 但如果URL是一个字母或者太短，可能会出现bug
    let aclList

    if (role === 'none') aclList = acl['anyone']
    else if (role === 'user') aclList = acl['user']
    else if (role === 'admin') aclList = acl['admin']

    // url 问号处理
    url = url.split('?')[0]

    let i = 0,
        count = aclList.length
    for (; i < count; i++) {
        const aclItem = aclList[i]

        // 如果当前URL包含了
        // if (url.includes(aclItem)){
        if (url === aclItem) {
            return true
        }
    }

    return false
}

const createUser = (name = '', role = 'none') => {
    return {
        name,
        role
    }
}

module.exports = async(ctx, next) => {

    // 补齐用户数据
    if (ctx.session.user === undefined)
        ctx.session.user = createUser()

    //
    const user = ctx.session.user
    const role = user.role
    const url = ctx.url

    // 检查不通过
    if (!check(role, url)) {
        // 无权访问
        ctx.status = 401
        ctx.res.end()
    } else {
        // 检查通过
        return next()
    }
}
