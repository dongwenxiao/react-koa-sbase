// acl  简单访问权限控制


// 任何人
const ANYONE = [
    '/',
    '/about'
]

// 登录用户
const USER = [
	'/user'
].concat(ANYONE)

// 管理员
const ADMIN = [
	'/admin'
].concat(USER)



module.exports = {
    ANYONE,
    USER,
    ADMIN
}
