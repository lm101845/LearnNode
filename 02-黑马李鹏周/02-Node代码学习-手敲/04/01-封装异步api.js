function fn(callback) {
    // var callback = function (data) { console.log(data)}
    // 错误写法1：
    // setTimeout(function () {
    //     var data = 'hello'
    // return data
    // }, 1000);
    // 如果是下面这样就好做了，但是关键是异步的，是上面这样的
    // 不能这样写，从代码角度它return的也是异步函数的function,而不是最外部的fn

    // 错误写法2：
    // var data = '默认数据'
    // setTimeout(function () {
    //     data = 'hello'
    // }, 1000)
    // // 定时器是异步的，不会等定时器执行结束后面的代码就先执行了，所以返回的是'默认数据'
    // return data


    setTimeout(function () {
        callback(data)
        var data = 'hello'
    }, 1000)
}

// 调用fn,得到内部的data
// console.log(fn());

// 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取，没有别的方式
fn(function (data) {
    console.log(data);
})