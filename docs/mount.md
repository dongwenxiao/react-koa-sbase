# 挂载说明



## 挂载app

> ```/app/index.js```<br>
> 每个app都必须提供如下接口

```
{
    urlPrefix,
    server: {
        router
    },
    client: {
        router,
        redux: {
            reducers
        }
    }
}
```
提供给 ```/config/mounting.js``` 使用。

## 挂载feature

> ```/feature/index.js``` <br>
> 每个feature都必须提供如下接口
```
{
    urlPrefix,
    server: {
        router
    },
    client: {
        router,
        redux: {
            reducers
        }
    }
}
```
提供给 ```/app/server.js``` 和 ```/app/client.js``` 使用。


## 备忘
先用server和client在同一个index.js里暴露，看看打包是否会把有冗余，如果有，则把server和client的接口分别用文件暴露出来。