<template>
  <div>
    <div
      class="loading"
      v-show="loadingStaus"
    >
      {{loadingText}}
    </div>
    <!-- banner 轮播图 -->
    <index-banner
      :bannerList="bannerData"
      :autoPlay="true"
      @itemClick="bannerItemClick"
      @handleChange="bannerChange"
    ></index-banner>
    <!-- 热门分类 -->
    <div class="hot">
    </div>
    <!-- <loading :text="正在刷新"></loading> -->

    <!-- 文章列表 -->
    <div class="article-list">
      <card
        v-for="item in cardData"
        :key="item.id"
        :data="item"
      ></card>
    </div>

  </div>

</template>

<script>
import indexBanner from 'components/banner'
import Card from 'components/card'
import url from '@/config/index'
// import Loading from "components/loading"
export default {
  data () {
    return {
      loadingStaus: false,
      loadingText: '正在刷新',
      bannerData: [
        {
          id: 1,
          title: "标题1",
          src: 'http://localhost:3000/banner/banner1.jpg',
          link: ""
        },
        {
          id: 2,
          title: "标题2",
          src: 'http://localhost:3000/banner/banner2.jpg',
          link: ""
        },
        {
          id: 3,
          title: "标题3",
          src: 'http://localhost:3000/banner/banner3.jpg',
          link: ""
        },
        {
          id: 4,
          title: "标题4",
          src: 'http://localhost:3000/banner/banner4.jpg',
          link: ""
        },
      ],
      cardData: [
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
          id: 2,
          author: "时光不染",
          authorPic: require('../../../static/images/author1.jpg'),
          date: '10月22日',
          content: '给生命一个微笑，用微笑面对人生。就如苍鹰自信地去搏击长空，就如河流欢快着去融入大海。为了未来美一点，现在必须苦一点。低头不算认输，放弃才是懦夫。我拼搏，就一个理由，我要得到我想要的东西。',
          contentPic: 'https://www.soideas.cn/gl/uploads/allimg/180825/2-1PR5103J4.jpg',
          tags: ['鸡汤', '岁月'],
          hits: 0,//点击数
          article_status: 0,//文章状态 0 隐藏 1显示
          like: 200
        }
      ]
    }
  },
  
  components: {
    indexBanner,
    Card
  },
  methods: {
    // banner点击事件
    bannerItemClick (e) {
      wx.navigateTo({
        url: '/pages/detail/main?id' + e.id
      })
    },
  },
  // 页面触底 
  onReachBottom: function () {
    console.log('上拉加载')
    //执行上拉执行的功能
    // this._getRegisterInfo();
  },
  // 下拉刷新
  async onPullDownRefresh () {
    this.loadingStaus = true;
    this.$_GET(url.getList).then(res => {
      // console.log(res)
      this.cardData = res.result;
      this.loadingStaus = false;
      this.loadingText = "刷新完成"
      this.$_showToast('刷新成功')
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scoped lang="scss">
.article-list {
  background: $--border-color-4;
}
.loading {
  text-align: center;
  margin-bottom: 10px;
}
</style>