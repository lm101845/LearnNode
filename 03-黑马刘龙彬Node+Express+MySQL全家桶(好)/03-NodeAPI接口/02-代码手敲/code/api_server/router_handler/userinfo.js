/*
 * @Author: liming
 * @Date: 2021-08-23 12:03:40
 * @LastEditTime: 2021-08-23 13:56:54
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\router_handler\userinfo.js
 */

//导入数据库操作模块
const db = require('../db/index')

//获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  // 定义查询用户信息的SQL语句
  const sqlStr = `select id,username,nickname,email,user_pic from ev_users where id = ?`;

  //调用db.query()执行SQL语句
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sqlStr, req.user.id, (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err);
    // 执行SQL语句成功，但是执行的查询语句可能为空
    if (results.length !== 1) return res.cc("获取用户信息失败!");

    //用户信息获取成功
    res.send({
      status: 0,
      message: "获取用户信息成功",
      data: results[0],
    });
  });
  // 只要身份认证成功了，那么中间件会将req身上多出一个user属性
  // res.send('用户信息OK')
}

//更新用户基本信息的处理函数
exports.updaterInfo = (req, res) => {
    // 定义待执行的SQL语句
    const sqlStr = `update ev_users set ? where id = ?`
    // 调用db.query()执行SQL语句,并传递参数
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        //执行SQL语句失败
        if (err) return res.cc(err);
        // 执行SQL语句成功，但是影响行数不等于1(其实也是失败了)
        if (results.affectedRows !== 1) return res.cc("更新用户的基本信息失败");
        res.cc('更新用户信息成功!',0)
    })
}