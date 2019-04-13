import Vue from 'vue'
import App from './App'
import '@/assets/scss/public.scss'
import {
  GET,
  POST,
  showToast,
  showModal
} from './utils/ajax'
import url from '@/config/index'
Vue.config.productionTip = false
Vue.prototype.$_GET = GET
Vue.prototype.$_POST = POST
Vue.prototype.$_showToast = showToast
Vue.prototype.$_showModal = showModal
Vue.prototype.$_url=url
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
