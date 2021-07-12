var foo = "bbb";

console.log(exports);
// 也是空对象！ {}
// b.js里面的exports就是a.js里面的bExports
// 后面写了exports.foo = 'hello'就成了{ foo: 'hello' }了

exports.foo = 'hello'
// 动态的为这个对象添加了一个成员，名字叫foo,值是hello

console.log(exports);
// { foo: 'hello' }

exports.add = function (x, y) { 
  return x + y
}

// 得到的既不是foo也不是add,而是exports这个对象
 
var age = 18

exports.age = age;
// 只有写了这句话才可以被a.js用
function add(x, y) { 
  // a.js里面采用的add方法是上面的add，不是这个add方法！！！
  // 他们2个不是一个东西！！！
  return x - y
}

// 自己造一个readFile
exports.readFile = function (path, callback) { 
  console.log('文件路径：' + path);
}