/*
 * @Author: liming
 * @Date: 2021-06-02 23:00:01
 * @LastEditTime: 2021-06-02 23:09:10
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\03-回调地狱2.0.js
 */

var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', function (err, data) {
    if (err) {
        // return console.log("读取失败")
        throw err
        //表示抛出异常，这个代码有2个作用：
        //1.阻止程序的执行
        //2.把错误消息打印到控制台
    }
    console.log(data);
    fs.readFile('./data/b.txt', 'utf8', function (err, data) {
        if (err) {
            // return console.log("读取失败")
            throw err
            //表示抛出异常，这个代码有2个作用：
            //1.阻止程序的执行
            //2.把错误消息打印到控制台
        }
        console.log(data);
        fs.readFile('./data/c.txt', 'utf8', function (err, data) {
            if (err) {
                // return console.log("读取失败")
                throw err
                //表示抛出异常，这个代码有2个作用：
                //1.阻止程序的执行
                //2.把错误消息打印到控制台
            }
            console.log(data);
        })
    })
})





// 这样写就可以保证顺序了。