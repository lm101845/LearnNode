var http = require('http')

var server = http.createServer()

// request请求事件处理函数，需要接收2个参数
//      Request     请求对象：可以用来获取客户端的一些请求信息，如请求路径
//      Response    响应对象：可以用来给客户端发送响应消息
server.on('request', function (request, response) { 
     //http://127.0.0.1:3000/
    //http://127.0.0.1:3000/a/a
    //http://127.0.0.1:3000/foo/b/foo/b
    console.log("收到客户端的请求了,请求路径是" + request.url);

    // url是统一资源定位符，不同的url对应不同的资源

    // 收到客户端的请求了,请求路径是/favicon.ico
    // 浏览器有个默认行为，会请求收藏夹图标，我们现在不用管它

    // response对象有一个方法，叫做write,可以用来给客户端发送响应数据
    // write可以使用多次，但是最后一定要使用end来结束响应，否则客户端会一直等待。
    // 你要把话说完，你话说不完，我就不接收
    response.write('hello')
    // 这个意思是往响应流当中写数据
    response.write(' nodejs')

    // 不管你中间说了多少话，最后记得一定要结束响应，不然客户端不知道你话有没有说完。
    // 告诉客户端我的话说完了，你可以把我说的话给用户看了
    response.end()

    // 之后你在浏览器框上写什么都不管用，都给你显示hello nodejs
    // 输入http://localhost:3000/，显示hello nodejs
    // 输入http://localhost:3000/a/b，还显示hello nodejs
    // 因为服务器是我自己控制的，我现在服务器的能力只能处理到这一步

    // 一切请求路径都从正斜杠/开头，浏览器上你看着是localhost:3000,实际复制下来是http://localhost:3000/
    // 端口号3000后面有个斜杠！！！

    // 思考：
    // 由于现在我们的服务器的能力还非常的弱，无论什么请求，都只能响应hello nodejs
    // 我希望当请求不同的路径(url)的时候响应不同的结果
    // 例如：
    //      /          响应        index
    //      /login     响应        登陆
    //      /register  响应        注册
    //      /haha      响应        哈哈哈
    // 但是有个事实：所有的请求都会触发request事件，没有专门针对(/或/login或/register或/haha)的特定响应
    // 方法：那我们就只能通过if···else对request.url进行判断了
})

server.listen(3000, function () { 
    console.log('服务器启动成功了，可以通过http://127.0.0.1:3000/或者localhost来进行访问');
})

