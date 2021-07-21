const { User} = require('../../database/model/User')
const jwt = require('jsonwebtoken')
module.exports = async (req, res) => {
    // res.send('ok')
    // 接收客户端传递过来的账号和密码
    const { username, password } = req.body
    // 根据用户名来查询数据库是否存在这个用户
    const findUser = await User.findOne({
        where: {
            username
        }
    })
    
    // 判断
    if (!findUser) {
        res.status(400).send({
            data: null,
            meta: {
                msg: '用户名不存在!',
                status:4000
            }
        })
        return 
    }
    // 判断账号和密码是否正确
    if (username != findUser.username || password != findUser.password) {
         res.status(400).send({
             data: null,
             meta: {
                 msg: '账号或密码错误!',
                 status: 400
             }
         })
         return
    }
    // 登陆成功后生成token返回给客户端，第一个参数是组，第二个是密钥(自己随便定义)
    const token = jwt.sign({username},'liming')
    // res.send('ok')
     res.status(400).send({
         data: {
             username: username,
             token
         },
         meta: {
             msg: '登陆成功!',
             status: 200
         }
     })
}