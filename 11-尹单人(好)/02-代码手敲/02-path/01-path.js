/**
 * @Author liming
 * @Date 2022/11/21 20:55
 **/

const path = require('path');

//1.获取路径中的基础名称
/**
 * 1.返回的就是接收路径当中的【最后一部分】
 * 2.第二个参数表示扩展名，如果说没有设置则返回完整的文件名称带后缀
 * 3.第二个参数作为后缀时，如果没有在当前路径中被匹配到，那么就会忽略
 * 4.处理目录路径的时候如果说，结尾处有路径分割符，则也会被忽略掉
 */
console.log(__filename,'--完整的')   //当前脚本文件执行的完整路径
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲\01-path.js

console.log(path.basename(__filename),'--通过basename处理过的结果')  //path.basename() 方法返回一个 path 的最后一部分
// 01-path.js

console.log(path.basename(__filename,'.js'),'--如果后缀对的，就不返回后缀了')
//06-path

console.log(path.basename(__filename,'.css'),'--如果后缀不对，就把后缀整体返回了')
//01-path.js


console.log(path.basename('/a/b/c'))  //返回的就是path路径的【最后一个部分】，不管这个部分是文件还是一个目录
//c

console.log(path.basename('/a/b/c/'))  //如果结果有目录分隔符/,它会自动忽略掉，就跟没有一样
//c


console.log("====================================")

//2.获取路径目录名(路径)
/**
 * 1.返回路径中最后一个部分的上一层目录所在路径
 * path.dirname() 方法返回一个 path 的目录名
 */
console.log(path.dirname(__filename))
//E:\01-code\06-LearnNode★\LearnNode\11-尹单人(好)\02-代码手敲
console.log(path.dirname('/a/b/c'))
///a/b
console.log(path.dirname('/a/b/c/'))
///a/b   (仍然没有处理最后面的路径分割符)

console.log("***********************************")

//3.获取路径的扩展名
/**
 * 1.返回path路径中相应文件的后缀名
 * 2.如果path路径中存在多个点，它匹配的是最后一个点，到结尾的内容
 * path.extname() 方法返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。
 * 如果 path 的最后一部分没有 . 或 path 的文件名（见 path.basename()）的第一个字符是 .，则返回一个空字符串。
 */
console.log(path.extname(__filename))
//.js
console.log(path.extname('/a/b'))
//空
console.log(path.extname('/a/b/index.html.js.css'))
//.css

console.log(path.extname('.index'));
//空

console.log(path.extname('a.js.'))
//.

