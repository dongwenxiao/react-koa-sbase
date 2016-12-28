# 挂载说明



## 挂载app
```
// 每个app都必须提供如下接口
{
    urlPrefix,
    redux: {
        store,
        reducers
    },
    router: {
        client,
        server
    }
}

// 备注：挂载文件是根木下的mounting.js
```

## 挂载feature
```
// 每个feature都必须提供如下接口
{
    urlPrefix,
    router: {
        client,
        server
    }
}

// 备注：挂载文件是每个app下的index.js
```

## 备忘
先用server和client在同一个index.js里暴露，看看打包是否会把有冗余，如果有，则把server和client的接口分别用文件暴露出来。