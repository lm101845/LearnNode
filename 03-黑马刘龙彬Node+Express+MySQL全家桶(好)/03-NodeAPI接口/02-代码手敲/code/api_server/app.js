/*
 * @Author: liming
 * @Date: 2021-08-12 17:21:23
 * @LastEditTime: 2021-08-13 06:06:18
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\app.js
 */

//导入express
const express = require('express');

//创建服务器的实例对象——调用express
const app = express();

// 导入 joi来定义验证规则
const joi = require("joi");


//导入并配置cors中间件
const cors = require('cors')

//使用app.use将其注册为全局可用的中间件
app.use(cors())

//配置解析表单数据的中间件——这个中间件是Node内置的，不需要你单独下载
// 它是body-parser(2019年消亡)这个中间件的替代品，都是用来处理POST请求的(Node本身不能处理POST)
// 注意：这个中间件只能解析POST请求的【application/x-www-form-urlencoded】格式的数据
app.use(express.urlencoded({ extended: false }))


// 定义一个全局中间件，封装一个res.cc函数(注意：一定要写到【路由之前】！！！！！)
app.use((req, res, next) => {
    // 如果不传递status，则它的默认值为1,表示失败的情况
    // err的值可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message:err instanceof Error ? err.message:err
        })
    }
    next()
})

// 导入并使用用户(user.js)路由模块
// user.js的后缀名可以省略
const userRouter = require('./router/user')
app.use("/api", userRouter);
// 第一个参数是所有api的前缀
// 比如你在POstMan上登陆http://127.0.0.1:3007/reguser是访问不到的，必须是http://127.0.0.1:3007/api/reguser
// 注意：浏览器只支持GET请求，POST请求请用PostMan来测试

//定义错误级别的中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err);
  //未知的错误
  res.cc(err);
})

//启动服务器
app.listen(3007, () => {
    console.log('api server running at http:127.0.0.1:3007');
})