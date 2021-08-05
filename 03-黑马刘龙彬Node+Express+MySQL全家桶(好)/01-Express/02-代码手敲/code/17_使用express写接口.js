/*
 * @Author: liming
 * @Date: 2021-08-01 18:52:45
 * @LastEditTime: 2021-08-02 14:22:43
 * @FilePath: \03-黑马Node+Express+MySQL全家桶\01-Express\02-代码手敲\code\17_使用express写接口.js
 */

//导入express模块
const express = require('express');

//创建express模块示例
const app = express();

//在路由模块之前，配置解析表单数据的中间件
//其中配置项extend: false是固定写法
app.use(express.urlencoded({extend: false}))

//注意：必须在配置cors中间件之前，配置jsonp的接口
//因为jsonp只支持get请求，所以用app.get来保证只调用get接口
//因为jsonp的路由并没有放到路由模块中，所以这里手动加一个/api
app.get('/api/jsonp', (req, res) => {
    //这里定义jsonp接口的具体的实现
    //1.得到函数的名称
    //callback的值就是函数名称
    const funcName = req.query.callback

    //2.定义要发送到客户端的数据对象
    const data = { name: 'zs', age: 22 }
    
    //3.拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`

    //4.把拼接的字符串，响应给客户端
    res.send(scriptStr)
 })

//注意：一定要在【路由之前】配置cors这个中间件，从而解决接口跨域的问题
const cors = require('cors')
app.use(cors())

//导入路由模块
const router = require('./18_apiRouter')

//把路由模块注册到app上
//第一个参数是指提供一个统一的访问路径
//app.use方法的作用就是来注册全局中间件的
//我们在这里也可以认为router就是一个中间件
//此时只要一个请求到底服务器，就要经过这个中间件的处理了
//进入到这个中间件之后，它会挨个查找每个路由，进行相关的路由匹配
//当匹配成功之后，就调用对应的路由来进行处理
app.use('/api',router)

//调用app.listen方法,指定端口号并启动服务器
app.listen(80, () => {console.log('Express server running at http://127.0.0.1')})