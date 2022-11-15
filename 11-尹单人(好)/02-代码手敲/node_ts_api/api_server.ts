/**
 * @Author liming
 * @Date 2022/11/15 15:28
 **/

//需求：希望有一个服务，可以依据请求的接口内容，返回相应的数据
// const express = require('express')
//注意：TS中不支持require写法

import express from 'express'
import {DataStore} from "./data";

// console.log(DataStore)
// console.log(DataStore.list)
//静态变量可以直接通过类名进行访问
const app = express();
app.get('/',(req,res)=>{
    // res.end('1122')
    res.json(DataStore.list)
})
app.listen(8080,()=>{
    console.log('服务已经开启了')
})