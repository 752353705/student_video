<template>
	<view class="tabMsg">
			<view class="tab_head">
			<view class="head_item" v-for="(item, index) in headMsg" :key="index" @click="goDetail(index)">
				<view class="icon  img" :class="item.icon" ></view>
				<view class="msg">{{ item.msg }}</view>
			</view>
		</view>

		<!-- 消息列表 -->
		<view class="content">
			<!-- 测试 -->
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id" @click="click" @open="open" :options="options">
				<view class="item u-border-bottom" @click.stop="goChartRoom">
					<image mode="aspectFill" :src="item.images" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<view class="right_top">
							<view class="name">姓名</view>
							<view class="time">15:03</view>
						</view>
						<text class="title u-line-2">{{ item.title }}</text>
						<u-badge v-if="showbadge" count="10" :offset="off" size="mini" />
					</view>
				</view>
			</u-swipe-action>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 滑动操作
			list: [
				{
					id: 1,
					title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
					images: 'https://cdn.uviewui.com/uview/common/logo.png',
					show: false
				},
				{
					id: 2,
					title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
					images: 'https://cdn.uviewui.com/uview/common/logo.png',
					show: false
				},
				{
					id: 3,
					title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
					images: 'https://cdn.uviewui.com/uview/common/logo.png',
					show: false
				}
			],
			disabled: false,
			btnWidth: 180,
			show: false,
			options: [
				// {
				// 	text: '收藏',
				// 	style: {
				// 		backgroundColor: '#007aff'
				// 	}
				// },
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			],
			// 控制显示未读消息数的位置
			off: [66, 22],
			headMsg: [{ icon: 'iconzanheshoucang', msg: '赞和收藏' }, { icon: 'iconxinzengguanzhu', msg: '新增关注' }, { icon: 'iconxiaoxi', msg: '评论和@' }],
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
		click(index, index1) {
			if (index1 == 1) {
				this.list.splice(index, 1);
				this.$u.toast(`删除了第${index}个cell`);
			} else {
				this.list[index].show = false;
				this.$u.toast(`收藏成功`);
			}
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		open(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.list[index].show = true;
			this.list.map((val, idx) => {
				if (index != idx) this.list[idx].show = false;
			});
		},

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

			// uni.removeTabBarBadge({
			// 	index: 3,
			// 	success() {
			// 		console.log('清除tabbar 下角标');
			// 		_this.showbadge = false;
			// 	},
			// 	fail(err) {
			// 		console.log('清除角标失败', err);
			// 	}
			// });

			uni.navigateTo({
				url: '/pages/chart/chartRoom',
				success() {
					// 清除当前的下角标
					_this.showbadge = false;
				}
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
			.img {
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
		// 测试
		.item {
			display: flex;
			padding: 20rpx;
		}

		image {
			width: 120rpx;
			flex: 0 0 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}

		.title {
			text-align: left;
			font-size: 28rpx;
			color: red;
			margin-top: 20rpx;
		}
		// 测试
		.title-wrap {
			width: 100%;
			// background-color: green;
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
			.title {
				width: 220px;
				// background-color: yellow;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 26rpx;
				color: #8d8d8d;
			}
		}
	}
}
</style>
