<!-- 进行评论的模板 -->
<template>
	<view class="uni-popup-share">
		<view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view>
		<view class="uni-share-content">
			<!-- 评论内容区 -->
			<view class="uni-share-content-box">
				
				<!-- 模拟用户的评论 -->
				<user-comment class="user_cmt"></user-comment>
				
				<!-- 显示二级回复 -->
				<!-- <view class="user_cmt_two" v-if="twoShow">
					<view class="two_cont" v-for="(item,index) in [1,2,3]" :key="index">
						三级
					</view>
				</view> -->
				
			</view>
		</view>
		
		
		
		
		
		
		
		<!-- 用户的输入评论区 -->
		<view class="msg">
			<image src="/static/signature.png" mode=""></image>
			<input type="text" value="" placeholder="写评论" placeholder-style="color:white" />
		</view>
	
		<!-- 取消按钮 -->
		<view class="close">
			<image src="../../static/cmt_close.png" mode="" @click="close"></image>
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	import userComment from '../user-comment.vue'
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
				bottomData: [{
						text: '微信',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						name: 'wx'
					},
					{
						text: '支付宝',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
						name: 'wx'
					},
					{
						text: 'QQ',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
						name: 'qq'
					},
					{
						text: '新浪',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
						name: 'sina'
					},
					{
						text: '百度',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
						name: 'copy'
					},
					{
						text: '其他',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
						name: 'more'
					}
				],
				twoShow:false
			}
		},
		components:{
			userComment
		},
		created() {},
		methods: {
			/**
			 * 选择内容
			 */
			select(item, index) {
				this.$emit('select', {
					item,
					index
				}, () => {
					this.popup.close()
				})
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			},
			/**
			 * 显示更多回复
			 * */
			 showMore(){
				 console.log('显示更多')
				 
				 //显示二级对话框
				 this.twoShow = true 
			 }
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-share {
		position: relative;
		background-color: #fff;
		height: 70%;
		border-radius: 20rpx 20rpx 0 0;
		box-sizing: border-box;
		padding: 0 40rpx 0;
	}
	.uni-share-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 40px;
	}
	.uni-share-title-text {
		font-size: 35rpx;
		font-weight: bolder;
		color: #666;
	}
	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: 800rpx;
		flex-direction: row;
		justify-content: center;
		padding-top: 10px;
	}
	
	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		// display: flex;
		/* #endif */
		// flex-direction: row;
		// flex-wrap: wrap;
		width: 360px;
	}
	
	.uni-share-content-item {
		width: 90px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding: 10px 0;
		align-items: center;
	}
	
	.uni-share-content-item:active {
		background-color: #f5f5f5;
	}
	
	.uni-share-image {
		width: 30px;
		height: 30px;
	}
	
	.uni-share-text {
		margin-top: 10px;
		font-size: 14px;
		color: #3B4144;
	}
	
	.uni-share-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px 15px;
	}
	
	.uni-share-button {
		flex: 1;
		border-radius: 50px;
		color: #666;
		font-size: 16px;
		background-color: transparent;
	}
	
	.uni-share-button::after {
		border-radius: 50px;
		border: none;
	}
	
	.msg {
		width: 75%;
		height: 80rpx;
		box-sizing: border-box;
		padding-left: 30rpx;
		background-color: gray;
		color: white;
		margin-top: 20rpx;
		border-radius: 30rpx;
		display: flex;
		justify-content: start;
		align-items: center;
		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}
	}
	
	.close{
		position: absolute;
		top: 14rpx;
		right: 19rpx;
		image{
			width: 60rpx;
			height: 60rpx;
		}
	}
	
	
</style>

