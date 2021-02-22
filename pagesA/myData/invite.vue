<template>
	<view class="invite">
		<!-- 转发朋友圈操作提示 -->
		<!-- <view class="operation" v-if="operation_style">
			点击转发到朋友圈
			<view class="triangle"></view>
		</view>
		<view class="mask" 
			v-if="operation_style"
			@click="changeMask"
			>
		</view> -->
		
		<!-- 分享邀请好友的规则海报 -->
		<view class="haibao">
			
		</view>
		
		
		<!-- 分享到朋友圈，微信 -->
		<view class="share">
			<button class="wei" open-type="share"
				plain="true" hover-class="none"
				>
				<image src="/static/wei.png" mode=""></image>
				<view class="detail">微信好友</view>
			</button>
			<!-- <button class="wei_friend"
				@click="changeMask"
				plain="true" hover-class="none"
				>
				<image src="/static/wei_peng.png" mode=""></image>
				<view class="detail">朋友圈</view>
			</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				// 显示遮罩层，然后点击后消失
				operation_style:false,
				// 用户的信息
				userInfo:''
			}
		},
		onLoad() {
			// 获取用户信息
			this.getUsInfo()
			
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		// 分享到好友
		onShareAppMessage: function(res) {
			let _this = this;
			
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log('好友按钮进行的转发', res);
			}
		
			return {
				title: '小驴邦',
				path: '/pages/Introduction/Introduction?inviteID=' + this.userInfo.userId
			};
		},
		// 分享到朋友圈
		onShareTimeline: function() {
			// console.log('playVideo 进行转发 到朋友圈')
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log('朋友圈转发', res);
			}
			return {
				title: '小驴邦',
				path: '/pages/Introduction/Introduction?inviteID=' + this.userInfo.userId
			};
		},
		
		methods:{
			// 获取用户的个人信息
			getUsInfo(){
				if(uni.getStorageSync('token')){
					// 如果用户进行了登录操作，获取用户的个人信息
					this.http({
						url:'user/info',
						data:{}
					}).then(res => {
						this.userInfo = res.data
					})
				}
			},
			// 显示转发到朋友圈的操作提示
			showOperation(){
				console.log('显示转发朋友圈提示')
			},
			changeMask(){
				this.operation_style = !this.operation_style
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
	}
</style>

<style scoped lang="scss">
	button{
		padding-left: 0;
		padding-right: 0;
		line-height: 34rpx;
		margin-left: 0;
		margin-right: 0;
		font-size: 30rpx;
	}
	button[plain]{
		border: none;
	}
	.invite{
		width: 100%;
		height: 100%;
		// 海报图
		.haibao{
			width: 100%;
			height: 100%;
		}
		
		// 分享
		.share{
			width: 99%;
			height: 171rpx;
			position: absolute;
			bottom: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			// background-color: #ababab;
			border-radius: 20rpx;
			.wei{
				image{
					width: 77rpx;
					height: 77rpx;
					margin-bottom: 25rpx;
				}
				text-align: center;
			}
			.wei_friend{
				image{
					width: 87rpx;
					height: 77rpx;
					margin-bottom: 25rpx;
				}
				text-align: center;
			}
		}
		// 提示操作
		.operation{
			width: 297rpx;
			line-height: 59rpx;
			background-color: white;
			position: absolute;
			top: 30rpx;
			right: 24rpx;
			z-index: 10;
			text-align: center;
			border-radius: 20rpx;
			.triangle{
				position: absolute;
				top: -28rpx;
				right: 123rpx;
				width: 0;
				height: 0;
				border-left: 9px solid transparent;
				border-right: 9px solid transparent;
				border-bottom: 15px solid white;


			}
		}
		// 遮罩层
		.mask{
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: gray;
			opacity: .7;
		}
	}
	
	// 取消button样式
	
	
	
	
</style>
