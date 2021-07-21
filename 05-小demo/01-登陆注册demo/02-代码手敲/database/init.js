const Sequelize = require('sequelize')

// 我先去创建一个数据库
// const sequelize = new Sequelize('数据库名', '账号', '密码', {
const sequelize = new Sequelize('code', 'root', '123456', {
    host: 'localhost', //地址
    dialect: 'mysql', //指定数据库类型，必须指定
    port: '3306' //数据库端口，默认是3306
})

// 连接
sequelize
// 发送连接请求
    .authenticate()
// 成功
    .then(() => {
        console.log('数据库连接成功');
    })
    // 失败
    .catch(err => {
        console.log('连接失败' + '错误信息' + err);
    })
    // 导出 创建模型时需要
module.exports = {Sequelize,sequelize}