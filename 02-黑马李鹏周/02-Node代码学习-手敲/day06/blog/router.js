/*
 * @Author: liming
 * @Date: 2021-08-04 15:02:31
 * @LastEditTime: 2021-08-04 15:35:48
 * @FilePath: \02-黑马李鹏周(好)\02-Node代码学习-手敲\day06\blog\router.js
 */

const express = require('express');
const router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html')
})

router.get("/login", function (req, res) {
  res.render("login.html");
});

router.post("/login", function (req, res) {
   //1.获取表单提交数据
    console.log(req.body);
    //2.操作数据库
    // 3.发送响应
});

router.get("/register", function (req, res) {
  res.render("register.html");
});

router.post("/register", function (req, res) {
    console.log(req.body);
});


module.exports = router