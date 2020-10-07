<template>
	<view>
		<!-- 有关注 -->
		<block v-if="list.length !=0">
			<!-- 我的关注页面 -->
			<block v-if="!userId">
				<view class="fans pa-t20 pa-r40 pa-b20 box-boder item-center panel-between" v-for="(item,index) in list" :key="index" @tap="goChart(index)">
					<view class="left">
						<view class="img"><image :src="item.avatarUrl" mode=""></image></view>
						<view class="name">{{ item.userName }}</view>
					</view>
					<view v-if="!item.followed" class="focus" @click.stop="focusOn(index)">已关注</view>
					<view v-else class="focus focuson" @click.stop="focusOn(index)">关注</view>
				</view>
			</block>
			
			<!-- 其他用户的关注页面 -->
			<block v-else>
				<view class="fans" v-for="(item,index) in list" :key="index" @tap="goChart(index)">
					<view class="left">
						<view class="img"><image :src="item.avatarUrl" mode=""></image></view>
						<view class="name">{{ item.userName }}</view>
					</view>
					<view v-if="item.followed" class="focus" @click.stop="focusOn(index)">已关注</view>
					<view v-else class="focus focuson" @click.stop="focusOn(index)">关注</view>
				</view>
			</block>
		</block>
		<!-- 暂无关注 -->
		<block v-else>
		<image class="empty" src="../../static/dingdan.png" mode=""></image>
		</block>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			focus: true,
			list: [], // 用于渲染的信息内容
			name: '',
			userId:'', // 有值则表示查看他人的关注
		};
	},
	onLoad(option) {
		// 渲染 粉丝列表或者关注列表
		console.log('当前 关注 列表');
		// 渲染参数 看 渲染那些数据
		this.userId = option.userId
		
		
		
		
	},
	onShow() {
		let _this = this;
		console.log('myFocus onshow');
		// 获取粉丝列表
			// 如果有用户id 则是获取别人的
			if(this.userId){
				this.getOtherFans()
			}else{
				this.getMyFans()
			}
		
		
	},
	methods: {
		// 获取我的关注列表
		getMyFans(){
			this.api._get(
				'follow/follows',
				{
					pageNum: 1,
					pageSize: 10
				},
				(res) => {
					console.log('获取我的关注列表 res ===>', res);
			
					this.list = res.data.list;
				}
			);
		},
		// 获取其他人的关注
		getOtherFans(){
			this.api._get(
				'follow/otherUserfollows',
				{
					userId:this.userId,
					pageNum: 1,
					pageSize: 10
				},
				(res) => {
					console.log('获取其他人的关注列表 res ===>', res);
			
					this.list = res.data.list;
				}
			);
		},
		
		
		// 用户跳转到私信界面
		goChart(index) {
			// 根据用户点击的index 获取点击对象的信息
			let uMsg = this.list[index];
			// uni.navigateTo({
			// 	url: `/pages/chart/chartRoom?uname=${uMsg.userName}&uid=${uMsg.userId}`
			// });
		},
		focusOn(index) {
			let _this = this;
			if (!this.list[index].followed) {
				console.log('uid',_this.list[index])
				// 用户未关注
				// 原先未关注 ，现在进行关注操作
				this.api._post(
					'follow',
					{
						followedId: _this.list[index].userId //被关注的 作者id
					},
					function(res) {
						// console.log('进行关注成功',res);
						_this.list[index].followed = !_this.list[index].followed;
					}
				);
			} else {
				// 用户已经进行了关注，此时再进行点击表示用户是否要取消关注
				uni.showModal({
					content: '取消关注',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							_this.api._post(
								'follow',
								{
									followedId: _this.list[index].userId //被关注的 作者id
								},
								function(res) {
									console.log('进行关注成功', res);
									_this.list[index].followed = !_this.list[index].followed
								}
							);

							// _this.focus = true //用户取消关注
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
};
</script>

<style lang="less">
	// 空布局
	.empty {
		width: 200px;
		height: 200px;
		position: absolute;
		top: 36%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
.fans {
	// display: flex;
	// justify-content: space-between;
	// align-items: center;
	// box-sizing: border-box;
	// padding: 20rpx 40rpx;
	// padding-left: 0;
	margin: 20rpx 40rpx;
	position: relative;
	.left {
		display: flex;
		align-items: center;
		.img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 40rpx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.focus {
		border: 1px solid red;
		color: red;
		padding: 6rpx 35rpx;
		// padding-top: 10rpx;
		// padding-right: 10rpx;
		// padding-bottom: 10rpx;
		// padding-left: 10rpx;
		border-radius: 40rpx;
		font-size: 27rpx;
	}
	.focuson {
		background-color: #ff2440;
		color: white;
	}
}
// 绘制0.5px的底线
.fans:after {
	content: '  ';
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	border-bottom: 1px solid black;
	/* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}
.fans:last-child::after {
	content: '  ';
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	border-bottom: 1px solid white;
	/* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}
</style>
