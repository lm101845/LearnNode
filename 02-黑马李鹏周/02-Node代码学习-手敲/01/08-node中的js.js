var fs = require('fs')
// 左边的变量名可以随便起，但是最好要有一定的意义
// 右边的核心模块名字(小括号里面有引号包裹的内容)是固定的，不能动！！！

var http = require('http')

// 用来获取当前机器的CPU信息
var os = require('os')
console.log(os.cpus());
// mem是memory(内存)的缩写
// 以整数的形式返回系统的内存总量（以字节为单位）。
console.log(os.totalmem());

// path用来操作路径的
// path专门用来处理路径，其他什么也不干
var path = require('path')
// extname是extension name的缩写,是扩展名的意思
console.log(path.extname('c:/a/b/c/d/hello.txt'));
