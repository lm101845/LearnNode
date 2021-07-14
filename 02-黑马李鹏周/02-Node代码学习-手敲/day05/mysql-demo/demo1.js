/*
 * @Author: liming
 * @Date: 2021-06-02 21:36:55
 * @LastEditTime: 2021-06-02 22:24:51
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\mysql-demo\demo1.js
 */
var mysql = require('mysql');

//1.创建连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'users'   //对不起，我一不小心把数据库名字和表名起存储成一样的了
});

//2.连接数据库(打开冰箱门)
connection.connect();

//3.执行数据操作(把大象放进冰箱)
//所有的增删改查都在这里写！！
connection.query('SELECT * FROM `users`', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

// connection.query('INSERT INTO users VALUES(NULL,"admin","123456")', function (error, results, fields) {
//     //ID不能漏，第一个参数NULL表示使用自动生成的id
//     if (error) throw error;
//     console.log('The solution is: ', results);
// });

//关闭连接(关闭冰箱门)
connection.end();