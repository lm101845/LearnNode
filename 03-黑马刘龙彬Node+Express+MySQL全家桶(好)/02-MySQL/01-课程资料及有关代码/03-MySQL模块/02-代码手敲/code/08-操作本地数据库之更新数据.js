/*
 * @Author: liming
 * @Date: 2021-08-09 05:52:39
 * @LastEditTime: 2021-08-09 06:28:17
 * @FilePath: \03-MySQL模块\02-代码手敲\code\08-操作本地数据库之更新数据.js
 */
const mysql = require('mysql');
const db = mysql.createPool({
  host: "127.0.0.1", //数据库的Ip地址
  user: "root", //登陆数据库的账号
  password: "123456", //登陆数据库的密码
  database: "my_db_01", //指定要操作哪个数据库
});

//演示如何更新数据
const user = { id:6,username: "aaa", password: "123456" };
//定义SQL语句
// 要使用where加一个更新的限制条件，否则他会将整张表都给更新了。
const sqlStr = 'update users set username = ?,password=? where id = ?'
//执行SQL语句
//通过数组的形式为这3个占位符依次填值
db.query(sqlStr, [user.username,user.password,user.id], (err, results) => {
    if (err) return console.log(err.message);
    //注意：执行了update语句之后，执行的结果也是一个对象，可以通过affecedRows判断是否更新成功
    if (results.affectedRows === 1) {
        console.log('更新数据成功');
    }
})




