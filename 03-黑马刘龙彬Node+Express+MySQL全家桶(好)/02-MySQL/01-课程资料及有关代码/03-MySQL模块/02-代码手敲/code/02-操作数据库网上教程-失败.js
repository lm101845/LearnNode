/*
 * @Author: liming
 * @Date: 2021-08-06 01:36:35
 * @LastEditTime: 2021-08-06 01:39:15
 * @FilePath: \02-代码手敲\code\02-操作数据库网上教程.js
 */
//1.导入mysql模块
const mysql = require("mysql");
const express = require("express");
const app = express();
//创建一个sql实例，加入配置
var connection = mysql.createConnection({
  //创建mysql实例
  host: "rm-2zejgo5swyl16b0jkqo.mysql.rds.aliyuncs.com", // 连接的sql地址,外网地址
  user: "lm1018", // 用户名
  password: "liming64ibG", // 用户密码
  database: "mydatabase", // 选择的库
});
connection.connect();

app.get("/api/get", function (req, res) {
  // 返回的是json类型的数据
  connection.query("SELECT * FROM name", (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.json({
      method: "GET",
      data: results,
    });
  });
});
