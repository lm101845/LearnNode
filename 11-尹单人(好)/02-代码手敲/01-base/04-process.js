/**
 * @Author liming
 * @Date 2022/11/15 19:05
 **/

//1.资源  CPU  内存
// const fs = require('fs');
// Buffer.alloc(1000)
// console.log(process.memoryUsage())
console.log(process.cpuUsage())

//2.运行环境：运行目录、Node环境、CPU架构、用户环境、系统平台
console.log(process.cwd());  //cwd是current work dictory的缩写
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲

console.log(process.version);
//v16.13.0     node的版本

// console.log(process.versions);

console.log(process.arch);
//CPU架构  x64

console.log(process.env)

console.log(process.env.NODE_ENV)
//undefined

// console.log(process.env.PATH)
//当前本机配置的系统环境变量

console.log(process.env.USERPROFILE);  //Mac平台是HOME
//C:\Users\Administrator

console.log(process.platform)
//win32
console.log("==========分割线================")
//3.运行状态：启动参数、PID、运行时间

console.log(process.argv,'process.argv********************')
//输入 node .\04-process.js 1 2会显示如下
/**
 * [
 *   'D:\\01-software\\11-node\\node.exe',
 *   'E:\\01-code\\06-LearnNode★\\LearnNode\\11-尹单人(好)\\02-代码手敲\\04-process.js',
 *   '1',
 *   '2'
 * ]
 */

// console.log(process.argv0);
//拿到数组里面的第一个值,没有argv1,argv2这种了
//D:\01-software\11-node\node.exe

console.log(process.pid)  //pid
//12404

console.log(process.uptime())
//0.0449675  这个文件从运行开始到结束，整体花费的时间

