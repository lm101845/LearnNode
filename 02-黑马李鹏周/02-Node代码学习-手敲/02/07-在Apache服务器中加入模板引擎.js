var http = require('http')
var fs = require('fs')
var template = require('art-template')

// 1.创建Server
var server = http.createServer()


var wwwDir = 'D:/vedio/5-Node.js/www/'

// 2.监听Server的request请求事件，设置请求处理函数
server.on('request', function (req,res) { 
    // console.log(req.url);
    var url = req.url 
    
    fs.readFile('./template-apache.html', function (err, data) { 
        if (err) { 
            return res.end('404 Not Found')
        }

        // 1.如何得到wwwDir目录列表中的文件名和目录名
        //      fs.readdir
        // 2.如何将得到的文件名和目录名替换到template.html中
        //      模板引擎(后面用)
        //      2.1 在template.html中需要替换的位置预留一个特殊的标记(就像以前使用模版引擎的标记一样)
        //      2.2 根据files生成需要的HTML内容(就是字符串拼接)
        // 只要你做了这2件事，那这个问题就解决了

        
    fs.readdir(wwwDir, function (err, files) { 
        if (err) { 
            return res.end('Can not find wwwDir.')
                // Apache服务器中你把www目录删了就完了
        }


        // 这里只需要使用模版引擎解析替换data中的模版字符串就可以了
        // 数据就是files
        // 然后去你的template.html文件中编写你的模版语法就可以了
        var htmlStr = template.render(data.toString(), {
            // data.toString()是原始数据
            // files:files是模版数据
            // 模版数据要进行解析替换到原始数据中
            title: '哈哈哈',
            files:files
        })
        // 3.发送解析替换过后的响应数据
        res.end(htmlStr)
        })
    })
})

// 3.绑定端口号，启动服务
server.listen(3004, function () { 
    console.log('running...');
})