/**
 * @Author liming
 * @Date 2022/11/15 15:55
 **/

// console.log(global)
//打印全局对象

console.log(__filename)   //当前脚本文件执行的完整路径
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲\03-node-global.js

console.log(__dirname)   //当前脚本执行的目录(相当于__filename的上一级)
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲

console.log(this)  //{}
//默认情况下,this是空对象，和global并不是一样的

console.log(this == global)  //false

// (function (){
//     console.log(this == global)
// })()


