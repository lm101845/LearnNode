// 凡是涉及到文件操作(文件读写)的，都要引入fs核心模块(API)
// 必须要加这一行

var fs = require("fs");

// 读文件要给路径：读哪里的文件
// 写文件也要给路径：在哪里写

// 写文件有3个参数
// 第一个参数：文件路径
// 第二个参数：要写的文件内容
// 第三个参数：回调函数(Node里面几乎没有不回调的,因为它是异步的，所以要回调)

// 第三个参数(回调函数)只接收一个参数(形参)error(叫其他名字也行，习惯叫error)就可以了
// 回调函数只需要一个参数的原因：它是写文件，不是读，读要知道结果，写不需要，
// 写文件只需要知道写成功了还是失败了即可

//	error
// 			成功：
// 				文件写入成功
// 				error是null
// 			失败：
// 				文件写入失败
// 				error是错误对象

// fs.writeFile('./data/你好.md', '大家好，我是Node.js', function (error) { 
fs.writeFile('./data/你好>.md', '大家好，我是Node.js', function (error) { 
	// 文件名中出现了特殊字符>号，会导致写入文件报错
	console.log('文件写入成功');
	console.log(error);

	if (error) {
		console.log('写入失败');
	} else { 
		console.log('写入成功');
	}
})