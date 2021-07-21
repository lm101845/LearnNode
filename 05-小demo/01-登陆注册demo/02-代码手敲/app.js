// 导入jwt
const jwt = require('jsonwebtoken')

// 导入express
const express = require('express')

const app = express()

// 导出接收 post 请求数据 模块
const bodyParser = require('body-parser')

// 这个main要写到上面，不然会出错！！！！
// 导入主路由
const main = require('./router/main')

// 导入数据库连接
require('./database/init')
// require('./database/model/User')
// 这个后来被注释了

// 设置跨域和相应数据格式  
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/
    else next()
})

app.get('/', (req, res) => {
    res.status(404).send({
        data: null,
        meta: {
            msg: 'Not Found',
            status: 404
        }
    })
})

app.use('/api', (req, res, next) => {
    // res.send('ok')
    if (req.url == '/register' || req.url == '/login') {
        next()
        return
    }

    // 接收客户端传递过来的token
    const token = String(req.headers.authorization)
    // 解析token
    // 第一个参数是token，第二个参数是私钥自己定义
    // 根据客户端传递过来的token进行解密，解密成功返回一个对象，解密失败直接返回null
    const username = jwt.decode(token, 'liming')


    // 判断是否传递token和判断token是否正确
    if (token == 'undefined' || username == null) {
        res.status(400).send({
            data: null,
            meta: {
                msg: '无效token',
                status: 400
            }
        })
        return
    }
    // res.send(token)
    // res.send('ok')
    // 直接放行
    next()
})

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

// 为main匹配地址/api
app.use('/api', main)

// 监听8888端口
app.listen(8888)