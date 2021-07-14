var http = require('http')

// 读文件，要引入fs核心模块
var fs = require('fs')
// 1.创建Server
var server = http.createServer()

// 2.监听Server的request请求事件，设置请求处理函数
//      请求
//          处理
//      响应
//          一个请求对应一个响应，如果在一个请求的过程中，已经结束响应了，则不能重复发送响应
//          没有请求就没有响应

// 咱们以前使用过阿帕奇服务器软件，这个软件默认有一个WWW目录，
// 所有存放在WWW目录中的资源都可以通过网址来访问。
// 127.0.0.1:80/a.txt
// 127.0.0.1:80/index.html
// 127.0.0.1:80/apple/login.html

var wwwDir = 'D:/vedio/5-Node.js/www'
server.on('request', function (req,res) { 
    // console.log(req.url);
    var url = req.url 

    //      /           wwwDir + index.html
    //      /a.txt      wwwDir + a.txt
    //      /apple/login.html   wwwDir + apple/login.html
    //      /img/ab1.jpg        wwwDir + /img/ab1.jpg
   
    if (url === '/') {
        fs.readFile(wwwDir + '/index.html', function (err, data) { 
            // 不喜欢写这样的代码
            // if (err) {
            //     res.end('404 Not Found')
            // } else { 

            // }
            if (err) {
                //  return有2个作用：
                //      1.方法的返回值
                //      2.阻止代码继续往后执行
                return res.end('404 Not Found')
            }
            res.end(data)
        })
        // 反斜杠在字符串里面是转义的意思，要把它换成正斜杠
    } else if (url === '/a.txt') { 
       fs.readFile(wwwDir +'/a.txt', function (err, data) { 
            if (err) {
                return res.end('404 Not Found')
            }
            res.end(data)
        })
    }else if (url === '/index.html') { 
          fs.readFile(wwwDir +'/index.html', function (err, data) { 
            if (err) {
                return res.end('404 Not Found')
            }
            res.end(data)
        })
    }else if (url === '/apple/login.html') { 
          fs.readFile(wwwDir +'/apple/login.html', function (err, data) { 
            if (err) {
                return res.end('404 Not Found')
            }
            res.end(data)
          })
        
        // 但是如果这样写的话，我服务器里新增要给文件，就要用if...else...进行判断，这样也太恶心了
        // 能不能找规律，让它统一处理
    }
})

// 3.绑定端口号，启动服务
server.listen(3000, function () { 
    console.log('running...');
})