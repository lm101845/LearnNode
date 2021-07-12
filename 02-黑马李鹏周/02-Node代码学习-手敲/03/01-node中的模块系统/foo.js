var foo = 'bar'

function add(x, y) { 
    return x + y;
}

// 只能得到我想要给你的成员
// 这样做的目的是为了解决变量命名冲突的问题
// exports.a = add;
// 给exports对象动态添加参数
// 这个时候main模块可以通过a来访问foo里面的add函数

// exports就是个对象,我们可以通过多次给该对象添加成员实现对外导出多个内部成员

exports.str = 'hello'

// 现在我有一个需求：
// 我希望加载得到的直接就是一个

//  方法
//  字符串
//  数字
//  数组


// 错误方法：
// exports = add
// 你可以认为在每个模块的最后return了这个exports
// 这里exports等于了这个add,main是不是可以直接访问add函数了呢
// 打印fooExports和exports，都显示{},表名是一个空对象，所以这个不行

// 正确方法：这样是可以的
// 如果一个模块需要直接导出某个成员，而非挂载的方式
// 那这个时候必须使用module.xx = xx的方式
module.exports = add