var http = require('http')

var server = http.createServer()

server.on('request', function (req, res) { 
    var url = req.url
    
    if (url === './plain') {
        res.setHeader('Content-type', 'text/plain;charset=utf-8')
        // 只有加了这个，才会进行解析
        // text/plain：就是普通文本的意思
        res.end('hello 世界')
    } else if (url === '/html') { 
        // res.end('<p>hello html</p>')
        // 这个本质是字符串，只有浏览器才会把它当成标签(Node眼里是字符串，浏览器眼里是p标签)
        // 服务器发的时候发的是字符串，才不关心你是p标签还是hello 世界呢

        res.setHeader('Content-type', 'text/html;charset=utf-8')
        // html不是普通文本，而是带有一定格式的文本
        // 如果你发送的是html格式的字符串，则也要告诉浏览器我给你发送的是text/html格式的内容
        res.end('<p>hello html <a href="">点我</a></p>')
        // 浏览器确实把你当html进行解析了，但是中文依然有问题，还得加Content-type
    }
})

server.listen(3000, function () { 
    console.log('Server is running...');
})