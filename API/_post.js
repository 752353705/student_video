// // 发送 post 请求
	export const _post = function(url, data, success, fail, complete){
		
		let _this = this 
		// 请求开始弹出正在加载弹框
		// uni.showLoading({
		// 	title: '加载中...',
		// 	mask:true
		// });
		
		// 如果用户没有进行登录，诱导用户登录
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
		// data.wxapp_id = App.siteInfo.uniacid;
		// data.token = wx.getStorageSync('token');
		//构造post请求
		console.log('进行post请求')

		uni.request({
			url:_this.api_root + url,  //用户进行提交数据的地址
			header: {
				'Content-Type': 'application/json',
				'X-Xsh-Token': wx.getStorageSync('token') || ''
			},
			method: 'POST',
			data: data,
			success: res => {
				console.log('post 请求结果==》res',res)
				if (res.statusCode !== 200 ) {
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
					return false;
				}
				
				// 如果用户登录状态失效
				if(res.data.errno == 501){
					uni.showModal({
						title: '友情提示',
						content: res.data.errmsg,
						success: function (res) {
							if (res.confirm) {
									console.log('用户点击确定  跳转到登录界面');
									uni.navigateTo({
										url:"/pages/login/login"
									})
									
									
							} else if (res.cancel) {
									console.log('用户点击取消');
							}
						}
					})
					return false
				}
				
				// 出现其他的问题
				if(res.data.errno !== 0){
					uni.showModal({
						title: '友情提示',
						content: res.data.errmsg,
						success: function (res) {
							if (res.confirm) {
									console.log('用户点击确定');
							} else if (res.cancel) {
									console.log('用户点击取消');
							}
						}
					})
					return false;
				}
				        
				
				
				// 成功执行
				success && success(res.data)
			},
			fail: () => {
				uni.showModal({
					title: '友情提示',
					content: '网络繁忙，请重试',
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
				uni.hideLoading()
				complete && complete(res);
			}
		});
	}
	
	
	
	