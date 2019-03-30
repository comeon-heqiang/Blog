<template>
  <div class="card">

    <div class="card-header">
      <div class="author">
        <img
          :src="data.authorPic"
          alt=""
        >
        {{data.author}}
      </div>
    </div>
    <div class="card-main">
      <p>
        {{data.content}}
      </p>
      <div class="img-list">
        <img
          :src="data.contentPic"
          alt=""
          mode="widthFix"
        >
      </div>
    </div>
    <div class="card-footer">
      <!-- 点赞数 -->
      <div
        class="heart"
        @click="handleHeart"
        :class="{'heart-on':isLike}"
      >
      </div>
      <div
        class="like"
        :class="{'like-on':isLike}"
      >
        {{data.like}}
      </div>

      <div class="init">
        {{data.init}}
      </div>
      <!-- 发布时间 -->
      <div class="date">
        <img
          src="../../static/images/icon-date.png"
          alt=""
        >
        {{data.date}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      isLike: false
    }
  },
  mounted () {
    // console.log(this.data)
  },
  methods: {
    handleHeart () {
      this.isLike = !this.isLike
    }
  },
}
</script>

<style scope lang="scss">
.card {
  margin-bottom: 15px;
  padding: 15px;
  background: #fff;
  .card-header {
    .author {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .card-main {
    .img-list {
      display: flex;
      margin: 10px 0 20px;
      image {
        flex: 1;
      }
    }
  }
  .card-footer {
    position: relative;
    padding-left: 30px;
    display: flex;
    color: #bababa;
    & > div {
      color: $--text-color-3;
      margin-right: 10px;
    }
    .heart {
      height: 67px;
      width: 67px;
      position: absolute;
      left: -21px;
      top: -23px;
      background: url("http://www.17sucai.com/preview/11/2016-02-16/%E5%96%9C%E6%AC%A2/images/web_heart_animation.png");
      background-position: left;
      background-repeat: no-repeat;
      background-size: 2900%;
      &.heart-on {
        display: inline-block;
        animation-name: heartBlast;
        animation-duration: 0.8s;
        animation-iteration-count: 1;
        animation-timing-function: steps(28);
        background-position: right;
      }
    }
    .like {
      &.like-on {
        color: #e2264d;
      }
    }
    .date {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }
}
@keyframes heartBlast {
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
}
</style>
