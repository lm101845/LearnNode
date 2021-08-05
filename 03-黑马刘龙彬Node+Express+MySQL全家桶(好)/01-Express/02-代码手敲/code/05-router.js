/*
 * @Author: liming
 * @Date: 2021-07-25 22:08:36
 * @LastEditTime: 2021-07-25 22:32:15
 * @FilePath: \01-Express\02-代码手敲\code\05-router.js
 */

//这是路由模块

//1.导入express
const express = require('express');

//2.创建路由对象
const router1 = express.Router()

//3.挂载具体的路由
router1.get('/user/list', (req,res) => {
    res.send('get user list')
})

router1.post("/user/add", (req, res) => {
  res.send("add new user");
});

//统一添加一个访问前缀

//4.向外导出路由对象
module.exports = router1