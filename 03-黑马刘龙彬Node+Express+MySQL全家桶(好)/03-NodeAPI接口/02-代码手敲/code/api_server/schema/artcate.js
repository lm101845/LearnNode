/*
 * @Author: liming
 * @Date: 2021-08-28 23:43:21
 * @LastEditTime: 2021-08-28 23:50:18
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\schema\artcate.js
 */

//1.导入定义验证规则的包
const joi = require("joi");

//2.定义name和alias的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

//3.向外共享验证规则对象
exports.add_cate_schema = {
    body: {
        // 这里的body代表我们想对req里面的body进行验证
        name,alias
    }
}