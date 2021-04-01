const express = require('express')

const router = express.Router()

const conn = require('../util/sql.js')

// 引入获取日期第三方模块
const newDate = require("silly-datetime");

// 引入当前时间戳
const newTime = new Date();


// 根据read字段查询表中7条数据
// SELECT id,title FROM `articles`  order by `read` desc limit 7

// 随机查询表中5条数据
// SELECT * FROM articles ORDER BY RAND() LIMIT 5

// 获取post参数
router.use(express.urlencoded())


// 1.文章搜索接口
router.get('/search', (req, res) => {
    let sqlStr = `select * from articles`
    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })
        // const { id, name } = result
        // console.log(result);
        res.json({ code: 200, message: '请求成功', data: result }) //{ id, name }
    })
})

// 2.文章类型接口
router.get('/category', (req, res) => {
    let sqlStr = `select * from categories`
    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })
        // const { id, name } = result
        console.log(result);
        res.json({ code: 200, message: '请求成功', data: result }) //{ id, name }
    })
})

// 3.文章热点图接口
router.get('/hotpic', (req, res) => {
    let sqlStr = `select * from hotpic ORDER BY RAND() LIMIT 5`  // SELECT * FROM articles ORDER BY RAND() LIMIT 5
    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })
        // const { id, name } = result
        console.log(result);
        res.json({ code: 200, message: '请求成功', data: result }) //{ id, name }
    })
})

// 4.最新资讯接口
router.get('/latest', (req, res) => {
    let sqlStr = `select * from latest ORDER BY RAND() LIMIT 5`
    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })
        // const { id, name } = result
        console.log(result);
        res.json({ code: 200, message: '请求成功', data: result }) //{ id, name }
    })
})

// 5.最新评论接口
router.get('/latest_comment', (req, res) => {
    let sqlStr = `select * from latest_comment ORDER BY RAND() LIMIT 6`
    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })
        // const { id, name } = result
        console.log(result);
        res.json({ code: 200, message: '请求成功', data: result }) //{ id, name }
    })
})

// 6.焦点关注接口
router.get('/attention', (req, res) => {
    let sqlStr = `select * from attention ORDER BY RAND() LIMIT 7`
    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })
        // const { id, name } = result
        console.log(result);
        res.json({ code: 200, message: '请求成功', data: result }) //{ id, name }
    })
})

// 7.文章详情接口
router.get('/article', (req, res) => {
    const { id } = req.query
    let sqlStr = `select * from article where id=${id}`
    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })
        // const { id, name } = result
        console.log(result);
        res.json({ code: 200, message: '请求成功', data: result }) //{ id, name }
    })
})

// 8.发表评论 接口
router.post('/post_comment', (req, res) => {
    const { author, content, articleId } = req.body
    // const date,state,time
    let date = newDate.format(new Date(), 'YYYY-MM-DD');
    let time = newTime.toLocaleTimeString();
    let state = '待审核'
    
    let sqlStr = `insert into comments(author,content,articleId,date,time,state) values("${author}","${content}","${articleId}","${date}","${time}","${state}")`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ code: 500, message: '服务器处理失败' })
        }
        // const { id, name } = result
        console.log(result);
        res.json({ code: 200, message: '请求成功', data: result }) //{ id, name }
    })
})

// 9.评论列表接口
router.get('/get_comment', (req, res) => {
    const { articleId } = req.query
    let sqlStr = `select * from comments where articleId=${articleId}`
    conn.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: '服务器处理失败' })
        // const { id, name } = result
        console.log(result);
        res.json({ code: 200, message: '请求成功', data: result }) //{ id, name }
    })
})

module.exports = router