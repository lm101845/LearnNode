/**
 * @Author liming
 * @Date 2022/11/22 21:46
 **/

//1.fill方法
/**
 * buf.fill(value[, offset[, end]][, encoding])
 *
 * value <string> | <Buffer> | <integer> 用来填充 buf 的值。
 * offset <integer> 开始填充 buf 前要跳过的字节数。默认: 0。
 * end <integer> 结束填充 buf 的位置（不包含）。默认: buf.length。
 * encoding <string> 如果 value 是一个字符串，则这是它的字符编码。默认: 'utf8'。
 * 返回: <Buffer> buf 的引用。
 * 如果未指定 offset 和 end，则填充整个 buf。 这个简化使得一个 Buffer 的创建与填充可以在一行内完成。
 */
let buf = Buffer.alloc(6)
buf.fill('123')
console.log(buf)
//<Buffer 31 32 33 31 32 33>
console.log(buf.toString())
//123456

console.log("==========")

let buf1 = Buffer.alloc(6)
buf1.fill('123',1)  //1表示从buffer下标的哪个位置执行填充操作
console.log(buf1)
//<Buffer 00 31 32 33 31 32>
console.log(buf1.toString())
//12312

console.log("+++++++++++++")
let buf2 = Buffer.alloc(6)
buf2.fill('123',1,3)
console.log(buf2)
//<Buffer 00 31 32 00 00 00>
console.log(buf2.toString())
//12


console.log("------------")
let buf3 = Buffer.alloc(6)
buf3.fill(123)
console.log(buf3)
//<Buffer 7b 7b 7b 7b 7b 7b>
console.log(buf3.toString())
//{{{{{{


console.log("**************************************************")

//2.write方法
/**
 * buf.write(string[, offset[, length]][, encoding])
 * string <string> 要写入 buf 的字符串。
 * offset <integer> 开始写入 string 前要跳过的字节数。默认: 0。
 * length <integer> 要写入的字节数。默认: buf.length - offset。
 * encoding <string> string 的字符编码。默认: 'utf8'。
 * 返回: <integer> 写入的字节数。
 *
 * 根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。
 * 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入。
 */
let buf4 = Buffer.alloc(6)
buf4.write('123',1,2)
console.log(buf4)
//<Buffer 00 31 32 00 00 00>
console.log(buf4.toString())
//12

console.log("**************")

//3.toString
const buf5 = Buffer.from("拉钩教育")  //一个中文字符占3个字节，一共12个字节
console.log(buf5)
//<Buffer e6 8b 89 e9 92 a9 e6 95 99 e8 82 b2>
console.log(buf5.toString())
//拉钩教育
console.log(buf5.toString('utf-8',3))
//钩教育
console.log(buf5.toString('utf-8',3,9))
// 钩教

console.log("+++++++++++++++++++++++++++")
//4.slice
//我们创建buffer的时候，它的长度就固定了，我们无法通过下标的方式让他增加长度
const buf6 = Buffer.from("拉钩教育")
// let buf7 = buf6.slice()
// let buf7 = buf6.slice(3)
// let buf7 = buf6.slice(3,9)
let buf7 = buf6.slice(-3)
console.log(buf7)
//<Buffer e6 8b 89 e9 92 a9 e6 95 99 e8 82 b2>
console.log(buf7.toString())
//拉钩教育     //默认从头一直截到尾

console.log("//////////////////////////////////")
//5.indexOf
/**
 * buf.indexOf(value[, byteOffset][, encoding])
 *
 * value <string> | <Buffer> | <Uint8Array> | <integer> 要搜索的值
 * byteOffset <integer> buf 中开始搜索的位置。默认: 0
 * encoding <string> 如果 value 是一个字符串，则这是它的字符编码。 默认: 'utf8'
 * 返回: <integer> buf 中 value 首次出现的索引，如果 buf 没包含 value 则返回 -1
 * 如果 value 是：
 *
 * 字符串，则 value 根据 encoding 的字符编码进行解析。
 * Buffer 或 Uint8Array，则 value 会被作为一个整体使用。如果要比较部分 Buffer，可使用 buf.slice()。
 * 数值, 则 value 会解析为一个 0 至 255 之间的无符号八位整数值。
 */
const buf8 = Buffer.from("zce爱前端,爱拉钩教育,爱大家,我爱所有人")
console.log(buf8)
// console.log(buf8.indexOf('爱'))
//3
console.log(buf8.indexOf('爱',4))

//6.copy
/**
 * buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
 *
 * target <Buffer> | <Uint8Array> 要拷贝进的 Buffer 或 Uint8Array。
 * targetStart <integer> target 中开始拷贝进的偏移量。 默认: 0
 * sourceStart <integer> buf 中开始拷贝的偏移量。 默认: 0
 * sourceEnd <integer> buf 中结束拷贝的偏移量（不包含）。 默认: buf.length
 * 返回: <integer> 被拷贝的字节数。
 * 拷贝 buf 的一个区域的数据到 target 的一个区域，即便 target 的内存区域与 buf 的重叠。
 */
console.log('++++++++++++++++++++++++')
let c1 = Buffer.alloc(6)
let c2 = Buffer.from('拉钩')
// c2.copy(c1)
// c2.copy(c1,3)
c2.copy(c1,3,3)
console.log(c1.toString())
console.log(c2.toString())
//xx
//拉钩


