const router = require('koa-router')()
const axios = require('axios')
const crypto = require('crypto');

let project = {
  appid: 'wx84a90427d8e2e3c6',
  secret: '26343d1024f8c4fa6ae74d481ebf7878'
}
let users = {
  // openId 作为索引
  // openId: {
  //   // 数据结构如下
  //   openId: '', // 理论上不应该返回给前端
  //   sessionKey: '',
  //   nickName: '',
  //   avatarUrl: '',
  //   unionId: '',
  //   phoneNumber: ''
  // }
}


router.post('/login/oauth', async (ctx, next) => {
  let param = ctx.request.body
  let {
    code,
    type
  } = param
  const skey = ''
  if (type === 'wxapp') {
    // 获取openId
    await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid:project.appid,
        secret: project.secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    }).then(response => {
      let res = response.data
      let openId = res.openid
      let user = users[openId]
      if (!user) {
        user = {
          openId,
          sessionKey: res.session_key
        }
        users[openId] = user
        console.log("新用户")
      } else {
        console.log('老用户')
      }
      ctx.session.openId = user[openId]
      console.log(user,'sessionKey')
      // 选择加密算法生成自己的登录态标识
      skey = encryptSha1(user.sessionKey)
    }).then(() => {
      ctx.body = {
        code: 200,
        skey
      }
    })
  }
})

function encryptSha1(data) {
  return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}
module.exports = router
