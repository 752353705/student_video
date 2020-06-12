// 发送 get 请求
export const _get = function(url, data, success, check_login, msg){
	
	// 请求开始弹出正在加载弹框
	uni.showLoading({
	   title: '加载中'
	});
	
	//构造get请求
	uni.request({
		 url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
		 data: {
				 text: 'uni.request'
		 },
		 header: {
				 'custom-header': 'hello' //自定义请求头信息
		 },
		 success: (res) => {
				 console.log(res.data);
				 
				 
				 
				 
				 // 当请求成功后弹框隐藏
				 uni.hideLoading();
		 }
	})
}