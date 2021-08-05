/*
 * @Author: liming
 * @Date: 2021-07-25 22:07:45
 * @LastEditTime: 2021-07-25 22:32:47
 * @FilePath: \01-Express\02-代码手敲\code\04-模块化路由.js
 */
const express = require('express')

const app = express()

//1.导入路由模块
const router = require('./05-router.js')

//2.注册路由模块
//添加统一的访问前缀：/api
app.use('/api',router)

//注意：app.use()函数的作用，就是来注册全局中间件
app.listen(80, () => {
    console.log('http://localhost');
})