# sp-base [Superproject core]

> ```Superproject``` 是基于 ```React``` + ```Koa``` 全栈技术框架。<br>
> ```sp-base``` 是实现Superproject的基础代码，提供了启动程序和可扩展接口。

## 扩展点

> Client 可以扩展

```
redux middleware

redux reducer

react router
```

> Server 可以扩展

```
koa middleware

koa router
```


## 接口使用

> Client

```
import { redux, router, createConfigureStore, run } from 'superproject/client'

client.redux.use() // redux中间件
client.redux.reducer.use() // redux的reducer挂载
client.router.use() // react-router挂载
client.run() // 运行客户端
```

> Server

```
import { middleware, router, commonMiddlewares, run } from 'superproject/server'

server.middleware.use() // koa-middleware中间件
server.router.use() // koa-router挂载
server.run() // 运行服务端
```

## 相关扩展（无链接表示未完成）

例子|说明
----|----
[sp-boilerplate](https://github.com/dongwenxiao/sp-boilerplate)|Superproject 项目示例


核心基础|说明
----|----
[sp-base](https://github.com/dongwenxiao/sp-base)|Superproject基础代码

工具|说明
----|----
[sp-css-loader](https://github.com/dongwenxiao/sp-css-loader)|处理组件化样式的webpack loader，可与file-loader配合使用


服务端中间件(Koa)|说明
----|----
[sp-react-isomorphic](https://github.com/dongwenxiao/sp-react-isomorphic)|React（Redux）同构Koa中间件


模块 | 说明
----|----
[sp-css-import](https://github.com/dongwenxiao/sp-css-import) | 辅助sp-css-loader加载样式
sp-email|发邮件
sp-sms|发短信
sp-mongo|mongodb 操作
sp-qiniu|七牛存储操作


功能|说明
----|----
sp-wx|微信相关功能
sp-cms|cms系统功能
sp-api|api接口生成
sp-schedule|时间表、计划任务
sp-auth|权限管理


## 技术栈(计划使用)

组件化 - React <br>
状态管理 - Redux <br>
路由 - React-Router <br>
同构 - React RenderToString <br>
Style导入 - wapper-css-loader <br>
打包工具 - webpack2 <br>
组件库 - Material-UI <br>
CSS编译 - Sass <br>
ES6\7编译 - Babel <br>

单元测试 - Mocha <br>

HTTP服务 - Koa2 <br>
静态服务器 - 七牛云 <br>
缓存服务 - Redis <br>
数据库 - MongoDB <br>

NodeJS进程管理 - PM2 <br>
HTTP反向代理 - Nginx <br>

环境容器 - Docker <br>

代码管理 - Git <br>
持续集成 - Jenkins <br>
