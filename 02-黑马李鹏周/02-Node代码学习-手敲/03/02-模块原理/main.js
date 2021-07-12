var fooExports = require('./foo')

console.log(fooExports);

// 如果你实在分不清楚exports和module.exports，你可以选择忘记exports,只使用module.exports也没问题
// module.exports.xxx = xxx
// module.exports = {} //这个是重新赋值了，以重新赋值的为准

// 老师这里讲了面向对象的有关只是
// var obj = {}
// var obj1 = obj

// obj1.foo = 'bar'
// obj.foo = 'hello'

// obj1 = {}
// obj1.foo = 'world'
// console.log(obj.foo);
// 结果是hello


