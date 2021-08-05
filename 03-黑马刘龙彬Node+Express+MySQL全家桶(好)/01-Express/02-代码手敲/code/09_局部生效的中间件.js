/*
 * @Author: liming
 * @Date: 2021-07-28 01:16:41
 * @LastEditTime: 2021-07-28 01:31:17
 * @FilePath: \01-Express\02-代码手敲\code\09_局部生效的中间件.js
 */
//导入express模块
const express = require('express');

//创建express模块示例
const app = express();

//定义中间件函数
const mw1 = (req,res,next) => {
    console.log('调用了局部生效的中间件');
    next()
}

app.get('/', mw1, (req, res) => {
    //把mw1这个中间件函数丢过来就可以了
    res.send('Home page')
})

app.get("/user", (req, res) => {
  res.send("User page");
});
    
//调用app.listen方法,指定端口号并启动服务器
app.listen(80, () => {
    console.log('Express server running at http://127.0.0.1');
})

