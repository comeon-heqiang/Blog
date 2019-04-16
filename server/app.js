const path = require("path");
const fs = require('fs')
const http = require('http')
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
// 解析请求体
const bodyParser = require('koa-bodyparser')
//解析静态资源
const static = require("koa-static")
// 引入路由
const article = require('./API/article');
const user = require('./API/user')
const session = require('koa-session');
const port = 3000;
const store = require('./session_store/index')
// 引入 MongoDB 相关文件
let {
  connect,
  initSchemas
} = require("./database/init");
// 设置静态资源访问路径
const staticPath = './public'
app.use(static(path.join(__dirname, staticPath)))
// 解析 body 请求体
app.use(bodyParser())
// koa session
app.keys = ['some secret hurr'];
// const CONFIG = {
//   key: 'koa:sess', //cookie key (default is koa:sess)
//   maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
//   overwrite: true, //是否可以overwrite    (默认default true)
//   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
//   signed: true, //签名默认true
//   rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
//   renew: false, //(boolean) renew session when session is nearly expired,

// };

app.use(session({
  store
}, app));
// router.get('/', async (ctx, next) => {
// ctx.set('Access-Control-Allow-Origin', '*')
// })

// 使用路由
router.use('/article', article.routes());
router.use('/user', user.routes())
app.use(router.routes());
app.use(router.allowedMethods());

// 初始化数据库连接
(async () => {
  await connect();
  initSchemas()
})();

// 监听端口
app.listen(port, () => {
  console.log(`http://localhost:${port}端口启动成功`)
})
