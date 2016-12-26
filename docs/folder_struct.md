# 目录结构

```
// 看起来像...

base:豹厂
apps:猎豹移动
    app:用户体验部
        feature:前端开发组
            router:董文枭
                client:颜值
                server:能耐
```

```
apps
    app
        feature
            clinet
                redux
                components
                containers
                route.js
                index.js
            server
                service
                route.js
                index.js
            index.js
base
    ext
    server
        middlewares
        modules
        routes
        public
            reset.css
            index.html
        app.js
        server.js
    client
        roots
        containers
        index.js
    index.js
config
logs
dist
docs
mounting.js
webpack
package.json

```

接口暴露
告诉需要挂载的组件父级需要什么接口！