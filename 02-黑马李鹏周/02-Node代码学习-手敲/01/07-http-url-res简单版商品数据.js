var http = require('http')

var server = http.createServer()


server.on('request', function (req, res) { 
	
	var url = req.url

	if (url === '/product') { 
		var products = [
		  {
		  	name: '苹果X',
		  	price: 8888,
		  },
		  {
		  	name: '菠萝X',
		  	price: 5000,
		  },
		  {
		  	name: '小辣椒X',
		  	price: 1999,
		  }
		]
		// 这是一个数组，放到了if语句内部
		// 注意：服务器响应内容只能是二进制数据或者字符串
		// 数字、对象、数组、布尔值都不能作为响应内容！！！

		// res.end(123)
		// 响应内容为数字，是不行的！！！！！对象，数组，布尔值这些更不行！！！
		// 那如何转换呢？JSON有parse和stringify2种方法，都可以
		res.end(JSON.stringify(products))
		// 只有一个小小的问题：中文乱码了
		// 这个显示出来的东西和接口很像
	}
	
})

// 3.绑定端口号，启动服务
server.listen(3000, function () { 
	// 如果端口号写80，那么在端口号不被占用的情况下，端口号可以省略不写
	// 浏览器默认端口号就是80
	console.log("服务器启动成功，可以访问了。。。")
})