// 发送 post 请求
	
	// 进行登录
	export const _postUser = function(url, data, success, check_login, msg){
		
		// 请求开始弹出正在加载弹框
		uni.showLoading({
			title: '正在登陆'
		});
		
		// 构造请求参数
		
		
		//构造post请求
		uni.request({
			url: _this.apiServer + 'appletsUserInfo',  //用户进行提交数据的地址
			data: {
				openid: _this.openId,
				avatarUrl: _this.userInfo.avatarUrl,
				city: _this.userInfo.city,
				country: _this.userInfo.country,
				gender: _this.userInfo.gender,
				language: _this.userInfo.language,
				nickName: _this.userInfo.nickName
			},
			method: 'POST',
			success: res => {
				if (res.data.code != 0) {
					uni.showToast({ title: res.data.msg, icon: 'none' });
					return false;
				}
				// 用户信息写入缓存
				uni.showToast({ title: '登录成功' });
				uni.setStorageSync('user_id', res.data.res.u_id);
				uni.setStorageSync('user_nm', res.data.res.u_nickName);
				uni.setStorageSync('user_fa', res.data.res.u_avatarUrl);
				uni.setStorageSync('user_nu', res.data.res.u_regtime);
				// 然后跳回原页面
				if (_this.pageOption.backtype == 1) {
					uni.redirectTo({ url: _this.pageOption.backpage });
				} else {
					uni.switchTab({ url: _this.pageOption.backpage });
				}
			},
			fail: () => {
				uni.showToast({ title: '用户信息操作失败', icon: 'none' });
			}
		});
		
		
	}
	
	
	
	// 上传视频
	export const _postVideo = function(url, data, success, check_login, msg){
		
		// 请求开始弹出正在加载弹框
		uni.showLoading({
			title: '正在上传'
		});
		
		// 构造请求参数
		
		
		//构造post请求
		uni.request({
		    url: url, //仅为示例，并非真实接口地址。
		    data: data,
		    header: {
		      'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
		    },
				method: 'POST',
				// 接口调用成功
		    success: (res) => {
					// 判断网络状态
					if (res.statusCode !== 200 || typeof res.data !== 'object') {
						App.showError('网络请求出错');
						return false;
					}
					console.log(res.data);
					this.text = 'request success';
		    }
		});
	}
	