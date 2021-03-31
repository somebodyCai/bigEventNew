//1. 引入 mysql模块
const mysql = require('mysql')
// console.log(mysql);

// 2.创建连接对象
const connection = mysql.createConnection({
    // 对象的属性名字不能改变
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bignew'
});

// 3. 连接到MySQL服务器
connection.connect((err) => {
    // 如果有错误对象，表示连接失败
    if (err) return console.log('数据库连接失败')
    // 没有错误对象提示连接成功
    console.log('mysql数据库连接成功')
});

// 测试数据库连接
// connection.query('select * from users', (err, result) => {
//     if (err) return console.log(err);
//     console.log(result);
// })

// 导出模块
module.exports = connection