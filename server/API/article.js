const router = require('koa-router')()
// 获取文章列表
router.get('/list', async (ctx, next) => {

})
// 添加文章
router.post('/addArticle', async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
    code: 200,
    msg: 'success'
  }
})
module.exports = router
