//require
// 端口号
// 可以同时开启多个服务，但一定要确保多个服务占用的端口号不一致

var http = require('http')

var server = http.createServer()

server.on('request', function (req, res) { 
    // 在服务器默认发送的数据，其实是UTF8编码的内容
    // 但是浏览器不知道你是UTF8编码的内容
    // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
    // 由于我是中文操作系统，默认用gbk解析。(你用的是英文，我却用汉语字典去查英文)
    // 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
    // 在HTTP协议中，Content-type就是用来告知对方我给你发送的数据内容是什么类型的

    res.setHeader('Content-type', 'text/plain;charset=utf-8')
    // 把这句话注释了中文就会乱码
    // Content-type：内容类型，属于HTTP协议的一种
    // text/plain:文本类型/普通文本
    res.end('中文会乱码')
})

server.listen(3000, function () { 
    console.log('Server is running...');
})