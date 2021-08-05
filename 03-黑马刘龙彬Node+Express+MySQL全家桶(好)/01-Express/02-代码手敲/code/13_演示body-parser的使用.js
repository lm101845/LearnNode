/*
 * @Author: liming
 * @Date: 2021-07-29 16:51:10
 * @LastEditTime: 2021-07-29 16:59:14
 * @FilePath: \01-Express\02-代码手敲\code\13_演示body-parser的使用.js
 */
//导入express模块
const express = require('express');

//创建express模块示例
const app = express();

//1.导入解析表单数据的中间件body-parser
const parser = require('body-parser')
 
//2.使用app.use注册中间件
app.use(parser.urlencoded({extended:false}))
app.post('/user', (req, res) => {
    console.log(req.body);
    //undefined
    //如果没有配置任何解析表单数据的中间件，则req.body默认等于undefined
    res.send('ok')
})

//调用app.listen方法,指定端口号并启动服务器
app.listen(80, () => {console.log('Express server running at http://127.0.0.1')})