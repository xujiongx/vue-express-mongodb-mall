# A Vue Mall

## 划分组件

## nodetest测试服务器，mock数据测试

## mongodb数据库语法

## mongoose使用
>model层和routers

## 图片懒加载 vue-lazyload插件

## 排序（接口加前端）

## 过滤（接口加前端）
> 字符串类型转换，对象解构赋值，三元运算符

## 滚动刷新插件 vue-limite-scroll

>接口地址是config/index.js文件配置的http://localhost:3000

>npm run dev启动服务

>npm run build生成dist线上文件

<br><br>

## 12.29
>写添加到购物车的接口
1. 前端传给后端的数据异常，post请求要添加文件头`content-type`。

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


## 1.14
>创建购物车页面

>购物测页面渲染，删除商品，修改商品，全选按钮和实时计算

>utils/currency.js价格格式化
