import Vue from 'vue'
import App from './App'

// 引入状态管理
import store from 'store/index.js'
Vue.prototype.$store = store

// 引入弹窗组件
import tabbar from './components/tabbar.vue'
Vue.component('tabbar',tabbar)

import uniPopup from './components/uni-popup/uni-popup.vue'
Vue.component('uniPopup',uniPopup)

import uniPopupMessage from './components/uni-popup/uni-popup-message.vue'
Vue.component('uniPopupMessage',uniPopupMessage)

import uniPopupDialog from './components/uni-popup/uni-popup-dialog.vue'
Vue.component('uniPopupDialog',uniPopupDialog)

import uniPopupShare from './components/uni-popup/uni-popup-share.vue'
Vue.component('uniPopupShare',uniPopupShare)

import uniPopupComments from './components/uni-popup/uni-popup-comments.vue'
Vue.component('uniPopupComments',uniPopupComments)

import uniPopupGifts from './components/uni-popup/uni-popup-gifts.vue'
Vue.component('uniPopupGifts',uniPopupGifts)


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
		store,
    ...App
})
app.$mount()
