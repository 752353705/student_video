<template>
	<view class="setting">
		<view class="head">
			<view class="le">
				<view class="name">{{ userInfo.userName }}</view>
				<view class="phone" v-if="user_phone">{{ user_phone.slice(0, 3) }}****{{ user_phone.slice(7) }}</view>
				<view style="font-size: 46rpx;" class="phone" @click="jump" v-else>登录</view>
			</view>
			<view class="ri"><image :src="userInfo.avatarUrl || '/static/avatarUrl.png'" mode=""></image></view>
		</view>
		<!-- 展示框 -->
		<view class="content">
			<view v-for="(item, index) in useList" :key="index" 
				@click="open" :data-id="item.id"
				>
				<!-- v-if="index !== 2" -->
				<view class="list_item" v-if="index !== 2">
					<view class="left_icon">
						<!-- 当index为1 时 换为本地图标 -->
						<image v-if="item.id == 'ticket_num' " 
							src="/static/sigin.png" style="width:25px ;height: 25px;margin-right: 20rpx;" 
							mode="">
						</image>
						<text v-else class="t-icon" :class="item.icon"></text>
						
						<text>{{ item.txt }}</text>
					</view>
					<view v-if="item.id !== 'ticket_num'" class="iconfont iconfanhui"></view>
					<text v-else>
						{{ userInfo.goldNumber || '0' }}
						<!-- <text class="iconfont iconfanhui"></text> -->
					</text>
				</view>

				<!-- 当用户使用ios时，不显示充值 -->
				<view class="list_item" v-if="!is_IOS && index == 2">
					<view class="left_icon">
						<text class="t-icon" :class="item.icon"></text>
						<text>{{ item.txt }}</text>
					</view>
					<view v-if="item.id !== 'ticket_num'" class="iconfont iconfanhui"></view>
					<text v-else>
						{{ userInfo.goldNumber || '0' }}
						<!-- <text class="iconfont iconfanhui"></text> -->
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 控制IOS端 充值礼物方面禁止，不显示相应界面
			is_IOS: false,
			userInfo: '',
			user_phone: '',
			useList: [
				{ icon: 'iconweibiaoti--', txt: '个人资料', id:'user_msg' },
				{ icon: 'iconzu', txt: '票数', id:'ticket_num' },
				// { icon: 'iconIcon', txt: '充值', id:'recharge' },
				// { icon: 'iconIcon', txt: '我的二维码', id:'qrcode' },
				{ icon: 'iconwodeshoucang', txt: '我的收藏', id:'collection' },
				{ icon: 'iconliulanjilu-tianchong', txt: '浏览记录', id:'browse_his' },
				// { icon: 'iconzu1', txt: '用户协议', id:'agreement' },
				// { icon: 'iconzuzhichuangjian', txt: '创建大赛', id:'create_game' },
				{ icon: 'icontuichudenglu', txt: '退出登录', id:'exit' }
				// {icon:"iconpaotuibeifen",txt:'跑腿', id:'run'},
			]
		};
	},
	components: {},
	onLoad() {
		this.getPhoneType();
	},
	onShow() {
		this.user_phone = uni.getStorageSync('user_phone');
		this.getUsInfo();
	},
	methods: {
		// 获取用户当前的使用环境
		getPhoneType() {
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					console.log('运行Android上');
					break;
				case 'ios':
					console.log('运行iOS上');
					this.is_IOS = true;
					break;
				default:
					console.log('运行在开发者工具上');
					break;
			}
		},
		// 跳转到注册页
		jump() {
			// console.log('跳转页面');
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		// 获取用户的个人资料
		getUsInfo() {
			if (uni.getStorageSync('token')) {
				this.http({
					url:'user/info'
				}).then(res => {
					this.userInfo = res.data;
				})
			}
		},
		// 进行弹窗的控制
		open(e) {
			// console.log('e',e.currentTarget.dataset.id)
			let id = e.currentTarget.dataset.id
			let _this = this;

			if (!this.user_phone) {
				// 如果当前没有了电话号
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return;
			}
			if (id === 'user_msg') {
				// 跳转到资料编辑
				uni.navigateTo({
					url: '/pagesA/myData/myData'
				});
				// this.$refs.popup_user.open()
			} 
			else if (id === 'ticket_num') {
				// 用户进入 消费记录
				uni.navigateTo({
					// url: '/pagesA/myWallet/myWallet'
					url: '/pagesA/myData/myWallet'
				});
			}  
			else if (id === 'collection') {
				// 用户进入我的收藏
				uni.navigateTo({
					url: '/pagesA/myData/myCollection'
				});
			} 
			else if (id === 'agreement') {
				console.log('跳转')
				// 用户进入 用户协议
				uni.navigateTo({
					url: '/pagesA/myData/agreement'
				});
			} 
			else if (id === 'browse_his') {
				// 用户进入浏览记录
				uni.navigateTo({
					url: '/pagesA/myData/myHistory'
				});
			}
			// else if(id === 'recharge'){
			// 	uni.navigateTo({
			// 		url:'/pages/recharge/recharge'
			// 	})
			// }
			else if (id === 'exit') {
				// 显示退出登录
				uni.showModal({
					title: '提示',
					content: '确定退出吗',
					success: function(res) {
						if (res.confirm) {
							_this.http({
								url:'auth/logout',
								method:'POST'
							}).then(res => {
								// 如果返回成功，清除本地缓存，并跳转到首页
								_this.userInfo.userName = '';
								_this.userInfo.avatarUrl = '/static/avatarUrl.png';
								// 显示的绑定手机号也进行切换
								_this.user_phone = '';
								uni.removeStorageSync('user_name');
								uni.removeStorageSync('user_img');
								uni.removeStorageSync('token');
								uni.removeStorageSync('user_phone');
							})
						} else if (res.cancel) {
							// 不进行操作弹出框取消即可
						}
					},
					fail: function() {
						console.log('调用接口失败');
					}
				});
			}  
			// else if (id === 'qrcode') {
			// 	// 用户进入我的名片
			// 	uni.navigateTo({
			// 		url: '/pages/my/myCode'
			// 	});
			// }
		}
	}
};
</script>

<style scoped lang="scss">
.setting {
	box-sizing: border-box;
	padding-left: 44rpx;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	padding-right: 44rpx;
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		.le {
			.name {
				font-size: 39rpx;
				font-weight: bold;
			}
			.phone {
				margin-top: 10rpx;
				color: #797979;
				font-size: 23rpx;
			}
		}
		.ri {
			width: 125rpx;
			height: 125rpx;
			border-radius: 50%;
			overflow: hidden;
			// iOS端圆角设置失效
			-webkit-backface-visibility: hidden;
			-webkit-transform: translate3d(0, 0, 0);
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	// 内容区样式
	.content {
		font-size: 30rpx;
		.list_item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 97rpx;
			.left_icon {
				display: flex;
				align-items: center;
				.t-icon {
					width: 25px;
					height: 25px;
					margin-right: 20rpx;
				}
			}
		}
	}
}
</style>
