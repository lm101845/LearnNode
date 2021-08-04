/*
 * @Author: liming
 * @Date: 2021-07-25 21:07:55
 * @LastEditTime: 2021-07-25 22:03:52
 * @FilePath: \01-Express\02-代码手敲\code\03-最简单的路由用法.js
 */
const express = require('express');
const app = express();
//挂载路由
// 但是这种做法比较少，因为这样以后这个体积会越来越大
// 我们很少把路由挂载到app上
app.get('/', (req, res) => {
      res.send('hello world ')
})
app.post("/", (req, res) => {
  res.send("post request");
});
app.listen(80, () => {
    console.log('http://localhost');
})