/*
 * @Author: liming
 * @Date: 2021-08-27 15:39:55
 * @LastEditTime: 2021-08-29 07:13:00
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

//删除文章分类的处理函数——我们执行的是【标记删除】并没有真正的删除
exports.deleteCateById = (req, res) => {
    // 定义标记删除的SQL语句
    const sqlStr = `update ev_article_cate set is_delete = 1 where id = ?`
    //调用db.query()执行的SQL语句
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("删除文章分类失败")
        res.cc('删除文章分类成功!',0)
    })
    // 我们在路由里面通过冒号的形式动态的匹配到了路由的值，我们可以通过params直接点出来id的值
    // res.send('OK')
}

//根据id获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
    // 定义根据id获取文章分类数据的SQL语句
    const sqlStr = `select * from ev_article_cate where id = ?`
    //调用db.query()执行
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("获取文章分类数据失败！")
        res.send({
            status: 0,
            message: '获取文章分类数据成功!',
            data:results[0]
        })
    })
}

//根据id更新文章分类的处理函数
exports.updateCateById = (req, res) => {
    // 定义查重的SQL语句
    // 先根据id把当前需要更新的数据给排除掉，接下来再根据剩余的所有数据中根据name和alias进行查重的操作
    const sqlStr = `select * from ev_article_cate where id <> ? and (name = ? or alias = ?)`
    // 调用db.query()执行查重的的SQL语句
    db.query(
      sqlStr,
      [req.body.id, req.body.name, req.body.alias],
      (err, results) => {
        //执行SQL语句失败
        if (err) return res.cc(err);
        // 如果没有失败，则根据以下4种情况提醒客户端，到底是名称被占用了还是别名被占用了还是名称和别名都被占用了
        if (results.length === 2)
          return res.cc("分类名称与别名均被占用，请请更换后重试！");
        if (
          results.length === 1 &&
          results[0].name === req.body.name &&
          results[0].alias === req.body.alias
        )
          return res.cc("分类名称name与别名alias均被占用，请请更换后重试！");
        if (results.length === 1 && results[0].name === req.body.name)
          return res.cc("分类名称name被占用，请请更换后重试！");
        if (results.length === 1 && results[0].alias === req.body.alias)
          return res.cc("分类别名alias被占用，请请更换后重试！");
        //名称和别名都可用，可以执行更新的操作
        // res.send("OK");
        
          
          //定义更新文章分类的SQL语句
          const sqlStr = `update ev_article_cate set ? where id = ?`;
         // 执行更新文章分类的SQL语句  
          db.query(sqlStr, [req.body, req.body.id], (err, results) => {
              if (err) return res.cc(err)
              if (results.affectedRows !== 1) return res.cc("更新文章分类失败!")
              res.cc('更新文章分类成功!',0)
          })
      }
    );
};