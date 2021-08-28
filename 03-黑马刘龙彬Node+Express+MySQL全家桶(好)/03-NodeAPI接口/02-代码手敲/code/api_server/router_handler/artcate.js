/*
 * @Author: liming
 * @Date: 2021-08-27 15:39:55
 * @LastEditTime: 2021-08-29 00:25:20
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\router_handler\artcate.js
 */

// 这是路由处理函数模块

//导入数据库操作模块
const db = require('../db/index')
// 获取文章分类列表的处理函数
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

//新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
    // 1.定义查重的SQL语句
    const sqlStr = `select * from ev_article_cate where name = ? or alias = ? `;
    // 2.执行查重的SQL语句
    db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
        //3.判断是否执行SQL语句失败
        if (err) return res.cc(err)
        //4.1 判断数据的length
        if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
        //4.2 length等于1的三种情况
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc("分类名称name与分类别名alias被占用，请更换后重试！");
        if(results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称name被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc("分类别名alias被占用，请更换后重试！");

        //分类名称和分类别名都可用，执行添加的动作
        // 定义插入文章分类的SQL语句
        const sqlStr = `insert into ev_article_cate set ?`
        //执行插入文章分类的SQL语句
        db.query(sqlStr, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) res.cc('新增文章分类失败!')
            res.cc('新增文章分类成功!',0)
        })
    })
//   res.send("ok");
};