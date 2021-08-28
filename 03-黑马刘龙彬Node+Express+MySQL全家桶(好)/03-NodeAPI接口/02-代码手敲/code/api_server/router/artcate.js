/*
 * @Author: liming
 * @Date: 2021-08-27 15:16:21
 * @LastEditTime: 2021-08-28 23:53:02
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\router\artcate.js
 */

// 这是文章分类的路由模块
const express = require('express');

//调用express的Router模块
const router = express.Router()

// 导入文章分类的路由处理函数模块
const { getArtCates, addArticleCates } = require("../router_handler/artcate");

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

//导入需要的验证规则对象
const { add_cate_schema} = require('../schema/artcate')
//获取文章分类列表数据的路由
router.get("/cates", getArtCates);

// 新增文章分类的路由
router.post("/addcates", expressJoi(add_cate_schema), addArticleCates);
module.exports = router
