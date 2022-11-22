/**
 * @Author liming
 * @Date 2022/11/15 14:56
 **/
const EventEmitter = require("events");
//Events模块是基于事件驱动架构
// console.log(EventEmitter)
const myEvent = new EventEmitter()

myEvent.on('事件1',()=>{
    console.log('监听到事件1执行了')
})

myEvent.on('事件1',()=>{
    console.log('监听到事件111执行了')
})
//on:注册监听事件(可以被多个人监听)

myEvent.emit('事件1')
//emit:触发事件
