/*
 * @Author: liming
 * @Date: 2021-08-05 23:22:17
 * @LastEditTime: 2021-08-09 06:04:32
 * @FilePath: \03-MySQL模块\02-代码手敲\code\04-操作阿里云数据库-请求超时日了狗.js
 */

//1.导入mysql模块
const mysql = require("mysql");

//2.建立与MySQL数据库的连接关系
const db = mysql.createPool({
  host: "rm-2zejgo5swyl16b0jk.mysql.rds.aliyuncs.com", //数据库的Ip地址
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
