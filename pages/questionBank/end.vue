<template>
	<view class="end">
		<!-- 进行 海报图 的绘制 -->
		<answer-succ-poster ref="poster" title="海报标题" 
			:bgImg="bgIMg" subTitle="海报副标题" 
			price="10"
			>
		</answer-succ-poster>
		<uni-popup ref="prompt">
			<uni-popup-game-prompt></uni-popup-game-prompt>
		</uni-popup>
	</view>
</template>

<script>
	// 提示框
	import uniPopupGamePrompt from '@/components/uni-popup/uni-popup-game-prompt.vue'
	// 导入 绘制 海报图的组件
	import answerSuccPoster from '@/components/answer-success-poster/answer-success-poster.vue'
	
	export default {
		data(){
			return {
				user_img:'https://wx.qlogo.cn/mmopen/vi_32/gicCA79YFAXgDFSKGXaRNgO2bq5OMRHu4bn3S55dZUUEmB3Tw1hSRHS4RYxGZViaib3bQicrGjPHCTfPuvV0Vygy9A/132',
				// 海报图 的绘制 注意 图片的 域名配置
				bgIMg: 'https://ceshigfsc.oss-cn-beijing.aliyuncs.com/d6e641a4-ee73-4620-80f7-9838cc30d933.jpg'
			}
		},
		components:{
			uniPopupGamePrompt,
			answerSuccPoster
		},
		mounted() {
			// let img = uni.getStorageSync('user_img');
			this.user_img = uni.getStorageSync('user_img');
			// 获取用户的头像 姓名
			// wx.downloadFile({
			// 	url: img.replace('http://thirdwx.qlogo.cn', 'https://wx.qlogo.cn'),
			// 	success: (res)=>{
			// 		this.user_img = res.tempFilePath
			// 		console.log('user_img',this.user_img)
			// 	}
			// })
			// 显示 提示框
			this.$refs.prompt.open()
			// 绘制海报图
			this.$refs.poster.showCanvas(this.user_img);
		},
		methods:{
			// 跳转到发布界面
			jumpPublish(){
				uni.navigateTo({
					url:'/pages/publish/publishNotice'
				})
			},
		}
	}
</script>


<style lang="scss" scoped >
	.end{
		.img_box{
			height: 281rpx;
			position: relative;
			margin-top: 145rpx;
			.q_img{
				position: absolute;
				left: 50%;
				top: 0rpx;
				transform: translateX(-50%);
				width: 621rpx;
				height: 304rpx;
			}
			.user_img{
				position: absolute;
				top: 69rpx;
				left: 50%;
				transform: translateX(-50%);
				border-radius: 50%;
				width: 176rpx;
				height: 175rpx;
				margin: auto;
			}
		}
		.user_name{
			font-size: 52rpx;
			margin-top: 174rpx;
		}
		.publish{
			width: 260.22rpx;
			height: 83.66rpx;
			text-align: center;
			line-height: 83.66rpx;
			background-color: $bg-color;
			border-radius: 40rpx;
			color: white;
			font-size: 36rpx;
			font-weight: bolder;
			position: fixed;
			bottom: 152px;
			left: 50%;
			transform: translateX(-50%);
		}
		.yu{
			width: 167rpx;
			height: 137rpx;
			position: fixed;
			bottom: 96rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
