# A Vue Mall

## 项目开始

>划分组件

>nodetest测试服务器，mock数据测试

>需要掌握mongodb数据库语法

>mongoose使用
>>model层和routers

>图片懒加载 vue-lazyload插件

>排序（接口加前端）

>过滤（接口加前端）
>> 字符串类型转换，对象解构赋值，三元运算符

>滚动刷新插件 vue-limite-scroll

>接口地址是config/index.js文件配置的http://localhost:3000

>npm run dev启动服务

>npm run build生成dist线上文件

<br><br>

## 12.29
>写添加到购物车的接口
1. fetch前端传给后端的数据异常，post请求要添加文件头`content-type`。

```js
fetch(url,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          'content-type':'application/json'
        }
})
```
2. 添加到购物车的判断是否拥有同类商品

3. 用户登入登出，全局拦截和登录校验

4. 全局模态框1.8

5. 使用axios替换fetch


## 1.14
>创建购物车页面

>购物测页面渲染，删除商品，修改商品，全选按钮和实时计算

>utils/currency.js价格格式化

## 1.16
>创建订单页面

>完成订单页面的渲染,切换和展开,默认地址,删除

>完成next按钮

>创建订单确认页面

>订单确认页面数据渲染,数据动态计算

>生成订单支付接口

>server添加日期处理的工具类


## 1.20
>订单完成列表页面

>订单查看接口接口


>Vuex改造登录和购物车接口

> vuex核心概念
1. State 唯一的数据源  单一的状态树 this.$store.state.count
2. Getters 通过Getters可以派生一些新的状态
3. Mutations 更改Vuex的store的状态的唯一方法是mutation
4. Actions提交的是mutation,而不是自接变更状态  可以任意包含任意异步操作
5. Modules Vuex的store对象分割成模块
