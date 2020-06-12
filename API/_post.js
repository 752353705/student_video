// 发送 post 请求

	export const _post = function(url, data, success, check_login, msg){
		
		// 请求开始弹出正在加载弹框
		uni.showLoading({
			title: '加载中'
		});
		
		
		//构造post请求
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

// 选择要上传的视频文件  并将其上传到服务器中
	export const _postVideo = function(url, data, success, check_login, msg){
		
		// 请求开始弹出正在加载弹框
		uni.showLoading({
			title: '正在上传'
		});
		
		//构造post请求
		uni.chooseVideo({
				// maxDuration:, //拍摄视频最长拍摄时间
				count: 1,
				sourceType: ['camera', 'album'],
				success: function (res) {
					console.log('调取获取视频接口成功res',res)
					// self.src = res.tempFilePath;
					// 接口调用成功，上传视频
					// uni.uploadFile({
					// 	url:this.config.fileUrl,
					// 	method:"POST",
					// 	header:{
					// 			'Authorization':'bearer '+ uni.getStorageSync('token')
					// 	},
					// 	filePath:videoFile,
					// 	name:'file',
					// 	success: (res) => {                    
					// 		// let videoUrls = JSON.parse(res.data) //微信和头条支持
					// 		let videoUrls = res.data //百度支持
					// 		this.imagesUrlPath = this.imagesUrlPath.concat(videoUrls.result.filePath);
					// 		this.src = videoUrls.result.filePath; //微信
					// 		if(this.src) {
					// 				this.itemList = ['图片']
					// 		} else {
					// 				this.itemList = ['图片','视频']
					// 		}
					// 	}
					// })
					// uni.hideLoading();
					uni.showToast({
							icon:'none',
					    title: '上传视频成功',
					    duration: 2000
					});
				},
				fail:function(err){
					uni.showToast({
							icon:'none',
					    title: '上传视频失败',
					    duration: 2000
					});
				}
		});
	}
 