/*
 * @Author: liming
 * @Date: 2021-06-02 23:24:14
 * @LastEditTime: 2021-06-03 00:10:39
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\04-promise-api3.0.js
 */

var fs = require("fs")
var p1 = new Promise(function (resolve, reject) {
    fs.readFile('./data/a.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err)

        } else {

            resolve(data)
        }
    })
})

var p2 = new Promise(function (resolve, reject) {
    fs.readFile('./data/b.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err)

        } else {

            resolve(data)
        }
    })
})

var p3 = new Promise(function (resolve, reject) {
    fs.readFile('./data/c.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err)

        } else {

            resolve(data)
        }
    })
})


p1
    .then(function (data) {
        console.log(data);
        // 当p1读取成功的时候，
        // return 123
        // 这里return 123,后面console.log(data);就可以打印出123
        // 如果没有return，后面收到的就是undefined
        // 当前函数中return的结果就可以在后面的then中function接收到

        // 上面说的那些return的数据(比如return 123)没什么卵用
        // 真正有用的是return一个Promise对象(比如return p2)
        // 当return一个Promise对象的时候，后续的then中的方法的第一个参数会作为p2的resolve，第二个参数会作为p2的reject
        return p2
    }, function (err) {
        console.log('读取文件失败了' + err);
    })
    .then(function (data) {
        console.log(data);
        return p3
    })
    .then(function (data) {
        console.log(data);
        console.log('end');
    })
    // 这个就是then的链式调用