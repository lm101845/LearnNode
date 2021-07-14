/*
 * @Author: liming
 * @Date: 2021-06-03 00:16:11
 * @LastEditTime: 2021-06-03 00:19:49
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\05-封装PromiseAPI.js
 */

var fs = require('fs')

// var p1 = new Promise(function (resolve, reject) {
//     fs.readFile('./data/a.txt', 'utf8', function (err, data) {
//         if (err) {
//             reject(err)

//         } else {

//             resolve(data)
//         }
//     })
// })

function pReadFile(filePath,) {
 return  new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err)

            } else {

                resolve(data)
            }
        })
    })
}

pReadFile('./data/a.txt')
    .then(function (data) {
        console.log(data);
        return pReadFile('./data/b.txt')
    })
    .then(function (data) {
        console.log(data);
        return pReadFile('./data/c.txt')
    })
    .then(function (data) {
        console.log(data);
    })