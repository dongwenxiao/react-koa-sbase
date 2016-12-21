# superproject

## 运行

```
cd superproject && npm i
cd apps/__react_isomorphic_tpl && npm i
npm start
```

在浏览器打开：```http://localhost:3000```

## 技术(计划使用)

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

## 目录结构

```
superproject
	|
	+---apps
	|	|
	|	+---__react_isomorphic_tpl
	|		|
	|		+---client
	|		|   |
	|		|   +---common
	|		|   |
	|		|   +---components
	|		|   |
	|		|   +---containers
	|		|   |
	|		|   +---features
	|		|       |
	|		|       +---common
	|		|       |
	|		|       +---account
	|		|       |
	|		|       +---profile
	|		|           |
	|		|           +---redux
	|		|           |
	|		|           +---LoginPage
	|		|
	|		+---server
	|		|
	|		+---logs
	|		|
	|		+---webpack
	|		|
	|		+---dist
	|		|
	|		+---index.html
	|		|
	|		+---package.json
	|
	+---server
	|	|
	|	+---config
	|	|
	|	+---enum
	|	|
	|	+---global
	|	|
	|	+---middlewares
	|	|
	|	+---modules
	|	|
	|	+---public
	|	|
	|	+---app.js
	|	|
	|	+---server.js
	|
	+---ext
	|
	+---webpack
	|
	+---package.json

```