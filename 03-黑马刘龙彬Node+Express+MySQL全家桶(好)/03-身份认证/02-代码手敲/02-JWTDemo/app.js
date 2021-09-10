/*
 * @Author: liming
 * @Date: 2021-09-10 14:02:17
 * @LastEditTime: 2021-09-10 15:27:03
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-身份认证\02-代码手敲\02-JWTDemo\app.js
 */
//导入express模块
const express = require('express');

//创建express模块示例
const app = express();

// 允许跨域资源共享
const cors = require('cors');
app.use(cors());

// 编译器中引用bodyParser。使用时bodyParser被编译器划上横线提示已弃用（19年已弃用）
// 解决方法：https://segmentfault.com/a/1190000040377076
// 表单请求
//解析post表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//安装并导入JWT相关的两个包，分别是jsonwebtoken和express-jwt
const jwt = require('jsonwebtoken')         //用于将用户信息生成jsonwebtoken的字符串
const expressJWT = require('express-jwt')   //用于将jsonwebtoken的字符串再解析还原成用户信息


// 定义secret密钥，建议将密钥命名为secretKey
const secretKey = 'itheima No1 ^_^'

//注册将JWT字符串解析还原成JSON对象的中间件
// unless用于排除哪些接口不需要访问权限(登陆注册接口不需要，且它们都是的地址中都有api)
// 注意：只要配置成功了express-jwt这个中间件，就可以把解析出来的用户信息，挂载到req.user属性上
// req.user里面包含了哪些信息，是你自己决定的
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256']}).unless({path:[/^\/api\//]}))

//登陆接口
app.post('/api/login', function (req, res) {
    //将req.body请求体中的数据，转存为userinfo常量
    const userinfo = req.body
    //登陆失败
    if (userinfo.username !== 'admin' || userinfo.password !== '123456') {
        return res.send({
            status: 400,
            message:'登陆失败！'
        })
    }

    //登陆成功
    //在登陆成功【之后】，调用jwt.sign()方法生成JWT字符串，并通过token属性发送给客户端
    // 我们登陆成功之后，服务器会生成一个token字符串并发送给客户端
    
    /**
     * @description: 
     * @param {参数1：用户的信息对象}
     * @param {参数2：加密的密钥}
     * @param {参数3：配置对象，可以配置当前token的有效期}
     * @return {*}
     */      
    const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
    // 注意：我们在生成token的时候，千万不要携带密码等相关属性
    res.send({
        status: 200,
        message: '登陆成功!',
        token: tokenStr    //要发送给客户端的token字符串
        // 注意：POSTMan里面的Authorization里面的token前面必须要加一个Bearer
    })
})

//这是一个有权限的API接口
app.get('/admin/getinfo', function (req, res) {
    //使用req.user获取用户信息，并使用data属性将用户信息发送给客户端
    console.log(req.user);
    res.send({
        status: 200,
        message: '获取用户信息成功！',
        data: req.user  //要发送给客户端的用户信息
    })
})


// 使用全局错误处理中间件，捕获解析JWT失败后产生的错误
app.use((err,req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        //这次错误是由token解析失败导致的
        return res.send({
            status: 401,
            message: '无效token'
        })
    }
    res.send({
        status: 500,
        message: '未知的错误'
    })
})
//调用app.listen方法,指定端口号并启动服务器
app.listen(8888, () => {console.log('Express server running at http://127.0.0.1:8888')})