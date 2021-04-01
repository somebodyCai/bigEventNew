// 1.引入express 模块
const express = require('express')
// 2.创建服务器
const server = express();

// 2.1设置跨域资源访问
const cors = require('cors')
server.use(cors())



// 2.2静态资源托管
server.use('/uploads', express.static('uploads'))

// 2.3 token 值 验证
const jwt = require('express-jwt');
// app.use(jwt().unless());
// jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless() 约定某个接口不需要身份认证
server.use(jwt({
  secret: 'gz61', // 生成token时的 钥匙，必须统一
  algorithms: ['HS256'] // 必填，加密算法，无需了解
}).unless({
  path: ['/api/login', '/api/register', /^\/uploads\/.*/] // 除了这两个接口，其他都需要认证
}));



// 2.4.1   引入路由中间件  (后台接口路由)
const api_log = require('./api/api_login.js')
const myUser = require('./my/user.js')
const art_router = require('./my/article/art_router.js')
// 2.4.2引入前台接口路由中间件
const index_air = require('./index/index_air.js')


// 2.5使用路由中间件
server.use('/api', api_log)
server.use('/my', myUser)
server.use('/my/article', art_router)
server.use('/index', index_air)



// 2.6 token 错误捕捉
server.use((err, req, res, next) => {
  console.log('有错误', err)
  if (err.name === 'UnauthorizedError') {
    // res.status(401).send('invalid token...');
    res.status(401).send({ code: 1, message: '身份认证失败！' });
  }
});

// 3.开启服务器
server.listen(8808, () => {
  console.log('服务器已在8808端口开启');
})