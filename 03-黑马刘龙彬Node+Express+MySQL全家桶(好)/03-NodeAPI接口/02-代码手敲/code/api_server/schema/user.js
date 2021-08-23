/*
 * @Author: liming
 * @Date: 2021-08-13 04:18:28
 * @LastEditTime: 2021-08-23 13:44:10
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\schema\user.js
 */
//导入定义验证规则的包
const joi = require("joi");

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();
// [\$]表示不能有空格

//定义id，nickname,email的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const user_email = joi.string().email().required();
//如果上面的和下面的名字不一样，就不可以简写了 

//定义验证注册和登陆表单数据的规则的对象
// 向外暴露这个验证规则对象来验证登陆和注册时候的表单数据(都在body里面存着)
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};

// 验证规则对象——更新用户基本信息
exports.update_userinfo_schema = {
  // body属性表示我们需要对req.body里面的数据进行验证
  body: {
    //这个
    id,
    nickname,
    email: user_email,
    //如果上面的和下面的名字不一样，就不可以简写了
  },
};
