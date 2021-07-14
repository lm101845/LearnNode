var http = require('http')
var fs = require('fs')

// 1.创建Server
var server = http.createServer()


var wwwDir = 'D:/vedio/5-Node.js/www/'
// 2.监听Server的request请求事件，设置请求处理函数
server.on('request', function (req,res) { 
    // console.log(req.url);
    var url = req.url 
    
    fs.readFile('./template.html', function (err, data) { 
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
            // console.log(files);
            // 2.1 生成需要替换的内容
            var content = ''
            files.forEach(function (item) {
            // 在 EcmaScript 6 的 ` 字符串中，可以使用 ${} 来引用变量
            content += `
          <tr>
            <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">${item}/</a></td>
            <td class="detailsColumn" data-value="0"></td>
            <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
          </tr>
        `
      })

            // 2.3 替换
            data = data.toString()
        
            // 普通的字符串解析替换，浏览器看到的结果就不一样了
                data = data.replace('^_^','content')
        
                // console.log(data)

                // 3.发送解析替换过后的响应数据
                res.end(data)
        })

        
    })
})

// 3.绑定端口号，启动服务
server.listen(3004, function () { 
    console.log('running...');
})