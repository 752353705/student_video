<template>
	<!-- 充值的弹窗 -->
	<!-- <uni-popup ref="recharge" type="share" @change="change" > -->

	<view class="uni-popup-recharge">
		<view class="uni-recharge-title"><text class="uni-recharge-title-text">充值</text></view>
		<view class="balance">余额: 0</view>
		<view class="uni-recharge-content">
			<view class="uni-recharge-content-box" @click="addmoney" v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index">
				<view class="p1">10</view>
				<view class="p2">1元</view>
			</view>
		</view>
		
		<view class="rule">
			充值代表已阅读并同意 <text style="color:#efab26 ;">《用户充和协议》</text>
		</view>
		<!-- <view class="uni-recharge-button-box">
			<view class="recharge" @click="recharge">
				充值 >
			</view>
		</view> -->
	</view>
	<!-- </uni-popup> -->
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		addmoney(){
			console.log('充值 增加 H币')
		}
		
		// recharge(){
		// 	console.log('跳转到充值弹窗')
		// 	// 关闭 送礼物弹窗 显示充值弹窗
		// 	this.$emit('recharge')
		// },
	}
};
</script>

<style lang="scss" scoped>
// 充值界面
.uni-popup-recharge {
	background-color: white;
	height: 356px;
	position: relative;
	border-radius: 20rpx 20rpx 0 0;
}
.uni-recharge-title {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 40px;
}
.uni-recharge-title-text {
	font-size: 40rpx;
	font-weight: bolder;
	// color: #666;
}
.balance {
	position: absolute;
	left: 30rpx;
	top: 20rpx;
	font-size: 35rpx;
	color: #858585;
}
.uni-recharge-content {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.uni-recharge-content-box {
	width: 105px;
	height: 75px;
	background-color: #f8f8f8;
	margin-left: 14px;
	margin-top: 20px;
	border-radius: 20rpx;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.p1 {
		font-size: 40rpx;
		font-weight: bold;
		color: black;
	}
	.p2 {
		font-size: 20rpx;
		color: #7b7b7b;
	}
}

.rule{
	text-align: center;
	line-height: 175rpx;
}
</style>
