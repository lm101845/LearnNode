var express = require("express");

var fs = require("fs");

var app = express();

app.use("/node_modules", express.static("./node_modules/"));
app.use("/public", express.static("./public/"));
// app.engine("html", require("express-art-template"));

app.get("/", function (req, res) {
  // res.send('hello world')
  // 要求：把db中的数据渲染到index当中
  fs.readFile("./db.json", "utf8", function (err, data) {
    // readFile的第二个参数是可选的，传入utf8就是告诉它把读取到的文件直接按照utf8编码转成我们能认识的字符。
    //   除了这样来转换之外，也可以通过data.toString()的方式来转换
    if (err) {
      return res.status(500).send("Server error.");
    }
    console.log(typeof data);
    // console.log(data);
  });

  //从文件中读取到的数据，一定是字符串，所以这里一定要手动转成对象
  var students = JSON.parse(data).students;
  res.render("index.html", {
    fruits: ["苹果", "香蕉", "橘子"],
    students: students,
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
