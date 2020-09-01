<template>
	<view class="container">
		<scroll-view class="coupon-list" :scroll-top="scrollTop">
			<view class="unselect" @tap="unselectCoupon">不选择优惠券</view>

			<view class="item" v-for="(item, index) in couponList" :key="item.id" @tap="selectCoupon" :data-id="item.id">
				<view class="tag">{{ item.tag }}</view>
				<view class="content">
					<view class="left">
						<view class="discount">{{ item.discount }}元</view>
						<view class="min">满{{ item.min }}元使用</view>
					</view>
					<view class="right">
						<view class="name">{{ item.name }}</view>
						<view class="desc">{{ item.desc }}</view>
						<view class="time">有效期：{{ item.startTime }} - {{ item.endTime }}</view>
					</view>
					<view class="couponbg"></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			couponList: [],
			cartId: 0,
			couponId: 0,
			grouponLinkId: 0,
			scrollTop: 0
		};
	},
	onShow() {
		// 页面显示
		wx.showLoading({
			title: '加载中...'
		});

		try {
			var cartId = wx.getStorageSync('cartId');
			if (!cartId) {
				cartId = 0;
			}

			var couponId = wx.getStorageSync('couponId');
			if (!couponId) {
				couponId = 0;
			}

			var grouponRulesId = wx.getStorageSync('grouponRulesId');
			if (!grouponRulesId) {
				grouponRulesId = 0;
			}

			this.cartId = cartId;
			this.couponId = couponId;
			this.grouponRulesId = grouponRulesId;
		} catch (e) {
			// Do something when catch error
			console.log(e);
		}

		this.getCouponList();
	},
	methods: {
		getCouponList: function() {
			let that = this;
			that.couponList = [];
			// 页面渲染完成
			wx.showToast({
				title: '加载中...',
				icon: 'loading',
				duration: 2000
			});

			this.api._get(
				'coupon/selectlist',
				{
					cartId: that.cartId,
					grouponRulesId: that.grouponRulesId
				},
				function(res) {
					if (res.errno === 0) {
						that.couponList = res.data;
					}
					wx.hideToast();
				}
			);
		},

		selectCoupon: function(e) {
			try {
				wx.setStorageSync('couponId', e.currentTarget.dataset.id);
			} catch (error) {}

			wx.navigateBack();
		},

		unselectCoupon: function() {
			// 如果优惠券ID设置-1，则表示订单不使用优惠券
			try {
				wx.setStorageSync('couponId', -1);
			} catch (error) {}

			wx.navigateBack();
		}
	}
};
</script>

<style lang="less">
page {
	font-size: 28rpx;
	background-color: #f5f5f5;
	color: #333;
}

.container {
	background: #f4f4f4;
	min-height: 100%;
	padding-top: 10rpx;
}

.coupon-list {
	width: 670rpx;
	height: auto;
	overflow: hidden;
}

.unselect {
	background-color: #85c43f;
	font-size: 32rpx;
	color: #fff;
	width: 650rpx;
	height: 90rpx;
	border-radius: 20rpx;
	text-align: center;
	line-height: 90rpx;
	margin: 10rpx;
	margin-bottom: 30rpx;
}

.item {
	position: relative;
	height: 250rpx;
	width: 650rpx;
	background: linear-gradient(to right, #d8050f, #e68d08);
	margin-bottom: 10rpx;
	margin-left: 10rpx;
	margin-right: 10rpx;
	overflow: hidden;
	border-radius: 10rpx;
}

.item:before,
.item:after {
	content: '.';
	width: 0;
	height: 200%;
	position: absolute;
	top: 20rpx;
}

.item:before {
	border-right: 20rpx dotted #eeeeee;
	left: -10rpx;
	width: 1rpx;
}

.item:after {
	border-left: 20rpx dotted #eeeeee;
	right: -10rpx;
}

.tag {
	margin-left: 40rpx;
	height: 32rpx;
	background: #b8bb12;
	padding-left: 16rpx;
	padding-right: 16rpx;
	position: absolute;
	left: 20rpx;
	color: #fff;
	top: 20rpx;
	font-size: 20rpx;
	text-align: center;
	line-height: 32rpx;
}

.content {
	margin-left: 30rpx;
	display: flex;
	margin-right: 10rpx;
	flex-direction: row;
}

.content .left {
	padding-top: 50rpx;
	flex: 1;
	border-right: 2rpx dashed rgba(230, 230, 230, 0.5);
}

.discount {
	font-size: 43rpx;
	color: #e9f814;
}

.min {
	font-size: 28rpx;
	color: #fff;
}

.content .right {
	padding: 11px;
	width: 420rpx;
}

.name {
	font-size: 40rpx;
	color: #fff;
	margin-bottom: 14rpx;
}

.desc {
	font-size: 24rpx;
	color: #fff;
}

.time {
	font-size: 24rpx;
	color: #fff;
	line-height: 30rpx;
}

.couponbg {
	position: absolute;
	left: 20%;
	top: 95rpx;
	height: 290rpx;
	width: 680rpx;
	background-color: rgba(255, 255, 255, 0.15);
	transform: rotate(-20deg);
}
</style>
