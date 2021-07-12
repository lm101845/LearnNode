/*
 * @Author: liming
 * @Date: 2021-05-14 10:20:44
 * @LastEditTime: 2021-05-18 17:13:14
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\04\crud-express\student.js
 */

// 这个文件不关心业务，就是纯粹的对文件封装至少4个API(增删改查)

/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务(如怎么处理表单数据，怎么给用户发送响应)
 * 
 * 注意：这里才是我们学习Node的精华部分：奥义之所在
 * 封装异步API
 */

var dbPath = './db.json'
var fs = require("fs");

/**
 * 获取所有学生列表
 * callback中的参数
 *      第一个参数是err
 *             成功是null
 *              错误是错误对象
 *      第二个参数是结果
 *              成功是数组
 *              错误是undefined
 * return []
 */

exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        // JSON.parse(data).students
        if (err) {
            return callback(err)
            // 有错误了就不能让它往后面执行了
        }
        callback(null, JSON.parse(data).students)
        // 为什么要传2个参数呢？第一个参数始终是error,要么是eror对象，要么是null
        // 这个代码要多写！！！精华部分！！！
    })
}

/**
 * @description: 根据id获取学生信息对象
 * @param {Number}  id   学生id
 * @param {Function} callback 回调函数
 * @return {*}
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}
/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        // 处理id唯一，不重复
        student.id = students[students.length - 1].id + 1
        // 把用户传递的对象保存到数组中
        students.push(student)
        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })
        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是null
            callback(null)
        })
    })
}

// save({
//     name: 'xxx',
//     age: 18,
// }, function (err) {
//     if (err) {
//         console.log(
//             '保存失败了'
//         );
//     } else {
//         console.log('保存成功了 ');
//     }
// })
/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        // 注意：这里记得把id统一转换为数字类型
        students.id = parseInt(student.id)
        // 你要修改谁，就需要把谁找出来
        // find为ES6中的数组方法
        // 需要接收一个函数作为参数
        // 当某个遍历项符合item.id === student.id条件的时候，find会终止遍历，同时返回遍历项，即item
        var stu = students.find(function (item) {
            return item.id === student.id
        })
        // stu.name = student.name
        // stu.age = student.age
        // 这样写太麻烦，直接循环就好了
        // 遍历拷贝对象
        for (var key in student) {
            stu[key] = student[key]
            // 一循环就都改了
        }

        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                //错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是null
            callback(null)
        })

    })
}

// updateById({
//     id: 1,
//     name: '哈哈哈',
//     age: 18,
//     function(err) {

//     }
// })

/**
 * 删除学生
 */
exports.deleteById = function () {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        //findIndex方法专门用来根据条件查找元素的下标
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })

        // 根据下标从数组中删除对应的学生对象
        students.splice(deleteId, 1)

        var fileData = JSON.stringify({
            students: students
        })
        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是null
            callback(null)
        })

    })
}