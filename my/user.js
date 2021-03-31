const express = require('express')

const router = express.Router()

// 引入multer 模块
const multer = require('multer')

// 将获取到的图片保存在 uploads 中
// const upload = multer({ dest: 'uploads' })

// 精细化图片上传的格式
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function (req, file, cb) {
        // console.log('file', file)
        // 目标： 新名字是时间戳+后缀名
        const filenameArr = file.originalname.split('.');
        // filenameArr.length-1是找到最后一个元素的下标
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName) //
    }
})

const upload = multer({ storage })

//1. 获取用户信息
router.get('/userinfo', (req, res) => {

    // console.log(req.query);
    const { username } = req.query
    if (!username) {
        return res.json({ status: 1, message: '获取用户信息失败' })
    }
    // 拼接sql 语句
    let sqlStr = `select * from users where username="${username}"`

    const conn = require('../util/sql.js')

    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: '获取用户信息失败' })
        // const { id, username, nickname, email, ueserPic, password } = result
        res.json({
            "status": 0,
            "message": "获取用户基本信息成功！",
            "data": result[0]
        })
    })
})

router.use(express.urlencoded())

// 2.更新用户信息
router.post('/userinfo', (req, res) => {

    const { id, nickname, email, userPic } = req.body

    let condition = []
    if (id) {
        condition.push(`id="${id}"`)
    }
    if (nickname) {
        condition.push(`nickname="${nickname}"`)
    }
    if (email) {
        condition.push(`email="${email}"`)
    }
    if (userPic) {
        condition.push(`userPic="${userPic}"`)
    }
    const conditionStr = condition.join()

    const sqlStr = `update users set ${conditionStr} where id=${id}`

    const conn = require('../util/sql.js')

    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: '服务器处理失败', code: 500 })
        res.json({ status: 0, message: '修改用户信息成功' })
    })
})


// 3.上传用户头像
router.post('/uploadPic', upload.single('file_data'), (req, res) => {
    // console.log(req.file);
    res.json({
        "status": 0,
        "message": `http://127.0.0.1:8808/${req.file.filename}`
    })
})


// 4.重置密码
router.post('/updatepwd', (req, res) => {
    const { oldPwd, newPwd, id } = req.body

    const conn = require('../util/sql.js')

    let sqlStr1 = `select password from users where id=${id} and password="${oldPwd}"`

    conn.query(sqlStr1, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })

        if (result.length > 0) {
            // console.log(result);
            let sqlStr2 = `update users set password="${newPwd}" where id=${id}`

            conn.query(sqlStr2, (err, result) => {
                if (err) return res.json({ code: 500, message: '服务器处理失败' })

                res.json({
                    "status": 0,
                    "message": "更新密码成功！"
                })
            })
        }
    })
})

module.exports = router