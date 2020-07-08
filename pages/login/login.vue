<template>
	<view class="container">
		
		<view class="wechatapp login">
			<!-- <image class="app-img" :src="userInfo.avatarUrl" mode=""></image> -->
			<open-data class="app-img" type="userAvatarUrl"></open-data>
			<open-data class="app-title" type="userNickName"></open-data>
		</view>

		<!-- 如果没有进行登录 -->
		<!-- <view v-if="login"> -->
			<view class="auth-title">该程序将获得以下授权：</view>
			<view class="auth-subtitle">·获得您的公开信息（昵称、头像等）</view>
			<view class="control">
				<navigator open-type="navigateBack" hover-class="none" class="btn cancel">暂不登录</navigator>
				<button class="btn login" openType="getUserInfo" 
					lang="zh_CN" 
					@getuserinfo="login"
				>
					微信登录
				</button>
			</view>
		<!-- </view> -->
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone: '点击获取手机号',
			telStatus: false,
			invite: false,
			telStatus: false,
			// login: true,
			toast: false,
			appid: '',
			secret: '',
			code: '',
			sessionKey: '',
			openId: '',
			userInfo: {
				avatarUrl: '',
				city: '',
				country: '',
				gender: 1,
				language: '',
				nickName: ''
			},
			pageOption: {}
		};
	},
	methods: {
		// 登录
		login(e) {
			console.log('登录e',e)
			let _this = this;
			// if (e.detail.errMsg !== 'getUserInfo:ok') {
			// 	return false;
			// }
			// 将用户信息进行本地存储
			// wx.setStorageSync('avatar', e.detail.userInfo.avatarUrl);
			// wx.setStorageSync('nickName', e.detail.userInfo.nickName);
			
			// 0. 显示加载的效果
			// uni.showLoading({
			// 	title: '登录中...'
			// });
		
			// 1. wx 获取登录用户 code
			uni.login({
				provider: 'weixin',
				success: loginRes => {
					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function (infoRes) {
							console.log('用户信息', infoRes.userInfo);
							
							// 存储用户的头像
							uni.setStorage({
								key:'user_img',
								data:infoRes.userInfo.avatarUrl,
								success:function(){
									console.log('存储用户头像成功')
								}
							})
							// 存储用户名
							uni.setStorage({
								key:'user_name',
								data:infoRes.userInfo.nickName,
								success:function(){
									console.log('存储用户名成功')
								}
							})
							uni.navigateBack({
								delta: 1
							})
						}
					});
					// 用户成功授权之后向后端进行数据请求
						//调用封装的post 请求
					
					// console.log('login获取code',loginRes);
					// _this.code = loginRes.code;
					// 2. 将用户登录code传递到后台置换用户SessionKey、OpenId等信息
					// uni.request({
					// 	url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + _this.appid + '&secret=' + _this.secret + '&js_code=' + _this.code + '&grant_type=authorization_code',
					// 	success: codeRes => {
					// 		console.log(codeRes);
					// 		_this.openId = codeRes.data.openid;
					// 		_this.sessionKey = codeRes.data.session_key;
							// 3.通过 openId 判断用户是否授权
					// 		uni.request({
					// 			url: _this.apiServer + 'loginApplets',
					// 			data: {
					// 				openid: _this.openId
					// 			},
					// 			method: 'POST',
					// 			success: openIdRes => {
					// 				console.log(openIdRes);
					// 				// 隐藏loading
					// 				uni.hideLoading();
					// 				// 还没授权登录、请先授权然后登录
					// 				if (openIdRes.data.code == 1) {
					// 					// 提示消息、让用户授权
					// 					uni.showToast({ title: openIdRes.data.msg, icon: 'none' });
					// 				}
					// 				// 已经授权了、查询到用户的数据了
					// 				if (openIdRes.data.code == 0) {
					// 					// 用户信息写入缓存
					// 					uni.showToast({ title: '登录成功' });
					// 					uni.setStorageSync('user_id', openIdRes.data.res.u_id);
					// 					uni.setStorageSync('user_nm', openIdRes.data.res.u_nickName);
					// 					uni.setStorageSync('user_fa', openIdRes.data.res.u_avatarUrl);
					// 					uni.setStorageSync('user_nu', openIdRes.data.res.u_regtime);
					// 					// 然后跳回原页面
					// 					if (_this.pageOption.backtype == 1) {
					// 						uni.redirectTo({ url: _this.pageOption.backpage });
					// 					} else {
					// 						uni.switchTab({ url: _this.pageOption.backpage });
					// 					}
					// 				}
					// 			},
					// 			fail: () => {
					// 				uni.showToast({ title: '获取授权信息失败', icon: 'none' });
					// 				return false;
					// 			}
					// 		});
					// 	},
					// 	fail: () => {
					// 		uni.showToast({ title: '获取 SesssionKey OpenId 失败', icon: 'none' });
					// 		return false;
					// 	}
					// });
				},
				fail: () => {
					uni.showToast({ title: '获取 code 失败', icon: 'none' });
					return false;
				}
			});
			return false;
		},
		getSetting(){
			// 判断用户是否授权了
			// 如果已经进行授权了，可以直接调用getUserInfo 获取头像昵称，不会弹框
			uni.getSetting({
			   success(res) {
			      console.log('用户授权',res.authSetting['scope.userInfo'])
						if (res.authSetting['scope.userInfo']) {
						  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
						  wx.getUserInfo({
						    success: res => {
						      // 可以将 res 发送给后台解码出 unionId
									console.log('授权 res',res.userInfo.avatarUrl)
									// 本地储存用户头像
						      // this.globalData.userInfo = res.userInfo
									
						      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
						      // 所以此处加入 callback 以防止这种情况
									
						      // if (this.userInfoReadyCallback) {
						      //   this.userInfoReadyCallback(res)
						      // }
						    }
						  })
						}else{
							// 用户未进行授权
							console.log('用户未进行授权')
						}
			   }
			})
		},
		// 第一授权获取用户信息 ===》按钮触发
		wxGetUserInfo() {
			// console.log('登录服务提供商',uni.getProvider)
			let _this = this;
			// 1.获取用户的信息
			uni.getUserInfo({
				provider: 'weixin',
				success: infoRes => {
					console.log('获取用户信息 getUserInfo',infoRes);
					_this.userInfo = infoRes.userInfo;
					// 2.提交数据到后台、写入数据库
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
				},
				fail: () => {
					uni.showToast({ title: '获取用户信息失败', icon: 'none' });
				}
			});
			return false;
		},
	},
	
	onLoad() {
		console.log('加载')
		// this.login()
		// this.getSetting()
	}

};
</script>

