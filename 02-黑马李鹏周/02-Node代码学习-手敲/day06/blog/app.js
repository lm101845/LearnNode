/*
 * @Author: liming
 * @Date: 2021-07-15 00:32:55
 * @LastEditTime: 2021-07-19 23:09:18
 * @FilePath: \02-黑马李鹏周\02-Node代码学习-手敲\day06\blog\app.js
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

//搭模版引擎
//在Node中，有很多第三方模版引擎都可以使用，不是只有art-template
//比如ejs、jade(pug)、handlebars、nunjucks
//<%%>
//{{}}
app.engine('html', require('express-art-template'))
app.set('views',  path.join(__dirname, './views'))
//它默认就是这个目录，可以不写，我故意写上，如果有一天你想改的话，就在这里改就可以了
// js模版引擎在Node和浏览器中都是可以用的，不涉及具体的语言

app.get("/", (req, res) => {
//   res.send("Hello World!");
    res.render('index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



