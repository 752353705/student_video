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

import uniPopupDialog from './components/uni-popup/uni-popup-dialog.vue'
Vue.component('uniPopupDialog',uniPopupDialog)

// 引入进度环组件
import cCircle from './components/cCircle.vue'
Vue.component('cCircle',cCircle)

// 将网络请求集中进行处理
import {api} from './API/_api.js'
Vue.prototype.api = api

// 页面之间 进行返回的 时候，修改上一个页面栈中的数据
Vue.prototype.$eventHub = new Vue();




Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
