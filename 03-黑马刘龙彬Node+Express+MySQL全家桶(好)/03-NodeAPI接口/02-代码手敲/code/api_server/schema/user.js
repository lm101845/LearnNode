/*
 * @Author: liming
 * @Date: 2021-08-13 04:18:28
 * @LastEditTime: 2021-08-13 06:06:40
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\schema\user.js
 */
//导入定义验证规则的包
const joi = require("joi");

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()
// [\$]表示不能有空格

//定义验证注册和登陆表单数据的规则的对象
// 向外暴露这个验证规则对象来验证登陆和注册时候的表单数据(都在body里面存着)
exports.reg_login_schema = {
  body: {
    username,
    password,
  }
};
