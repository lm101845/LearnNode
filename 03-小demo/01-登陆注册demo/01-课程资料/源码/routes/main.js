const express = require('express')

const main = express.Router()

main.post('/register',require('./user/register'))
main.post('/login', require('./user/login'))
// 创建一个路由测试一下
main.get('/index', (req, res) => {
    res.send('访问成功！')
})

// 导出
module.exports = main