/*
 * @Author: liming
 * @Date: 2021-07-27 23:39:35
 * @LastEditTime: 2021-07-28 00:49:03
 * @FilePath: \01-Express\02-代码手敲\code\07_体验中间件的作用.js
 */
const express = require("express");

const app = express();

//这是定义全局中间件的简化形式
app.use((req, res, next) => {
  //在这个中间件函数处理完毕之后一定要调用next函数
    //需求：获取到请求到达服务器时间
    //统一在中间件里挂载一个时间
    const time = Date.now()
    //我们在上游为req对象挂载自定义属性，从而把时间共享给后面所有的路由
    req.startTime = time;
  next();
});

app.get("/", (req, res) => {
//   const time = Date.now();
    // 这样在每个请求里写不好，过于重复和冗余了
    res.send("Home page" + req.startTime);
    //下游可以直接使用上游的东西
});

app.get("/user", (req, res) => {
  //   const time = Date.now();
  // 这样在每个请求里写不好，过于重复和冗余了
  res.send("User page" + req.startTime);
});

app.listen(80, () => {
  console.log("127.0.0.1");
});