<style lang="less">

.container {
	padding: 0 86rpx;
	.wechatapp {
		padding: 98rpx 0 88rpx;
		text-align: center;
		.app-img {
			display: block;
			width: 138rpx;
			height: 138rpx;
			border-radius: 20rpx;
			margin: auto;
		}
		.app-title {
			display: block;
			margin-top: 28rpx;
			line-height: 1;
			font-size: 30rpx;
			color: #333;
		}
	}
	.wechatapp.login {
		padding: 212rpx 0 68rpx;
		margin-bottom: 100rpx;
		border-bottom: 0.5rpx solid #dfdfdf;
	}
	
	
	
	
}

.control {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.btn {
	flex: 1;
	height: 80rpx;
	padding: 0;
	margin-top: 68rpx;
	border-radius: 40rpx;
	line-height: 80rpx;
	text-align: center;
	font-size: 32rpx;
}

.btn.cancel {
	margin-right: 22rpx;
	color: #9b9b9b;
	background: #ededed;
}

.btn.login {
	margin-right: 0;
	color: white;
	border: none;
	background: #f83f20;
}

.btn.login::after {
	display: none;
}

/* login */

.auth-title {
	margin-bottom: 20rpx;
	line-height: 1;
	color: #333;
	font-size: 30rpx;
}

.auth-subtitle {
	font-size: 30rpx;
	line-height: 1;
	color: #999;
}

/* invite */

// .user-info {
// 	display: flex;
// 	align-items: center;
// 	width: 100%;
// }

// .user-info .user-avatar {
// 	width: 60rpx;
// 	height: 60rpx;
// 	margin-right: 24rpx;
// 	border-radius: 50%;
// }

// .user-info .user-nickname {
// 	font-size: 28rpx;
// 	color: #666666;
// }

// .share-code {
// 	margin: 50rpx 14rpx 0 14rpx;
// }

// .share-code .share-code-ipt {
// 	height: 64rpx;
// 	border-bottom: 0.5rpx solid #eee;
// 	line-height: 64rpx;
// 	font-size: 50rpx;
// 	color: #333;
// }

// .share-code .share-code-ipt-holder {
// 	font-size: 30rpx;
// 	color: #aaa;
// }

// /* phone */

// .user-phone {
// 	width: 576rpx;
// 	height: 84rpx;
// 	padding: 0;
// 	margin: 0;
// 	border-bottom: 0.5rpx solid #eeeeee;
// 	border-radius: none;
// 	background: none;
// 	line-height: 84rpx;
// 	font-size: 30rpx;
// 	color: #999;
// 	text-align: left;
// }

// .user-phone::after {
// 	display: none;
// }

// /* toast */

// .toast {
// 	position: fixed;
// 	top: 0;
// 	right: 0;
// 	bottom: 0;
// 	left: 0;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	background: rgba(0, 0, 0, 0.3);
// }

// .toast .toast-container {
// 	width: 526rpx;
// 	padding: 56rpx 40rpx 62rpx 40rpx;
// 	border-radius: 14rpx;
// 	background: white;
// 	text-align: center;
// }

// .toast .toast-container .toast-title {
// 	font-size: 42rpx;
// 	color: #222;
// 	font-weight: bold;
// }

// .toast .toast-container .toast-content {
// 	margin-top: 36rpx;
// 	font-size: 32rpx;
// 	color: #666666;
// }

// .origin-text {
// 	color: #f83f20;
// }

// .toast .toast-container .toast-btn {
// 	width: 280rpx;
// 	height: 90rpx;
// 	margin: 0 auto;
// 	margin-top: 70rpx;
// 	border-radius: 45rpx;
// 	background: #f83f20;
// 	line-height: 90rpx;
// 	color: white;
// 	font-size: 32rpx;
// }
</style>
