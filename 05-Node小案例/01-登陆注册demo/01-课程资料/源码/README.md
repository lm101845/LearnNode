# node+mysql实现登陆与注册以及token验证



## 1.初始化项目

#### 1.初始化项目

```nginx
npm init -y
```

#### 2.安装 express 框架

```nginx
npm install express
```



## 2.创建表模型以及连接数据库

1. #### 安装 [Sequelize ](https://www.bookstack.cn/read/sequelize-5.x-zh/Readme.md)

```nginx
npm install --save sequelize
```

#### 2.安装对应的数据库驱动程序:

```nginx
npm install --save mysql2
```

#### 3.连接数据库

```javascript
const Sequelize = require('sequelize');
// 第一个参数是 数据库名 第二个是数据库账号 第三个是 数据库 密码
const sequelize = new Sequelize('数据库名', '账号', '密码', {
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
// 导出
module.exports  = {Sequelize,sequelize}
```

#### 4.创建模型

```javascript
// 创建模型 第一个参数是 表名
const User = sequelize.define('user', {
    // 一个对象就是一个字段
    // 用户名
    username: {
        // 约束字段的类型
        type: Sequelize.STRING,
        // 是否允许为空 默认是 true
        allowNull: false,
        unique: true
    },
    // 密码
    password: {
        type: Sequelize.STRING,
        // 是否允许为空 默认是 true
        allowNull:false
    }
})
```

#### 5.同步模型

```javascript
// 同步模型
User.sync().then(() => {
    console.log('模型同步成功');
})
```

## 3.创建路由

#### 1.创建一个主路由 

```javascript
const express = require('express')
// 创建路由
const main = express.Router()
// 为主路由匹配地址
app.use('/api/private',main)
```

## 4.实现注册功能

#### 1.安装 body-parser 实现 接收 post 数据

```nginx
npm install body-parser
```

#### 2.配置

```javascript
// 设置 接收post请求数据 req.body 
app.use(bodyParser.urlencoded({ extended: false }))
```

#### 具体代码

```javascript
// 导入模型
const { User } = require('../../database/model/User')
module.exports = async (req, res) => {
    // 接收传递过来的参数
    const { username, password } = req.body
    // 根据用户名查询用户是否存在
    const model = await User.findOne({ where: { username } })
    // 判断用户名是否存在 如果存在 直接返回
    if (model) {
        return res.status(400).send({
            data: null,
            meta: {
                msg: "用户名已存在！",
                status:400
            }
        })
    }
    // 创建用户
    const CreateUser = await User.create({ username, password })
    res.status(201).send({
        data: CreateUser,
        meta: {
            msg: "创建成功",
            status:201
        }
    })
}
```

## 5.实现登陆功能

#### 1.安装  jsonwebtoken 用于生成 token 和 解密 token

```nginx
npm install jsonwebtoken
```

#### 具体代码

```javascript
const { User } = require('../../database/model/User')
// 导入 token 模块
const jwt = require('jsonwebtoken')
module.exports = async (req, res) => {
    const { username, password } = req.body
    // 根据用户名查询用户是否存在
    const model = await User.findOne({ where: { username } })
    if (!model) {
        return res.status(400).send({
            data: null,
            meta: {
                msg: "用户不存在！",
                status:400
            }
        })
    }
    // 判断账号密码是否正常
    if (username !== model.username || password !== model.password) {
        res.status(400).send({
            data: null,
            meta: {
                msg: "账号或者密码错误！",
                status:400
            }
        })
        return
    }
    // 登陆成功生成 token 返回给客户端 第一个参数 是 组 ，第二个是 私钥
    const token = jwt.sign({username},'xiaoke')
    res.status(200).send({
        data: {
            username: model.username,
            token
        },
        meta: {
            msg: "登陆成功！",
            status:200
        }
    })
}
```

## 6.实现 token 验证

#### 步骤：

##### 1.拦截主路由下的所有请求

##### 2.判断是否是登陆接口 或 是 注册接口 如果是 直接放行 返回

##### 3.判断客户端 是否有传递token 和 解密 token 如果 没有传递，以及解密 失败，直接返回 错误信息

##### 4.如果 token正常直接 放行

#### 具体代码

```javascript
//  拦截 /api 下的所有请求 验证 token
app.use('/api', (req, res, next) => {
    // 判断是否是 注册接口 或 登陆接口 如果是 直接放行
    if (req.url == '/register' || req.url == '/login') {
        next()
        return
    }
    // 接收客户端传递过来的 token
    const token = String(req.headers.authorization)
    // 根据 客户端传递过来的 token 进行 解密，解密成功返回一个对象，解密失败直接返回 null
    // 第一个参数是 token 第二个是 私钥 自己定义 
    const username = jwt.decode(token, 'xiaoke')
    // 判断是否传递 token 和 判断 token 是否 正确
    if (token == 'undefined' || username == null) {
        res.status(400).send({
            data: null,
            meta: {
                msg: '无效token',
                status: 400,
            }
        })
        return
    }
    // token 正确 放行
    next()
})

```

## 7.使用CORS 实现跨域请求

> 直接复制就可以了

#### 具体代码

```javascript
// 设置跨域和相应数据格式  
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
})
```