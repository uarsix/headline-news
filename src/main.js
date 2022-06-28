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

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
