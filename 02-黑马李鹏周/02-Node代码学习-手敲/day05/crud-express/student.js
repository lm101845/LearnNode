/*
 * @Author: liming
 * @Date: 2021-06-02 16:42:58
 * @LastEditTime: 2021-06-02 17:14:48
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\crud-express\student.js
 */

const mongoose = require('mongoose');

//1.连接数据库
mongoose.connect('mongodb://localhost:27017/itcast', {
    //itcast这个数据库不用你自己创建，如果没有的话，它会自动帮你创建的
    //当你插入第一条数据之后会自动创建出来
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        //enum为枚举，只能是0或者1
        default:0
    },
    age: {
        type: Number,
    },
    hobbies:{
        type: String
    }
})

//直接导出模型构造函数
module.exports = mongoose.model('Student', StudentSchema);
