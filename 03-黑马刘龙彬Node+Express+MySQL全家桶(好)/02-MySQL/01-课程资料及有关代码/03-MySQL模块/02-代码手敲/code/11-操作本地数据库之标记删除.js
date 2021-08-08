/*
 * @Author: liming
 * @Date: 2021-08-09 05:52:39
 * @LastEditTime: 2021-08-09 07:12:34
 * @FilePath: \03-MySQL模块\02-代码手敲\code\11-操作本地数据库之标记删除.js
 */
const mysql = require('mysql');
const db = mysql.createPool({
  host: "127.0.0.1", //数据库的Ip地址
  user: "root", //登陆数据库的账号
  password: "123456", //登陆数据库的密码
  database: "my_db_01", //指定要操作哪个数据库
});

//删除id为4的用户
// 直接删除数据过于危险，也许用户是不小心删除的，所以我们可以选择标记删除，只是把要删除的那一行进行标记，并不直接删除
const sqlStr = 'update users set status = ? where id = ?'
//执行SQL语句
db.query(sqlStr, [1, 6], (err, results) => {
    //status为1就【表示】这条数据被【删除】了，其实并没有实际被删——相当于windows里面的回收站
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('标记删除数据成功');
    }
})




