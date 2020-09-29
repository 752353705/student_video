<template>
	<view >
		<!-- 送礼物的弹窗 -->
		<view class="uni-popup-share">
			<view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view>
			<view class="uni-share-content">
		<!-- 		<view class="uni-share-content-box">
					<view class="uni-share-content-item" v-for="(item,index) in bottomData" 
						:key="index" @click.stop="select(item,index)">
						<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
						<text class="uni-share-text">{{item.text}}</text>
						<text class="uni-share-text">{{item.name}}</text>
					</view>
				</view> -->
				
				<!-- 当礼物 变多的时候 可以使用 轮播图的效果进行显示 -->
				<swiper  style="width: 100%;height: 248px;" :indicator-dots="false" :autoplay="false" >
					<swiper-item class="uni-share-content-box" >
						<view class="uni-share-content-item" v-for="(item,index) in giftFirst" 
							:key="index" @click.stop="select(item,index)"
							>
							<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
							<text class="uni-share-text">{{item.name}}</text>
							<text class="uni-share-text">{{item.price}}</text>
						</view>
					</swiper-item>
					<swiper-item class="uni-share-content-box" >
						<view class="uni-share-content-item" v-for="(item,index) in giftSecond" 
							:key="index" @click.stop="select(item,index)"
							>
							<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
							<text class="uni-share-text">{{item.name}}</text>
							<text class="uni-share-text">{{item.price}}</text>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="uni-share-button-box">
				<view class="recharge" @click="recharge">
					充值 
					<u-icon size="40" name="arrow-right"></u-icon>
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
				giftFirst: [
					{
						name: '加油',
						icon: '/static/gift/jiayou.png',
						price: '1 H币'
					},
					{
						name: '棒棒糖',
						icon: '/static/gift/tang.png',
						price: '10 H币'
					},
					{
						name: '么么哒',
						icon: '/static/gift/momoda.png',
						price: '20 H币'
					},
					{
						name: '卡布奇诺',
						icon: '/static/gift/coffee.png',
						price: '50 H币'
					},
					{
						name: '弗列罗',
						icon: '/static/gift/qiaokeli.png',
						price: '100 H币'
					},	
					{
						name: '蛋糕',
						icon: '/static/gift/dangao.png',
						price: '300 H币'
					},	
					{
						name: '真爱卷轴',
						icon: '/static/gift/juanzhou.png',
						price: '666 H币'
					},
					{
						name: '永恒钻戒',
						icon: '/static/gift/zuanjie.png',
						price: '999 H币'
					},
				],
				giftSecond:[
					{
						name: '阿拉丁神灯',
						icon: '/static/gift/shendeng.png',
						price: '6666 H币'
					},
					{
						name: '神秘宝藏',
						icon: '/static/gift/baozang.png',
						price: '8888 H币'
					},
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
		justify-content: flex-start;
		align-items: flex-start;
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
