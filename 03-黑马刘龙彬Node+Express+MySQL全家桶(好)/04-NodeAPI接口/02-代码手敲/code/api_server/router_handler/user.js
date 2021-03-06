/*
 * @Author: liming
 * @Date: 2021-08-12 20:07:44
 * @LastEditTime: 2021-08-23 10:15:36
 * @FilePath: \03-黑马刘龙彬Node+Express+MySQL全家桶(好)\03-NodeAPI接口\02-代码手敲\code\api_server\router_handler\user.js
 */

// 导入数据库操作模块
const db = require("../db/index");

// 导入bcrypt.js这个密码加密包
const bcrypt = require("bcryptjs");

// 导入生成浏览器端Token的包——还要在根目录里新建一个config.js配置文件
const jwt=require("jsonwebtoken")

//导入全局的配置文件(导入密钥)
const config = require('../config')

//注册新用户的处理函数
exports.regUser = (req, res) => {
  // 用户路由模块应该只处理路由的对应关系，路由处理函数不应该写在这里，应该单独写，更加符合模块化规范
  // 路由处理函数我们应该将它们统一抽离到router-handler文件夹中，将来用到了，我们引入来使用即可

  //获取客户端提交到服务器的用户信息
  // 写法1：
  const userinfo = req.body;
  //写法2：我来一个解构赋值——优化代码——但是发现不行，报错了，没时间弄了，还是用写法1吧，这是为什么啊？？？
  // 是不是因为req.body它既不是对象，也不是数组啊
  // const { username,password } = req.body
  // 注意：在PostMan中，要在Body选项中选择x-www-form-urlencoded,然后输入请求体再进行测试
  //   console.log(userinfo);

  //写法1：使用if对表单中的数据进行合法性的校验
  //   if (!userinfo.username || !userinfo.password) {
  //     // if (!username || !password) {
  //     //数据库设计的时候，必须有用户名和密码，如果你没写就发送POST请求，服务器就告诉客户端用户名或密码不合法
  //     return res.send({ status: 1, message: "用户名或密码不合法!" });
  //   }

  // 写法2：使用中间件(看schema模块和router模块)

  //定义SQL语句，查询用户名是否被占用
  const sqlStr = "select * from ev_users where username = ?";

  db.query(sqlStr, userinfo.username, (err, results) => {
    // db.query(sqlStr, username, (err, results) => {
    // 执行SQL语句失败
    if (err) {
      // 写法1：不好
      //   return res.send({ status: 1, message: err.message });

      // 写法2：使用中间件写，十分方便
      return res.cc(err);
    }
    //执行SQL语句成功，此时判断用户名是否被占用
    if (results.length > 0) {
      // 查询时results是作为一个数组显示的，所以有length属性
      // 说明你在注册账户，输入用户名的时候，数据库进行用户名匹配，在数据库里至少查到一个你输入的用户名(表明你想要注册的用户名已经有人注册了)
      //   return res.send({ status: 1, message: "用户名被占用，请更换其他用户名" });
      return res.cc("用户名被占用，请更换其他用户名");
    }
    // console.log(userinfo);
    // console.log(req.body);
    //用户名可以使用以后，接下来要对用户提交上来的密码进行加密
    //调用bcrypt.hashSync()对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    // password = bcrypt.hashSync(password, 10)
    // 通过第二个参数可以提高密码的安全性
    // 将明文密码经过加密之后，将加密后的值再交给password属性
    // console.log(userinfo);
    // console.log(req.body);

    //定义插入新用户的SQL语句
    const sqlStr2 = "insert into ev_users set ? ";
    //调用db.query()执行SQL语句
    db.query(
      sqlStr2,
      { username: userinfo.username, password: userinfo.password },
      (err, results) => {
        //   先判断SQL语句是否执行成功
        // if (err) return res.send({ status: 1, message: err.message });
        if (err) return res.cc(err);
        //判断影响行数是否为1(不唯一那也是执行失败了，只不过不是SQL语句层面上的执行失败)
        // if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试' })
        if (results.affectedRows !== 1)
          return res.cc("注册用户失败，请稍后再试");

        //注册用户成功
        // res.send({status:0,message:'注册成功'})
        res.cc("注册成功", 0);
        // 这次是注册成功的情况，所以我们一定要指定状态的值为0！！！！
      }
    );
    //因为userinfo里面不只有用户名和密码(用户可能还填了昵称、邮箱等，所以我们不能直接使用userinfo)
  });
};

// 登陆的处理函数
exports.login = (req, res) => {
  // 接收表单的数据
    const userinfo = req.body;
  // 执行SQL语句
     const sqlStr = "select * from ev_users where username = ?";
  // 执行SQL语句，根据用户名查询用户的信息
  db.query(sqlStr, userinfo.username, (err, results) => {
    // 执行SQL语句失败
    if (err) return res.cc(err);
    // 执行SQL语句成功,但是获取到的数据条数可能不等于1，说明没有查到登陆信息，也是登陆失败
    if (results.length !== 1) return res.cc("登陆失败");
    // 判断密码是否正确——调用bcrypt提供的compareSync进行密码的对比
    // 无法直接对比，因为你的密码通过bcrypt进行加密了，你服务器的密码不是你原来的密码了
    // bcrypt.compareSync(用户提交的密码，数据库的密码)——参数位置不要写错了
    // console.log(results);
    // console.log(results[0]);
    // console.log(results[0].id);
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    // results是一个数组，索引为0的就是密码
    if (!compareResult) return res.cc("登陆失败");

    // 在【服务器端】生成Token字符串——剔除用户头像，密码这2个敏感信息(使用ES6语法)
      const user = { ...results[0], password: '', user_pic: '' }
      
    //   对用户的信息进行加密，生成一个Token字符串
    //   const tokenStr = jwt.sign(需要加密的用户对象,密钥名,配置对象(指定Token有效期))
      const tokenStr = jwt.sign(user, config.jwtSecretKey, {
        expiresIn: config.expiresIn,
      });
    //   console.log(tokenStr);
    //   console.log(user);
    // res.send("OK");
      
    //   调用res.send()方法将服务器生成的Token响应给客户端
      res.send({
        status: 0,
        message: "登陆成功",
        token: "Bearer " + tokenStr,
        //   为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
        //   我们在这里的token值没有前缀，我们就在服务器给token值进行一下拼接，给它拼接一下，以此方便客户端的使用
      });
  });
};
