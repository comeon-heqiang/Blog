const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema=new Schema({
  id:String,
  nickName:String,
  avatarUrl:String,
  gender:Number,
  country:String,
  province:String,
  city:String,  
  sKey:String
})
mongoose.model('user',userSchema)