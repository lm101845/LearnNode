// 需求：以前我们都是手写，服务器发送的是简单的字符串
// 如果我们想要服务器发送页面怎么办？？
// 比如你浏览器上输入百度，对方服务器上给你发送的是百度的页面，而不是什么字符串
var http = require('http')

// 凡是读文件要引入fs
var fs = require('fs')

// 这里http和fs就结合起来了

var server = http.createServer()

server.on('request', function (req, res) { 
    var url = req.url
    // 服务器肯定要放HTML页面
    // HTML页面怎么发？不再是以前使用Apache服务器，文件往服务器一丢，浏览器就可以访问了
    // Node不行了，你开启了服务器，不能访问服务器里面的文件

    // 我们现在要用Node来创建Apache
    // 需求：输入 /    响应index.html
    if (url === '/') {
        // 被坑了，注意这里写的是'/'而不是'./'！！！！！

        // 方法1：字符串拼接(这肯定不是什么好方法)
        // res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><h1>首页</h1></body></html>')

        // 我们要发送的还是在文件中的内容
        // 文件是不能发给客户端的，只能发字符串(要把文件里的字符串给读出来——使用fs)
        fs.readFile('./resource/index.html', function (err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain;charset=utf-8')
                res.end('文件读取失败，请稍后重试')
            } else {
                // data默认是二进制数据，可以通过.toString转为咱们可以识别的字符串
                // res.end()支持2种数据类型，一种是二进制，一种是字符串，所以这里你可以不用转
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(data)
            }
        })
    } else if (url === '/logo') { 
        // url的术语：统一资源定位符
        // 一个url最终还是要对应到一个资源的
          fs.readFile('./resource/logo.jpg', function (err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain;charset=utf-8')
                res.end('文件读取失败，请稍后重试')
            } else {
                // 图片就不需要指定编码了(utf-8去掉)，因为我们常说的编码一般指的是：字符编码
                res.setHeader('Content-Type', 'image/jpeg;')
                res.end(data)
            }
        })
    }
})

server.listen(3000, function () { 
    console.log('Server is running...')
})

// 不知道为什么这个服务器不显示东西
// 因为我'/'写成了'./'了！！！！！