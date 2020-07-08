<template>
	<view>
		<!-- 上传视频的弹出框 -->
		<uni-popup class="pop" animation="false" ref="popup_video" 
			type="center" mask-click="false"
			
			@change="change"
		>
			<uni-popup-pushvideo :video_src="video_src" @changeVideoSrc = "changeVideo"  duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
		<view class="tab">
			<!-- 底部自定义tabber -->
				<view :class="active == 0 ? 'item active' : 'item'" @click="jump(0)">
					<view class="tab_icon">
						<image v-if="active == 0" src="/static/index1_active.png" mode=""></image>
						<image v-else src="/static/index1.png" mode=""></image>
					</view>
					<view>作品列表</view>
				</view>
				
				<view :class="active == 1 ? 'item active' : 'item'" @click="jump(1)">
					<view class="tab_icon">
						<image v-if=" active == 1" src="/static/shop_active.png" mode=""></image>
						<image v-else src="/static/shop.png" mode=""></image>
					</view>
					<view>商城</view>
				</view>
				
				<view :class="active == 2 ? 'item-add active' : 'item-add'"  @click="pop"> 
					<view>
						<view class="uni-icon uni-icon-plus-filled"></view>
					</view>
				</view>
				
				<view :class="active == 3? 'item active' : 'item'" @click="jump(3)">
					<view class="tab_icon">
						<image v-if="active == 3" src="/static/tabMsg_active.png" mode=""></image>
						<image v-else src="/static/tabMsg.png" mode=""></image>
					</view>
					<view>消息</view>
					<!-- 用于显示未阅读的消息数量 -->
					<u-badge count="10" size='mini' :offset=off />
				</view>
				
				<view :class=" active == 4 ? 'item active' : 'item'" @click="jump(4)">
					<view class="tab_icon">
						<image v-if="active == 4" src="/static/home_active1.png" mode=""></image>
						<image v-else src="/static/home1.png" mode=""></image>
					</view>
					<view>我的主页</view>
				</view>
				
			</view>
	</view>
	
</template>

<script>
	import uniPopup from './uni-popup/uni-popup.vue'
	import uniPopupDialog from './uni-popup/uni-popup-dialog.vue'
	export default {
		props:['active'],
		data() {
			return {
				off:[-2,12],
				
				video_src:''
			};
		},
		components:{
			uniPopup,
			uniPopupDialog
		},
		onLoad() {
			this.$refs.popup_video.open()
		},
		components:{
			
		},
		methods:{
			// 修改传递过去的 上传视频的值
			changeVideo(val){
				console.log('修改video_src')
				this.video_src = val
			},
			//点击底部的图标进行跳转
			jump(num){
				// 根据点击进行改变active
				if(this.active === num) return  
				this.active = num
				
				
				//当点击的和当前的页面不同时 根据 num 跳转不同页面
				if(num === 0){
					uni.redirectTo({
					   url: "/pages/list/list"
					});
				}else if(num === 1){
					console.log('1')
					uni.redirectTo({
					   url: "/pages/shop/shop"
					});
				}else if(num === 2){
					uni.redirectTo({
					   url: "/pages/add/add"
					});
				}else if(num === 3){
					console.log('3')
					uni.redirectTo({
					   url: "/pages/tabMsg/tabMsg"
					});
				}else{
					console.log('4')
					uni.redirectTo({
					   url: "/pages/my/my"
					})
				}
				
			},
			
			//点击底部的加号可以弹出上传视频弹窗
			pop(){
				this.$refs.popup_video.open()
			},
			
			close(num){
				this.$refs.popup_video.close()
			},
			
			// 监控弹窗的显示隐藏
			/**
			 * popup 状态发生变化触发
			 * @param {Object} e
			 */
			change(e) {
				console.log('popup tabbar' + e.type + ' 状态', e.show)
				if(!e.show){
					// 弹窗关闭
					console.log('上传视频弹窗隐藏')
					this.video_src = ''
					
				}
				
				
			},
		}
	}
</script>

<style lang="less">
	@import "../common/icon.css";
	.pop{
		width: 300rpx;
		height: 300rpx;
		background-color: red;
		.imgBox{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.img{
				width: 62.5rpx;
				height: 62.5rpx;
				margin-top: 20rpx;
			}
		}
	}
	.swiper-item {
		display: flex;
		width: 100%;
		height: 100%;
		text-align: center;
		background-color: #00BFFF;
		justify-content: center;
		align-items: center;
	}
	
	.uni-icon {
		margin-top: 0;
		color: #929292;
	}
	
	.tab {
		position: fixed;
		z-index: 9999;
		height: 75.69rpx;
		width: 100%;
		bottom: 0;
		background-color: #FFFFFF;
		display: flex;
		font-size: 20rpx;
		justify-content: space-evenly;
		.tab_icon{
			width: 40rpx;
			height: 40rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.tab .item-add {
		width: 20%;
		color: #929292;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		position: relative;
		text-align: center;
		// background-color: red;
	}
	
	.item-add .uni-icon {
		color: #929292;
		border-radius: 50%;
		font-size: 47px;
		position: absolute;
		left: 8rpx;
		top: -14.66rpx;
		text-align: center;

		// box-shadow: 0px -10px 10px #11084b;
	}
	
	.item-add .text {
		font-size: 24px;
		padding-top: 36px;
	}
	
	.tab .item {
		width: 20%;
		color: #929292;
		// font-size: 24rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		position: relative;
	}
	
	.active {
		color: red !important;
	}
	
	.active .uni-icon {
		color: #ffe446 !important;
	}
</style>
