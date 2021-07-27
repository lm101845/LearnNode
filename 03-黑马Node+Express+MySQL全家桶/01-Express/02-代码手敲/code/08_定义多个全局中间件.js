/*
 * @Author: liming
 * @Date: 2021-07-28 00:56:05
 * @LastEditTime: 2021-07-28 01:13:22
 * @FilePath: \01-Express\02-代码手敲\code\08_定义多个全局中间件.js
 */
const express = require("express");
const app = express();

//定义第一个全局中间件
app.use((req, res, next) => {
  console.log("调用了第一个全局中间件");
  next();
});

//定义第二个全局中间件
app.use((req, res, next) => {
  console.log("调用了第二个全局中间件");
  next();
});

//定义一个路由
app.get('/user', (req, res, next) => {
    res.send('User page')
})

app.listen(80, () => {
  console.log("http://localhost");
});
