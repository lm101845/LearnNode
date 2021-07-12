// app application 应用程序
// 把当前模块所有的依赖项都声明在文件模块最上面，这是一个好的习惯
// 不要用的时候再声明，这样比较乱，集中写在一起比较好
// 为了让目录结构保持统一清晰，所以我们约定把所有的HTML文件都放到views(视图)目录中

// 我们为了方便的统一处理这些静态资源，所以我们约定把所有的静态资源都存放在public目录中
// 哪些资源能被用户访问，哪些资源不能被用户访问，我现在可以通过代码来进行非常灵活的控制
// Apache服务器则很难做到，Apache服务器里面的东西都是公共开放的，想访问谁就访问谁
// 而真实的服务器是不会那么干的

//  /表示index.html
//  public表示整个public目录中的资源都允许被访问。

// 前后端融会贯通了之后，什么都是你说了算，你就可以为所欲为了。
var http = require('http')
var fs = require('fs')

var url = require('url')
// 引入pathname模块
// 但是下面我们还有个pathname变量，这样名字会重复

var template = require('art-template')
// 引入remplate模版引擎
// 完整写法：
// var server = http.createServer()
// server.on('request', function (req, res) {

// }
// server.listen(3004, function () { 
//     console.log('running...');
// })

// 简写方式：不需要单独写一个变量server了
// 这样写更加方便

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错2！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错3！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错4！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错5！',
    dateTime: '2015-10-16'
  }
]

// /pinglun?name=大家分开了思考&message=圣诞节风口浪尖的考虑
// 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容，
// 所以你不可能通过判断完整的pathname路径来处理这个请求。

// 结论：对于我们来讲，其实只需要判定，如果你的请求路径是/pinglun的时候，
// 那我就认为你提交表单的请求过来了。
http
  .createServer(function (req, res) { 
    // 使用pathname.parse方法将路径解析为一个方便操作的对象，
    // 第二个参数为true表示直接将查询字符串转为一个对象(通过query属性来访问)
    var parseObj = url.parse(req.url,true)
    // res.end('hello')

    // 单独获取不包含查询字符串的路径部分(改路径不包含?之后的内容)
    var pathname = parseObj.pathname;

    // var pathname = req.pathname;
    // 有了parseObj和pathname，这个时候就不需要这个语句了

    if (pathname === '/') {
      // 这个时候就不要再判定url了，因为判定url满足不了我们的需求了
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found')
        }
        var htmlStr = template.render(data.toString(), {
          comments:comments
        })
        res.end(htmlStr)
        // data既可以接收二进制，又可以接收字符串
        // 那什么情况下把data转成二进制，什么情况下又不用转呢？
        // 当你需要操作字符串(比如模版引擎渲染)的时候，你才需要去转它
        // 我们这里不操作字符串，所以不用将data转成字符串
      })
    }else if (pathname === '/post') { 
          fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found')
        }
        res.end(data)
      })

    }else if (pathname.indexOf('/public/') === 0) {
      // public/css/main.css
      // public/js/main.js
      // public/lib/jquery.js
      // 统一处理：
      //     如果请求路径是以/public/开头的，则我认为你要获取public中的某个资源
      //     所以我们就直接可以把请求路径文件路径来直接进行读取
      // console.log(url);
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found')
        }
        res.end(data)
      })
      // .表示localhost:3000,不能少了
    } else if (pathname === '/pinglun') { 
      // 注意：这个时候无论/pinglun?xxx之后是什么，我都不用担心了，
      // 因为我的pathname是不包含?之后的那个路径的
      // console.log('收到表单请求了', parseObj.query);

      // res.end(JSON.stringify(parseObj.query))
      // 注意：一次请求对应一次响应，响应结束这次请求也就结束了
      // 虽然代码继续往后执行，但是你再发送请求也纠结不管用了
      // 要把这个res.end给注释掉，不然下面的res.end()不管用了

      // 我们已经使用url模块的parse方法把请求路径中的查询字符串给解析成一个对象了
      // 所以接下来要做的就是：
      //    1.获取表达提交的数据    parseObj.query
      //    2.生成日期到数据对象中，然后存储到数组中
      //    3.让用户重定向跳转到首页  /
      //      当用户重新请求  / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也变了
      var comment = parseObj.query
      comment.dateTime = '2017-11-02 17:30:20'
      comments.unshift(comment)
      // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以重新看到最新的留言内容了

      // 这个时候让它重新回到首页，要用到服务器重定向这个概念(3开头的状态码都是重定向的)
      // 如果通过服务器让客户端重定向?
      //   1.状态码设置为302:临时重定向(301为永久重定向)
      //        statusMessage
      //   2.在响应头中通过Location告诉客户端往哪儿重定向
      //        setHeader(用于写响应头的内容的)
      // 如果客户端发现收到服务器的响应的状态码是302,就会自动去响应头中找Location
      // 然后对该地址发起新的请求
      // 所以你就能看到客户端自动跳转了，一句代码都不用写
      res.statusCode = 302
      res.setHeader('Location', '/')
      // 直接写个/就可以了，不用写127.0.0.1:3000/的，浏览器会自动补齐的
      res.end()
    }else { 
      // 其他的都处理成404，找不到页面
      fs.readFile('./views/404.html', function (err, data) { 
        if (err) { 
          return res.end('404 Not Found')
          // 万一404.html文件都没有，就发送一句话404 Not Found
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () { 
    console.log('running...');
  })

// 1.   /  index.html
// 2.   开放public目录中的静态资源
//      当请求/public/xxx的时候，读取响应public目录中的具体资源
// 3.   /post post.html
// 4.   /pinglun
//       4.1接收表单提交数据
//       4.2存储表单提交的数据
//       4.3让表单重定向到/
//          statusCode
//          setHeader

// 明天：模块系统
//Express（第三方Web开发框架）
//这两做的事儿，在框架里面就是一个API的事儿
// 使用框架的目的就是让我们更加专注于业务，而不是底层细节

