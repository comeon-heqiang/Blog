const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const userSchema = new Schema({
  id: ObjectId,
  openId: String, // 小程序用户id
  nickName: String, // 昵称
  gender: Number, // 性别
  city: String, // 城市
  province: String, // 省份
  country: String, // 国家
  avatarUrl: String, // 头像
  phoneNumber: Number, // 电话
  sessionKey: String // 微信登录session_key
})
module.exports = mongoose.model('User', userSchema)
