const jwt = require('jsonwebtoken')
// 导入 express
const express = require('express')
const app = express()
// 导出接收 post 请求数据 模块
const bodyParser = require('body-parser')
// 导入主路由
const main = require('./routes/main')
// 导入数据库连接
require('./database/init')



// 设置跨域和相应数据格式  
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
})

app.get('/', (req, res) => {
    res.status(404).send({
        data: null,
        meta: {
            msg: 'Not Found',
            status:404
        }
    })
})


app.use('/api', (req, res,next) => {
    if (req.url == '/login' || req.url == '/register') {
        next()
        return
    }
    // 接收客户端传递过来的 token
    const token = String(req.headers.authorization)
     // 解析 token 如果解析失败 返回的是 null
    const username = jwt.decode(token,'xiaoke')
    // 判断客户端是否传递了 token
    if (token == 'undefined' || username == null ) {
        res.status(400).send({
            data: null,
            meta: {
                msg: "token无效",
                status:400
            }
        })
        return
    }
    // 直接放行
    next()
})  



app.use(bodyParser.urlencoded({ extended: false }))
// 为main 匹配 地址 /api
app.use('/api',main)
// 监听8888 端口
app.listen(8888)