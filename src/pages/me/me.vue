<template>
  <div>
    <div class="user-info">

      <!-- 头像 -->
      <div class="header">
        <img
          :src="user.pic"
          alt=""
          class="user-pic"
        >
      </div>
      <!-- 未登录状态 -->
      <button
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
        v-if="!user.nickName"
        class="btn-login"
      >点击登录</button>
      <!-- <div @click="getUserInfo" v-if="!user.nickName">登录</div> -->
      <!-- 昵称 -->
      <div class="name">
        {{user.nickName}}
      </div>
      <!-- 签名 -->
      <div class="signature">
        {{user.signature}}
      </div>
      <!-- 总访问量 -->
      <div class="visit">
        <div class="num">
          总访问量 {{user.visit}}
        </div>
      </div>
    </div>
    <!-- 我的动态 -->
    <div class="classify">
      <div
        v-for="(item,index) in classify"
        :key="index"
        @click="handleClassify(index)"
        :class="{'active':activeIndex===index}"
      >
        {{item}}
      </div>

    </div>
    <div class="main">
      <card
        v-for="item in myData"
        :key="item.id"
        :data="item"
      ></card>
    </div>
  </div>
</template>

<script>
import Card from 'components/card'
export default {
  data () {
    return {
      classify: ['我的动态', '我的好友', '我的商店'],
      activeIndex: 0,
      user: {
        id: 1,
        nickName: '',
        pic: require('../../../static/images/icons/user.png'),
        signature: '浮生若梦，为欢几何',
        gender: 0,
        birthDay: '2019/3/30',
        address: '',
        fans: ['1001', '1002'],
        visit: 1000,
      },
      myData: [
        {
          id: 1,
          author: "时光不染",
          authorPic: require('../../../static/images/author1.jpg'),
          date: '10月22日',
          content: '当岁月走过沧海桑田才明白，生活就是柴米油盐的平淡，是心手相携的温馨，是一个人的苦旅，是挫折坎坷的洗礼。而幸福就在那些平淡的时光里。是一起经历聚散离合后的不离不弃。',
          contentPic: 'https://www.soideas.cn/gl/uploads/allimg/190320/2-1Z320154522-50.jpg',
          tags: ['鸡汤', '岁月'],
          hits: 0,//点击数
          article_status: 0,//文章状态 0 隐藏 1显示
          like: 23
        },
        {
          id: 1,
          author: "时光不染",
          authorPic: require('../../../static/images/author1.jpg'),
          date: '10月22日',
          content: '当岁月走过沧海桑田才明白，生活就是柴米油盐的平淡，是心手相携的温馨，是一个人的苦旅，是挫折坎坷的洗礼。而幸福就在那些平淡的时光里。是一起经历聚散离合后的不离不弃。',
          contentPic: 'https://www.soideas.cn/gl/uploads/allimg/190320/2-1Z320154522-50.jpg',
          tags: ['鸡汤', '岁月'],
          hits: 0,//点击数
          article_status: 0,//文章状态 0 隐藏 1显示
          like: 23
        },
        {
          id: 1,
          author: "时光不染",
          authorPic: require('../../../static/images/author1.jpg'),
          date: '10月22日',
          content: '当岁月走过沧海桑田才明白，生活就是柴米油盐的平淡，是心手相携的温馨，是一个人的苦旅，是挫折坎坷的洗礼。而幸福就在那些平淡的时光里。是一起经历聚散离合后的不离不弃。',
          contentPic: 'https://www.soideas.cn/gl/uploads/allimg/190320/2-1Z320154522-50.jpg',
          tags: ['鸡汤', '岁月'],
          hits: 0,//点击数
          article_status: 0,//文章状态 0 隐藏 1显示
          like: 23
        },
      ]
    }
  },
  created () {
    if (!wx.getStorageSync('LoginSessionKey')) {

    }
    else {

    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '我'
    })
  },
  components: {
    Card
  },
  methods: {
    // 分类点击
    handleClassify (index) {
      this.activeIndex = index;
    },
    getUserInfo (e) {
      let _this = this;
      let userInfo = e.mp.detail.userInfo;
      console.log(e)
      if (!userInfo) {
        return
      }
      this.user.nickName = userInfo.nickName
      this.user.pic = userInfo.avatarUrl
      // 取的用户openid
      wx.login({
        success: function (res) {
          if (res.code) {
            _this.$_POST(_this.$_url.login, { code: res.code, type: 'wxapp' }).then(response => {
              let res = response.data;
              wx.setStorage({
                key: 'skey',
                data: res.skey
              })
            })
          } else {
            console.log(res.errMsg)
          }
        }
      })
    }
  },

}
</script>

<style scoped lang="scss">
.user-info {
  padding: 30px 15px 10px;
  background: url("https://hbimg.huabanimg.com/7443a7356ee5f7538e46fa53d0c85c3bc0af69579a310-wB3A6p_fw658")
    0 0 / 100% 100%;
  text-align: center;
  & > div {
    color: #fff;
  }

  .header {
    text-align: center;
    position: relative;
    .user-pic {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid #fff;
    }
    .icon-hat {
      position: absolute;
      top: 0;
    }
  }
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0 5px;
    font-size: 18px;
  }
  .signature {
    font-size: 12px;
  }
  // 访问量
  .visit {
    text-align: left;
    color: #fff;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }
}
// 分类
.classify {
  display: flex;
  border-style: solid;
  border-width: 1px 0;
  border-color: $--border-color-4;
  & > div {
    flex: 1;
    padding: 15px 0;
    font-size: 15px;
    text-align: center;
    position: relative;
    transition: all 0.3s;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 25px;
      height: 2px;
      background: #4bc39d;
      opacity: 0;
      transition: all 0.3s;
      transform: translateX(-50%);
    }
    &.active {
      color: #4bc39d;
      &::after {
        opacity: 1;
      }
    }
  }
}
.btn-login {
  background: none;
  color: #fff;
  font-size: 15px;
  border: 0;
}
</style>