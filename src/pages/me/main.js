import Vue from 'vue'
import me from './me.vue'
const app = new Vue(me)
app.$mount()
export default {
  config: {
    title: "我的"
  }
}
