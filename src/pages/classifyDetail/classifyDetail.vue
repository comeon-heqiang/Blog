<template>
  <div class="detail">  
    <detail-card
      v-for="item in cardData"
      :key="item.id"
      :data="item"
    ></detail-card>
  </div>
</template>

<script>
import DetailCard from 'components/card'
export default {
  data () {
    return {
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
      ],
      id: 0,
      categoryName: ''
    }
  },
  components: {
    DetailCard
  },
  onLoad () {
    this.id = this.$root.$mp.query.id
    this.categoryName = this.$root.$mp.query.name
    wx.setNavigationBarTitle({
      title: this.categoryName || '栏目'
    })
  },
  onShow () {


  },
}
</script>

<style lang="scss" scoped>
.detail{
  background: #F2F6FC;
}
</style>