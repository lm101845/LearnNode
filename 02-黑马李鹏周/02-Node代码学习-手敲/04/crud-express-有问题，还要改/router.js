/**
 * router.js路由模块
 * 职责：处理路由
 * 根据不同的请求方法 + 请求路径设置不同的请求处理函数
 * 模块职责要单一，不要乱写
 *      ——app就是app,路由就是路由
 * 我们划分模块的目的就是为了增强项目代码的可维护性，提升开发效率
 */
// var app = require("./app");
var fs = require("fs");
var Student = require('./student')
// 在routers里面使用了fs这个模块，所以要在这里进行引入

//  

// 这样写不好，还要先node router这里面的代码才会生效
// 写法1：这种写法不太好，还要自己封装函数
// module.exports = function (app) {
//   app.get("/students", function (req, res) {
//     fs.readFile("./db.json", "utf8", function (err, data) {
//       if (err) {
//         return res.status(500).send("Server error.");
//       }
//       //   console.log(data);
//       var students = JSON.parse(data).students;
//       res.render("index.html", {
//         fruits: ["苹果", "香蕉", "橘子"],
//         students: students,
//       });
//     });
//   });

//   app.get("/students", function (req, res) {});

//   app.get("/students/new", function (req, res) {});

//   app.get("/students/new", function (req, res) {});

//   app.get("/students/new", function (req, res) {});

//   app.get("/students/new", function (req, res) {});

//   app.get("/students/new", function (req, res) {});
// };

// 写法2：express提供了一种更好的方式
// 专门用来包装路由的
var express = require("express");
// 这里调用express的目的是为了使用他的router方法

// 2.1创建一个路由容器
var router = express.Router();

// 2.2把路由都挂载到router路由容器中
router.get("/students", function (req, res) {
    // 写法1：
    // fs.readFile("./db.json", "utf8", function (err, data) {
    //     if (err) {
    //         return res.status(500).send("Server error.");
    //     }
    //     var students = JSON.parse(data).students;
    //     res.render("index.html", {
    //         fruits: ["苹果", "香蕉", "橘子"],
    //         students: students,
    //     });
    // });

    // 写法2：
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send("Server error.");
        }
        res.render("index.html", {
            fruits: ["苹果", "香蕉", "橘子"],
            students: students,
        });
    })
});

router.get("/students/new", function (req, res) {
    //   res.send("new new new ");
    res.render("new.html");
    // 它默认从views里面去找的
});

router.post("/students/new", function (req, res) {
    // 1.获取表单数据
    // 2.处理
    // ——将数据保存到db.json文件中，用以持久化数据的存储
    // 3.发送响应
    //   ——先读取出来，转成对象(json转对象)
    // 然后把对象转换为字符串
    // 然后把字符串再次写入文件
    console.log(req.body);
    var student = req.body
    Student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
});

// 渲染编辑学生页面
router.get("/students/edit", function (req, res) {
    // 1.在客户端的列表页中处理链接问题(需要有id参数)
    // 2.获取要编辑的学生id
    // 3.渲染编辑页面
        // 根据id把学生信息查出来
        // 使用模版引擎渲染页面
    // console.log(req.query.id);

    // res.render('edit.html', {
    //     student:
    // })
    Student.findById(parseInt(req.query.id), function (err, student) {
        // 通过url拿到的id是字符串，要把它给转成数字更加合适
        if (err) {
             return res.status(500).send('Server error')
        }
        // console.log(student);
        res.render('edit.html', {
            student:student
        })
    })
});

// 处理编辑学生
router.post("/students/edit", function (req, res) {
    // 1.获取表单数据
        // req.body
    // 2.更新
    //  Student.update()
    // 3.发送响应
    Student.updateById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
});

// 处理删除学生
router.get("/students/delete", function (req, res) {
    // 1.获取要删除的id
    // 2.根据id执行删除操作
    // 3.根据操作结果发送响应数据
    // console.log(req.query.id);
    Student.deleteById(req.query.id, function (err) {
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
});



// 2.3把router导出
// exports.router = router;
module.exports = router;