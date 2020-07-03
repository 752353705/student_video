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

// import uniPopupMessage from './components/uni-popup/uni-popup-message.vue'
// Vue.component('uniPopupMessage',uniPopupMessage)

import uniPopupDialog from './components/uni-popup/uni-popup-dialog.vue'
Vue.component('uniPopupDialog',uniPopupDialog)

// 引入上传作品组件
import uniPopupPushvideo from './components/uni-popup/uni-popup-pushvideo.vue'
Vue.component('uniPopupPushvideo',uniPopupPushvideo)

// 引入进度环组件
import cCircle from './components/cCircle.vue'
Vue.component('cCircle',cCircle)



// 封装全局登录函数
// backpage, backtype 2个参数分别代表：
// backpage : 登录后返回的页面
// backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
Vue.prototype.checkLogin = function( backpage, backtype ){
		console.log('这里是check')
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

// 定义一个全局的请求地址头
Vue.prototype.apiServer = 'http://0608.cc/'

// 将get post 请求方法挂载到vue实例上
import {_get} from './API/_get.js'
import {_post} from './API/_post.js'
Vue.prototype._get = _get
Vue.prototype._post = _post

// 定义全局的用户信息便于在其他页面进行用户是否进行登录的判断




Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
		store,
    ...App
})
app.$mount()
