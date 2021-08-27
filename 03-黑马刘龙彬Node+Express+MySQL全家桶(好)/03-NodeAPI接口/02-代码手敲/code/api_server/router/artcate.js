/*
 * @Author: liming
 * @Date: 2021-08-27 15:16:21
 * @LastEditTime: 2021-08-27 15:43:13
 * @FilePath: \03-NodeAPI接口\02-代码手敲\code\api_server\router\artcate.js
 */

// 这是文章分类的路由模块
const express = require('express');
//调用express的Router模块
const router = express.Router()

// 导入文章分类的路由处理函数模块
const { getArtCates} = require('../router_handler/artcate')
//获取文章分类列表数据的路由
router.get("/cates", getArtCates);
module.exports = router
