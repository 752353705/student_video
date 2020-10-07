<template>
	<view class="container">
		<view class="wechatapp login">
			<open-data class="app-img" type="userAvatarUrl"></open-data>
			<open-data class="app-title" type="userNickName"></open-data>
		</view>
		<view class="auth-title">该程序将获得以下授权：</view>
		<view class="auth-subtitle">·获得您的公开信息（昵称、头像等）</view>
			<button class="btn login_wei" openType="getUserInfo"
				lang="zh_CN" 
				@getuserinfo="login"
			>
				微信授权用户信息
			</button>
		<!-- 	<button class="btn login_phone" @click="goPhoneLogin"
			>
				手机号登录/注册
			</button> -->
		
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
			userInfo: {},
			pageOption: {}
		};
	},
	methods: {
		// 进行账号登录
		goPhoneLogin(){
			uni.navigateTo({
				url:"/pages/reg/reg"
			})
		},
		// 微信登录
		login(e) {
			console.log('登录e 个人信息',e.detail.userInfo)
			let _this = this;
			if (e.detail.errMsg == 'getUserInfo:ok') {
				// 用户允许了获取信息
				// wx 获取登录用户 code
				uni.showLoading({
					title:'正在授权...'
				})
				
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						// 获取用户的  code
						console.log('loginRes',loginRes)
						// 进行post请求
						_this.api._post("auth/loginByWeixin",{
							"code":loginRes.code,
							"userInfo":e.detail.userInfo,
						},function(res){
							console.log('login 微信登录 发送post请求',res);
							uni.setStorageSync('user_name', res.data.nickName);
							uni.setStorageSync('user_img', res.data.avatarUrl);
							uni.setStorageSync('token', res.data.token);
							
							uni.hideLoading()
							// 请求成功之后跳转到我的界面
							if(!res.data.phone){
								uni.navigateTo({
									url:'/pages/login/secLogin'
								})
							}
						})
						
						
						
						// console.log('login获取code',loginRes.code)
						// wx.setStorageSync('code', loginRes.code);
						// let _this.code = loginRes.code
						// // 获取用户信息
						// uni.getUserInfo({
						// 	provider: 'weixin',
						// 	success: function (infoRes) {
						// 		console.log('用户信息', infoRes.userInfo);
						// 		wx.setStorageSync('userInfo', infoRes.userInfo);
								
								
								
						// 		// uni.navigateBack({
						// 		// 	delta: 1
						// 		// })
								
							
								
						// 	},
						// 	fail:function(err){
						// 		console.log('获取用户信息失败 err',err)
						// 	}
						// });
					},
					fail: () => {
						uni.showToast({ title: '获取信息失败', icon: 'none' });
						return false;
					}
				});
			}
		},
	},
	
	onLoad: function () {
	 
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
		padding: 87rpx 0 68rpx;
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

.btn.login_wei {
	margin-top: 83rpx;
	margin-right: 0;
	color: white;
	border: none;
	background: #f83f20;
}
.btn.login_phone {
	margin-top: 72rpx;
	margin-right: 0;
	color: white;
	border: none;
	background: #838180;
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
</style>
