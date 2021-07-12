// app.js入口模块
/**
 * 职责：
 * 启动服务
 * 做一些服务相关配置
 * body-parse解析表单Post请求体
 * 提供静态资源服务
 * 挂载路由
 * 监听端口启动服务
 *
 */
var express = require("express");
// var fs = require("fs");
var router = require("./router");
var app = express();

app.use("/node_modules", express.static("./node_modules/"));
app.use("/public", express.static("./public/"));
app.engine("html", require("express-art-template"));

// 配置模版引擎和body-parse一定要在挂载路由(app.use(router))之前进行
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// router(app);
app.use(router);
// 把路由容器挂载到app服务实例中

app.listen(9000, function () {
  console.log("running 9000...");
});

// module.exports = app;
