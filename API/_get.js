// 发送 get 请求
export const _get = function(url, data, success, check_login, msg){
	
	// return '_get1111'
	
	// 请求开始弹出正在加载弹框
	uni.showLoading({
	   title: '加载中'
	});
	
	let _this = this
	// 构造请求参数
	
	data = data || {}
	// wxId
	// data.wxapp_id = App.siteInfo.uniacid;
	 // data.token = wx.getStorageSync('token');	
	
	//构造get请求
	uni.request({
		 url: url, //仅为示例，并非真实接口地址。
		 data: data,
		 header: {
			'content-type': 'application/json' //自定义请求头信息
		 },
		 success: (res) => {
			if (res.statusCode !== 200 || typeof res.data !== 'object') {
				if (!msg) {
					App.showError('网络请求出错');
				}
				return false;
			}
			// 判断状态码
		 
			 // 当请求成功后弹框隐藏
			 uni.hideLoading();
		 },
		 fail: () => {
		 	uni.showLoading({
		 	   title: '加载中'
		 	});
		 }
	})
}