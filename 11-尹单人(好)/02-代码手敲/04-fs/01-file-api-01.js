/**
 * @Author liming
 * @Date 2022/11/24 21:33
 **/

const fs = require('fs')
const path = require('path')

//1.readFile(异步)
//路径我们一般最好用绝对路径
fs.readFile(path.resolve('data.txt'),'utf-8',(err,data)=>{
    //Node中有一个错误优先的概念，如果有错误，那第一个参数就应该是它
    console.log(err)   //null
    if(!err){
        console.log(data)  //拉勾教育
    }
})

//2.writeFile(异步,默认是【覆盖的写操作】)
//读操作，路径不存在会报错；写操作，路径不存在，会给你新建一个
//  fs.writeFile('data.txt','hello node.js',(err)=>{
 fs.writeFile('data1.txt','hello node.js',(err)=>{
     if(!err){
         fs.readFile('data1.txt','utf-8',(err,data)=>{
             console.log(data,'简单写法')
         })
     }
 })
//这里我们用了省事，用的相对路径

fs.writeFile('haha.txt','123fsdfdsfs',{
    //设置文件权限
    mode:438,
    flag:'r+',  //可读可写
    encoding:'utf-8'
},(err)=>{
    if(!err){
        fs.readFile('haha.txt','utf-8',(err,data)=>{
            console.log(data,'设置权限')
        })
    }
})

//3.appendFile(文件内容追加)
fs.appendFile('data.txt','绝命毒师',(err)=>{
    console.log('写入成功')
})

//4.copyFile(文件拷贝)
fs.copyFile('data.txt','test.txt',()=>{
    console.log('拷贝成功')
    //左边文件拷贝到右边文件中
})

//5.watchFile(文件监控)
fs.watchFile('data.txt',{interval:20},(curr,prev)=>{

    /**
     * interval单位是毫秒
     * curr表示修改之后的文件，所有信息都放它里面
     * prev表示修改之前的文件，所有信息都放在它里面
     */
   if(curr.mtime !== prev.mtime){
        //说明文件被动了
       console.log('文件被修改了')
       fs.unwatchFile('data.txt')
       //取消对data.txt的监控
   }
})







