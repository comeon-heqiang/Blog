<template>
  <div class="classify">
    <scroll-view
      :scroll-x="true"
      class="category"
    >
      <div
        v-for="item in categoryData"
        :key="item.id"
      >
        {{item.text}}
      </div>
    </scroll-view>
    <!-- 栏目列表 -->
    <ul class="list">
      <li
        v-for="(item,index) in classifyData"
        :key="index"
        @click="handleClassify(item)"
      >
        <img
          :src="item.pic"
          alt=""
        >
        <p>
          {{item.text}}
        </p>
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryData: [
        {
          id: 1,
          text: '推荐'
        },
        {
          id: 2,
          text: '表情'
        },
        {
          id: 3,
          text: '文字'
        },
        {
          id: 4,
          text: '节日'
        },
        {
          id: 5,
          text: '心情'
        }
      ],
      classifyData: [
        {
          id: 1,
          text: '户外',
          pic: require('../../../static/images/categoryIcon/icon-travel.png'),

        },
        {
          id: 2,
          text: '游戏',
          pic: require('../../../static/images/categoryIcon/icon-game.png'),
        },
        {
          id: 3,
          text: '摄影',
          pic: require('../../../static/images/categoryIcon/icon-camera.png'),
        },
        {
          id: 4,
          text: '读书',
          pic: require('../../../static/images/categoryIcon/icon-reading.png'),
        },
        {
          id: 5,
          text: '电影',
          pic: require('../../../static/images/categoryIcon/icon-video.png'),
        },
        {
          id: 6,
          text: '工作',
          pic: require('../../../static/images/categoryIcon/icon-work.png'),
        },
      ]
    }
  },
  methods: {
    // 栏目点击跳转详情页
    handleClassify (item) {      
      wx.navigateTo({
        url: `/pages/classifyDetail/main?id=${item.id}&name=${item.text}`
      })
    }
  },
}
</script>

<style scoped lang="scss">
.classify {
  padding: 0 15px;
}
.category {
  white-space: nowrap;
  margin-bottom: 15px;
  div {
    display: inline-block;
    vertical-align: middel;
    width: 65px;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    color: #fff;
    text-align: center;
    background: #7dabbb;
    border-radius: 5px;
    &:nth-child(2) {
      background: #b4df9a;
    }
    &:nth-child(3) {
      background: #fbd767;
    }
    &:nth-child(4) {
      background: #9cdbed;
    }
    &:nth-child(5) {
      background: #86d6d5;
    }
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 78.75px;
    height: 78.75px;
    margin: 0 0 10px 10px;
    border: 1px solid #ecf0f3;
    background: #f1f5f6;
    border-radius: 10px;
    box-sizing: border-box;
    &:nth-child(4n + 1) {
      margin-left: 0;
    }
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>