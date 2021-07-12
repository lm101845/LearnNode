var express = require("express");

var fs = require("fs");

var app = express();

app.use("/node_modules", express.static("./node_modules/"));
app.use("/public", express.static("./public/"));
app.engine("html", require("express-art-template"));

app.get("/", function (req, res) {
  // res.send('hello world')
  // 要求：把db中的数据渲染到index当中
  fs.readFile("./db.json", "utf8", function (err, data) {
    if (err) {
      return res.status(500).send("Server error.");
    }
    console.log(msg);
  });
  res.render("index.html", {
    fruits: ["苹果", "香蕉", "橘子"],
    // students: [
    //   {
    //     id: 1,
    //     name: "张三",
    //     gender: 0,
    //     age: 18,
    //     hobbies: "吃饭、睡觉、打豆豆、LOL",
    //   },
    //   {
    //     id: 2,
    //     name: "张三",
    //     gender: 0,
    //     age: 18,
    //     hobbies: "吃饭、睡觉、打豆豆、LOL",
    //   },
    //   {
    //     id: 3,
    //     name: "张三",
    //     gender: 0,
    //     age: 18,
    //     hobbies: "吃饭、睡觉、打豆豆、LOL",
    //   },
    //   {
    //     id: 4,
    //     name: "张三",
    //     gender: 0,
    //     age: 18,
    //     hobbies: "吃饭、睡觉、打豆豆、LOL",
    //   },
    //   {
    //     id: 5,
    //     name: "张三",
    //     gender: 0,
    //     age: 18,
    //     hobbies: "吃饭、睡觉、打豆豆、LOL",
    //   },
    //   {
    //     id: 6,
    //     name: "张三",
    //     gender: 0,
    //     age: 18,
    //     hobbies: "吃饭、睡觉、打豆豆、LOL",
    //   },
    // ],
  });
});

app.listen(3000, function () {
  console.log("running 3000...");
});
