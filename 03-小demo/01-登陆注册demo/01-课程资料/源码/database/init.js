const Sequelize = require('sequelize')

const sequelize = new Sequelize('code', 'root', '123456', {
    host: 'localhost', // => 地址
    dialect: 'mysql', // => 指定数据库类型 必须指定
    port:'3306' // => 数据库端口 默认是 3306
})
// 连接
sequelize
    // 发送连接请求
    .authenticate()
    // 成功
  .then(() => {
    console.log('数据库连接成功！');
  })
    // 失败
  .catch(err => {
    console.error('连接失败！'+ '错误信息：' + err);
  });

// 导出这两个 创建模型 需要
module.exports = {Sequelize,sequelize}