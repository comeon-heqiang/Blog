const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const port = 3000;
router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 200,
  }
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => {
  console.log(`http://localhost:${port}端口启动成功`)
})
