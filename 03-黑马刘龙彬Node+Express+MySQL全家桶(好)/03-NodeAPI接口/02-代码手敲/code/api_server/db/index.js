/*
 * @Author: liming
 * @Date: 2021-08-13 00:47:03
 * @LastEditTime: 2021-08-13 01:28:38
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\db\index.js
 */

// 这个模块中我们创建并导出数据库的连接对象
const mysql = require('mysql')

// 本地服务器测试
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_db_01'
})

// 阿里云服务器测试
// const db = mysql.createPool({
//   host: "rm-2zejgo5swyl16b0jkjo.mysql.rds.aliyuncs.com",
//   user: "lm1018",
//   password: "liming64ibG",
//   database: "mydatabase",
// });

// 阿里云服务器连接阿里云MySQL数据库命令：mysql -hrm-2zejgo5swyl16b0jkjo.mysql.rds.aliyuncs.com -P3306 -ulm1018 -p
module.exports = db