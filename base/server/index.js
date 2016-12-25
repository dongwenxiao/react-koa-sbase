/*
superproject base server 程序入口文件
*/

const server = require('./server')


// // 当前子app扩展部分
// let app = require('./app')
// if (module.hot) {
//     module.hot.accept('./app', () => {
//         app = require('./app')
//     })
// }


// 启动服务

function extApp (app) {

}

server(extApp).listen(global.spConfig.APP.SERVER_PORT)
