//
//	用于配置文件的加载
//	先判断app的config有没有配置文件，如果有则先用app的
//	如果没有，在用superproject默认的
//
const path = require('path')
const fs = require('fs')
const _ = require('underscore')
const RUN_PATH = global.__ROOT__
console.log(__ROOT__)
let __DIRNAME = path.resolve(RUN_PATH, '../../server/global/')
if(__SERVER__ === true && __DEV__ === false){
    __DIRNAME = __REQUIRE_BASE__
}
console.log('__DIRNAME')
console.log(__DIRNAME)
console.log('__dirname')
console.log(__dirname)

const defaultRequire = (targetPath, defaultPath, isFunction = false) => {

    



    // 补齐后缀
    if (path.extname(targetPath) != '.js') targetPath += '.js'
    if (path.extname(defaultPath) != '.js') defaultPath += '.js'

    console.log('targetPath')
    console.log(targetPath)

    console.log('defaultPath')
    console.log(defaultPath)

    const exists = fs.existsSync(targetPath)
    // const defaultResult = path.relative(__dirname, defaultPath)
    const defaultResult = path.relative(__DIRNAME, defaultPath)
    console.log('defaultResult')
    console.log(defaultResult)

    if (exists) {
        // console.log(`targetPath  ${targetPath}  exists`)
        const targetResult = path.relative(__DIRNAME, targetPath)
        console.log('targetResult')
        console.log(targetResult)
        if(isFunction)
            return _.extend(require(defaultResult)(RUN_PATH), require(targetResult)(RUN_PATH, defaultPath))
        else
            return _.extend(require(defaultResult), require(targetResult))
    } else {
        // console.log(`targetPath  ${targetPath}  !!!noexists`)
        if(isFunction)
            return require(defaultResult)(RUN_PATH)
        else
            return require(defaultResult)
    }



}

module.exports = defaultRequire
