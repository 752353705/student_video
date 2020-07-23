// 发送 get 请求
export const _get = function(url, data, success, check_login, msg){
	console.log('进行get请求')
	let _this = this
	// 请求开始弹出正在加载弹框
	uni.showLoading({
	  title: '加载中...',
		mask:true
	});

	// if(!wx.getStorageSync('token')){
	// 	uni.showModal({
	// 		title: '友情提示',
	// 		content: "请先进行登录",
	// 		success: function (res) {
	// 			if (res.confirm) {
	// 					console.log('用户点击确定  跳转到登录界面');
	// 					uni.navigateTo({
	// 						url:"/pages/login/login"
	// 					})
						
						
	// 			} else if (res.cancel) {
	// 					console.log('用户点击取消');
						
	// 			}
	// 		}
	// 	})
	// 	return false
	// }


	// 构造请求参数
	data = data || {}
	// data.wxapp_id = 10001;
	// data.applets = 25
	// data.token = uni.getStorageSync('token') || '';
	
	//构造get请求
	uni.request({
	    url: _this.api_root + url, //仅为示例，并非真实接口地址。
	    header: {
	      'content-type': 'application/json', //自定义请求头信息
				'X-Xsh-Token': wx.getStorageSync('token') || ''
	    },
	    data: data,
	    success: (res) => {
				//success
				//判断返回的状态码
				if (res.statusCode !== 200 || typeof res.data !== 'object') {
					if (!msg) {
						uni.showModal({
						    title: '友情提示',
						    content: '网络请求出错',
						    success: function (res) {
									if (res.confirm) {
											console.log('用户点击确定');
									} else if (res.cancel) {
											console.log('用户点击取消');
									}
						    }
						})
					}
					return false;
				}
					// 用户登录态消失
				if(res.data.errno === 501){
					uni.showModal({
						title: '友情提示',
						content: res.data.errmsg,
						success: function (res) {
							if (res.confirm) {
								// 跳转到用户的登录界面
								uni.navigateTo({
									url:"/pages/login/login.vue"
								})
								
								
							} else if (res.cancel) {
									console.log('用户点击取消');
							}
						}
					})
					return false;
				}
				// 判断用户登录态是否失效
				// if (res.data.code === -1) {
				// 	// 登录态失效, 重新登录
				// 	console.log('用户登录态失效')
				// } else if (res.data.code === 0 || res.code === 0) {
					
				// }
				
				success && success(res.data);
	    },
			fail: function (res) {
				uni.showModal({
					title: '友情提示',
					content: '网络繁忙,请重试',
					success: function (res) {
						if (res.confirm) {
								console.log('用户点击确定');
						} else if (res.cancel) {
								console.log('用户点击取消');
						}
					}
				})
				
			},
			complete: function (res) {
				uni.hideLoading();
			},
	});
}