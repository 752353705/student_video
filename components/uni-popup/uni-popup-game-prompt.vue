<template>
		<view class="uni-popup-share dis_flex_center item-center">
			<!-- 显示闯关成功的图标 -->
			<image class="suc" src="/static/chuangguanchenggong.png" mode=""></image>
			<view class="box pa-t20 pa-b20">
				恭喜你完成答题闯关，快保存图片进行发布吧~
			</view>
			
			<!-- 关闭弹窗 按钮 -->
			<image @click="close" class="close" src="/static/cmt_close.png" mode=""></image>
			
		</view>
</template>

<script>
export default {
	name: 'UniPopupShare',
	props: {
		title: {
			type: String,
			default: '分享到'
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
		//关闭窗口
		close() {
			this.popup.close();
		},
		
		
	}
};
</script>
<style lang="scss" scoped>
	// 送礼物界面
	.uni-popup-share {
		// background-color: white;
		border-radius: 20rpx;
		padding: 25rpx;
		width: 600rpx;
		flex-direction: column;
		position: relative;
		.suc{
			width: 400rpx;
			height: 400rpx;
		}
		.box{
			text-indent: 2em;
			color: white;
		}
		.close{
			position: absolute;
			top: -27rpx;
			right: 43rpx;
			width: 78rpx;
			height: 90rpx;
		}
	}
</style>
