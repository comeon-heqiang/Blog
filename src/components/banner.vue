<template>
  <div>
    <swiper
      :indicator-dots="indicatorDots"
      :autoplay="autoPlay"
      :interval="interval"
      :duration="duration"
      :indicator-color="indicatorColor"
      :indicator-active-color="indicatorActiveColor"
      class="banner"      
      @change="bannerChange"
    >
      <swiper-item
        v-for="item in bannerList"
        :key="item.id"
        @click="itemClick(item)"
      >
        <image
          class="swiper-image"
          :src="item.src"
          mode="widthFix"
        />
        <!-- <div class="title">
          {{item.title}}
        </div> -->
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Array,
      required: true
    },
    indicatorDots: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      default: 5000
    },
    duration: {
      default: 500
    },
    indicatorColor: "",
    indicatorActiveColor: {
      default: "#fff"
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 切换事件
    bannerChange (e) {
      this.$emit('handleChange', e.mp)
    },
    // 单个banner点击触发事件
    itemClick(e){
      this.$emit('itemClick',e)
    }
  },
}
</script>

<style scoped lang="scss">
.banner {
  swiper-item {
    position: relative;
    image {
      display: block;
      width: 100%;
    }
    .title {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      background: rgba(0, 0, 0, 0.6);
      box-sizing: border-box;
    }
  }
}
</style>