<template>
		<!-- 送礼物的弹窗 -->
		<view class="uni-popup-huicode">
			<!-- 头部样式 -->
			<view class="bg_img">
				<image src="/static/hui_head.png" mode=""></image>
			</view>
			
			<!-- 标题 -->
			<view class="uni-huicode-title">
				<text class="uni-huicode-title-text">{{ title }}</text>
			</view>
			<view class="uni-huicode-content">
				<!-- 当礼物 变多的时候 可以使用 轮播图的效果进行显示 -->
				<image :src="codesrc" mode=""></image>
			</view>

		</view>
</template>

<script>
export default {
	name: 'UniPopupShare',
	props: {
		title: {
			type: String,
			default: '分享到'
		},
		codesrc:{
			type:String
		}
	},
	inject: ['popup'],
	data() {
		return {
		
		};
	},
	created() {
		
	},
	methods: {
	
	
	}
};
</script>
<style lang="scss" scoped>
	.uni-popup-huicode{
		width: 600rpx;
		height: 600rpx;
		background-color: white;
		position: relative;
		color: $bg-color;
		border-radius: 20rpx;
		// 头部背景
		.bg_img{
			width: 109%;
			height: 217rpx;
			position: absolute;
			left: -28rpx;
			top: -136rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		// 标题
		.uni-huicode-title {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: center;
			height: 40px;
			.uni-huicode-title-text {
				font-size: 40rpx;
				font-weight: bolder;
			}
		}
		
		// 二维码展示
		.uni-huicode-content{
			width: 80%;
			height: 70%;
			margin: auto;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
	}
</style>
