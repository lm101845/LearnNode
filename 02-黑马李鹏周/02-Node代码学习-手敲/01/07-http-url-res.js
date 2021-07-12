var http = require('http')

// 1.创建server
var server = http.createServer()

// 2.监听request请求事件，设置请求处理函数
// 这个就跟大家写onclick一样
server.on('request', function (req, res) { 
	// 因为是形参，所以简写更加方便一些
	// console.log("收到客户端的请求了,请求路径是" + req.url);
	// req有个url的属性

	// 服务器响应方法1：很傻
	// res.write('hello')
	// res.write(' world')
	// res.end()
	// 让服务器给浏览器发个响应，并且记得最后一定要写end

	// 但是上面write,write这样写比较麻烦，推荐使用更加简单的方式
	// 直接end的同时发送响应数据

	// 服务器响应方法2：更加简单
	// 这句话表示发送响应数据'hello world'同时结束响应
	// 我们几乎没有多次write的产品，基本上一个请求对应一个响应
	// res.end('hello world')

	// 根据不同的请求路径发送不同的响应结果
	// 2.1 首先要拿到请求路径
	// 	  注意：req.url获取到的是端口号之后的那一部分路径
	// 	  也就是说所有的url都是以 / (正斜杠)开头的
	// 2.2 判断路径处理响应
	var url = req.url
	// res.end(url)

	if (url === '/') {
		// 通常来讲网站的 /(杠) 就对应网站的首页
		res.end('index page')
	} else if (url == '/login') {
		res.end('login page')
		// 请求路径不一样，响应结果也不一样
	} else { 
		res.end('404 Not Found')
	}
	// 注意：每当你修改代码，一定要记得重启一下服务器！！！

	// 其实现在很多的人工智能，机器人很多都是设定了一系列的if...else...
	// 好多都是炒的概念
})

// 3.绑定端口号，启动服务
server.listen(3000, function () { 
	// 如果端口号写80，那么在端口号不被占用的情况下，端口号可以省略不写
	// 浏览器默认端口号就是80
	console.log("服务器启动成功，可以访问了。。。")
})