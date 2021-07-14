/*
 * @Author: liming
 * @Date: 2021-06-02 23:24:14
 * @LastEditTime: 2021-06-02 23:52:40
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\04-promise-api2.0.js
 */

var fs = require("fs")

// 在ES6中新增了一个API叫Promise
// Promise是一个构造函数。

// console.log(1);
// 创建Promise容器
// 第1步：给别人一个承诺 I Promise you
// 在容器里面把你的任务写到里面，接收一个function
// Promise容器一旦创建，就可以执行里面的代码(function里面的代码)
// 但因为是异步的，它也不是立即就能得到结果(注意：承诺本身不是异步的(new一个Promise哪来的异步啊！！！)，承诺里面的任务是异步的)
// 比如读取文件，是需要时间的，经过一段时间后才能确定你是读取成功了还是失败了
var p1 = new Promise(function (resolve, reject) {
    // resolve, reject是形参，名字是随便起的
    // console.log(2);
    fs.readFile('./data/aa.txt', 'utf8', function (err, data) {
        if (err) {
            //失败了，承诺容器中的任务失败了
            // console.log(err);

            // 调用reject就相当于调用then方法的第二个参数函数
            reject(err)
            //把容器的Pending状态变为Rejected 
        } else {
            //承诺容器中的任务成功了
            // console.log(3);
            // console.log(data);
            // 把容器的Pending状态变为Resolved
            // 也就是说这里调用的resolve方法实际上就是then方法传递的那个function
            resolve(data)
        }
    })
})

// console.log(4);

// p1就是那个承诺
// 当p1成功了，然后(then)做指定的操作
// then方法接收2个参数(都是可选的)
// 第一个参数接收的function就是容器中的resolved函数
// 第二个参数接收的function就是容器中的reject函数
p1
    .then(function (data) {
       console.log(data);
    }, function (err) {
        console.log('读取文件失败了' + err);
    })
