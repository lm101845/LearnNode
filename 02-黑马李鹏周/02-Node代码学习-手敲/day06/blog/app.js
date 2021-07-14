/*
 * @Author: liming
 * @Date: 2021-07-15 00:32:55
 * @LastEditTime: 2021-07-15 01:09:36
 * @FilePath: \LearnNode\02-黑马李鹏周\02-Node代码学习-手敲\day06\blog\app.js
 */
const express = require("express");
const path = require('path');

const app = express();
const port = 3000;

//开放静态资源
// app.use('/public/',express.static('./public/'))
// app.use('/node_modules/',express.static('./node_modules/'))

// 写法2：和上面的写法效果是一样的，只不过这种写法会将相对路径改为绝对路径
app.use('/public/',express.static(path.join(__dirname,'./public')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



