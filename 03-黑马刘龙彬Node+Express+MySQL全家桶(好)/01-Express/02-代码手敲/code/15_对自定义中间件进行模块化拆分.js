/*
 * @Author: liming
 * @Date: 2021-07-29 17:07:09
 * @LastEditTime: 2021-07-29 17:34:37
 * @FilePath: \01-Express\02-代码手敲\code\15_对自定义中间件进行模块化拆分.js
 */
//导入express模块
const express = require('express');

//创建express模块示例
const app = express();

 

//1.导入自己封装的中间件模块
const customBodyParser = require('./16-custom-body-parse')

//2.将自定义的中间件函数，注册为全局可用的中间件
app.use(customBodyParser);

app.post('/user',(req,res) => {
    // res.send('ok')
    res.send(req.body)
    //上游挂载的req.body下游可以访问到
})

//调用app.listen方法,指定端口号并启动服务器
app.listen(80, () => {console.log('Express server running at http://127.0.0.1')})