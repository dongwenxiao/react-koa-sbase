# 状态管理

## 说明

每个app有1个store，管理app下面的n个feature。

## server配置
先用router区分，在router内部使用isomorphic-react-redux和相关app的store处理

## client配置
先用match的renderProps.routes[1].path == app 的path 区分，使用app的store。<br>
_store的使用需要按需加载_

> match->renderProps.routes[1].path->require.ensure->mappingConfigStore->initState+combineReducers->store

说明：<br>
通过react-router的match方法获取renderProps，在renderProps中的routes中的第二个对象routes[1]的path属性，表示第二级路由，
一般第二级路由表示app的URL前缀，可以找到对应的app的configStore去生产对应的store，其中app对应的reducer合并到rootReducer里，
页面中读取的初始化state覆盖到reducer处理的默认state上。

## 注意
app的URL切换时候需要刷新页面，否则当前的store无法正常切换，后续会优化。