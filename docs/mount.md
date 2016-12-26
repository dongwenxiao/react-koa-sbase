# 挂载说明



## 挂载app
```
// 每个app都必须提供如下接口
{
    appUrlPrefix,   // 挂载URL(/app)
    clientRouter,   // 客户端路由(React router)
    serverRouter    // 服务端路由(Koa router)
}

// 备注：挂载文件是根木下的mounting.js
```

## 挂载feature
```
// 每个feature都必须提供如下接口
{
    featureUrlPerfix,   // 挂载URL(/feature)
    clientRouter,   // 客户端路由(React router)
    serverRouter    // 服务端路由(Koa router)
}

// 备注：挂载文件是每个app下的index.js
```
