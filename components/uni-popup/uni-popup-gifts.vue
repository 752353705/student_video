<template>
	<view >
		<!-- 送礼物的弹窗 -->
		<view class="uni-popup-share">
			<view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view>
			<view class="uni-share-content">
				<view class="uni-share-content-box">
					<view class="uni-share-content-item" v-for="(item,index) in bottomData" :key="index" @click.stop="select(item,index)">
						<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
						<text class="uni-share-text">{{item.text}}</text>
						<text class="uni-share-text">{{item.name}}</text>
					</view>
		
				</view>
			</view>
			<view class="uni-share-button-box">
				<!-- <button class="uni-share-button" @click="close">取消</button> -->
				<view class="recharge" @click="recharge">
					充值 
					<u-icon size="40" name="arrow-right"></u-icon>
				</view>
					<!-- <u-icon @click="recharge" label="充值" size="40" name="arrow-right"></u-icon> -->
			</view>
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
				// 控制是显示送礼物的界面还是显示充值的界面
				// show:true,
				bottomData: [
					{
						text: '甜甜圈',
						icon: '/static/donuts.png',
						name: '60 H币'
					},
					{
						text: '奖牌',
						icon: '/static/jiangpai.png',
						name: '10 H币'
					},
					{
						text: '红心',
						icon: '/static/xinxin.png',
						name: '20 H币'
					},
					{
						text: '新浪',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
						name: 'sina'
					},
					{
						text: '钻石',
						icon: '/static/zhenaizuanshi.png',
						name: 'copy'
					},	
					{
						text: '雪糕',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
						name: 'copy'
					},	
					{
						text: '飞机',
						icon: '/static/zhenaidapao.png',
						name: 'copy'
					},
					{
						text: '热气球',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
						name: 'more'
					}
				]
			}
		},
		created() {},
		methods: {
			
			recharge(){
				console.log('gift 跳转到充值弹窗')
				// 关闭 送礼物弹窗 显示充值弹窗
				
				this.$emit('recharge',{
					
				},()=>{
					console.log('playvideo 页面显示充值弹窗')
					
				})
				
			},
			
			/**
			 * 选择内容
			 */
			select(item, index) {
				console.log('select')
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
				this.show = true
			}
		}
	}
</script>
<style lang="scss" scoped>
	// 送礼物界面
	.uni-popup-share {
		background-color: #171926;
		color: white;
		border-radius: 20rpx 20rpx 0 0;
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
		// color: #666;
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
		// background-color: transparent;
	}
	
	.uni-share-content-item:active {
		// background-color: #f5f5f5;
	}
	
	.uni-share-image {
		width: 50px;
		height: 50px;
	}
	
	.uni-share-text {
		margin-top: 10px;
		font-size: 14px;
		// color: #3B4144;
	}
	
	.uni-share-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px 15px;
		justify-content: flex-end;
	}
	
	.recharge{
		color: #ffd72a;
		// width: 126rpx;
		display: flex;
		height: 65rpx;
		background-color: #10131c;
		text-align: center;
		line-height: 65rpx;
		border-radius: 20rpx;
		padding: 0 20rpx;
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
