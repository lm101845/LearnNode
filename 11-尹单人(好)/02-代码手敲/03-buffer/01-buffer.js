/**
 * @Author liming
 * @Date 2022/11/22 21:05
 **/

//1.Buffer.alloc
const b1 = Buffer.alloc(10)  //单位是字节
console.log(b1)
//<Buffer 00 00 00 00 00 00 00 00 00 00>
//00最终会换算成16进制，1个0表示8位


//2.Buffer.allocUnsafe
const b2 = Buffer.allocUnsafe(10)  //单位是字节
/**
 * 以这种方式创建的 Buffer 实例的底层内存是未初始化的。
 * 新创建的 Buffer 的内容是未知的，且可能包含敏感数据。
 * 可以使用 buf.fill(0) 初始化 Buffer 实例为0。
 */
console.log(b2)
//<Buffer 00 00 00 00 00 00 00 00 00 00>


//3.from
/**
 * 将传入的 03-buffer 数据拷贝到一个新建的 Buffer 实例。
 */
const b3 = Buffer.from("1")
console.log(b3)
//<Buffer 31>
//<Buffer 31>   编码默认是UTF-8

const b4 = Buffer.from("中")
//在UTF-8中一个汉字刚好占3个字节
console.log(b4)
//<Buffer e4 b8 ad>

const b5 = Buffer.from([1,2,3])
console.log(b5)
//<Buffer 01 02 03>

const b6 = Buffer.from([1,2,'中'],'utf8')
console.log(b6)
//<Buffer 01 02 00>
//我们直接传中文，它不能识别，需要我们先把它转成utf-8格式的内容

const b7 = Buffer.from('中');
console.log(b7)
//<Buffer e4 b8 ad>
console.log(b7.toString())  //把buffer类型内容转成我们习惯的字符进行展示
//中

const b8 = Buffer.from([0xe4,0xb8,0xad])
console.log(b8)
//<Buffer e4 b8 ad>

console.log(b8.toString())
//中

const b9 = Buffer.from([0x60,0b1001,12])
console.log(b9)
//<Buffer 60 09 0c>
console.log(b9.toString())
//`

const b10 = Buffer.alloc(3)
const b11 = Buffer.from(b10)
console.log(b10)
console.log(b11)
// <Buffer 00 00 00>
// <Buffer 00 00 00>
//问题：b10,b11这2个内存空间，他们是共享的还是拷贝的？？
//回答：并不是共享空间，而是对新空间的拷贝
//我们对Buffer的操作和数组很相似，有length,也可以操作下标

b10[0] = 1;
console.log(b10)
console.log(b11)
// <Buffer 01 00 00>
// <Buffer 00 00 00>



