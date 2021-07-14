var express = require('express')

// 1.创建app
var app = express()

// 当以/public/开头的时候，去./public/目录中查找对应的资源
// 这种方式更容易辨识，推荐这种方式
app.use('/public/',express.static('./public/'))

// app.use(express.static('./public/'))
// 当省略第一个参数的时候，则可以通过省略/public的方式来访问
// 这样可以简化路径的操作，可以少写一个/public
// 这种方式的好处就是可以省略/public/


// app.use('/a/', express.static('./public/'))
// 这种表示必须是/a/public目录中的资源具体路径
// 你可以将a理解为public的别名

// app.use('/a/b',express.static('./public/'))
// 这样也行

app.get('/', function (req, res) { 
    // res.write('hello')
    // res.write('world')
    // res.end()

    // res.end('hello world')

    // 上面的，以前的东西也是可以用的，只不过比较麻烦，推荐用下面的

    res.send('hello world!')
})

app.get('/login', function (req, res) { 
    // 代码是平行的，不像if...else...,比较的美观
    // res.send('login page')
    res.send(`
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
  <h1>Hello Login</h1>
</body>

</html>
    `)
})

app.listen(3000, function () { 
    console.log('express app is running...');
})