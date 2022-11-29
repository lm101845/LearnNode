/**
 * @Author liming
 * @Date 2022/11/22 22:51
 **/
Buffer.prototype.split = function (sep) {
    let len = Buffer.from(sep).length
    console.log(len)
    let ret = []
    let start = 0
    let offset = 0

    while ((offset = this.indexOf(sep, start)) !== -1) {
        ret.push(this.slice(start, offset))
        start = offset + len
    }
    ret.push(this.slice(start))
    return ret
}

let buf = Buffer.from('测试1，测试例2，测试例子3')
let bufArr = buf.split('测')
console.log(bufArr.toString())
