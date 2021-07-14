// 默认得到的是对象
// 使用对象中的成员还必须要用点(.)某个成员出来，比较麻烦
// 有时候，对于一个模块，我仅仅就是希望导出一个方法就可以了
// (比如只想导出一个add,但我还必须要fooExports.a才能出来add函数)
var fooExports = require('./foo')
// 已经加载了foo模块
// console.log(foo);
// ReferenceError: foo is not defined

// 但是即便你加载了我，你也得不到我，因为模块作用域的关系
// 你只能得到我(foo模块)想给你的东西(要export)
// 我们之间确实开了一扇小门，但是我自己不主动给你东西，你不能直接过来抢

console.log(fooExports);


console.log(exports);

