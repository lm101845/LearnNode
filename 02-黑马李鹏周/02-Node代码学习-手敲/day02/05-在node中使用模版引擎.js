// art-template
// art-template不仅可以在浏览器使用，也可以在node中使用

// 使用art-template第一步：安装  npm install art-template
// 改命令在哪执行就会把包下载到哪里。默认下载到node_modules目录中
// node_modules不要改，也不支持改

// 在Node中使用art-template模版引擎
// 模版引擎最早就是诞生于服务器领域，后来才发展到了前端。

// 1.安装 npm install art-template
// 2.在需要使用的文件模块中加载art-template
//   只需要使用过require方法加载就可以了 require('art-template')
//   参数中的art-template就是你下载的包的名字
//   也就是说你install的名字是什么，则你require中的就是什么
// 3.查文档，使用模版引擎的API

var template = require('art-template')

var fs = require('fs')
fs.readFile('./tpl.html', function (err, data) { 
    if (err) { 
        return console.log('读取文件失败了');
    }

// 默认读取到的data是二进制数据
// 而模版引擎的render方法需要接收的是字符串
// 所以我们在这里需要把data二进制数据转为字符串才可以给模版引擎使用
// var ret = template.render(tplStr, {
// var ret = template.render(data, {
var ret = template.render(data.toString(), {
        name: 'Jack',
        age: 18,
        province: '北京市',
        hobbies: [
            '写代码',
            '唱歌',
            '打游戏'
    ],
        title:'个人信息'
    }) 
    console.log(ret);

})
// template('script标签id', {对象})
// 这里不是浏览器，这样用是不行的

// var tplStr = `
    
//     <!DOCTYPE html>
//     <html lang="en">

//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Document</title>
//     </head>

//     <body>
//         <p>大家好，我叫:{{name}}</p>
//         <p>我今年{{age}}岁了</p>
//         <p>我来自{{province}}</p>
//         <p>我喜欢：{{each hobbies}}{{$value}}{{/each}}</p>
//     </body>

//     </html>
// `


// template.render('模版字符串',替换对象)


