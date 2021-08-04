/*
 * @Author: liming
 * @Date: 2021-07-21 21:17:05
 * @LastEditTime: 2021-07-21 22:24:16
 * @FilePath: \01-Express\02-代码手敲\code\02-使用express.static对外提供静态资源.js
 */
// 使用express创建最基本的服务器步骤：
// 1.导入express
const express = require('express')

//2.创建web服务器
const app = express()

//在这里，我们需要调用express.static()方法，快速的对外提供静态资源
// 需要写./
//这个是有先后讯息的，谁写在前面，就在谁的里面去找文件
app.use(express.static("./static"));
app.use(express.static('./public'))
app.use('/abc', express.static("./files"));
// 添加访问路径的前缀,今后想访问files文件夹里面的东西时，前面必须要加/abc
    
// 3.启动web服务器
app.listen(80, () => {
     //服务器启动成功后的回调函数
    console.log('express server running at http://localhost');
})