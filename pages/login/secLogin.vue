<template>
	<view class="container">
		<view class="wechatapp login">
			<view class="app-img">
				<image src="/static/logo.png"></image>
			</view>
			<view class="app-title">帮小驴儿</view>
		</view>
			<button class="btn login_wei" openType="getPhoneNumber"
				lang="zh_CN" 
				@getphonenumber="getPhone"
			>
				微信登录
			</button>
			<button class="btn no_login"
				lang="zh_CN" 
				@click="back"
			>
				暂不登录
			</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods: {
		// 暂不登录
		back(){
			uni.switchTab({
				url:'/pages/list/list'
			})
		},
		// 获取手机号
		getPhone(e) {
			console.log('获取用户的手机号',e)
			let _this = this 
			uni.showLoading({
				title: '登录中..',
				mask: true
			})
			// console.log('登录e',_this.userInfo)
			  if (e.detail.encryptedData){
					// 发起请求然后 跳转到 首页
					_this.api._post('auth/loginByPhone',{
						encryptedData:e.detail.encryptedData,
						iv:e.detail.iv
					},function(res){
						uni.hideLoading();
						console.log('获取信息成功',res)
						 // 将手机号进行本地存储
						uni.setStorageSync('user_phone', res.data.phone);
						// 然后进行跳转
						uni.navigateBack({
							delta:1
						})
					})
				}
		},
	},
	
	onLoad: function () {
	 
	 }

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
			width: 195rpx;
			height: 195rpx;
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
		padding: 87rpx 0 100rpx;
		// margin-bottom: 100rpx;
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
	margin-top: 83rpx;
	margin-right: 0;
	color: white;
	border: none;
	background: $bg-color;
}
.btn.login_phone {
	margin-top: 72rpx;
	margin-right: 0;
	color: white;
	border: none;
	background: #838180;
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
.btn.login::after {
	display: none;
}
button{
	background-color:none;
}
</style>
