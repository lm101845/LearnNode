/*
 * @Author: liming
 * @Date: 2021-07-12 21:49:04
 * @LastEditTime: 2021-08-02 17:45:50
 * @FilePath: \02-Node代码学习-手敲\day01\11-加载与导出\a.js
 */
// require方法有2个作用：
//    1.加载文件模块并执行里面的代码(但因为是模块作用域，虽然执行了，b依然也拿不到a里面的变量成员)
//所以这时候可以体现出它的第二个作用了
//    2.拿到被加载文件模块导出的接口对象

// 在每个文件模块中都提供了一个对象，叫做：exports(即require有返回值)
// exports默认是一个空对象({})
// 你要做的就是把所有需要被外部访问的成员挂载到这个exports对象中
var bExports = require('./b.js')

// bExports变量 === exports对象

console.log(bExports);
console.log('===================');
// 显示{}!!! 空对象！！！

console.log(bExports.foo);
console.log('===================');
// hello
// a.js里面的bExports变量就是b.js里面的exports对象

// 想使用b.js里面的add方法
console.log(bExports.add(10, 30));
console.log('===================');
// 40

// console.log(age)
// 这里是访问不到age的

console.log(bExports.age)
console.log('===================');
// Undefined
// 18
// 这个也不能，因为没有挂载
// 只有写了exports.age = age;这句话才可以被a.js用

bExports.readFile('./a.js')
// 文件路径：./a.js
// 注意：这里的readFile不是fs的那个readFile！！只是名字一样而已！！

var fs = require('fs')
fs.readFile('./a.js', function (err, data) { 
  if (err) {
    console.log('读取文件失败');
  } else { 
    console.log(data.toString());
    // 因为我读的就是a文件，所以显示的就是文件的源代码
  }
})