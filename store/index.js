import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		active:0
	},
	mutations: {
		// 用于写修改state中数据的方法
		changeActive(state,num){
			state.active = num
			console.log('store',state.active)
			//根据 num 跳转不同页面
			if(num === 0){
				uni.navigateTo({
				   url: "/pages/list/list"
				});
			}else if(num === 1){
				uni.redirectTo({
				   url: "/pages/find/find"
				});
			}else if(num === 2){
				uni.navigateTo({
				   url: "/pages/add/add"
				});
			}else if(num === 3){
				console.log('3')
				uni.navigateTo({
				   url: "/pages/cpt/cpt"
				});
			}else{
				console.log('4')
				uni.navigateTo({
				   url: "/pages/my/my"
				})
			}
		},
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setTestTrue(state){
			state.testvuex = true
		},
		setTestFalse(state){
			state.testvuex = false
		},
        setColorIndex(state,index){
            state.colorIndex = index
        }
	},
	getters:{
		currentColor(state){
				return state.colorList[state.colorIndex]
		}
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
