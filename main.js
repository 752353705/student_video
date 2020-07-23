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

// import uniPopupMessage from './components/uni-popup/uni-popup-message.vue'
// Vue.component('uniPopupMessage',uniPopupMessage)

import uniPopupDialog from './components/uni-popup/uni-popup-dialog.vue'
Vue.component('uniPopupDialog',uniPopupDialog)

// 引入上传作品组件
import uniPopupPushvideo from './components/uni-popup/uni-popup-pushvideo.vue'
Vue.component('uniPopupPushvideo',uniPopupPushvideo)
import uniPopupPushimg from './components/uni-popup/uni-popup-pushimg.vue'
Vue.component('uniPopupPushimg',uniPopupPushimg)

// 引入进度环组件
import cCircle from './components/cCircle.vue'
Vue.component('cCircle',cCircle)



// 封装全局登录函数
// backpage, backtype 2个参数分别代表：
// backpage : 登录后返回的页面
// backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
// Vue.prototype.checkLogin = function( backpage, backtype ){
// 		console.log('这里是check')
//     // 同步获取本地数据（uid、随机码、用户名、头像）
//     var user_id = uni.getStorageSync('user_id'); 
//     var user_img = uni.getStorageSync('user_img'); // 用户头像
//     var user_name = uni.getStorageSync('user_name');//用户名
//     var user_fa = uni.getStorageSync('user_fa');
//     if( user_id == '' || user_img == '' || user_fa == ''){
//         // 使用重定向的方式跳转至登录页面
//         uni.redirectTo({url:'/login/login?backpage='+backpage+'&backtype='+backtype});
//         return false;
//     }
//     // 登录成功、已经登录返回数组 [用户 id, 用户随机码, 用户昵称, 用户表情]
//     return [user_id, user_img, user_name, user_fa];
// }

// 定义一个全局的请求地址头
Vue.prototype.api_root = 'http://47.93.148.235:8082/wx/'
// 记录用户是否已经进行成功登录
Vue.prototype.hasLogin = false


// 将get post 请求方法挂载到vue实例上
import {_get} from './API/_get.js'
import {_post} from './API/_post.js'
Vue.prototype._get = _get
Vue.prototype._post = _post

// 定义全局的用户信息便于在其他页面进行用户是否进行登录的判断




Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
