const {
    Sequelize,
    sequelize
} = require('../init')

// 创建模型，第一个参数是表名
const User = sequelize.define('users', {
    // 一个对象就是一个字段
    // 用户名
    username: {
        // 约束字段的类型:字符串
        type: Sequelize.STRING,
        // 是否允许为空，默认是true
        allowNull: false,
        // 约束不能为空
        unique:true
    },
    // 密码
    password: {
        type: Sequelize.STRING,
        // 是否允许为空，默认是true
        allowNull: false,
         // 约束不能为空
         unique: true
    }
})

// 同步模型
User.sync().then(() => {
    console.log('模型同步成功');
})

// 导出
module.exports = {User}