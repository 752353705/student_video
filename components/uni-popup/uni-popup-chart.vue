<template>
	<view class="uni-popup-share">
		<!-- <view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view> -->
		<view class="uni-share-content">
			<view class="uni-share-content-box">
				<!-- 输入框 -->
				<view class="input_box height">
					<!-- 输入框 -->
					<input class="uni-input"  
						cursor-spacing="10"
						type="text" :value="sendVal" 
						placeholder="发消息..."
						@input="input"
					/>
					<!-- 表情选择框 -->
					<view class="expression border" @click="showExp">
						<image src="../../static/chartExpress.png" mode="aspectFit"></image>
					</view>
					<!-- 选择图片框 -->
					<view v-if="sendVal.length === 0" class="addImg border" @click="showImg">
						<image src="../../static/chartAdd.png" mode="aspectFit"></image>
					</view>
					<!-- 发送框 当输入框中有值了 图片按钮消失 显示发送按钮 -->
					<view v-else class="send" @click="send">
						发送
					</view>
				</view>
				<!-- <view class="uni-share-content-item" v-for="(item,index) in bottomData" :key="index" @click.stop="select(item,index)">
					<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
					<text class="uni-share-text">{{item.text}}</text>
					<text class="uni-share-text">{{item.name}}</text>
				</view> -->

			</view>
		</view>
		<!-- <view class="uni-share-button-box">
			<button class="uni-share-button" @click="close">取消</button>
		</view> -->
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
						// text: '微信',
						// icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						// name: 'wx',
						text: '甜甜圈',
						icon: '../../static/donuts.png',
						name: '60 H币'
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
			}
		}
	}
</script>
<style lang="scss" scoped>
	.input_box{
		position: absolute;
		z-index: 10;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 105.55rpx;
		background-color: white;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		box-sizing: border-box;
		padding: 10rpx 0;
		input{
			width: 60%;
			height: 80%;
			box-sizing: border-box;
			padding-left: 20rpx;
			overflow:visible ;
			position: relative;
		}
		input::before {
			content: " ";
			position: absolute;
			top: 0;
			left: 0;
			width: 200%;
			height: 200%;
			border: 1px solid black;
			border-radius: 70rpx;
			transform-origin: 0 0;
			transform: scale(0.5);
		}
		.expression,.addImg{
			width: 60rpx;
			height: 60rpx;
			box-sizing: border-box;
			padding: 8rpx;
			border-radius: 50%;
		}
		.send{
			background-color: #5d92e2;
			color: white;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			border-radius: 40rpx;
		}
	}
	
	
	.uni-popup-share {
		background-color: #fff;
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
		font-size: 40rpx;
		font-weight: bolder;
		color: #666;
	}
	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
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
</style>
