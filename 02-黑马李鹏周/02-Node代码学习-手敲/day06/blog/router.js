/*
 * @Author: liming
 * @Date: 2021-08-04 15:02:31
 * @LastEditTime: 2021-08-12 16:59:50
 * @FilePath: \02-黑马李鹏周\02-Node代码学习-手敲\day06\blog\router.js
 */

const express = require("express");
const User = require("./models/user");
//加载得到User数据模型
//引入密码加密包
var md5 = require("blueimp-md5");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index.html");
});

router.get("/login", function (req, res) {
  res.render("login.html");
});

router.post("/login", function (req, res) {
  //1.获取表单提交数据
  // console.log(req.body);
  //2.操作数据库
  // 判断用户是否存在
  // 如果已存在，不允许注册
  // 如果不存在，注册新建用户
  // 3.发送响应
});

router.get("/register", function (req, res) {
  res.render("register.html");
});

// 我自己照着写的，有点问题
router.post("/register", function (req, res) {
  // console.log(req.body);
  // 1. 获取表单提交的数据
  var body = req.body;
  User.findOne(
    {
      $or: [{ email: body.email }, { nickname: body.nickname }],

      // 只查邮箱就行
    },
    (err, data) => {
      if (err) {
        //   这个是程序错误
        // return res.status(500).send("Server error");
        return res.status(500).json({
          //   success: false,
          err_code: 500,
          message: "internal error",
        });
      }
      // console.log(data);
      //如果邮箱已存在
      //判断昵称
      if (data) {
        //data是查到的用户对象
        //邮箱或者昵称已存在
        // return res.status(200).send("email or nickname aleady exists");
        return res.status(200).json({
          // success: true,
          // 不用success了，自己添加一些错误码
          // err_code用0表示真正的成功，用1表示邮箱或昵称已存在(这是我自己定义的，所以需要和前端沟通，要有文档)，用500表示服务端错误
          // 不能用message来判断，用err_code来判断
          err_code: 1,
          //   message: "邮箱或昵称已存在",
          // message也最好用英文的，不要用中文的
          message: "email or nickname is already exists",
        });
      }
      //   res.status(200).send('ok')
      //   console.log('ok');
      //   res.status(200).send('{"success":true }');
      // res.status(200).send(JSON.stringify({
      //     success: true,
      //     foo:'boo'
      // }));

      //对密码进行md5 重复加密——防止暴力破解
      // 比如你存放到银行卡的密码也是加密过的，开发人员也不知道你的密码明文是多少，看到的只是加密后的密码
      body.password = md5(md5(body.password));

      new User(body).save((err, user) => {
        if (err) {
          return res.status(500).json({
            // success: false,
            err_code: 500,
            // message: "服务端错误",
            message: "internal error",
          });
        }
        // Express 提供了一个响应方法：json
        // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
        res.status(200).json({
          //   success: true,
          err_code: 0,
          message: "OK",
        });
      });
    }
  );
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
});

module.exports = router;
