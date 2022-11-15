/**
 * @Author liming
 * @Date 2022/11/15 15:07
 **/

const http = require("http");

function sleepTime(time){
    //让函数执行消耗4秒(别的语言如Java有sleep函数，JS没有，需要手动写)
    const sleep = Date.now() + time * 1000
    while(Date.now() < sleep){}
    return
}
sleepTime(4)

const server = http.createServer((req,res)=>{
    res.end('server starting...')
})

server.listen(8080,()=>{
    console.log('服务启动了')
    //这个是服务器监听服务器自身的8080端口
})