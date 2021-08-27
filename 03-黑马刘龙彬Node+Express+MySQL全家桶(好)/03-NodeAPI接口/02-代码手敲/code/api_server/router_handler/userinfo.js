/*
 * @Author: liming
 * @Date: 2021-08-23 12:03:40
 * @LastEditTime: 2021-08-27 14:52:00
 * @FilePath: \03-NodeAPI接口\02-代码手敲\code\api_server\router_handler\userinfo.js
 */

//导入数据库操作模块
const db = require("../db/index");

//导入处理密码的模块
const bcrypt = require("bcryptjs");

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
};

//更新用户基本信息的处理函数
exports.updaterInfo = (req, res) => {
  // 定义待执行的SQL语句
  const sqlStr = `update ev_users set ? where id = ?`;
  // 调用db.query()执行SQL语句,并传递参数
  db.query(sqlStr, [req.body, req.body.id], (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err);
    // 执行SQL语句成功，但是影响行数不等于1(其实也是失败了)
    if (results.affectedRows !== 1) return res.cc("更新用户的基本信息失败");
    res.cc("更新用户信息成功!", 0);
  });
};

//更新用户密码的处理函数
exports.updatePassword = (req, res) => {
  // res.send('OK')
  // 根据id查询用户信息
  const sqlStr = `select * from ev_users where id = ?`;
  //执行根据id查询用户的信息的SQL语句
  db.query(sqlStr, req.user.id, (err, results) => {
    //req身上有user这个属性的，这个我还不熟
    //执行SQL语句失败
    if (err) return res.cc(err);
    //判断结果是否存在
    if (results.length !== 1) return res.cc("用户不存在");
    //判断用户输入的旧密码是否正确
    // 注意，用户输入的旧密码req.body.oldPwd是明文密码
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!compareResult) return res.cc("旧密码错误!");

    //更新数据库中的密码
    //定义更新密码的SQL语句
    const sqlStr = `update ev_users set password = ? where id = ?`;
    //注意：这里有sqlStr，上面也有sqlStr，这两个应该不会冲突，应该是2个语句，在2个大括号里面
    //对新密码进行加密处理
      const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
      //调用db.query执行SQL语句
      db.query(sqlStr, [newPwd, req.user.id], (err, results) => {
          //执行SQL语句失败
          if (err) return res.cc(err)
          //判断影响的行数
          if (results.affectedRows !== 1) return res.cc("更新密码失败")
          //成功
          res.cc('更新密码成功',0)
      })
  });
};

//更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    //1.定义更新头像的SQL语句
    const sqlStr = `update ev_users set user_pic = ? where id = ?`
    //2.调用db.query()执行SQL语句
    db.query(sqlStr, [req.body.avatar, req.user.id], (err, results) => {
        //执行SQL语句失败
        if (err) return res.cc(err)
        //判断影响的行数是否等于1
        if (results.affectedRows !== 1) return res.cc("更换头像失败")
        //成功
        res.cc('更换头像成功',0)
    })
    // res.send('OK')
}
