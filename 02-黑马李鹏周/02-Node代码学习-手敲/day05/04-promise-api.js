/*
 * @Author: liming
 * @Date: 2021-06-02 23:24:14
 * @LastEditTime: 2021-06-02 23:39:35
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\04-promise-api.js
 */

var fs = require("fs")

// 在ES6中新增了一个API叫Promise
// Promise是一个构造函数。

console.log(1);
// 创建Promise容器
// 第1步：给别人一个承诺 I Promise you
// 在容器里面把你的任务写到里面，接收一个function
// Promise容器一旦创建，就可以执行里面的代码(function里面的代码)
// 但因为是异步的，它也不是立即就能得到结果(注意：承诺本身不是异步的(new一个Promise哪来的异步啊！！！)，承诺里面的任务是异步的)
// 比如读取文件，是需要时间的，经过一段时间后才能确定你是读取成功了还是失败了
new Promise(function () {
    console.log(2);
    fs.readFile('./data/a.txt', 'utf8', function (err, data) {
        if (err) {
            //失败了，承诺容器中的任务失败了
        } else {
            //承诺容器中的任务成功了
            console.log(3);
            console.log(data);
        }
    })
})

console.log(4);

// 1
    
// 2  ——承诺本身不是异步的，所以按顺序执行到console.log(2);再接下来发现一个异步任务readFile函数，这个才是异步的
// 4
// 3 ——承诺里面的异步任务完成才会打印出3
// hello aaa