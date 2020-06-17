// 发送 post 请求

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
 