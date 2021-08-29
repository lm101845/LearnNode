# 数据库相关

* 网上查的数据库库相关资料：
  * [这3个md5库，哪个好？如何进行比较？性能吧。](https://segmentfault.com/q/1010000022491854)
* [mongoose](https://www.npmjs.com/package/mongoose)
  * 将原生Mongo数据库进行封装，更加方便使用。
* [blueimp-md5](https://www.npmjs.com/package/blueimp-md5)
  * 用于将密码进行MD5加密。
* [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
  * 用于将密码进行加密。
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  * 用于生成浏览器的Token值。

# Web服务器相关

* [express](https://www.npmjs.com/package/express)
  * 一个Node环境下的Web服务器。

# Node中间件

* 网上查的中间件相关资料：
  * [@hapi/joi 报错 “message“: “Cannot mix different versions of joi schemas“](https://blog.csdn.net/weixin_45996607/article/details/119135664)

## 跨域相关

​	

* [cors](https://www.npmjs.com/package/cors)
  * 解决浏览器跨域问题。

## 表单验证相关

* [joi](https://www.npmjs.com/package/joi)
  * [官网](https://joi.dev/api/?v=17.4.2)
  * 定义数据验证规则。

* [@escook/express-joi](https://www.npmjs.com/package/@escook/express-joi)
  * 国人(我看的这个视频的作者**刘龙彬老师**)根据`joi`写的中间件。

  * 注意：`@hapi/joi`已被弃用，现在改用`joi`了。

## 解析Token相关

* [express-jwt](https://www.npmjs.com/package/express-jwt)

## 文件上传有关

* [multer](https://www.npmjs.com/package/multer)

* [Express文件表单解析中间件 Multer简介](https://segmentfault.com/a/1190000017521702)

## 静态资源有关

* express自带的`express.static`

* [serve-static](https://www.npmjs.com/package/serve-static)

# JS书写风格指南

* [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)

# JS语法转换——常用

* [@babel/core](https://www.npmjs.com/package/@babel/core)
  * [官网](https://babel.dev/)
* [core-js](https://www.npmjs.com/package/core-js)
  * [NPM core-js 的作者为什么还没找到工作？](https://www.zhihu.com/question/338950875)

# CSS语法转换

* [postcss](https://www.npmjs.com/package/postcss)

# history路由

* [connect-history-api-fallback](https://www.npmjs.com/package/connect-history-api-fallback)
* Fallback to index.html for applications that are using the HTML 5 history API
* 这是一个中间件，用于解决history模式下刷新页面404找不到的问题。
* history模式虽然没有＃看上去好看，但是它有一个问题，刷新后页面不见了，而哈希模式＃后面的部分服务器不管，所以没有这个问题。
* 解决404的问题得靠后端工程师，应用部署上线时需要后端人员支持。
* 还有一个野路子可以用Nginx解决，此处不表。

# 编码格式转换(对象<==>urlencoded编码格式)

* [query-string](https://www.npmjs.com/package/query-string)
* 