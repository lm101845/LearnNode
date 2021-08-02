const { Sequelize, sequelize } = require('../init')


const User =  sequelize.define('users', {
    username: {
        // 定义类型 字符串
        type: Sequelize.STRING,
        // 是否允许为空 默认是 true
        allowNull: false,
        // 约束不能为空
        unique: true
    },
    password: {
        // 定义类型 字符串
        type: Sequelize.STRING,
        // 是否允许为空 默认是 true
        allowNull: false,
        // 约束不能为空
        unique: true
    },
})

// 同步模型
User.sync().then(() => {
    console.log('模型同步成功');
})
// 导出
module.exports =  {User}