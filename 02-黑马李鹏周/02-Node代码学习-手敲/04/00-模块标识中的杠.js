var fs = require('fs')

// 咱么所使用的所有文件操作的API都是异步的
// 就像你的AJAX请求一样，都是异步的
// 所以它会后执行
// 文件操作中的相对路径可以省略./
// fs.readFile('data/a.txt', function (err, data) { 
//     if (err) { 
//         return console.log('读取失败');
//     }

//     console.log(data.toString());
// })

// 在模块加载中相对路径中的 ./ 不能省略
// require('data/foo.js')
// require('./data/foo.js')('hello')
// 这个表示加载完了直接进行调用

// 在文件操作的相对路径中
// ./data/a.txt     相对于当前目录
//  data/a.txt      相对于当前目录
//  /data/a.txt     当前文件模块所属磁盘根目录
//  C:/XX/XX...     绝对路径
fs.readFile('/data/a.txt', function (err, data) { 
    // 这个就比上面的少写了一个点
    // 没有点的话，/就表示磁盘根目录(我这里就是D盘了)
    // 它就会在D盘的根目录下找data文件下的a.txt文件
    if (err) { 
        console.log(err);
        return console.log('读取失败');
    }
    console.log(data.toString());
})

// 这里如果忽略了点，则也是磁盘根目录
require('/data/foo.js')

// 相对路径
require('./data/foo.js')

