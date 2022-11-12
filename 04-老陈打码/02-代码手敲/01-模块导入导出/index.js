/**
 * @Author liming
 * @Date 2022/11/12 17:47
 **/


function zsq(target){
    console.log(target)
}

//装饰器——但是这里用不了，不识别(还需要用其他配置)
// @zsq
class User{
    constructor() {
        this.username = "小明"
        this.password = "123456"
    }
}



let u1 = new User();
console.log(u1)

console.log("====================")
let a = require('./index1')
let b = require('./index1')
console.log(a,'a')
console.log(b,'b')
console.log(a === b)
