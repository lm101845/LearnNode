/*
 * @Author: liming
 * @Date: 2021-08-12 02:41:05
 * @LastEditTime: 2021-08-12 16:04:54
 * @FilePath: \02-黑马李鹏周\02-Node代码学习-手敲\day06\blog\models\user.js
 */

// 使用mongoose
var mongoose = require('mongoose')

//连接数据库——只用连接一次
mongoose.connect('mongodb://localhost/test', {useMongoClient: true})
var Schema = mongoose.Schema

var userSchema = new Schema({
  // 邮箱、昵称、密码(可以看见的)
  // 用户创建时间、修改时间、头像、QQ号等(看不见的)
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  create_time: {
    type: Date,
    // default: Date.now()
    default: Date.now,
    // 后面不能写小括号，否则就立刻调用了，时间戳它就写死了
    // 当你去new Model的时候，它发现这里有个方法，会自己调用
  },
  last_modified_time: {
    type: Date,
    default: Date.now,
  },
  avator: {
    type: String,
    // default: "../public/img/avatar-max-img.png",
    default: "/public/img/avatar-max-img.png",
  },
  bio: {
    type: String,
    default: "",
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1,
    // -1表示保密
  },
  birthday: {
    type: Date,
  },
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0,
  },
});

module.exports =mongoose.model('User',userSchema)
