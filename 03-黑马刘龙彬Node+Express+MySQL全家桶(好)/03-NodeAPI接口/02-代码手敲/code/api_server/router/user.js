/*
 * @Author: liming
 * @Date: 2021-08-12 18:23:37
 * @LastEditTime: 2021-08-27 15:21:04
 * @FilePath: \03-NodeAPI接口\02-代码手敲\code\api_server\router\user.js
 */

// 首先对里面的代码进行初始化
const express = require('express');
const router = express.Router();

// 导入用户路由处理函数对应的模块
// const user_handler = require('../router_handler/user');
const { regUser,login} = require("../router_handler/user");
// 这种写法更好，嘿嘿，这个是我看React视频后自己照猫画虎写的，试了一下发现是有用的！
// 因为router_handler/user里面exports了regUser,login这2个变量

// 1.导入验证数据的【局部】中间件(只在post请求中使用)
const expressJoi = require("@escook/express-joi");

// 2.导入需要的验证规则对象——路由规则
const { reg_login_schema} =  require('../schema/user')

//注册新用户
// 接口文档：https://www.showdoc.com.cn/escook/3707372986195375
// 写法1：
// router.post("/reguser", (req, res) => {
//       用户路由模块应该只处理路由的对应关系，路由处理函数不应该写在这里，应该单独写，更加符合模块化规范
//   路由处理函数我们应该将它们统一抽离到router-handler文件夹中，将来用到了，我们引入来使用即可
//     res.send("reguser OK" );
// });

// 登陆
// router.post("/login", (req, res) => {
//   res.send("login OK");
// });

// 写法2：可以确保路由模块代码的纯粹性
// router.post("/reguser", regUser);
// 3.将这个局部中间件在这个路由里进行调用
// 将规则当成参数传进去即可
// 接下来可能会验证失败，如果出错了，需要在全局(app.js中)进行错误的捕获
router.post("/reguser", expressJoi(reg_login_schema),regUser);

// 登陆 
router.post("/login", expressJoi(reg_login_schema), login);
// 注册和登陆用的是同一个校验规则
 
module.exports = router