/*
 * @Author: liming
 * @Date: 2021-07-29 17:32:11
 * @LastEditTime: 2021-07-29 17:33:23
 * @FilePath: \01-Express\02-代码手敲\code\16-custom-body-parse.js
 */
//导入node内置的querystring模块
const qs = require('querystring')
 
const bodyParser = (req, res, next) => {
    //定义中间件具体的业务逻辑
    //1.定义一个str字符串，专门用来存储客户端发送过来的请求体数据
    let str = '';
    //2.监听req的data事件
    req.on('data', (chunk) => {
        str += chunk
    })

    //3.监听req的end事件
    req.on('end', () => {
        //在str中存放的是完整的请求体数据了
        console.log(str);
        //TODO:把字符串格式的请求体数据，解析为对象格式
        const body = qs.parse(str)
        console.log(body);
        req.body = body
        next()
        //挂载完后要调用一下next函数
    })
}

module.exports = bodyParser