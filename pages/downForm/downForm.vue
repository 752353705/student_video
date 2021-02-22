<template>
	<view>
		<!-- word文件图标 -->
		<view class="logo">
			<image src="/static/wenjian.png" mode="widthFix"></image>
		</view>
		<!--  -->
		<view class="body">
			<view class="des">
				第二届“太行驿站”文创设计大赛报名表
			</view>
			<!-- 复制链接下载按钮 -->
			<view class="btn" @click="copy">
				复制链接下载
			</view>
			<!-- 提示 -->
			<view class="hint">
				直接复制链接到浏览器下载
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'http://bdhechuang.com/enrollform.docx'
			};
		},
		onLoad() {
			// this.getUrl()
		},
		methods:{
			// 请求获取链接地址
			getUrl(){
				console.log('获取地址链接')
			},
			// 赋值链接接口
			copy(){
				uni.setClipboardData({
					data: this.url,
					success: function () {
						uni.showToast({
							title:'复制成功'
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logo{
		margin: 60rpx auto;
		width: 200rpx;
		height: 200rpx;
		image{
			width: 100%;
		}
	}
	.body{
		margin-left: 80rpx;
		width: 80%;
		.des{
			margin: auto;
		}
		.btn{
			margin: 50rpx auto 20rpx;
			width: 100%;
			line-height: 77rpx;
			color: white;
			background-color: #ff9933;
			border-radius: 8rpx;
			text-align: center;
		}
		.hint{
			font-size: 20rpx;
			color: #999999;
		}
	}
</style>
