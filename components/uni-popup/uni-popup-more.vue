<template>
	<view >
		<!-- 送礼物的弹窗 -->
		<view class="uni-popup-share">
			<view class="uni-share-title"><text class="uni-share-title-text">更多功能</text></view>
			<view class="uni-share-content">
				<view class="uni-share-content-box">
					<view class="uni-share-content-item" v-for="(item,index) in bottomData" :key="index" @click.stop="select(item,index)">
						<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
						<text class="uni-share-text">{{item.text}}</text>
					</view>
				</view>
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
						text: '购物车',
						icon: '/static/more_car.png',
					},{
						text: '卡劵',
						icon: '/static/donuts.png',
					},{
						text: '地址管理',
						icon: '/static/donuts.png',
					},
					{
						text: '订单',
						icon: '/static/donuts.png',
					},{
						text: '商品收藏',
						icon: '/static/donuts.png',
					},
				]
			}
		},
		created() {},
		methods: {
			/**
			 * 选择内容
			 */
			select(item, index) {
				let _this = this
				// 根据用户点击的不同图标进行不同的跳转
				if(index == 0){
					// 购物车
					uni.navigateTo({
						url:'/pages/shopcar/shopcar',
						success(){
							// 跳转成功 关闭弹出框
							_this.$emit('close')
						}
					})
				}else if(index == 1){
					// 卡劵
					uni.navigateTo({
						url:'/pages/shopCard/couponList',
						success(){
							// 跳转成功 关闭弹出框
							_this.$emit('close')
						}
					})
				}else if(index == 2){
					// 地址管理
					uni.navigateTo({
						url:'/pages/address/address',
						success(){
							// 跳转成功 关闭弹出框
							_this.$emit('close')
						}
					})
				}else if(index == 3){
					// 订单
					uni.navigateTo({
						url:'/pages/order/order',
						success(){
							// 跳转成功 关闭弹出框
							_this.$emit('close')
						}
					})
				}else if(index == 4){
					// 商品收藏
					uni.navigateTo({
						url:'/pages/shop/collect',
						success(){
							// 跳转成功 关闭弹出框
							_this.$emit('close')
						}
					})
				}
				
			
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
		// background-color: #f1c91c;
		background-color: #85c43f;
		color: white;
		border-radius: 0 0 20rpx 20rpx;
		box-sizing: border-box;
		padding-left: 37rpx;
		padding-top: 25rpx;
		padding-bottom: 20rpx;
		padding-right: 20rpx;
	}
	.uni-share-title-text {
		font-size: 33rpx;
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
		width: 73px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding: 10px 0;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-right: 10px;
		color:black;
		margin-top: 25rpx;
	}
	
	.uni-share-content-item:active {
		// background-color: #f5f5f5;
	}
	
	.uni-share-image {
		width: 46px;
		height: 40px;
	}
	
	.uni-share-text {
		margin-top: 5px;
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
