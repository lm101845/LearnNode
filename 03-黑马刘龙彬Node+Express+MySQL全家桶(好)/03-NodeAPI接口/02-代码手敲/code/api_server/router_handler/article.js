/*
 * @Author: liming
 * @Date: 2021-08-29 08:16:38
 * @LastEditTime: 2021-08-29 10:05:54
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\router_handler\article.js
 */

//文章的处理函数模块
const path = require('path');
// 导入db模块
const db = require('../db/index')
// 发布文章的处理函数
exports.addArticle = (req, res) => {
//   console.log(req.body);
//   console.log('==================');
//   console.log(req.file);
//   console.log(req.file.fieldname);

  // 手动判断是否上传了文章封面
  // 要求filename是cover_img,方便我们对数据进行后续的处理
    if (!req.file || req.file.fieldname !== "cover_img") return res.cc("文章封面是必选参数！");
    
    // 证明数据都是合法的，可以进行后续业务逻辑的处理
    // 处理文章的信息对象
    const articleInfo = {
        //req.body里包含有：标题、内容、发布状态、所述分类的id
        ...req.body,
        //文章封面的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        //文章的发布时间
        pub_date: new Date(),
        //文章作者id
        author_id:req.user.id
    }
    // console.log(articleInfo);

    const sqlStr = `insert into ev_articles set ?`;
    db.query(sqlStr, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布新文章失败！！')
        res.cc('发布文章成功!',0)
    });
}