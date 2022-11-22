/**
 * @Author liming
 * @Date 2022/11/21 21:21
 **/
const path = require('path')
//4.解析路径
/**
 * 1接收一个路径，返回一个对象，包含不同的信息(root,dir,base,ext,name)
 */
const obj = path.parse('/a/b/c/index.html')
console.log(obj)
// {
//     root: '/',           //当前路径的根路径
//     dir: '/a/b/c',       //最后一个文件的上层目录
//     base: 'index.html',  //最后一个部分的完整的文件名称(包含文件名 + 后缀)
//     ext: '.html',        //文件后缀
//     name: 'index'        //文件名称
// }

const obj1 = path.parse('/a/b/c')    //绝对路径,root为/
console.log(obj1)
//{ root: '/', dir: '/a/b', base: 'c', ext: '', name: 'c' }

const obj2 = path.parse('./a/b/c')   //相对路径，root为空
console.log(obj2)
//{ root: '', dir: './a/b', base: 'c', ext: '', name: 'c' }

console.log("=========================")

//5.序列化路径(解析路径(pase)的反操作)
const obj3 = path.parse('./a/b/c');
console.log(path.format(obj3))
//./a/b\c    //这个路径分隔符\和操作系统有关，不用管

//6.判断当前路径是否为绝对路径
console.log(path.isAbsolute('foo'))
//false (没有任何分割符修饰，它就认为是非绝对路径)

console.log(path.isAbsolute('/foo'))
//true

console.log(path.isAbsolute('/////foo'))
//true  (它会对我们的写法进行一些规范化处理，就算我们写了很多\,它也会认为是一个\)

console.log(path.isAbsolute(''))
//false
console.log(path.isAbsolute('.'))
//false
console.log(path.isAbsolute('../bar'))
//false


//7.拼接路径
/**
 * path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
 *
 * 长度为零的 path 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。
 */
console.log(path.join('a/b','c','index.html'))
//a\b\c\index.html     //这个并不是绝对路径的处理

console.log(path.join('/a/b','c','index.html'))
// \a\b\c\index.html     //这个变成了绝对路径

console.log(path.join('/a/b','c','../','index.html'))
//\a\b\index.html     它识别到了../(返回上一级),则c就没有了

console.log(path.join('/a/b','c','./','index.html'))
// \a\b\c\index.html   //./也被识别到了，代表当前同级目录

console.log(path.join('/a/b','c','','index.html'))
// \a\b\c\index.html      //其中一个路径是空的，会将它忽略掉

console.log(path.join(''))
//.
console.log("+++++++++++++++++++++")

//8.规范化路径
/**
 * resolve([from],to)
 * path.normalize() 方法会规范化给定的 path，并解析 '..' 和 '.' 片段。
 *
 * 当发现多个连续的路径分隔符时（如 POSIX 上的 / 与 Windows 上的 \ 或 /），它们会被单个的路径分隔符（POSIX 上是 /，Windows 上是 \）替换。
 * 末尾的多个分隔符会被保留。
 *
 * 如果 path 是一个长度为零的字符串，则返回 '.'，表示当前工作目录。
 */
console.log(path.normalize('a/b/c/d'))
//a\b\c\d   //这个路径本身就很规范了，所以就直接打印了

console.log(path.normalize('a///b/c../d'))
//a\b\c..\d

console.log(path.normalize('a//\\b/c\\/d'))
// a\b\c\d  这个可以处理

console.log(path.normalize('a//\b/c\\/d'))  //\b本身有其他含义
//a\c\d

console.log(path.normalize(''))
//.  返回一个点，代表当前目录
console.log("--------------------------")

//9.返回绝对路径(我们之前使用的join是拼接路径，如果我们前面不写根路径，那拼接成的基本都是相对路径了)
/**
 * path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
 *
 * 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。
 * 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。
 *
 * 如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上。
 *
 * 生成的路径是规范化后的，且末尾的斜杠会被删除，除非路径被解析为根目录。
 *
 * 长度为零的 path 片段会被忽略。
 *
 * 如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。
 *
 * https://blog.csdn.net/CarryBest/article/details/88813745
 */
console.log(path.resolve())
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲
//注意和下面2个全局变量进行区分
console.log(__filename)
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲
console.log(__dirname)
// E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲\02-path.js

console.log("++++++++++++++++++++++++++")

console.log(path.resolve('a','b'));
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲\a\b

console.log(path.resolve('a','/b'));
//E:\b 有点诡异

console.log(path.resolve('/a','b'));
// E:\a\b

console.log(path.resolve(__dirname))
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲

console.log(path.resolve(__dirname,'../dist'))
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\dist(把上一级目录给去掉了)

console.log(path.resolve(__dirname,'./dist'))
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲\dist

console.log(path.resolve(__dirname,'dist'))
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲\dist

console.log(path.resolve(__dirname,'/dist'))
//E:\dist  有点诡异

console.log(path.resolve(__dirname,'\dist'))
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲\dist

console.log(path.resolve('/foo/bar', '/tmp/file/'))
//E:\tmp\file

console.log(path.resolve('/foo/bar', './baz'))
//E:\foo\bar\baz

console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲\wwwroot\static_files\gif\image.gif

console.log(path.resolve('/foo', '/bar', 'baz'))   //E:\bar\baz

console.log(path.resolve("index.html"))
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲\index.html

