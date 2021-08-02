/*
 * @Author: liming
 * @Date: 2021-08-01 18:55:25
 * @LastEditTime: 2021-08-02 14:29:46
 * @FilePath: \03-黑马Node+Express+MySQL全家桶\01-Express\02-代码手敲\code\18_apiRouter.js
 */
const express = require('express');
const router = express.Router();

//在这里挂载对应的路由
//定义GET接口
router.get('/get', (req,res) => {
    //注意：最终地址是/api/get，/api不要忘了
    //在内部我们先拿到客户端发送到服务器的数据
    //通过req.query获取客户端
    const query = req.query
    //调用res.send()方法，向客户端响应处理的结果
    res.send({
        status: 0,   //0表示处理成功，1表示处理失败
        msg: 'GET请求成功',
        data: query
        //向客户端响应一些数据
        //你客户端向服务端提交了什么数据，我就原封不动的把你的数据再传给你
    })
})

//定义POST接口
router.post('/post', (req, res) => {
    //1.通过req.body获取请求体中包含的url-encoded格式的数据
    const body = req.body

    //2.调用res.send向客户端响应结果
    res.send({
        status: 0,
        msg: 'POST请求成功',
        data:body
    })
})

//定义DELETE接口
router.delete('/delete', (req, res) => {
    //2.调用res.send向客户端响应结果
    res.send({
        status: 0,
        msg: 'DELETE请求成功',
    })
})
module.exports = router;