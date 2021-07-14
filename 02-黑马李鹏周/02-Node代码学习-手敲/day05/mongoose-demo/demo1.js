/*
 * @Author: liming
 * @Date: 2021-05-25 15:57:59
 * @LastEditTime: 2021-05-25 16:05:59
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\mongoose-demo\demo1.js
 */

// 代码是官方文档的，链接：https://mongoosejs.com/

const mongoose = require('mongoose');
// 1.加载包

mongoose.connect('mongodb://localhost:27017/test', {
    // 连接monsoose数据库
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 创建一个模型
// 就是在设计数据库
//MongoDB是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
// mongoose这个包就可以让你的设计编写过程变得非常的简单
const Cat = mongoose.model('Cat', {
    name: String
});

// 实例化一个cat
const kitty = new Cat({
    name: 'Zildjian'
});

//持久化保存kitty实例
//持久化保存kitty实例
kitty.save().then(() => console.log('meow'));