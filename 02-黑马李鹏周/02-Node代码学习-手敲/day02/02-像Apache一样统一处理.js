var http = require('http')
var fs = require('fs')

// 1.创建Server
var server = http.createServer()


var wwwDir = 'D:/vedio/5-Node.js/www/'
// 2.监听Server的request请求事件，设置请求处理函数
server.on('request', function (req,res) { 
    // console.log(req.url);
    var url = req.url 

    //      /           wwwDir + index.html
    //      /a.txt      wwwDir + a.txt
    //      /apple/login.html   wwwDir + apple/login.html
    //      /img/ab1.jpg        wwwDir + /img/ab1.jpg
    var filePath = 'index.html'
    
    if (url !== '/') { 
        filePath = url
    }
    fs.readFile(wwwDir + filePath, function (err, data) { 
        if (err) { 
            return res.end('404 Not Found')
        }
        res.end(data)
    })
    // console.log(filePath,wwwDir + filePath)
})

// 3.绑定端口号，启动服务
server.listen(3000, function () { 
    console.log('running...');
})