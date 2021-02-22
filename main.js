import Vue from 'vue'
import App from './App'

// 引入uView
import uView from "uview-ui";
Vue.use(uView);

// 处理滚动部分下拉刷新
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)	

import uniPopup from './components/uni-popup/uni-popup.vue'
Vue.component('uniPopup',uniPopup)


// 重写的 http 请求
import {http} from './API/http.js'
Vue.prototype.http = http



Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
