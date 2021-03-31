const express = require('express')

const router = express.Router()

// 设置获取 post 参数获取
router.use(express.urlencoded())

// 1.获取文章分类
router.get('/cates', (req, res) => {

    const conn = require('../../util/sql.js')

    const sqlStr = 'select * from categories'

    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })
        res.json({
            "status": 0,
            "message": "获取文章分类列表成功！",
            "data": result
        })

        // console.log(result);
        // res.send('ok5')
    })
    // console.log(res.query);
})


// 2.新增文章分类
router.post('/addcates', (req, res) => {

    // console.log(req.body);
    const { name, slug } = req.body
    // console.log(req.body);

    const conn = require('../../util/sql.js')


    let sqlStr = `insert into categories(name,slug) values("${name}","${slug}")`
    console.log(name, slug);
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ code: 500, message: '服务器处理失败' })
            return
        }
        res.json({
            "status": 0,
            "message": "新增文章分类成功！"
        })
    })
})

// 3.根据  id 删除文章分类
router.get('/deletecate', (req, res) => {

    const { id } = req.query

    let sqlStr = `delete from categories where id=${id}`

    const conn = require('../../util/sql.js')

    conn.query(sqlStr, (err, result) => {
        if (err) return res.send({ code: 500, message: '服务器处理失败' })

        res.json({
            "status": 0,
            "message": "删除文章分类成功！"
        })
    })

})


// 4.根据 id  获取文章分类
router.get('/getCatesById', (req, res) => {

    const { id } = req.query

    const conn = require('../../util/sql.js')

    let sqlStr = `select * from categories where id=${id}`

    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ code: 500, message: '服务器处理失败' })
        }
        res.json({
            "status": 0,
            "message": "获取文章分类数据成功！",
            "data": result
        })
    })
})


// 5.根据 ID 更新文章分类
router.post('/updatecate', (req, res) => {
    // 解构赋值
    const { id, name, slug } = req.body

    let condition = []
    if (id) {
        condition.push(`id="${id}"`)
    }
    if (name) {
        condition.push(`name="${name}"`)
    }
    if (slug) {
        condition.push(`slug="${slug}"`)
    }

    const conditionStr = condition.join()

    const sqlStr = `update categories set ${conditionStr} where id=${id}`

    const conn = require('../../util/sql.js')

    conn.query(sqlStr, (err, result) => {
        if (err) return res.send({ code: 500, message: '服务器处理失败' })

        res.send({
            "status": 0,
            "message": "更新分类信息成功！"
        })
    })
})

module.exports = router