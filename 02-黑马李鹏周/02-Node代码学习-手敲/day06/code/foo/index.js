/*
 * @Author: liming
 * @Date: 2021-07-15 01:56:53
 * @LastEditTime: 2021-07-15 02:00:34
 * @FilePath: \LearnNode\02-黑马李鹏周\02-Node代码学习-手敲\day06\code\foo\index.js
 */
var fs = require('fs');

// ./a.txt 相对于当前文件路径
// ./a.txt 相对于执行 node 命令所处的终端路径
// 这不是错误，Node 就是这样设计的
// 就是说，文件操作路径中，相对路径设计的就是相对于执行 node 命令所处的路径
// fs.readFile('C:/Users/lpz/Desktop/nodejs/06/code/foo/a.txt', 'utf8', function (err, data) {
//   if (err) {
//     throw err
//   }
//   console.log(data)
// })

// console.log(__dirname + '/a.txt')

// C:\Users\lpz\Desktop\nodejs\06\code
fs.readFile('./a.txt', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
})