<template>
	<view class="rank">
		<view class="item" v-for="(item,index) in [1,2,3,4]" :key="index" >
			<view class="le">
				<view class="num">1</view>
				<view class="img"></view>
				<view class="name">姓名</view>
			</view>
			<view class="ri">
				<text class="ticket">181</text>
				票
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankList:[]
			};
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="less">
	.rank{
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-right: 20rpx;
		.item{
			height: 150rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding-right:20rpx ;
			padding-left: 20rpx;
			background-color: #f8f8f8;
			margin-bottom: 30rpx;
			border-radius: 28rpx;
			.le{
				display: flex;
				align-items: center;
				.num{
					background-color: #aaaaaa;
					margin-right: 20rpx;
					border-radius: 50%;
					color: white;
					width: 48rpx;
					height: 48rpx;
					text-align: center;
					line-height: 48rpx;
				}
				.img{
					border-radius: 50%;
					width: 100rpx;
					height: 100rpx;
					margin-right: 20rpx;
					background-color: red;
				}
				.name{
					font-size: 30rpx;
				}
			}
			.ri{
				.ticket{
					font-size: 50rpx;
					font-weight: bold;
				}
			}
		}
	}
	
</style>
