// var app = require("./app");
var fs = require("fs");
// 在routers里面使用了fs这个模块，所以要在这里进行引入

// 这样写不好，还要先node router这里面的代码才会生效
// 写法1：这种写法不太好，还要自己封装函数
// module.exports = function (app) {
//   app.get("/students", function (req, res) {
//     fs.readFile("./db.json", "utf8", function (err, data) {
//       if (err) {
//         return res.status(500).send("Server error.");
//       }
//       //   console.log(data);
//       var students = JSON.parse(data).students;
//       res.render("index.html", {
//         fruits: ["苹果", "香蕉", "橘子"],
//         students: students,
//       });
//     });
//   });

//   app.get("/students", function (req, res) {});

//   app.get("/students/new", function (req, res) {});

//   app.get("/students/new", function (req, res) {});

//   app.get("/students/new", function (req, res) {});

//   app.get("/students/new", function (req, res) {});

//   app.get("/students/new", function (req, res) {});
// };

// 写法2：express提供了一种更好的方式
// 专门用来包装路由的
var express = require("express");
// 这里调用express的目的是为了使用他的router方法

// 2.1创建一个路由容器
var router = express.Router();

// 2.2把路由都挂载到router路由容器中
router.get("/students", function (req, res) {
  fs.readFile("./db.json", "utf8", function (err, data) {
    if (err) {
      return res.status(500).send("Server error.");
    }
    var students = JSON.parse(data).students;
    res.render("index.html", {
      fruits: ["苹果", "香蕉", "橘子"],
      students: students,
    });
  });
});

router.get("/students", function (req, res) {});

router.get("/students/new", function (req, res) {});

router.get("/students/new", function (req, res) {});

router.get("/students/new", function (req, res) {});

router.get("/students/new", function (req, res) {});

router.get("/students/new", function (req, res) {});

// 2.3把router导出
// exports.router = router;
module.exports = router;
