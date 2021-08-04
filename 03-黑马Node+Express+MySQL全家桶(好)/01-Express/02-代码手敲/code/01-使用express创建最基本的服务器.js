/*
 * @Author: liming
 * @Date: 2021-07-21 19:23:37
 * @LastEditTime: 2021-07-21 21:06:45
 * @FilePath: \01-Express\02-代码手敲\code\app.js
 */

// 使用express创建最基本的服务器步骤：
// 1.导入express
const express = require('express');

//2.创建web服务器
const app = express() 

//4.监听客户端的get和post请求，并向客户端响应具体的内容
//res.send()方法比较强大，它既可以响应JSON对象，也可以响应一段普通的文本
app.get('/user', function (req, res) {
    //调用express提供的res.send()方法，向客户端响应一个JSON对象
    res.send({name:'zs',age:20,gender:'男'})
})

app.post("/user", function (req, res) {
  //调用express提供的res.send()方法，向客户端响应一个文本字符串
  res.send('请求成功！');
});

app.get("/", function (req, res) {
    //通过req.query可以获取到客户端发送过来的查询参数
    // 注意：默认情况下，req.query是一个空对象
    console.log(req.query);
    res.send(req.query);
})

//注意：这里的:id是一个动态的参数(而且我们可以有多个动态参数)
// 注意2：这里的冒号是必须的，而id这个参数名可以随便取
app.get('/user/:id/:name', (req, res) => {
  // req.params是动态匹配到的url参数，默认也是一个空对象
  console.log(req.params);
  res.send(req.params);
})

// 3.启动web服务器
app.listen(80, () => {
    //服务器启动成功后的回调函数
    console.log('express server running at http://localhost');
})