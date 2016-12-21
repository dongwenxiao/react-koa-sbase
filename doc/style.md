# React 同构样式处理说明

## 说明

样式表是以 ```<style>``` 标签的形式插入到DOM中的。
eg:
```
<component>
    <style>.component{color:red}</style>
    {this.props.children}
</component>
```

## 实现思路

> 利用webpack打包，把css以字符串的形式当做变量，传递给组件。<br>
> 把css内容通过md5消息摘要当做key，存入到组件的context中，作为唯一标示，避免重复加载。

### 分为两种style类型：全局样式、组件内样式，还有一个引用样式计数器
- 全局样式：只加载，不包装
- 组件内样式：加载并且用md5值包装所以class名字，与引用样式计数器一起使用
- 引用样式计数器：一般是在Page上添加引用样式计数器，用于存放子组件唯一标示的key

## 实现

> 使用Context解决style import 重复写入DOM的问题

### 编写3个装饰器
- ImportStyle 是用于每个配样式的组件上
- ImportStyleRoot 是用于最外层组件(一般是页面组件，不建议放在最外层，如APP组件里，APP组件页面切换后不再加载样式)计数已载入样式用的
- ImportStyleInComponent 是用于组件加载样式不需要计数的情况（一般是Page组件）。

每个样式通过```webpack```的```wapper-css-loader```把处理好的```css```转换成```string```，作为变量插入```js```中。
组件通过(各自需要的)装饰器加载css内容，相同的组件```css```只会被引用一次，由最外层的组件配```ImportStyleRoot```自动计数。
由装饰器```ImportStyle```负责把组件的```css```以```<style>```标签方式注入到组件体内部```DOM```。
另外，不需要计数的样式可以用```ImportStyleInComponent```注入```css```。


## 备注：
- 组件样式唯一标示，内容```md5```值，长度可以由```wapper-css-loader?length=5```的```length```配置
- 由于组件的生命周期顺序问题，所以不能把```style```统一放在最外层组件（父组件```render```后执行子组件```render```）

```
// 打包流程(webpack loader logic):
postcss-loader -> wapper-css-loader
```