import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/icon.less'
import '@/styles/reset.less'
// 引入全部样式
import 'vant/lib/index.less'
// 引入单个组件样式
import 'vant/lib/button/style/less'
import dayjs from 'dayjs'
import * as obj from '@/filter/index'
import '@/components'
Vue.use(Vant)
Vue.config.productionTip = false
Object.keys(obj).forEach(key => Vue.filter(key, obj[key]))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
setTimeout(() => {
  // 给页面上所有的元素绑定滚动事件
  //  只要谁滚动 就打印出来
  const list = document.querySelectorAll('*')
  list.forEach(item => {
    item.onscroll = function (e) {

    }
  })
}, 2000)
