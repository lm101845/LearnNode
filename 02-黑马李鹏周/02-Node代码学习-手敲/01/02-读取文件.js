//浏览器中的JavaScript是没有文件操作的能力的(不能进行读写)
//但是Node中的JavaScript具有文件操作的能力
// Node面向的是服务端，所以专门为JS提供了这样的能力

// fs是filesystem的简写，就是文件系统的意思
// 在Node中如果想要进行文件操作，就必须引入fs这个核心模块
// 在fs这个核心模块中，就提供了所有的文件操作相关的API
// 例如fs.readFile就是用来读取文件的

// 1.使用require方法加载fs核心模块
// 这个字符串叫fs,就是核心模块
var fs = require('fs');

// 2.读取文件
// 第一个参数：要读取的文件路径
// 第二个参数是一个回调函数(这个回调函数接收2个参数：error和data)
// 		error
// 		   如果读取失败，error就是错误对象
// 		   如果读取成功，error就是null
// 		data
// 		   如果读取失败，data就是null
// 		   如果读取成功，data就是读取到的数据

// 		上面解释太绕，看下面的解释

// 		读取成功
// 			data 数据
// 			error null
// 		读取失败
// 			data  undefined(没有数据)
// 			error  错误对象(错误信息以对象形式表示)
fs.readFile('./data/hello1.txt', function (error, data) { 
// fs.readFile('./data/hello1.txt', function (error,data) { 
	
	// console.log(data);
	// 直接打印，输出的是十六进制数据

	//<Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 0d 0a 0d 0a e4 bd a0 e5 a5 bd e9 aa 9a e5 95 8a>
	// 默认文件中存储的都是二进制数据 0 1
	// 这里为什么看到的不是0和1呢？原因是二进制转为十六进制了
	// 但是无论是二进制还是十六进制，人类都不认识

	// 所以我们可以通过toString()方法把其转为我们能认识的字符
	// 但是这样写，如果读取文件失败(比如文件名写错了)它也不报错,也没有提示信息
	
	console.log(error);
	console.log(data);
	// 如果文件读取成功，error会输出null,data会输出读取的数据
	// 如果文件读取成功，error会输出一个对象形式的错误信息,data会输出undefined

	// 写法1
	// if (error) { 
	// 	console.log('读取文件失败了');
	// 	return 
	// 	// return表示不要让它执行后续代码了
	// }
	// console.log(data.toString());

	// 写法2：
	// 在这里就可以通过判断error来确认是否有错误发生
	if (error) {
		console.log('读取文件失败了');
	} else { 
		console.log(data.toString());
	}


})
