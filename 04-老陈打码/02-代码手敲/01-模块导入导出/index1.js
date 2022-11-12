/**
 * @Author liming
 * @Date 2022/11/12 17:57
 **/

/**
 * 为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。
 * var exports = module.exports;
 */
let a = 1;
let b = 2;
let c = 3;

//exports就是默认导出的对象
exports.aa = a;
exports.bb = b;
module.exports.cc = c;
exports = module.exports;
//系统默认设置了 exports = module.exports,exports只是module.exports的一个副本而已
// exports = {user:"小明"}  //没用
// module.exports = {user:"小明"}  //有用

//注意使用exports时，只能单个设置属性，如exports.a = a

let s1 = {username:"lisi"}
console.log(s1)
module.exports = s1
