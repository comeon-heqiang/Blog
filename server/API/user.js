const router = require('koa-router')()
const axios = require('axios')
const crypto = require('crypto');
const mongoose = require('mongoose')
const User = require('../database/schema/user')
const store = require('../session_store/index')
let project = {
  appid: 'wx84a90427d8e2e3c6',
  secret: '26343d1024f8c4fa6ae74d481ebf7878'
}

// 获取登录 oauth 授权，得到用户openid session_key信息
router.post('/login/oauth', async (ctx, next) => {
  let param = ctx.request.body
  let {
    code,
    type
  } = param
  let skey = ''
  // 获取用户 openid 和 session_key
  let result = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid: project.appid,
      secret: project.secret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  })
  let {
    openid,
    session_key
  } = result.data
  // 取得openid判断数据库中是否存在用户信息
  let findUserResult = await User.findOne({
    openId: openid
  }, (err, doc) => {})
  // 数据库查不到用户信息，则为新用户
  if (!findUserResult) {
    // 保存openid到数据库中
    let newUser = new User({
      openId: openid,
      sessionKey: session_key
    })
    newUser.save((err, res) => {
      if (err) {
        console.log(err, '用户信息保存失败')
      }
    })
  }
  ctx.session.openId = openid
  ctx.openId = openid
  let user = store[openid]
  if (!user) {
    user = {
      openId: openid,
      session_key: session_key
    }
    store[openid] = user
  }

  // 存储session信息
  // ctx.cookies.set()
  // 选择加密算法生成自己的登录态标识.使用了sha1算法来生成了一个skey
  skey = encryptSha1(session_key)
  user.skey = skey
  ctx.body = {
    code: 200,
    skey: skey
  }
})
// 获取用户信息
router.get('/info', async (ctx, next) => {
  if (ctx.user) {
    ctx.body = {
      code: 200,
      data: ctx.user
    }
  } else {
    ctx.body = {
      code: 1,
      data: '',
      message: '用户未登录'
    }
  }
})

// 保存用户信息至数据库
router.post('/setUserInfo', async (ctx, next) => {
  // let session_openId = ctx.session.openId
  // let getCookie = ctx.cookies.get('openId')
  let params = ctx.request.body
  let openId = store.openId
  let userInfo = params.userInfo
  let result = await User.update({
    openId
  }, {
    $set: {
      nickName: userInfo.nickName,
      gender: userInfo.gender,
      city: userInfo.city,
      province: userInfo.province,
      country: userInfo.country,
      avatarUrl: userInfo.avatarUrl
    }
  });
  if (result) {
    ctx.body = {
      code: 200,
      message: "保存用户信息成功"
    }
  } else {
    ctx.body = {
      code: 0,
      message: "保存用户信息失败"
    }
  }

  // console.log(session_openId,getCookie,'userInfo API')
  // let result=await User.findOne({openId:})

})
// sha1加密算法
function encryptSha1(data) {
  return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}
module.exports = router
