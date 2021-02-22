import siteInfo from '@/siteinfo.js'

export const http = (options) => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});
	return new Promise((reslove, reject) => {
		uni.request({
			url: siteInfo.siteroot + options.url,
			header: {
				'Content-Type': 'application/json',
				'X-Xsh-Token': wx.getStorageSync('token') || '',
			},
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				// console.log('发起请求成功res',res)
				//判断返回的状态码
				if (res.statusCode !== 200) {
					uni.showToast({
						icon:'none',
						title: '网络请求出错'
					})
					return false;
				}
				// 用户登录态消失
				if (res.data.errno === 501 ) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return false;
				}
				// 请求成功，一切正常
				reslove(res.data)
			},
			fail:(err)=> {
				// console.log('请求失败err',err)
				uni.showToast({
					icon:'none',
					title: "请求失败"
				})
				reject(err)
			},
			complete: function(res) {
				uni.hideLoading();
				// 发起请求，增加主页浏览量
				uni.request({
					url:siteInfo.siteroot + 'app/views/update',
					data:{},
					header: {
						'Content-Type': 'application/json',
						'X-Xsh-Token': wx.getStorageSync('token') || '',
					},
					method:'POST',
					success:(res) => {
						// console.log('get 请求增加浏览量成功')
					}
				})
			},
		})
	})
}

