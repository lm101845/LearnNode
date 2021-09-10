/*
 * @Author: liming
 * @Date: 2021-08-27 15:16:21
 * @LastEditTime: 2021-08-29 06:46:23
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\router\artcate.js
 */

// 这是文章分类的路由模块
const express = require('express');

//调用express的Router模块
const router = express.Router()

// 导入文章分类的路由处理函数模块
const {
  getArtCates,
  addArticleCates,
  deleteCateById,
  getArtCateById,
  updateCateById,
} = require("../router_handler/artcate");

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

//导入需要的验证规则对象
const {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema,
} = require("../schema/artcate");

//获取文章分类列表数据的路由
router.get("/cates", getArtCates);

// 新增文章分类的路由
router.post("/addcates", expressJoi(add_cate_schema), addArticleCates);

//根据id删除文章分类的路由
router.get("/delete/:id", expressJoi(delete_cate_schema), deleteCateById);
// 注意：这个【:id】是一个动态的参数，我们今后可以通过req.params来获取这个id的值

// 根据id获取文章分类的路由
router.get("/cates/:id", expressJoi(get_cate_schema), getArtCateById);

// 根据id更新文章分类的路由
router.post("/updatecate", expressJoi(update_cate_schema), updateCateById);

module.exports = router
