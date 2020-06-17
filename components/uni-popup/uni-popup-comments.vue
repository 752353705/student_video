<!-- 进行评论的模板 -->
<template>
	<view class="uni-popup-share">
		<view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view>
		<view class="uni-share-content">
			<!-- 评论内容区 -->
			<view class="uni-share-content-box">
				<!-- <view class="uni-share-content-item" v-for="(item,index) in bottomData" :key="index" @click.stop="select(item,index)">
					<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
					<text class="uni-share-text">{{item.text}}</text>
				</view> -->
				
		<!-- 模拟用户的评论 -->
				<view class="user_cmt">
					<view class="user_img">
						
					</view>
					<view class="content">
						<view class="user_head">
							用户名
						</view>
						<view class="user_body">
							用户说的话
						</view>
						
						<!-- 时间  回复   点赞数 -->
						
						<view class="user_footer">
							<view class="time">
								昨天22:36
							</view>
							<view class="reply">
								回复
							</view>
							<view class="">
								<text>1.3w</text>
								红心
							</view>
						</view>
						
						
					</view>
					
				</view>
				
				<!-- 展开更多回复 -->
				<view class="" @click="showMore">
					——  展开更多回复
				</view>
				
				
				
			</view>
		</view>
		<view class="uni-share-button-box">
			<button class="uni-share-button" @click="close">取消</button>
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
				]
			}
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
			 }
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-share {
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
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
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
	
	// 设计评论区样式
	.uni-popup-share{
		.uni-share-content{
			align-items: flex-start;
			.uni-share-content-box{
				.user_cmt{
					width: 100%;
					display: flex;
					justify-content: start;
					background-color: yellow;
					.user_img{
						width: 60rpx;
						height: 60rpx;
						background-color: red;
						border-radius: 50%;
						margin-right: 31rpx;
					}
					.content{
						width: 100%;
						.user_footer{
							width: 100%;	
							display: flex;
							justify-content: space-between;
						}
					}
				}
			}
		}
	}
	
</style>

