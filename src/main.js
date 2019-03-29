import Vue from 'vue'
import App from './App'
import '@/assets/scss/public.scss'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
