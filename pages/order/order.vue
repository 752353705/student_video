<template>
	<view class="container">
		<view class="orders-switch">
			<view :class="showType == 0 ? 'active item' : 'item'" @tap="switchTab" data-index="0"><view class="txt">全部</view></view>
			<view :class="showType == 1 ? 'active item' : 'item'" @tap="switchTab" data-index="1"><view class="txt">待付款</view></view>
			<view :class="showType == 2 ? 'active item' : 'item'" @tap="switchTab" data-index="2"><view class="txt">待发货</view></view>
			<view :class="showType == 3 ? 'active item' : 'item'" @tap="switchTab" data-index="3"><view class="txt">待收货</view></view>
			<view :class="showType == 4 ? 'active item' : 'item'" @tap="switchTab" data-index="4"><view class="txt">待评价</view></view>
		</view>

		<view class="no-order" v-if="orderList.length <= 0">
			<view class="c"><image src="/static/images/noCart.png" /></view>
		</view>

		<view class="orders">
			<view class="order" v-for="(item, index) in orderList" :key="item.id">
				<navigator :url="'../orderDetail/orderDetail?id=' + item.id" class="h">
					<view class="l">订单编号：{{ item.orderSn }}</view>
					<view class="r">{{ item.orderStatusText }}</view>
				</navigator>
				<navigator :url="'../orderDetail/orderDetail?id=' + item.id" class="goods">
					<view class="item" v-for="(gitem, index) in item.goodsList" :key="gitem.id">
						<view class="img"><image :src="gitem.picUrl"></image></view>
						<view class="info">
							<view class="t">
								<text class="name">{{ gitem.goodsName }}</text>
							</view>
							<view class="t">
								<text class="attr">{{ gitem.specifications }}</text>
								<text class="number">共 {{ gitem.number }} 件商品</text>
							</view>
							<view class="price">￥{{ gitem.price }}</view>
							<view class="btn active" v-if="item.handleOption.comment && gitem.comment == 0">
								<navigator :url="'../../commentPost/commentPost?orderId=' + gitem.orderId && ('valueId=' + gitem.goodsId) & ('type=' + 0)">去评价</navigator>
							</view>
							<view class="btn active" v-if="item.handleOption.rebuy"><navigator :url="'../../goods/goods?id=' + gitem.goodsId">再次购买</navigator></view>
						</view>
					</view>
				</navigator>
				<view class="b">
					<view class="l">
						实付：
						<text class="cost">￥{{ item.actualPrice }}</text>
					</view>
					<view class="r">
						<view class="btn active" :data-index="item.id" @tap="cancelOrder" v-if="item.handleOption.cancel">取消订单</view>
						<view class="btn active" :data-index="item.id" @tap="payOrder" v-if="item.handleOption.pay">去付款</view>
						<view class="btn active" :da:ta-index="item.id" @tap="detailExpress" v-if="item.handleOption.confirm">查看物流</view>
						<view class="btn active" :data-index="item.id" @tap="confirmOrder" v-if="item.handleOption.confirm">确认收货</view>
						<view class="btn active" :data-index="item.id" @tap="deleteOrder" v-if="item.handleOption.delete">删除订单</view>
						<view class="btn active" :data-index="item.id" @tap="refundOrder" v-if="item.handleOption.refund">申请退款</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var util = require('../../utils/util.js');
