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

// 封装全局登录函数
// backpage, backtype 2个参数分别代表：
// backpage : 登录后返回的页面
// backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
Vue.prototype.checkLogin = function( backpage, backtype ){
    // 同步获取本地数据（uid、随机码、用户名、头像）
    var user_id = uni.getStorageSync('user_id');
    var user_nu = uni.getStorageSync('user_nu');
    var user_nm = uni.getStorageSync('user_nm');
    var user_fa = uni.getStorageSync('user_fa');
    if( user_id == '' || user_nu == '' || user_fa == ''){
        // 使用重定向的方式跳转至登录页面
        uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
        return false;
    }
    // 登录成功、已经登录返回数组 [用户 id, 用户随机码, 用户昵称, 用户表情]
    return [user_id, user_nu, user_nm, user_fa];
}
// 定义一个全局的请求地址
Vue.prototype.apiServer = 'http://0608.cc/'




Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
		store,
    ...App
})
app.$mount()
