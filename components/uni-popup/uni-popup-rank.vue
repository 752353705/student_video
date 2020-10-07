<template>
	<view class="uni-popup-rank">
		<view class="uni-rank-title">
			<text class="uni-rank-title-text">{{ title }}</text>
		</view>
		
		<view class="cont">
			<view class="item" v-for="(item,index) in [1,2,2,2,2,2,2,2,2,2,2,2]" :key="index">
				<view class="le">
					<text class="num">1</text>
					<view class="img">
						<!-- 头像 -->
					</view>
					<text class="name">用户名</text>
				</view>
				<view class="ri">
					票数
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'UniPopupRank',
		props: {
			title: {
				type: String,
				default: '分享到'
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="less" scoped>
	.uni-popup-rank {
		overflow: auto;
		height: 353px;
		background-color: white;
		position: relative;
		background-color: white;
		color: black;
		border-radius: 20rpx 20rpx 0 0;
		.uni-rank-title {
			position: fixed;
			top: 0;
			left: 0;
			height: 40px;
			width: 100%;
			background-color: white;
			text-align: center;
			line-height: 40px;
			border-radius:20rpx 20rpx 0 0 ;
			overflow: hidden;
			// /* #ifndef APP-NVUE */
			// display: flex;
			// /* #endif */
			// flex-direction: row;
			// align-items: center;
			// justify-content: center;
			.uni-rank-title-text {
				font-size: 40rpx;
				font-weight: bolder;
				// color: #666;
			}
		}
		.cont{
			box-sizing: border-box;
			padding-left: 34rpx;
			padding-right: 34rpx;
			.item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				.le{
					display: flex;
					align-items: center;
					.num{
						margin-right: 21rpx;
					}
					.img{
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						overflow: hidden;
						background-color: red;
					}
					.name{
						margin-left: 34rpx;
						font-size: 30rpx;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