export default {
	components: {},
	data() {
		return {
			orderList: [],
			showType: 0,
			page: 1,
			size: 10,
			totalPages: 1
		};
	},

	onLoad(options) {
		try {
			var tab = wx.getStorageSync('tab');
			this.showType = tab;
		} catch (e) {}
	},

	onShow() {
		this.orderList = [];
		this.page = 1;
		this.size = 10;
		this.totalPages = 1;
		this.getOrderList();
	},

	methods: {
		getOrderList() {
			let that = this;
			this.api._get(
				'order/list',
				{
					showType: that.showType,
					page: that.page,
					size: that.size
				},
				function(res) {
					if (res.errno === 0) {
						console.log(res.data);
						(that.orderList = that.orderList.concat(res.data.data)), (that.totalPages = res.data.totalPages);
					}
				}
			);
		},

		onReachBottom() {
			if (this.totalPages > this.page) {
				this.page = this.data.page + 1;
				this.getOrderList();
			} else {
				wx.showToast({
					title: '没有更多订单了',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
		},

		switchTab: function(event) {
			let showType = event.currentTarget.dataset.index;
			this.orderList = [];
			this.showType = showType;
			this.page = 1;
			this.size = 10;
			this.totalPages = 1;
			this.getOrderList();
		},

		// “去付款”按钮点击效果
		payOrder: function(e) {
			let that = this;
			let orderId = e.currentTarget.dataset.index;

			this.api._get(
				'order/prepay',
				{
					orderId: orderId
				},
				function(res) {
					if (res.errno === 0) {
						const payParam = res.data;
						console.log('支付过程开始');
						wx.requestPayment({
							timeStamp: payParam.timeStamp,
							nonceStr: payParam.nonceStr,
							package: payParam.packageValue,
							signType: payParam.signType,
							paySign: payParam.paySign,
							success: function(res) {
								console.log('支付过程成功');
								util.redirect('/pages/ucenter/order/order');
							},
							fail: function(res) {
								console.log('支付过程失败');
								util.showErrorToast('支付失败');
							},
							complete: function(res) {
								console.log('支付过程结束');
							}
						});
					}
				}
			);
		},

		// “取消订单”点击效果
		cancelOrder: function(e) {
			let that = this;
			let orderId = e.currentTarget.dataset.index;

			wx.showModal({
				title: '',
				content: '确定要取消此订单？',
				success: function(res) {
					if (res.confirm) {
						that.api._post(
							'order/cancel',
							{
								orderId: orderId
							},
							function(res) {
								if (res.errno === 0) {
									wx.showToast({
										title: '取消订单成功'
									});
									util.redirect('/pages/ucenter/order/order');
								} else {
									util.showErrorToast(res.errmsg);
								}
							}
						);
					}
				}
			});
		},

		// “取消订单并退款”点击效果
		refundOrder: function(e) {
			let that = this;
			let orderId = e.currentTarget.dataset.index;

			wx.showModal({
				title: '',
				content: '确定要取消此订单？',
				success: function(res) {
					if (res.confirm) {
						that.api._post(
							'order/refund',
							{
								orderId: orderId
							},
							function(res) {
								if (res.errno === 0) {
									wx.showToast({
										title: '取消订单成功'
									});
									util.redirect('/pages/ucenter/order/order');
								} else {
									util.showErrorToast(res.errmsg);
								}
							}
						);
					}
				}
			});
		},

		// “删除”点击效果
		deleteOrder: function(e) {
			let that = this;
			let orderId = e.currentTarget.dataset.index;

			wx.showModal({
				title: '',
				content: '确定要删除此订单？',
				success: function(res) {
					if (res.confirm) {
						that.api._post(
							'order/delete',
							{
								orderId: orderId
							},
							function(res) {
								if (res.errno === 0) {
									wx.showToast({
										title: '删除订单成功'
									});
									util.redirect('/pages/ucenter/order/order');
								} else {
									util.showErrorToast(res.errmsg);
								}
							}
						);
					}
				}
			});
		},

		// “确认收货”点击效果
		confirmOrder: function(e) {
			let that = this;
			let orderId = e.currentTarget.dataset.index;

			wx.showModal({
				title: '',
				content: '确认收货？',
				success: function(res) {
					if (res.confirm) {
						that.api._post(
							'order/confirm',
							{
								orderId: orderId
							},
							function(res) {
								if (res.errno === 0) {
									wx.showToast({
										title: '确认收货成功！'
									});
									util.redirect('/pages/ucenter/order/order');
								} else {
									util.showErrorToast(res.errmsg);
								}
							}
						);
					}
				}
			});
		},

		detailExpress: function(e) {
			let orderId = e.currentTarget.dataset.index;
			wx.navigateTo({ url: '/pages/ucenter/expressInfo/expressInfo?orderId=' + orderId });
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	width: 100%;
	background: #f4f4f4;
}

.orders-switch {
	width: 100%;
	background: #fff;
	height: 84rpx;
	/* border-bottom: 1px solid rgba(0,0,0,.15); */
}

.orders-switch .item {
	display: inline-block;
	height: 82rpx;
	width: 18%;
	box-sizing: border-box;
	padding: 0 15rpx;
	text-align: center;
}

.orders-switch .item .txt {
	display: inline-block;
	height: 82rpx;
	padding: 0 20rpx;
	line-height: 82rpx;
	color: #9a9ba1;
	font-size: 30rpx;
	margin-left: 20rp;
	margin-right: 20rpx;
	width: 140rpx;
}

.orders-switch .item.active .txt {
	color: #85c43f;
	border-bottom: 3rpx solid #85c43f;
}

.no-order {
	width: 100%;
	height: auto;
	margin: 0 auto;
}

.no-order .c {
	width: 100%;
	height: auto;
	margin-top: 200rpx;
}

.no-order .c image {
	margin: 0 auto;
	display: block;
	text-align: center;
	width: 414rpx;
	height: 336rpx;
}

.no-order .c text {
	margin: 0 auto;
	display: block;
	width: 258rpx;
	height: 29rpx;
	line-height: 29rpx;
	text-align: center;
	font-size: 29rpx;
	color: #999;
}

.orders {
	height: auto;
	width: 100%;
	overflow: hidden;
}

.order {
	margin-top: 20rpx;
	background: #fff;
}

.order .h {
	height: 83.3rpx;
	line-height: 83.3rpx;
	margin-left: 31.25rpx;
	padding-right: 31.25rpx;
	border-bottom: 1px solid #f4f4f4;
	font-size: 30rpx;
	color: #333;
}

.order .h .l {
	float: left;
}

.order .h .r {
	float: right;
	color: #b4282d;
	font-size: 24rpx;
}

.order .b .cost {
	color: #b4282d;
}

.order .b {
	height: 103rpx;
	line-height: 103rpx;
	margin-left: 31.25rpx;
	padding-right: 31.25rpx;
	border-top: 1px solid #f4f4f4;
	font-size: 30rpx;
	color: #333;
}

.order .b .l {
	float: left;
}

.order .b .r {
	float: right;
}

.order .b .btn {
	margin-top: 19rpx;
	height: 64.5rpx;
	margin-right: 19rpx;
	line-height: 64.5rpx;
	text-align: center;
	padding: 0 20rpx;
	border-radius: 5rpx;
	font-size: 28rpx;
	color: #fff;
	float: left;
	background: #85c43f;
}

.order .goods {
	margin-top: 20rpx;
	background: #fff;
}

.goods .item {
	display: flex;
	align-items: top;
	height: 202rpx;
	margin-left: 31.25rpx;
	margin-bottom: 15.25rpx;
	padding-right: 31.25rpx;
	border-bottom: 1px solid #f4f4f4;
}

.goods .item:last-child {
	border-bottom: none;
}

.goods .item .img {
	height: 145.83rpx;
	margin-top: 15.5rpx;
	width: 145.83rpx;
	background: #f4f4f4;
}

.goods .item .img image {
	height: 145.83rpx;
	width: 145.83rpx;
}

.goods .item .info {
	flex: 1;
	height: 145.83rpx;
	margin-left: 20rpx;
}

.goods .item .t {
	margin-top: 14rpx;
	height: 45rpx;
	line-height: 45rpx;
	margin-bottom: 8.5rpx;
}

.goods .item .t .name {
	display: block;
	float: left;
	height: 33rpx;
	line-height: 33rpx;
	color: #333;
	font-size: 30rpx;
}

.goods .item .t .number {
	display: block;
	float: right;
	height: 29rpx;
	text-align: right;
	line-height: 29rpx;
	color: #333;
	font-size: 30rpx;
}

.goods .item .attr {
	height: 29rpx;
	line-height: 29rpx;
	color: #666;
	margin-bottom: 25rpx;
	font-size: 25rpx;
}

.goods .item .price {
	display: block;
	float: left;
	height: 30rpx;
	line-height: 30rpx;
	color: #333;
	font-size: 30rpx;
}

.goods .item .btn {
	height: 50rpx;
	line-height: 50rpx;
	border-radius: 5rpx;
	text-align: center;
	display: block;
	float: right;
	margin: 0 15rpx;
	padding: 0 20rpx;
}

.goods .item .btn.active {
	background: #ee9e09;
	color: #fff;
	border-radius: 40rpx;
}
</style>
