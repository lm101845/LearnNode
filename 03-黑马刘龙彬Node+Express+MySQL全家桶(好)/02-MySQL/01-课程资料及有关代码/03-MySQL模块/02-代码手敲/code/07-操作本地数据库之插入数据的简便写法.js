/*
 * @Author: liming
 * @Date: 2021-08-09 05:52:39
 * @LastEditTime: 2021-08-09 06:17:11
 * @FilePath: \03-MySQL模块\02-代码手敲\code\07-操作本地数据库之插入数据的简便写法.js
 */
const mysql = require('mysql');
const db = mysql.createPool({
  host: "127.0.0.1", //数据库的Ip地址
  user: "root", //登陆数据库的账号
  password: "123456", //登陆数据库的密码
  database: "my_db_01", //指定要操作哪个数据库
});

const user = { username: "Spider-Man3", password: "pcc3241" };

//演示插入数据的便捷方式
const sqlStr = 'insert into users set ?'

db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('插入数据成功');
    }
})




