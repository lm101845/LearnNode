/*
 * @Author: liming
 * @Date: 2021-05-24 11:37:52
 * @LastEditTime: 2021-05-24 12:32:53
 * @FilePath: \LearnNode.js\03-黑马李鹏周代码\02-Node代码学习-手敲\05\00-js中的一等公民函数.js
 */
// function add(x, y) {
//     console.log(1);
//     setTimeout(function () {
//         var ret = x + y;
//         return ret
//         // 这里的return你是不可能拿到的
//     }, 1000)
//     console.log(3);
// }

// console.log(add(10, 20));
// 1
// 3
//undefined
// 它不会等待，到3函数就结束了，不会管你异步操作的。函数默认你没有显示return,所以函数默认返回的就是undefined

// function add2(x, y) {
//     var ret;
//     console.log(1);
//     setTimeout(function () {
//         console.log(2);
//         ret = x + y;
//     }, 1000);
//     console.log(3);
//     return ret
//     //3完了马上就return 这个ret,是undefined(因为定时器还没有执行到)
//     //然后再等1秒后，再打印2
// }

// console.log(add2(10, 20));
// //1
// //3
// //undefined
// //2

var ret
// 这个ret是全局变量
// function add3(x, y) {
//     console.log(1);
//     setTimeout(function () {
//         console.log(2);
//         ret = x + y;
//         //函数一秒之后针对全局变量进行了赋值，这个是可以的
//         //一秒后就能拿到全局变量ret，那我再写一个回调函数，等个2秒，就可以拿到ret了
//     }, 1000);
//     console.log(3);
// }

// setTimeout(function () {
//     console.log(ret);
//     // 我2秒后再获取全局变量，这个时候是可以获取到的
//     // 但是这样写，函数就没有封装性了，你把这个函数写到外面了，就没有什么意义了。
// },2000)

// console.log(add3(10, 20));

//1
//3
//undefined
//2(1秒后)
//30(2秒后)

function add4(x, y, callback) {
    console.log(1);
    setTimeout(function () {
        var ret = x + y
        callback(ret)
        // 等异步操作结束之后调用callback函数，传入的参数是ret这个结果
    },1000)
}

add4(10, 20, function (ret) {
    console.log(ret);
})

