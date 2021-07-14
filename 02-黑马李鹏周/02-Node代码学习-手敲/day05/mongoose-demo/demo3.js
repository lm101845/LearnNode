/*
 * @Author: liming
 * @Date: 2021-06-02 13:05:39
 * @LastEditTime: 2021-06-02 16:38:18
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\mongoose-demo\demo3.js
 */

const mongoose = require('mongoose');

//1.连接数据库
mongoose.connect('mongodb://localhost:27017/itcast', {
    //itcast这个数据库不用你自己创建，如果没有的话，它会自动帮你创建的
    //当你插入第一条数据之后会自动创建出来
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//2.设计集合结构(表结构)
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
const userSchema = new mongoose.Schema({
    // title: String,
    // author: String,
    // body: String,
    // comments: [{
    //     body: String,
    //     date: Date
    // }],
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    // hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
    // },
    username: {
        type: String,
        required: true // 必须有
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

// 3. 将文档结构发布为模型
//    mongoose.model 方法就是用来将一个架构发布为 model
//    第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//                 mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//                 例如这里的 User 最终会变为 users 集合名称
//    第二个参数：架构 Schema
//   
//    返回值：模型构造函数
const User = mongoose.model('User', userSchema);

// 4. 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据为所欲为了（增删改查）
// **********************

// #region /新增数据
// **********************
// const admin = new User({
//   // 这个只是被new出来了，还没有被持久化存储起来
//   username: 'lisi',
//   password: '123456',
//   email: 'admin@admin.com'
// })

// admin.save(function (err, ret) {
//     // admin.save就可以持久化数据到数据库里面了
//   if (err) {
//     console.log('保存失败')
//   } else {
//     console.log('保存成功')
//     console.log(ret)
//   }
// })



// **********************
// #region /查询数据
// **********************
//这个是查询所有
// User.find(function (err, ret) {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(ret)
//   }
// })


// User.find({
//   username: 'zs'
// }, function (err, ret) {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(ret)
//   }
// })

// User.findOne({
//     //findOne表示只找匹配的第一个
//     username: 'lisi ',
//     password: '123456789'
//     //表示查询用户名是lisi，并且密码是123456789的第一个人
// }, function (err, ret) {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(ret)
//   }
// })




// **********************
// #region /删除数据
// **********************
// User.remove({
//   username: 'zs'
// }, function (err, ret) {
//   if (err) {
//     console.log('删除失败')
//   } else {
//     console.log( '删除成功')
//     console.log(ret)
//   }
// })



// **********************
// #region /更新数据
// **********************
User.findByIdAndUpdate('60b71e2c4bc9313d40daf9a8', {
  password: '123'
}, function (err, ret) {
  if (err) {
    console.log('更新失败')
  } else {
    console.log('更新成功')
  }
})
