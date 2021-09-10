/*
 * @Author: liming
 * @Date: 2021-08-23 11:48:19
 * @LastEditTime: 2021-08-27 14:43:08
 * @FilePath: \03-NodeAPI接口\02-代码手敲\code\api_server\router\userinfo.js
 */

const express = require('express');

const router = express.Router()


//挂载路由
// 导入路由处理函数模块
// const userinfo_handler = require('../router_handler/userinfo')
const {
  getUserInfo,
  updaterInfo,
  updatePassword,
  updateAvatar,
} = require("../router_handler/userinfo");

// 1.导入验证数据的【局部】中间件(只在post请求中使用)
const expressJoi = require('@escook/express-joi')

// 2.导入需要的验证规则对象——路由规则
const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require("../schema/user");

//获取用户基本信息的路由
//路由模块定义完之后我们需要在app.js中使用这个路由模块
router.get("/userinfo", getUserInfo);

// 更新用户信息的路由
// router.post("/userinfo", updaterInfo);
router.post("/userinfo", expressJoi(update_userinfo_schema), updaterInfo);
// 对路由进行改造，加一个中间件，进行请求之前的数据合法性验证
// 调用expressJoi中间件，同时将验证规则对象update_userinfo_schema给它传进去

// 更新密码的路由
// 调用expressJoi中间件，同时将验证规则对象update_userinfo_schema给它传进去
router.post("/updatepwd", expressJoi(update_password_schema), updatePassword);

//更换头像的路由——原来路由也可以写多级
router.post('/update/avatar',expressJoi(update_avatar_schema),updateAvatar)
module.exports = router