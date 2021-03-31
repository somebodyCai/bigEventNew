// 1.引入express 模块
const express = require('express')

// 2.引入路由中间件
const router = express.Router()

// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken')

// 获取用户 post请求 参数
router.use(express.urlencoded())

// 3. 注册路由
router.post('/register', (req, res) => {
    // console.log(req.body); 3.1将获取到的参数结构赋值
    const { username, password } = req.body
    // console.log(username);
    // 3.2 拼接 sql语句
    let sqlStr = `insert into users(username,password) values("${username}","${password}")`
    // 3.3 数据库 连接
    const conn = require('../util/sql.js')
    // 拼接sql 语句 查询 用户名是否被占用
    let sqlStr2 = `select * from users where username="${username}"`
    // 查询 用户名是否存在
    conn.query(sqlStr2, (err, result) => {
        if (err) {
            // console.log(err);
            res.send({ status: 1, message: '注册失败' })
            return
        }

        if (result.length > 0) {
            // console.log(result);
            return res.send({ status: 1, message: '注册失败,用户名已被占用' })  //{ status: 1, message: '注册失败' }
        } else {
            // 当查询结果为空说明 用户名不存在即可注册为新用户
            conn.query(sqlStr, (err, result) => {
                if (err) {
                    // console.log(err);
                    res.send(err)
                    return
                }
                res.send({ status: 0, message: '注册成功' })
                // console.log(result);
            })
        }
    })
})

// 4. 登录路由
router.post('/login', (req, res) => {

    // 4.1解构赋值 获取 用户名与密码
    const { username, password } = req.body
    // 4.2根据获取到的参数拼接查询sql语句
    let sqlStr = `select * from users where username="${username}" and password=${password}`

    const conn = require('../util/sql.js')
    //4.3 连接数据库执行sql语句
    conn.query(sqlStr, (err, result) => {

        if (err) return res.send({ status: 1, message: '登录失败' })
        // console.log(result);
        if (result.length > 0) {
            let token = jwt.sign(
                { name: username },
                'gz61',  // 加密的密码，要与express-jwt中的验证密码一致
                // { expiresIn: 2 * 60 * 60 } // 过期时间，单位是秒
            )
            token = 'Bearer ' + token
            res.json({ msg: "登陆成功", code: 200, token })
        } else {
            res.json({ msg: "登陆失败，用户名密码不对", code: 201 })
        }
    })
})


module.exports = router