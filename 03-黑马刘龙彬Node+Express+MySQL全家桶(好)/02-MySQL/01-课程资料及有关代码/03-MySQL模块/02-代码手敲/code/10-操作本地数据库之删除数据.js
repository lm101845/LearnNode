/*
 * @Author: liming
 * @Date: 2021-08-09 05:52:39
 * @LastEditTime: 2021-08-09 07:06:20
 * @FilePath: \03-MySQL模块\02-代码手敲\code\10-操作本地数据库之删除数据.js
 */
const mysql = require('mysql');
const db = mysql.createPool({
  host: "127.0.0.1", //数据库的Ip地址
  user: "root", //登陆数据库的账号
  password: "123456", //登陆数据库的密码
  database: "my_db_01", //指定要操作哪个数据库
});

//删除id为4的用户
//定义SQL语句
// 要使用where加一个更新的限制条件，否则他会将整张表都给更新了。
const sqlStr = 'delete from users where id = ?'
//执行SQL语句
db.query(sqlStr, 8, (err, results) => {
    // 如果只有一个占位符，那么数组是可以省略的，可以直接把数据的值丢到第二个参数的位置
    if (err) return console.log(err.message);
    //注意：执行了update语句之后，执行的结果也是一个对象，可以通过affecedRows判断是否更新成功
    if (results.affectedRows === 1) {
        console.log('删除数据成功');
    }
})




