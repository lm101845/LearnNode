/*
 * @Author: liming
 * @Date: 2021-07-29 16:04:13
 * @LastEditTime: 2021-07-29 16:48:02
 * @FilePath: \01-Express\02-代码手敲\code\12_演示内置中间件的使用.js
 */
//导入express模块
const express = require('express');

//创建express模块示例
const app = express();

//在路由之前配置一般的中间件
//注意：除了错误级别的中间件，其他的中间件必须在路由之前进行配置
//通过express.json()这个中间件，解析表单中的JSON格式的数据
app.use(express.json())

//再配置一个中间件来解析body中x-www-form-urlencoded格式的数据
// 里面要传一个配置对象{extended:false}
app.use(express.urlencoded({extended:false}))

//监听post请求
//post发送请求体数据，都要放到body面板中
app.post('/user', (req, res) => {
    //在服务器中可以使用req.body这个属性来接收客户端发送过来的请求体数据
    console.log(req.body);
    //undefined!!!
    //原因：默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined
    res.send('ok')
}) 

app.post('/book', (req, res) => {
    //在服务器端可以通过req.body来获取JSON格式的表单数据合url-encoded格式的数据
    console.log(req.body);
    //{}
    res.send('ok')
})

//调用app.listen方法,指定端口号并启动服务器
app.listen(80, () => {console.log('Express server running at http://127.0.0.1')})