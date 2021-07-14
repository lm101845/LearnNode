// var fs = require('fs')
// fs.readFile('a.txt' , function(error,data){
// //实际上没有a.txt文件，所以读不出来

// 	if(error){
//     	console.log('读取文件失败')
//     	return 
// 	}
// 	console.log(data.toString())
// })

//或者这样写
//	if(error){
//    	console.log('读取文件失败')
//	}else{
//	console.log(data.toString())
//	}
//})

//---------------------------------------------------------------
var fs = require('fs')


fs.writeFile('你好.md',"大家好，给大家介绍一下，我是node.s",function(error){
	//console.log(error)
	if(error){
		console.log('写入失败')
	}else{
		console.log('写入成功')
	}
})