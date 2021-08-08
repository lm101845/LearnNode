/*
 * @Author: liming
 * @Date: 2021-08-09 04:26:07
 * @LastEditTime: 2021-08-09 04:34:24
 * @FilePath: \03-MySQL模块\02-代码手敲\code\04-mysql库官网教程.js
 */
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "rm-2zejgo5swyl16b0jk.mysql.rds.aliyuncs.com",
  user: "lm1018",
  password: "liming64ibG",
  database: "mydatabase",
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

connection.end();