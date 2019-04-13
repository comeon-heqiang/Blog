<template>
  <div class="add-article">
    <textarea
      class="edit"
      placeholder="写点什么吧"
      v-model="editContent"
    ></textarea>
    <div
      class="pic"
      v-if="imgSrc"
    >
      <img
        src="../../../static/images/icons/icon-close.png"
        alt=""
        mode="widthFix"
        class="close"
        @click="handleClose"
      >
      <img
        class="img"
        :src="imgSrc"
        alt=""
        mode="widthFix"
      >
    </div>
    <!-- 选择图片 -->
    <div
      class="choose"
      v-else
      @click="chooseImage"
    >
      <img
        src="../../../static/images/icons/icon-camera2.png"
        alt=""
        mode="widthFix"
      >
    </div>
    <div class="fixed-btm">

      <div
        class="btn-submit"
        @click="handleSubmit"
      >
        发表
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editContent: '',
      imgSrc: require('../../../static/images/bg-me.jpg')
    }
  },
  methods: {
    // 删除图片
    handleClose () {
      this.$_showModal('提示', '是否删除图片？').then(res => {
        if (res.confirm) {
          this.imgSrc = ""
        }
      })
    },
    // 选择图片
    chooseImage () {
      let _this = this;
      wx.chooseImage({
        count: 1,	// 默认为9
        sizeType: ['original', 'compressed'],	// 指定原图或者压缩图
        sourceType: ['album', 'camera'],	// 指定图片来源
        success: (res) => {
          var tempFilePaths = res.tempFilePaths
          _this.imgSrc = res.tempFilePaths[0]
          // console.log(res)
        },
        fail: () => {
          console.log('选择图片失败')
        }
      })
    },
    // 提交
    handleSubmit () {
      if (!this.editContent) {
        wx.$_showToast('none', '内容不能为空')
        return;
      }
      this.submitAjax()
    },
    // 发起提交请求
    submitAjax () {
      this.$_POST(this.$_url.addArticle).then(res => {
        if (res) {
          this.$_showToast("", "发表成功")
          wx.switchTab({
            url: '/pages/me/main'
          })
        }
      }).catch(err => {
        console.log(err, '发表文章页')
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.add-article {
  padding: 0 15px;
}
.pic {
  position: relative;
  .close {
    position: absolute;
    width: 25px;
    right: -12px;
    top: -10px;
  }
  .img {
    width: 100%;
  }
}

.edit {
  width: 100%;
  margin-bottom: 20px;
}
.choose {
  img {
    width: 70px;
  }
}
.fixed-btm {
  position: fixed;
  right: 0;
  bottom: 10px;
  left: 0;
  padding: 15px 0;
  background: #fff;
  .btn-submit {
    margin: 0 15px;
    padding: 15px 0;
    color: #362a00;
    font-size: 16px;
    text-align: center;
    background: #ffd945;
    border-radius: 5px;
  }
}
</style>