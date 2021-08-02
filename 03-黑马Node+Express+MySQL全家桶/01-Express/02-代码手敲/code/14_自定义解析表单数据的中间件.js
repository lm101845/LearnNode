/*
 * @Author: liming
 * @Date: 2021-07-29 17:07:09
 * @LastEditTime: 2021-07-29 17:28:34
 * @FilePath: \01-Express\02-代码手敲\code\14_自定义解析表单数据的中间件.js
 */
//导入express模块
const express = require('express');

//创建express模块示例
const app = express();

//导入node内置的querystring模块
 const qs = require('querystring')

//这是解析表单数据的中间件
app.use((req, res, next) => {
    //定义中间件具体的业务逻辑
    //1.定义一个str字符串，专门用来存储客户端发送过来的请求体数据
    let str = '';
    //2.监听req的data事件
    req.on('data', (chunk) => {
        str += chunk
    })

    //3.监听req的end事件
    req.on('end', () => {
        //在str中存放的是完整的请求体数据了
        console.log(str);
        //TODO:把字符串格式的请求体数据，解析为对象格式
        const body = qs.parse(str)
        console.log(body);
        req.body = body
        next()
        //挂载完后要调用一下next函数
    })
})

app.post('/user',(req,res) => {
    // res.send('ok')
    res.send(req.body)
    //上游挂载的req.body下游可以访问到
})

//调用app.listen方法,指定端口号并启动服务器
app.listen(80, () => {console.log('Express server running at http://127.0.0.1')})