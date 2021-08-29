/*
 * @Author: liming
 * @Date: 2021-08-29 09:18:18
 * @LastEditTime: 2021-08-29 09:19:20
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\schema\article.js
 */

//1.导入定义验证规则的包
const joi = require("joi");

// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow("");
const state = joi.string().valid("已发布", "草稿").required();

// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
};