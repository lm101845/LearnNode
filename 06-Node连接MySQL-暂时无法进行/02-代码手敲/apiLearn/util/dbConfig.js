/*
 * @Author: liming
 * @Date: 2021-07-19 23:59:56
 * @LastEditTime: 2021-07-20 00:49:08
 */

//连接我们创建的表
const mysql = require("mysql");
//把我们写的数据库给暴露出去
module.exports = {
  //数据库配置
  config: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    // 数据库名称
    database:"db1",
  },
  //连接数据库：使用mysql数据库连接池的方式进行连接
  // 连接池的好处是在数据很大的时候减少数据查询的时间
  //写一个连接池的对象
  sqlConnect: function (sql, sqlArr, callback) {
      var pool = mysql.createPool(this.config)
      pool.getConnection((err, conn) => {
          console.log('12345');
          if (err) {
              console.log('连接失败');
              return;
          }
          //事件驱动回调
          conn.query(sql, sqlArr.callback)
          
          //释放连接
          conn.release()
      })
  },
};
 