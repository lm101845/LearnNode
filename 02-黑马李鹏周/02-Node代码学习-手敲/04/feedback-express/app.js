var express = require('express')
var bodyParser = require('body-parser')
var app = express()


app.use('/public', express.static('./public/'))

// 配置使用art-template模版引擎
// 第一个参数，表示当渲染以.art结尾的文件的时候，使用art-template模版引擎
// express-art-template是专门用来在express中把art-template整合到express中的
// 虽然我们这里不需要加载art-template，但你也必须安装
// 原因就在于express-art-template依赖了art-template
// app.engine('art', require('express-art-template'));
app.engine('html', require('express-art-template'));
// 源代码里第一个参数是art，不好，页面都要改成.art尾，都没有代码高亮了

// express为response响应对象提供了一个方法:render
// render方法默认是不可以使用的，但是如果配置了模版引擎就可以使用了
// res.render('html模版名',{模版数据})
// 第一个参数不能写路径，默认会从项目中的views目录查找该模版文件
// 也就是说express有一个约定：开发人员把所有的视图文件都放到views目录中

//配置body-parser中间件(插件，专门用来解析表单POST请求体)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

app.get('/', function (req, res) { 
    // res.send('/page')
    // res.render('404.art')
    res.render('index.html', {
        comments:comments
    })
    // 文件以.art结尾才能正常显示，因为你前面app.engine第一个参数就是art
    // 当然你第一个参数可以改成html，也行

    // 如果想要修改默认的views目录，则可以
    // app.set('views',render函数的默认路径)
})

app.get('/post', function(req, res) { 
    res.render('post.html')
})

// app.get('/pinglun', function (req, res) {
//     // 因为提交的内容可能比较多，所以使用post其实更合理
//     // console.log(req.query)
//     var comment = req.query
//     comments.dateTime = '2020-12-15 19:16:00'
//     comments.unshift(comment)
//     // res.statusCode = 302
//     // res.setHeader('Location','/')
//     res.redirect('/')
// })

app.post('/post', function (req, res) { 
    console.log('收到表单POST请求了');
    // 之后一直转是因为收到请求，但是没有发出响应
    // 1.获取表单POST请求体数据
    // 2.处理
    // 3.发送响应
    
    // req.query只能拿get请求参数
    // console.log(req.query);
    // res.send('post')

    //post
    // console.log(req.body)
    var comment = req.body
    comments.dateTime = '2020-12-15 19:16:00'
    comments.unshift(comment)
    // res.statusCode = 302
    // res.setHeader('Location','/')

    // res.send
    // res.redirect
    // 这些方法Express会自动结束响应
    res.redirect('/')

})
// 当以POST请求/post路径的时候，执行指定的处理函数
// 这个也说明了同一个路径，可以使用多次
// 这样的话，我们就可以利用不同的请求方法让一个请求路径使用多次


app.listen(3000, function () { 
    console.log('running...');
})