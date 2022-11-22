/**
 * @Author liming
 * @Date 2022/11/22 22:44
 **/
//1.concat
let b1 = Buffer.from('拉勾')
let b2 = Buffer.from('教育')
// let b = Buffer.concat([b1,b2]);
let b = Buffer.concat([b1,b2],9);
console.log(b)
//<Buffer e6 8b 89 e5 8b be e6 95 99 e8 82 b2>
console.log(b.toString())
//拉勾教育

//2.isBuffer
let b3 = Buffer.alloc(3)
console.log(Buffer.isBuffer(b3))
