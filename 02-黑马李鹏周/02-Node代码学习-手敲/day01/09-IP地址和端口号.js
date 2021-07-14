var http = require('http')

// 1.创建Server
var server = http.createServer()

// 2.监听request请求事件，设置请求处理函数
server.on('request', function (req, res) { 
	console.log('收到请求了，请求路径是：' + req.url);
	// 在请求对象req中，我可以获取当前请求客户端的端口号
	console.log('请求我的客户端的端口号是：' + req.socket.remotePort);
	console.log('请求我的客户端的远程地址是：' + req.socket.remoteAddress);
	var url = req.url
	
	if (url === '/') {	
		res.end('index page')
	} else if (url === '/login') {
		res.end('login page')
	} else if(url === '/products'){
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
		res.end(JSON.stringify(products))
	}else { 	
		res.end('404 Not Found')
	}
})

server.listen(3000, function () { 

	console.log("服务器启动成功，可以访问了。。。")
})