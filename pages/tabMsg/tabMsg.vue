<template>
	<view class="tabMsg">
		<view class="tab_head">
			<view class="head_item" v-for="(item, index) in headMsg" :key="index" @click="goDetail(index)">
				<view class="icon  img" :class="item.icon" ></view>
				<!-- <text class="iconfont iconxinzengguanzhu "></text> -->
				<!-- <image src="/assets/svg/1.svg"></image> -->
				<view class="msg">{{ item.msg }}</view>
			</view>
		</view>

		<!-- 消息列表 -->
		<view class="content">
			<!-- 消息列表 -->
			<view class="con_item" @click="goChartRoom">
				<view class="left"></view>
				<view class="right">
					<view class="right_top">
						<view class="name">姓名</view>
						<view class="time">15:03</view>
					</view>
					<view class="con_msg">消息展示消息展示消息展示消息展示消息展示消息展示消息展示消息展示消息展示消息展示消息展示消息展示</view>
					<u-badge v-if="showbadge" count="10" :offset="off" size="mini" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 控制显示未读消息数
			off: [40, 0],
			headMsg: [
				{ icon: 'iconzanheshoucang', msg: '赞和收藏' }, 
				{ icon: 'iconxinzengguanzhu', msg: '新增关注' }, 
				{ icon: 'iconxiaoxi', msg: '评论和@' },
			],
			// 是否显示未读消息个数
			showbadge: true
		};
	},
	onLoad() {
		console.log('显示');
		uni.hideHomeButton();
		uni.setTabBarBadge({
			index: 3,
			text: '10'
		});
	},
	methods: {
		// 点击头部进入详情页
		goDetail(index) {
			if (index === 0) {
				console.log('进行跳转 赞');
				uni.navigateTo({
					url: '/pages/zan/zan'
				});
			} else if (index === 1) {
				console.log('进行跳转 新增关注');
				uni.navigateTo({
					url: '/pages/newfocus/newfocus'
				});
			} else if (index === 2) {
				console.log('进行跳转 评论');
				uni.navigateTo({
					url: '/pages/commt/commt'
				});
			}
		},
		// 点击聊天区进入 聊天室
		goChartRoom() {
			console.log('进入聊天室');
			let _this = this;

			uni.removeTabBarBadge({
				index: 3,
				success() {
					console.log('清除tabbar 下角标');
					_this.showbadge = false;
				},
				fail(err) {
					console.log('清除角标失败', err);
				}
			});

			uni.navigateTo({
				url: '/pages/chartRoom/chartRoom'
			});
		}
	}
};
</script>

<style lang="less">
.tabMsg {
	background-color: #f6f6f6;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
	.tab_head {
		background-color: white;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		position: relative;

		padding: 40rpx 10rpx;
		.head_item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.img{
				width: 80rpx;
				height: 80rpx;
			}
			.msg {
				margin-top: 20rpx;
			}
		}
	}
	//绘制 head  0.5px的上边框
	.head::after {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 1px;
		background: gray;
		transform: scaleY(0.5);
	}
	.content {
		width: 100%;
		background-color: white;
		margin-top: 40rpx;
		box-sizing: border-box;
		padding: 17rpx 30rpx;
		.con_item {
			display: flex;
			justify-content: space-between;
			.left {
				width: 88.88rpx;
				height: 88.88rpx;
				background-color: yellow;
				border-radius: 50%;
			}
			.right {
				width: 84%;
				position: relative;
				box-sizing: border-box;
				padding-bottom: 41rpx;
				.right_top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 6rpx;
					.name {
						font-size: 39rpx;
					}
					.time {
						color: #8d8d8d;
						font-size: 26rpx;
					}
				}
				.con_msg {
					width: 60%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 26rpx;
					color: #8d8d8d;
				}
			}
			// 0.5px 底边框
			.right::after {
				content: ' ';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1px;
				background: gray;
				transform: scaleY(0.5);
			}
		}
	}
}
</style>
