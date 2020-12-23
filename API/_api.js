// 将所有的 网络请求进行集中处理
let token = wx.getStorageSync('token') || ''
// 测试
// let api_root = 'http://1424d9e2.cpolar.io/wx/'
let api_root = 'https://xsh.taihangyizhan.com/wx/'
// 发送 get 请求
function _get(url, data, success, fail, complete) {
	// 请求开始弹出正在加载弹框
	uni.showLoading({
		title: '加载中...',
		mask: true
	});
	// 构造请求参数
	data = data || {}
	//构造get请求
	uni.request({
		url: api_root + url, //仅为示例，并非真实接口地址。
		header: {
			'Content-Type': 'application/json', //自定义请求头信息
			'X-Xsh-Token': wx.getStorageSync('token') || '',
		},
		data: data,
		success: (res) => {
			//判断返回的状态码
			if (res.statusCode !== 200) {
					uni.showModal({
						title: '友情提示',
						content: '网络请求出错',
						success: function(res) {
							
						}
					})
					fail && fail();
				return false;
			}
			// 用户登录态消失
			if (res.data.errno === 501 ) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
				return false;
			}
			success && success(res.data);
		},
		fail: function(res) {
			uni.showModal({
				title: '友情提示',
				content: '网络繁忙,请重试',
				success: function(res) {

				}
			})
			fail && fail(res.data);
		},
		complete: function(res) {
			uni.hideLoading();
		},
	});
}
// // 发送 post 请求
function _post(url, data, success, fail, complete) {
	// 构造请求参数
	data = data || {}
	//构造post请求
	uni.request({
		url: api_root + url, //用户进行提交数据的地址
		header: {
			'Content-Type': 'application/json',
			'X-Xsh-Token': wx.getStorageSync('token') || '',
		},
		method: 'POST',
		data: data,
		success: res => {
			if (res.statusCode !== 200) {
				uni.showModal({
					title: '友情提示',
					content: '网络请求出错',
					success: function(res) {
					
					}
				})
				fail && fail();
				return false;
			}

			// 如果用户登录状态失效
			if (res.data.errno == 501) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
				return false
			}

			// 出现其他的问题
			if (res.data.errno !== 0) {
				uni.showModal({
					title: '友情提示',
					content: res.data.errmsg,
					success: function(res) {
						fail && fail(res.data);
					}
				})
				return false;
			}
			success && success(res.data)
		},
		fail: res => {
			uni.showModal({
				title: '友情提示',
				content: '网络繁忙，请重试',
				success: function(res) {
					uni.navigateBack({
						delta: 1
					})
				}
			})

			fail && fail(res.data);
		},
		complete: function(res) {
			uni.hideLoading()
			complete && complete(res);
		}
	});
}
// 发起 put 请求
function _put(url, data, success, fail, complete) {
	// 构造请求参数
	data = data || {}
	//构造post请求
	uni.request({
		url: api_root + url, //用户进行提交数据的地址
		header: {
			'Content-Type': 'application/json',
			'X-Xsh-Token': wx.getStorageSync('token') || '',
		},
		method: 'PUT',
		data: data,
		success: res => {
			// console.log('post 请求结果==》res',res)
			if (res.statusCode !== 200) {
				uni.showModal({
					title: '友情提示',
					content: '网络请求出错',
					success: function(res) {
						
					}
				})
				fail && fail();
				return false;
			}

			// 如果用户登录状态失效
			if (res.data.errno == 501) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
				return false
			}

			// 出现其他的问题
			if (res.data.errno !== 0) {
				uni.showModal({
					title: '友情提示',
					content: res.data.errmsg,
					success: function(res) {
						
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
				success: function(res) {
					uni.navigateBack({
						delta: 1
					})
				}
			})

			fail && fail(res.data);
		},
		complete: function(res) {
			uni.hideLoading()
			complete && complete(res);
		}
	});
}
// 发起 del 请求
export const _del = function(url, data, success, fail, complete) {
	data = data || {}
	//构造post请求
	uni.request({
		url: api_root + url, //用户进行提交数据的地址
		header: {
			'Content-Type': 'application/json',
			'X-Xsh-Token': wx.getStorageSync('token') || '',
		},
		method: 'DELETE',
		data: data,
		success: res => {
			if (res.statusCode !== 200) {
				uni.showModal({
					title: '友情提示',
					content: '网络请求出错',
					success: function(res) {
						
					}
				})
				fail && fail();
				return false;
			}

			// 如果用户登录状态失效
			if (res.data.errno == 501) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
				
				return false
			}
			// 出现其他的问题
			if (res.data.errno !== 0) {
				uni.showModal({
					title: '友情提示',
					content: res.data.errmsg,
					success: function(res) {

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
				success: function(res) {
					uni.navigateBack({
						delta: 1
					})
				}
			})
			fail && fail(res.data);
		},
		complete: function(res) {
			uni.hideLoading()
			complete && complete(res);
		}
	});
}

let api = {
	api_root:api_root,
	_get: _get,
	_post: _post,
	_put: _put,
	_del: _del,
}
// 将请求进行 集中抛出
export {
	api
}
