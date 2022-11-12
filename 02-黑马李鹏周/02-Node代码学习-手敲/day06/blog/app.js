/*
 * @Author: liming
 * @Date: 2021-07-15 00:32:55
 * @LastEditTime: 2021-08-12 16:14:39
 * @FilePath: \02-黑马李鹏周\02-Node代码学习-手敲\day06\blog\app.js
 */
const express = require("express");
const path = require('path');
//引包——在Express中没有内置获取表单POST请求体的API，这里我们需要使用一个第三方包：`body-parse`。——被弃用
// const  bodyParser = require('body-parser')
const router = require('./router');

const app = express();
const port = 4000;

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

// app.get("/", (req, res) => {
    // 路由不要写在app.js里，不然会越写越多
// res.send("Hello World!");
//     res.render('index.html');
// });


//配置body-parser——注意一定要在app.use(router)之前写！！！
//只要加入这个配置，则在req请求对象上会多出来一个属性：body
//也就是说你就可以直接通过req.body来获取表单POST请求体数据了

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

// vscode提示bodyParser已被弃用，直接用express调用bodyParser的方法就可以了，bodyParser2019年就被弃用了
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//把路由挂载到app中，不写这句话路由不生效
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



