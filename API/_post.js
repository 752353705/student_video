// 发送 post 请求
	
	// 进行登录
	export const _post = function(url, data, success, fail, complete){
		let _this = this 
		
		// 请求开始弹出正在加载弹框
		uni.showLoading({
			title: '正在登陆'
		});
		
		// 构造请求参数
		// data.wxapp_id = App.siteInfo.uniacid;
		// data.token = wx.getStorageSync('token');
		
		//构造post请求
		uni.request({
			url: _this.app_root + url,  //用户进行提交数据的地址
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
			data: data,
			success: res => {
				if (res.statusCode !== 200 || typeof res.data !== 'object') {
					App.showError('网络请求出错');
					return false;
				}
				//判断登录态
				
				
				// 成功执行
				success
			},
			fail: () => {
				
			},
			complete: function (res) {
				
			}
		});
	}
	
	
	
	