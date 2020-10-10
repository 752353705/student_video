<template>
	<view class="wallet">
		<view class="card">
			<view class="tit">账户余额（H币）</view>
			<view class="money">{{userInfo.goldNumber}}</view>
			<view class="detail" @click="goDetail">
				查看明细
				<text class="iconfont iconfanhui"></text>
			</view>
		</view>
		
		<view class="btn" @tap="goRecharge">
			去充值
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				userInfo:''
			}
		},
		onLoad() {
			this.getUsInfo()
		},
		methods:{
			// 获取用户信息
			getUsInfo(){
				if(uni.getStorageSync('token')){
					// 如果用户进行了登录操作，获取用户的个人资料
					this.api._get(
					'user/info',{},(res)=>{
						console.log('获取用户当前的 H币',res)
						this.userInfo = res.data
					})
				}
			},
			// 进行充值
			goRecharge(){
				console.log('进行充值')
				uni.navigateTo({
					url:`/pages/recharge/recharge?money=${this.userInfo.goldNumber}&userId=${this.userInfo.userId}`
				})
			},
			// 查看明细
			goDetail(){
				console.log('查看明细')
				uni.navigateTo({
					url:'/pages/my/myConsumption'
				})
			}
		}
	}
</script>

<style lang="less"	scoped>
	.wallet{
		.card{
			color: white;
			width: 88%;
			height: 300rpx;
			margin: 116rpx auto;
			box-sizing: border-box;
			border-radius: 25rpx;
			padding-left: 47rpx;
			padding-top: 39rpx;
			// padding-right: 20rpx;
			// padding-bottom: 20rpx;
			background-image:linear-gradient(to bottom, #373737, #1f1f1f);
			.tit{
				font-size: 26rpx;
			}
			.money{
				font-size: 86rpx;
			}
			.detail{
				font-size: 26rpx;
				margin-top: 20rpx;
			}
			
		}
		.btn{
			width: 88%;
			height: 84rpx;
			line-height: 84rpx;
			font-size: 30rpx;
			text-align: center;
			border-radius: 30rpx;
			margin: 100rpx auto;
			background-color: #f83f20;
			color: white;
		}
	}
</style>
