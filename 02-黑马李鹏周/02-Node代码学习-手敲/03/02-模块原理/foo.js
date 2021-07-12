// 在Node中，每个模块内部，都有自己的module对象
// 该module对象中有一个成员exports,也是一个对象，只不过是一个空对象
// module对象里还有别的成员，暂且不表

// 也就是说。如果你需要对外导出成员，只需要把导出的成员挂载到module.exports中

// 我们发现，每次导出接口成员的时候，都要通过module.exports.xxx = xxx的方式很麻烦
// 所以，Node为了简化你的操作，专门提供了一个变量，exports = module.exports

// 也就是说，在模块中，还有这么一句代码：
// var exports = module.exports

// var module = {
//     exports: {
//         foo:'bar',
//         add:function(){
//              return x + y    
//}
//     }
// }
// 上面的代码是Node底层的，你看不见的

// 默认在代码最后有一句：
// return module.exports   这个你同样也看不见
// 一定要记住：最后return的是module.exports，而不是exports


// 当一个模块需要单个成员的时候
// 直接给exports赋值是不管用的,会丢失module.exports的引用关系
// exports = 'hello'
// 这样写不管用(最后return的是module.exports，而不是exports)

// 接下来谁来require我，谁就得到module.exports

// module.exports.foo = 'bar'
// exports在module里面的
// 但是这种点太多实在是不方便

// module.exports.add = function (x, y) { 
//         return x + y
// }

console.log(exports === module.exports);
// 2者一致，那就说明我可以使用任意一方来导出内部成员
// exports只是module.exports的一个引用，如果单独给exports赋值，则它会指向新的对象了
// 那么exports就跟module.exports没关系了

// exports.a = 123

// 重新赋值之前(exports = {}之前上面的代码是有效的，下面的就没有效果了)
// exports = {}
// 后面的exports代码都没用了

// exports.foo = 'bar'

// exports.add = function (x, y) { 
//     // 这个是在里面添加成员
//     return x + y
// }

// module.exports.b = 456
// 这个不会受exports的影响，写这个总是没错的
// module.exports是皇上，永远是对的
// exports是大臣，当他依附于(指向皇上)的时候，他就是对的，改变指向的时候，他就叛变了

// module.exports = 'hello'
// 给exports赋值会断开和module.exports之间的引用
// 同理，给module.exports

// 这里导致exports !== module.exports
// module.exports = {
//     foo:'bar'
// }

// 但是这里又重新建立了两者的引用关系
// exports = module.exports

// exports.foo = 'world'

// {foo:bar}
exports.foo = 'bar'

// {foo:bar,a:123}
module.exports.a = 123

// 在这里exports重新引用了
// exports !== module.exports了
// 最终return的是module.exports
// 所以无论你exports里面的成员是什么，都没有用了
exports = {
    a:456
}

// {foo:haha,a:123}
module.exports.foo = 'haha'

// 这里没用，混淆
exports.c = 456

// 这里重新建立了和module.exports的引用关系
exports = module.exports

// 由于在上面建立了引用关系，所以这里是生效的
// {foo:haha,a:789}
exports.a = 789

// 这样一写，用JS角度来说是module.exports被重新赋值了，前面的全部死掉了
module.exports = function () { 
    console.log('hello')
}

// 真正去使用的时候：
//      导出多个成员：exports.xxx = xxx(多次这么来写)
//      导出多个成员也可以：    module.exports = { 
//                             }
//      导出单个成员：module.exports(只写这一次就可以了)