/*
 * @Author: liming
 * @Date: 2021-08-05 23:22:17
 * @LastEditTime: 2021-08-09 05:46:40
 * @FilePath: \03-MySQL模块\02-代码手敲\code\03-操作本地数据库-成功.js
 */

// 用我的阿里云MySQL数据库是死活连不上，显示请求超时，没办法了，就先用本地的数据库吧。
 
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
// db.query("select 1", (err, results) => {
//   //mysql模块工作期间报错了
//   if (err) return console.log(err.message);
//   //能够成功的执行sql语句
//   console.log(results);
// });

//查询users表中所有的数据
const sqlStr = 'select * from users'

db.query(sqlStr, (err, results) => {
    //查询数据失败
    if (err) return console.log(err.message);
    //查询数据成功
    //注意：如果执行的是select查询语句，则执行的结果是数组
    console.log(results);
})
