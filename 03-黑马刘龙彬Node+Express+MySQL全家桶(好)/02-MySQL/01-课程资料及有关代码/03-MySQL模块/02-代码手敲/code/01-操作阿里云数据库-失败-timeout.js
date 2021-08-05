/*
 * @Author: liming
 * @Date: 2021-08-05 23:22:17
 * @LastEditTime: 2021-08-06 02:21:29
 * @FilePath: \code\01-操作数据库.js
 */

//1.导入mysql模块
const mysql = require("mysql");
// 网上搜的这个没用
// var config = {
//   host: setting.cfg.host,
//   user: setting.cfg.user,
//   password: setting.cfg.password,
//   database: setting.cfg.database,
//   port: setting.cfg.db_port,
//   //设置超时时间解决握手不活动超时问题
//   connectionLimit: 1000,
//   connectTimeout: 60 * 60 * 1000,
//   acquireTimeout: 60 * 60 * 1000,
//   timeout: 60 * 60 * 1000,
// };

// var pool = mysql.createPool(config);

//2.建立与MySQL数据库的连接关系
const db = mysql.createPool({
  host: "rm-2zejgo5swyl16b0jkqo.mysql.rds.aliyuncs.com", //数据库的Ip地址
  user: "lm1018", //登陆数据库的账号
  password: "liming64ibG", //登陆数据库的密码
  database: "mydatabase", //指定要操作哪个数据库
});

//测试MySQL模块能否正常工作
db.query("select 1", (err, results) => {
  //mysql模块工作期间报错了
  if (err) return console.log(err.message);
  //能够成功的执行sql语句
  console.log(results);
});
