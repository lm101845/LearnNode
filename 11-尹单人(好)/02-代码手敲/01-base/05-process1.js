/**
 * @Author liming
 * @Date 2022/11/15 19:29
 **/

//4.事件
//上面2个事件的回调是异步的，后执行
// process.on("exit",code=>{
//     console.log('exit--' + code)
//     //它里面只能写同步代码，异步代码不支持，所以setTimeout函数没有调用
//     //'exit' 事件监听器的回调函数，只允许包含同步操作。
//     setTimeout(()=>{
//         console.log(123)
//     },1000)
// });

// process.on('beforeExit',code=>{
//     console.log('before exit-' + code)
// })
//执行顺序，beforeExit在exit执行前面
// console.log('代码执行完了')
// process.exit();
//让程序手动退出,此时beforeExit事件没有被触发
// console.log("这段代码不会执行")


//5.标准输入 输出 错误
// console.log = function (data){
//     process.stdout.write("---" + data + "\n")
// }
//
// console.log(11)
// console.log(22)

//读取文本文件
const fs = require('fs');
fs.createReadStream("test.txt").pipe(process.stdout);
//从文本文件中把数据拿出来，通过管道留给下一个人


process.stdin.pipe(process.stdout);

process.stdin.setEncoding("utf-8")
process.stdin.on('readable',()=>{
    let chunk = process.stdin.read();
    if(chunk !== null){
        process.stdout.write('data' + chunk)
    }
})
//readable这个事件是内部定义好的
//process.stdin 属性返回连接到 stdin (fd 0)的流。 它是一个net.Socket(它是一个Duplex流)，除非 fd 0指向一个文件，在这种情况下它是一个Readable流。
