/*
 * @Author: liming
 * @Date: 2021-09-10 11:03:47
 * @LastEditTime: 2021-09-10 12:40:00
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-身份认证\02-代码手敲\01-SessionDemo\app.js
 */

//导入express模块
const express = require('express');

//创建express模块示例
const app = express();

//请配置Session中间件——配置这个中间件之前，req身上是没有session这个属性的！！！！配置后才有
const session = require('express-session')

//使用app.use函数将session注册为全局中间件
app.use(
    session({
    //这里面是配置对象
    secret: 'cat',
    //secret名字可以随便写
    resave: false,
    saveUninitialized: true
    //resave和saveUninitialized是固定写法，不能变
    })
)

//托管静态页面
app.use(express.static('./pages'))

//解析POST提交过来的表单数据——原生的，不用下载中间件了
app.use(express.urlencoded({extended: false}))

//登陆的API接口
app.post('/api/login', (req, res) => {
    //判断用户提交的登陆信息是否正确
    if (req.body.username !== 'admin' || req.body.password != '123456') {
        return res.send({status:1,msg:'登陆失败'})
    }

    //将登陆成功后的用户信息，保存到Session中
    // 注意：只有成功配置了【express-session】这个中间件之后，才能够通过req点出来这个属性
    // 这里的user,isLogin这些都是你自己可以随便起的，你想叫什么名字都行
    req.session.user = req.body   //将用户的信息，存储到Session中
    req.session.isLogin = true    //将用户的登陆状态，存储到Session中
    res.send({status:0,msg:'登陆成功！'})
})


//获取用户姓名的接口
app.get('/api/username', (req, res) => {
    //请从Session中获取用户的名称，响应给客户端 
    //首要要判断用户是否登陆
    if (!req.session.isLogin) {
        return res.send({status:1,msg:'fail'})
    }
    res.send({
        status: 0,
        msg: 'success',
        username: req.session.user.username
    })
})

//退出登陆的接口
app.post('/api/logout', (req, res) => {
    //清空Session信息
    // 注意：调用destroy函数，只会清空当前用户的session,不会清空其他用户的session
    req.session.destroy()
    res.send({
        status: 0,
        msg:'退出登陆成功'
    })
})
//调用app.listen方法,指定端口号并启动服务器
app.listen(80, () => {console.log('Express server running at http://127.0.0.1')})