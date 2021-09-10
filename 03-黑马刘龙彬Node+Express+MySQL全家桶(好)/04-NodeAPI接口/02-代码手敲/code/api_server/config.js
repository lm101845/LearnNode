/*
 * @Author: liming
 * @Date: 2021-08-23 09:57:55
 * @LastEditTime: 2021-08-23 10:03:13
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\config.js
 */

// 这是一个全局的配置文件

module.exports = {
    //加密和解密Token的密钥
    jwtSecretKey: 'keyname',
    // 设置Token的有效期
    expiresIn:'10h'
}