<template>
	<view class="container">
		<view class="wechatapp login">
			<view class="app-img">
				<image src="/static/logo.png"></image>
			</view>
			<view class="app-title">帮小驴儿</view>
		</view>
		<view class="auth-title">请完成微信授权以继续使用</view>
			<button class="btn login_wei" openType="getUserInfo"
				lang="zh_CN" 
				@getuserinfo="login"
			>
				微信授权用户信息
			</button>
			
			<button class="btn no_login" 
				lang="zh_CN" 
				@click="back"
			>
				暂不登录
			</button>
			<view class="rule">
				<!-- 登录代表您已同意 -->
				<!-- <text style="color: #f83f20;">小驴帮儿用户协议、隐私协议</text> -->
			</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inviteID:''
		};
	},
	onLoad(option) {
		if(option.inviteID){
			this.inviteID = option.inviteID
		}
	},
	methods: {
		// 暂不登录
		back(){
			uni.navigateTo({
				url:'/pages/list/list'
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
						_this.authLogin(loginRes,e)
					},
					fail: () => {
						uni.showToast({ title: '获取信息失败', icon: 'none' });
						return false;
					}
				});
			}
		},
		// 用户登录
		authLogin(loginRes,e){
			this.http({
				url:"auth/login",
				method:'POST',
				data:{
					"code":loginRes.code,
					"user":e.detail.userInfo,
				}
			}).then(res => {
				console.log('login 微信登录 发送post请求',res);
				uni.setStorageSync('user_name', res.data.userName);
				uni.setStorageSync('user_img', res.data.avatarUrl);
				uni.setStorageSync('token', res.data.token);
				uni.setStorageSync('user_phone', res.data.phone);
				uni.hideLoading()
				// 没有手机号则为新用户 ，看是否携带 inviteID
				if(!res.data.phone){
					if(this.inviteID){
						// 存在 邀请，则加票，然后进行二次登录
						this.invitationApi()
					}else{
						// 直接进行二次登录
						uni.redirectTo({
							url:'/pages/login/secLogin'
						})
					}
				}else {
					uni.setStorageSync('user_phone', res.data.phone);
					uni.navigateBack({
						delta:1
					})
				}
			})
		},
		// 邀请加票的接口
		invitationApi(){
			this.http({
				url:`user/increaseGold?userId=${this.inviteID}&goldNumber=5`,
				method:'POST'
			}).then(res => {
				console.log('邀请进入')
				uni.redirectTo({
					url:'/pages/login/secLogin'
				})
			})
		}
	},
};
</script>

<style lang="scss">
.container {
	padding: 0 86rpx;
	.wechatapp {
		padding: 98rpx 0 88rpx;
		text-align: center;
		.app-img {
			display: block;
			width: 216rpx;
			height: 216rpx;
			border-radius: 20rpx;
			margin: auto;
			image{
				width: 100%;
				height: 100%;
			}
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
		padding: 87rpx 0rpx;
		margin-bottom: 100rpx;
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
	border-radius: 20rpx;
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
	margin-right: 0;
	color: white;
	border: none;
	background: $bg-color;
}

.btn.login::after {
	display: none;
}

.btn.no_login {
	margin-right: 0;
	color: #9b9b9b;
	border: none;
	background: none;
	font-size: 28rpx;
	margin-top: 20rpx;
}

.btn.no_login::after {
	display: none;
}

.auth-title {
	text-align: center;
	margin-bottom: 30rpx;
	line-height: 1;
	color: #696b7c;
	font-size: 30rpx;
}
.rule{
	position: fixed;
	bottom: 60rpx;
	text-align: center;
}
button{
	background-color:none;
}
</style>
