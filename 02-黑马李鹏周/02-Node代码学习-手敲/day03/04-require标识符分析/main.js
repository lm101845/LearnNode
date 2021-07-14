// 如果是非路径形式的模块标识
// require('模块标识')

// require('foo.js')
// 这样写是不会把它当作路径的，可能会把它当成核心模块，也可能会把它当成第三方模块

// 路径形式的模块必须以
//   ./     当前目录，不可省略
//   ../    上一级目录，也不可省略
//   /xxx      /xxx几乎不用
//   d:/a/foo.js    这个是绝对路径，也几乎不用(项目的代码跟着项目走，而不是跟着你的电脑走)
// 这样的开头
// 首位的 / 在这里表示的是当前文件模块所属磁盘根路径

// 但是.js后缀名可以省略

require('./foo.js')


// 核心模块
// 核心模块的本质也是文件
// 核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载就可以了
// require('fs')
// require('http')

// 第三方模块
// 凡是第三方模块都必须通过第三方模块进行下载
// 使用的时候就可以通过require(包名)来进行加载才可以使用
// 不可能有任何一个第三方包和核心模块的名字是一样的
// 既不是核心模块也不是路径形式的模块
//      先找到当前文件所属目录中的node_modules目录
// 只要你装包，node_modules目录会被自动创建出来
//      node_modules/art-template
//      node_modules/art-template/package.json文件
//      node_modules/art-template/package.json文件中的main属性
//      main属性中就记录了art-template中的入口模块
//      然后加载使用这个第三方包
//      实际上最终加载的还是文件

//      如果package.json文件不存在，或者main指定的入口模块也没有
//      则node会自动找该目录下的index.js
//      也就是说index.js会作为一个默认备选项

//      如果以上所有任何一个条件都不成立，则会进入上一级的node_modules目录查找
//      如果上级还没有，则继续往上上级去查找
//      如果直到当前磁盘根目录还找不到，最后报错：can not find module xxx
var template = require('art-template')

require('a')

//注意：我们一个项目有且只有一个node_modules，放在项目根目录中
// 这样的话项目中所有子目录都会加载到第三方包
// 不会出现多个node_modules
// 模块查找机制 
//      优先从缓存加载
//      核心模块
//      路径形式的文件模块
//      第三方模块
