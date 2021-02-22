<template>
	<view class="sigin">
		<!-- 头部背景区 -->
		<view class="bg"></view>
		<!-- 签到头部 -->
		<view class="head">
			<!-- 当前票数 -->
			<view class="ticket">
				<text style="font-size: 32px;margin-right: 20rpx;">{{ sign_data_list.hgold || 0 }}</text>
				票
			</view>
		</view>
		<!-- 签到选框 -->
		<view class="box pa-t20 pa-b20">
			<view class="tit">
				<text>已经签到</text>
				<text style="color: red;">{{ sign_data_list.weeks.split(',').filter(Boolean).length || 0 }}天</text>
			</view>
			<view class="main panel-center item-center wrap" >
				<view
					v-for="(item, index) in sigin_data"
					:key="index"
					class="item panel-start item-center"
					:class="sign_data_list.weeks.indexOf(index + 1) !== -1 ? 'act' : ''"
					@tap="sigin"
					:data-state="index + 1 < sign_data_list.week && sign_data_list.week.indexOf(index + 1) == -1 ? '0' : ''"
					:data-index="index"
					>
					<view class="day text-center w-100">{{ item.day }}</view>
					<view class="body text-center">
						<!--  -->
						<image
							:src="
								sign_data_list.weeks.indexOf(index + 1) !== -1
									? '/static/dui.png'
									: index + 1 < sign_data_list.week && sign_data_list.week.indexOf(index + 1) == -1
									? '/static/buqian.png'
									: '/static/sigin.png'
							"
							mode="widthFix"
						></image>
						<view class="money">{{ item.money }}票</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 满签奖励 说明 -->
		<view class="instructions">
			连续七天进行签到，额外获得
			<text style="color: #eb573e;font-weight: bold;">15票</text>
			满签奖励
		</view>

		<!-- 常规任务 -->
		<view class="common_task">
			<view class="tit">常规任务</view>
			<view class="task_detail">
				<view class="le"><image src="/static/task_gift.png" mode="widthFix"></image></view>
				<view class="ri">
					<view class="ri_tit">邀请好友</view>
					<view class="ri_des">每邀请一位新用户，奖励五票</view>
				</view>
				<view class="go_done" @click="goInvite">去完成</view>
			</view>
			<view class="task_detail">
				<view class="le see_txt"><image src="/static/renwu.png" mode="widthFix"></image></view>
				<view class="ri">
					<view class="ri_tit">浏览文章和作品</view>
					<view class="ri_des">每浏览一篇文章，奖励一票</view>
				</view>
				<view class="go_done" @click="golist">去浏览</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 签到返回的结果
			sign_data_list: {
				weeks: '',
				week:''
			},
			// 签到 渲染数据
			sigin_data: [
				{
					day: '周一',
					money: 1
				},
				{
					day: '周二',
					money: 2
				},
				{
					day: '周三',
					money: 3
				},
				{
					day: '周四',
					money: 4
				},
				{
					day: '周五',
					money: 5
				},
				{
					day: '周六',
					money: 6
				},
				{
					day: '周日',
					money: 7
				}
			],
			// 当前是否已经进行了签到，
			// 判断用户当前是否进行了签到
			act_type: false
		};
	},
	onLoad() {},
	onShow() {
		let _this = this;
		// console.log('请求签到状态');
		this.http({
			url: 'sign'
		}).then(res => {
			if (res.data.status === '0') {
				// 未签到
				_this.act_type = false;
			} else {
				// 已签到
				_this.act_type = true;
			}
			// 查询签到的结果
			_this.sign_data_list = res.data;
			if (!_this.sign_data_list.weeks) {
				_this.sign_data_list.weeks = '';
			}
		});
	},

	methods: {
		// 判断是否 本周满签
		fullSign() {
			uni.showToast({
				icon: 'none',
				title: '满签奖励15票'
			});
		},
		// 补签接口
		addSign(index) {
			console.log('index', index);
			let _this = this;
			uni.showModal({
				content: '是否消耗五票进行补签?',
				success(res) {
					if (res.confirm) {
						_this
							.http({
								url: 'sign/makeUp',
								method: 'POST',
								data: {
									// 补签之后给的票数
									hGold: _this.sigin_data[index].money,
									// 对周几进行补签
									week: index + 1
								}
							})
							.then(res => {
								_this.sign_data_list.weeks = res.data.weeks;
								_this.sign_data_list.hgold = res.data.hgold;
								// 判断是否达到了满签
								if (_this.sign_data_list.weeks.length === 13) {
									_this.fullSign();
								}
							});
					} else {
						console.log('用户点击取消');
					}
				},
				fail() {}
			});
		},
		// 本日签到
		nowSign() {
			this.http({
				url: 'sign',
				method: 'POST',
				data: {
					hGold: this.sigin_data[this.sign_data_list.week - 1].money
				}
			}).then(res => {
				this.sign_data_list.weeks = res.data.weeks;
				this.act_type = true;
				// 改变当前票数
				this.sign_data_list.hgold += this.sigin_data[this.sign_data_list.week - 1].money;
				// 判断是否达到了满签
				if (this.sign_data_list.weeks.length === 13) {
					this.fullSign();
				}
			});
		},
		// 进行签到
		sigin(e) {
			var state = e.currentTarget.dataset.state;
			var index = e.currentTarget.dataset.index;
			// 如果 state 为 0 表示补签
			if (e.currentTarget.dataset.state == '0') {
				this.addSign(index);
				return;
			}
			// 进行本日签到
			// 确定用户点击的 是当前要进行签到的按钮
			// console.log('天数',this.sign_data_list.weeks.split(','))
			if (index !== this.sign_data_list.week - 1) {
				return;
			}
			if (!this.act_type) {
				this.nowSign();
			}
		},
		// 浏览文章
		golist() {
			uni.switchTab({
				url: '/pages/Introduction/Introduction'
			});
		},
		// 跳转到邀请页面
		goInvite() {
			uni.navigateTo({
				url: '/pagesA/myData/invite'
			});
		}
	}
};
</script>

