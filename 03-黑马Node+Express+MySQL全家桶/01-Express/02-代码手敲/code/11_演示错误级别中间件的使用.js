/*
 * @Author: liming
 * @Date: 2021-07-29 15:44:33
 * @LastEditTime: 2021-07-29 15:56:21
 * @FilePath: \01-Express\02-代码手敲\code\11_演示错误级别中间件的使用.js
 */
//导入express模块
const express = require('express');

//创建express模块示例
const app = express();

//1.定义路由
app.get('/', (req, res) => {
    //1.在处理函数内部人为的制造一个错误
    throw new Error('服务器内部发生了错误(这是人为制造的)')
    res.send('Home page')
    // 在发生错误之后，这一行代码是没有执行的！！！！
})

//2.定义错误级别的中间件来捕获整个项目的异常错误，从而防止程序的崩溃
//注意1：错误级别的中间件形参有4个参数，比一般的中间件多了一个err!!!
// 注意2：中间件一般都是注册在路由之前的，但是错误级别的中间件例外，它是注册在【所有路由之后】的！！！！
app.use((err, req, res, next) => {
    console.log('发生了错误！' + err.message);
    res.send('Error:' + err.message);
})

//调用app.listen方法,指定端口号并启动服务器
app.listen(80, () => {console.log('Express server running at http://127.0.0.1')})