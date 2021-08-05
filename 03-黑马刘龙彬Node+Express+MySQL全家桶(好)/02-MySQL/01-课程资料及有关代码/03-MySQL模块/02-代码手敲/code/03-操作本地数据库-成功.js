/*
 * @Author: liming
 * @Date: 2021-08-05 23:22:17
 * @LastEditTime: 2021-08-06 02:24:02
 * @FilePath: \code\03-操作本地数据库.js
 */

//1.导入mysql模块
const mysql = require("mysql");

//2.建立与MySQL数据库的连接关系
const db = mysql.createPool({
  host: "127.0.0.1", //数据库的Ip地址
  user: "root", //登陆数据库的账号
  password: "123456", //登陆数据库的密码
  database: "my_db_01", //指定要操作哪个数据库
});

//测试MySQL模块能否正常工作
db.query("select 1", (err, results) => {
  //mysql模块工作期间报错了
  if (err) return console.log(err.message);
  //能够成功的执行sql语句
  console.log(results);
});
