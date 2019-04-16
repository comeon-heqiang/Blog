const serverUrl = "http://localhost:3000";
const url = {
  addArticle: `${serverUrl}/article/addArticle`,
  login: `${serverUrl}/user/login/oauth`, // 用户登录
  setUserInfo: `${serverUrl}/user/setUserInfo` // 提交用户基本信息
}
export default url