<style>
page {
	/* color: white; */
	background-color: #f2f3f5;
}
</style>

<style scoped lang="scss">
.sigin {
	// 背景板
	.bg {
		position: absolute;
		width: 100%;
		height: 450rpx;
		background-image: linear-gradient(to right, #ec7034, #eb573e);
		z-index: -1;
	}
	// 头部
	.head {
		width: 88%;
		box-sizing: border-box;
		margin: auto;
		padding-top: 65rpx;
		color: white;
		.location {
		}
		.ticket {
			margin-top: 30rpx;
		}
	}
	// 签到选框
	.box {
		width: 88%;
		box-sizing: border-box;
		margin: 59rpx auto 0;
		background-color: white;
		border-radius: 25rpx;
		// 签到提示
		.tit {
			margin-left: 20rpx;
			font-weight: bold;
			margin-bottom: 10rpx;
		}
		.main {
			box-sizing: border-box;
			// 当前要签到的样式
			.item {
				position: relative;
				width: 139rpx;
				height: 170rpx;
				border-radius: 10rpx;
				overflow: hidden;
				background-color: #f1f1f1;
				margin-top: 20rpx;
				margin-right: 20rpx;
				flex-direction: column;
				// 表示已经签到的 对勾
				.dui {
					width: 140rpx;
					height: 83rpx;
					z-index: 20;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
				.day {
					padding-top: 10rpx;
					height: 40rpx;
					font-weight: bold;
					font-size: 26rpx;
					color: #7d8083;
				}
				.body {
					height: 114rpx;
					image {
						margin-top: 10rpx;
						width: 60rpx;
					}
					.money {
						color: #b1b1b3;
					}
				}
			}
			// 已经签到的样式
			.act {
				// background-color: #f0c054;
				// 设置渐进样式
				background-image: linear-gradient(to top, #f0c054, #ffffcc);
				color: white;
				.day {
					// color: white;
					// background-color: #f0c054;
				}
				.body {
					// background-color: #f0c054;
					.money {
						color: white;
					}
				}
			}
			// 未进行签到的样式
			.n_act {
				background-color: #f1f1f1;
				.day {
					color: #848587;
					background-color: #f23030;
				}
				.body {
					.money {
					}
				}
			}
			// 取消第三个和第六个的margin
			.item:nth-child(4) {
				margin-right: 0rpx;
			}
			.item:nth-child(7) {
				margin-right: 0rpx;
				width: 297rpx;
			}
		}
	}
	// 满签奖励说明
	.instructions {
		text-align: center;
		margin: auto;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		color: #7c7f82;
		width: 88%;
		font-size: 26rpx;
	}

	// 常规任务
	.common_task {
		background-color: white;
		width: 88%;
		box-sizing: border-box;
		margin: auto;
		margin-top: 30rpx;
		padding-top: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 30rpx;
		padding-left: 30rpx;
		border-radius: 10rpx;
		.tit {
			font-size: 30rpx;
			font-weight: bold;
		}
		.task_detail {
			margin-top: 20rpx;
			position: relative;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.le {
				width: 88rpx;
				height: 88rpx;
				margin-right: 25rpx;
				image {
					width: 100%;
				}
			}
			.see_txt {
				width: 88rpx;
				height: 88rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 100%;
					transform: scale(0.8);
				}
			}
			.ri {
				.ri_tit {
					font-size: 30rpx;
					margin-bottom: 10rpx;
				}
				.ri_des {
					font-size: 20rpx;
					color: #7c7f82;
				}
			}
			.go_done {
				width: 122rpx;
				line-height: 47rpx;
				background-color: #eb6a36;
				color: white;
				border-radius: 40rpx;
				position: absolute;
				right: 10rpx;
				top: 9rpx;
				font-size: 27rpx;
				text-align: center;
			}
		}
	}
}

button {
	padding-left: 0px;
	padding-right: 0px;
}
</style>
