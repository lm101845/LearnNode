/*
 * @Author: liming
 * @Date: 2021-08-29 08:08:24
 * @LastEditTime: 2021-08-29 09:27:31
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\router\article.js
 */

// 这是文章的路由模块
const express = require('express');

//调用express的Router模块
const router = express.Router()

// 导入需要的处理函数模块
const { addArticle } = require("../router_handler/article");

//导入multer和path核心模块 ——multer是一个中间件
const multer = require('multer')
const path = require('path')

// 创建multer的实例
// 通过配置对象的dest属性，来指定我们将文件存储到服务器的哪个目录里面
const uploads = multer({
    dest:path.join(__dirname,'../uploads')
})

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const { add_article_schema } = require("../schema/article");

//发布文章的路由(挂载一个具体的路由)
// 注意，这个文件的名字cover_img是随便取的，但是尽量和接口文档里提供的名字一致
// 当我们调用完这个中间件后，就可以在文件处理函数中拿到它帮我们解析的文件和处理数据
router.post(
  "/add",
  uploads.single("cover_img"),
  expressJoi(add_article_schema),
  addArticle
);
// 这里我们连续调用了多个中间件来处理这次请求
// 注意：req.file是无法使用expressJoi这个中间件来进行校验的

module.exports = router