/*
 * @Author: liming
 * @Date: 2021-08-09 05:52:39
 * @LastEditTime: 2021-08-09 06:17:18
 * @FilePath: \03-MySQL模块\02-代码手敲\code\06-操作本地数据库之插入数据.js
 */
const mysql = require('mysql');
const db = mysql.createPool({
  host: "127.0.0.1", //数据库的Ip地址
  user: "root", //登陆数据库的账号
  password: "123456", //登陆数据库的密码
  database: "my_db_01", //指定要操作哪个数据库
});

//向users表中新增一条数据，其中username的值为Spider-Man，password的值为pcc123
const user = { username: "Spider-Man", password: "pcc123" };

//定义待执行的SQL语句
const sqlStr = 'insert into users (username,password) values(?,?)'
// 为了安全，先用问号做占位符，等我们真正插入的时候，再给问号填充真正的值

//执行SQL语句
db.query(sqlStr, [user.username, user.password], (err, results) => {
  // 第二个参数不放回调函数了，而是放数组提供给这两个问号
  // 第三个参数依旧是回调函数
  if (err) return console.log(err.message);
  //执行SQL语句失败了
    if (results.affectedRows === 1) {
        console.log('插入数据成功');
        //执行SQL语句成功了
        //使用affectedRows这个属性判断数据有没有插入数据库(affectedRows表示这个操作影响了第几行，如果等于1，就表示成功了)

        //注意：如果执行的是insert into插入语句，则results是一个对象
        //可以通过affectedRows属性，来判断是否插入数据成功
    }
})




