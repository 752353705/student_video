<template>
	<view class="container">
		<view class="address-list" v-if="addressList.length > 0">
			<view class="item" v-for="item in addressList" :key="item.id" @tap="addressAddOrUpdate" :data-address-id="item.id">
				<view class="l">
					<view class="name">{{ item.name }}</view>
					<view class="default" v-if="item.isDefault">默认</view>
				</view>
				<view class="c">
					<view class="mobile">{{ item.mobile }}</view>
					<view class="address">{{ item.detailedAddress }}</view>
				</view>
				<view class="r"><image @tap.stop="deleteAddress" :data-address-id="item.id" class="del" src="/static/images/del-address.png"></image></view>
			</view>
		</view>
		<view class="empty-view" v-if="addressList.length <= 0">
			<image class="icon" src="/static/images/noAddress.png"></image>
			<text class="text">收货地址在哪里</text>
		</view>
		<view class="add-address" @tap="addressAddOrUpdate" data-address-id="0">新建</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addressList: []
		};
	},
	onLoad(option) {},
	onShow() {
		// 页面显示
		this.getAddressList();
	},
	methods: {
		getAddressList() {
			let that = this;
			this.api._get('address/list', {}, function(res) {
				if (res.errno === 0) {
					that.addressList = res.data;
				}
			});
		},
		addressAddOrUpdate(event) {
			console.log(event);

			//返回之前，先取出上一页对象，并设置addressId
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2];

			console.log('pages ==>', pages);
			console.log('prevPage ==>', prevPage);

			if (prevPage.route == 'pages/order/creatOrder') {
				try {
					wx.setStorageSync('addressId', event.currentTarget.dataset.addressId);
				} catch (e) {}

				let addressId = event.currentTarget.dataset.addressId;
				if (addressId && addressId != 0) {
					wx.navigateBack();
				} else {
					wx.navigateTo({
						url: '/pages/address/addressManage?id=' + addressId
					});
				}
			} else {
				wx.navigateTo({
					url: '/pages/address/addressManage?id=' + event.currentTarget.dataset.addressId
				});
			}
		},
		deleteAddress(event) {
			console.log(event.target);
			let that = this;
			wx.showModal({
				title: '',
				content: '确定要删除地址？',
				success: function(res) {
					if (res.confirm) {
						let addressId = event.target.dataset.addressId;

						this.api._post(
							'address/delet',
							{
								id: addressId
							},
							function(res) {
								if (res.errno === 0) {
									that.getAddressList();
									wx.removeStorage({
										key: 'addressId',
										success: function(res) {}
									});
								}
							}
						);
						console.log('用户点击确定');
					}
				}
			});
			return false;
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

.container {
	height: 100%;
	width: 100%;
}

.address-list {
	padding-left: 31.25rpx;
	background: #fff
		url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAKCAMAAADfAc3wAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURc2AgICg1v///+rw+ffq6tKMjI2p2ouo2QT3I5MAAAA9SURBVCjPpcs5EgAgCARB5ND//9jEYwlZJp1q0ZTNAS3L10OgcGlYlYZNuGoRly3guv2YsA8z9mLKHsxZ3e5sBBsNqhCTAAAAAElFTkSuQmCC')
		0 0 repeat-x;
	background-size: auto 10.5rpx;
	margin-bottom: 10rpx;
}

.address-list .item {
	height: 156.55rpx;
	align-items: center;
	display: flex;
	border-bottom: 1rpx solid #dcd9d9;
}

.address-list .l {
	width: 125rpx;
	height: 80rpx;
	overflow: hidden;
}

.address-list .name {
	width: 125rpx;
	height: 43rpx;
	font-size: 29rpx;
	color: #333;
	margin-bottom: 5.2rpx;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.address-list .default {
	width: 62.5rpx;
	height: 33rpx;
	line-height: 28rpx;
	text-align: center;
	font-size: 20rpx;
	color: #b4282d;
	border: 1rpx solid #b4282d;
	visibility: visible;
}

.address-list .c {
	flex: 1;
	height: auto;
	overflow: hidden;
}

.address-list .mobile {
	height: 29rpx;
	font-size: 29rpx;
	line-height: 29rpx;
	overflow: hidden;
	color: #333;
	margin-bottom: 6.25rpx;
}

.address-list .address {
	height: 37rpx;
	font-size: 25rpx;
	line-height: 37rpx;
	overflow: hidden;
	color: #666;
}

.address-list .r {
	width: 52rpx;
	height: auto;
	overflow: hidden;
	margin-right: 16.5rpx;
}

.address-list .del {
	display: block;
	width: 52rpx;
	height: 52rpx;
}

.add-address {
	background-color: #85c43f;
	font-size: 32rpx;
	color: #fff;
	width: 690rpx;
	height: 90rpx;
	border-radius: 50rpx;
	text-align: center;
	line-height: 90rpx;
	margin: 76rpx auto 0 auto;
}

.empty-view {
	height: 60%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.empty-view .icon {
	height: 248rpx;
	width: 258rpx;
	margin-bottom: 10rpx;
}

.empty-view .text {
	width: auto;
	font-size: 28rpx;
	line-height: 35rpx;
	color: #999;
}
</style>
