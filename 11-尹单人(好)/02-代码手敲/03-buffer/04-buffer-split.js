/**
 * @Author liming
 * @Date 2022/11/22 22:51
 **/
ArrayBuffer.prototype.split = function (sep){
//注：这个函数根本没有调用，执行的是字符串本身的split方法，老师写的有问题......
    debugger
    let len = Buffer.from(sep).length
    let ret = []
    let start = 0
    let offset = 0
    while(offset = this.indexOf(sep,start) !== -1){
        ret.push(this.slice(start,offset))
        start = offset + len;
    }
    ret.push(this.slice(start))
    return ret;
}
let buf = 'zce吃馒头,吃面条,我吃所有吃'
let bufArr = buf.split('吃')
console.log(bufArr)
//[ 'zce', '馒头,', '面条,我', '所有','' ]
