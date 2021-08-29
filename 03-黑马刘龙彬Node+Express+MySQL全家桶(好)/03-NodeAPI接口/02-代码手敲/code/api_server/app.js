/*
 * @Author: liming
 * @Date: 2021-08-12 17:21:23
 * @LastEditTime: 2021-08-29 10:14:35
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\app.js
 */

//导入express
const express = require('express');

//创建服务器的实例对象——调用express
const app = express();

// 导入 joi来定义验证规则
const joi = require("joi");
// ====================================中间件区域==========================================

//导入并配置cors中间件
const cors = require('cors')

//使用app.use将其注册为全局可用的中间件
app.use(cors())

//配置解析表单数据的中间件——这个中间件是Node内置的，不需要你单独下载
// 它是body-parser(2019年消亡)这个中间件的替代品，都是用来处理POST请求的(Node本身不能处理POST)
// 注意：这个中间件只能解析POST请求的【application/x-www-form-urlencoded】格式的数据
app.use(express.urlencoded({ extended: false }))

//托管静态资源文件
app.use('/uploads', express.static('./uploads'))
// 挂载一个统一的访问前缀：/uploads


// 定义一个全局中间件，封装一个res.cc函数(注意：一定要写到【路由之前】！！！！！)
app.use((req, res, next) => {
    // 如果不传递status，则它的默认值为1,表示失败的情况
    // err的值可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = (err, status = 1) => {
        // status=1是ES6写法，表示status不写具体值时它的默认值为1
        res.send({
            status,
            message:err instanceof Error ? err.message:err
        })
    }
    next()
})

//定义错误级别的中间件
app.use((err, req, res, next) => {
  // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err);
    // 身份认证失败
    if (err.name === "UnauthorizedError") return res.cc('身份认证失败!')
      //未知的错误
      res.cc(err);
})

// 注意：一定要在【路由之前】配置解析Token的中间件
const expressJWT = require('express-jwt')
// 导入配置文件
const config = require('./config')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
// 不包含api的路径都需要进行身份认证
// 如果发现你请求的路径的请求头中没有包含token，则身份认证失败
app.use(
    expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
    // 除了api接口以外的其他所有接口都是有权限的接口，都需要身份验证
);

// =====================================路由区域=========================================

// 导入并使用用户(user.js)路由模块
// user.js的后缀名可以省略
const userRouter = require('./router/user')
app.use("/api", userRouter);
// 第一个参数是所有api的前缀
// 比如你在POstMan上登陆http://127.0.0.1:3007/reguser是访问不到的，必须是http://127.0.0.1:3007/api/reguser
// 注意：浏览器只支持GET请求，POST请求请用PostMan来测试

// 导入并使用用户信息(userinfo.js)路由模块
const userInfoRouter = require('./router/userinfo')
// 通过app.use来进行注册这个模块，注册之前，挂载一个统一的访问前缀my
app.use("/my", userInfoRouter);

// 导入并使用文章分类(artcate.js)路由模块
const artCateRouter = require('./router/artcate')
// 通过app.use来进行注册这个模块，注册之前，挂载一个统一的访问前缀my/article
app.use("/my/article", artCateRouter);

// 导入并使用文章的路由模块
const articleRouter = require('./router/article')
app.use("/my/article", articleRouter);
// ==============================================================================



//启动服务器
app.listen(3007, () => {
    console.log('api server running at http:127.0.0.1:3007');
})