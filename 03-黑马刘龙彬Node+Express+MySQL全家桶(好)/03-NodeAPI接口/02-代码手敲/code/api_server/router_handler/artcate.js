/*
 * @Author: liming
 * @Date: 2021-08-27 15:39:55
 * @LastEditTime: 2021-08-27 16:07:19
 * @FilePath: \03-NodeAPI接口\02-代码手敲\code\api_server\router_handler\artcate.js
 */

// 这是路由处理函数模块

//导入数据库操作模块
const db = require('../db/index')
// 这是文章分类列表的处理函数
exports.getArtCates = (req, res) => {
  //定义查询分类列表数据的SQL语句
  const sqlStr = `select * from ev_article_cate where is_delete = 0 order by id asc`;
  // is_delete=0表示文章没有被删除
  // order by id asc表示根据id从小到大进行排序
  // 调用db.query()执行SQL语句
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类数据成功!',
            data:results
        })
    })
  // res.send('OK')
}