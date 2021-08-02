// 导入模型
const {
    User
} = require('../../database/model/User')
// 导出
module.exports = async (req, res) => {
    // res.send('注册功能完成')
    // 接收客户端传递过来的信息f
    const {
        username,
        password
    } = req.body
    // res.send({
    //     username,
    //     password
    // })

    // 根据客户端传递过来的用户名查询数据库中是否存在用户名
    const model = await User.findOne({
        where: {
            username
        }
    })

    // 判断
    if (model) {
        res.status(400).send({
            // msg: '用户名已经存在!'
            data: null,
            meta: {
                msg: '用户名已经存在!',
                status:400
            }
        })
        return
    }
    // res.send('ok')
    // 创建用户
    // User.create({ username: 'admin', password: '123456' }).then(user => {
    //     console.log('创建成功!' + user.username);
    // })
    const createUser = await User.create({ username, password })
    res.status(201).send({
        data: {
            createUser
        },
        meta: {
            msg: '创建成功!',
            status:201
        }
    })
}