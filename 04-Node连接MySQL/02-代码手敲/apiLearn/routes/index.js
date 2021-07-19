/*
 * @Author: liming
 * @Date: 2021-07-19 23:27:25
 * @LastEditTime: 2021-07-20 00:48:12
 * @FilePath: \apiLearn\routes\index.js
 */
var express = require('express');
var router = express.Router();
var dbConfig = require('../util/dbConfig')
/* GET home page. */
router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
    var sql = 'SELECT * FROM stu';
    // cate是数据表
    var sqlArr = []
    //数据数组没有，给它一个空
    var callback = (err, data) => {
        if (err) {
            console.log('链接出错了');
        } else {
            //返回数据
            res.send({
                'list':data
            })
        }
    }

    dbConfig.sqlConnect(sql,sqlArr,callback)

});

module.exports = router;
