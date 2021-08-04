/*
 * @Author: liming
 * @Date: 2021-07-27 23:39:35
 * @LastEditTime: 2021-07-28 00:34:17
 * @FilePath: \01-Express\02-代码手敲\code\06_定义最简单的中间件函数.js
 */
const express = require('express');

const app = express();

//1.完整形式
//定义一个最简单的中间件函数
//普通函数和箭头函数都是可以的
//常量mw所指向的，就是一个中间件函数
// const mw = function (req, res, next) {
//     //服务端接收请求的时候，会把请求交给这个中间件来进行处理(使用了app.use)
//     //所以每次收到请求都会打印出这句话的
//     console.log('这是最简单的中间件函数');

//     next()
//     //把流转关系转交给下一个中间件或路由
// }

// //将mw注册为全局生效的中间件
// //此时任何一个请求到达服务器的话，都会经过这个函数的处理
// app.use(mw)


//2.简写方式
//这是定义全局中间件的简化形式 
app.use((req, res, next) => {
    console.log('这个是最简单的中间件函数');
    //在这个中间件函数处理完毕之后一定要调用next函数
    next()
})


app.get('/', (req, res) => {
    console.log('调用了/这个路由');
    res.send('Home page')
})

app.get("/user", (req, res) => {
  console.log('调用了/user这个路由');
  res.send("User page");
});

app.listen(80, () => {
    console.log('127.0.0.1');
})