/*
 * @Author: liming
 * @Date: 2021-06-02 13:05:39
 * @LastEditTime: 2021-08-12 04:18:14
 * @FilePath: \02-黑马李鹏周\02-Node代码学习-手敲\day05\mongoose-demo\demo3干净代码.js
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
