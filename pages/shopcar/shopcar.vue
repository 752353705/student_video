<template>
	<view class="container">
		<!-- 当前用户未进行登录-->
		<view v-if="!hasLogin" class="empty">
			<image src="/static/emptyCart.png" mode="aspectFit"></image>
			<view class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>

		<!-- 列表 -->
		<view v-else class="login">
			<!-- 优惠活动 -->
			<view class="service-policy">
				<view class="item">全场优惠券抵扣</view>
				<view class="item">7天无忧快速退货</view>
				<view class="item">满40元免邮费</view>
			</view>
			<!-- 如果用户的购物车为空 -->
			<view class="no-cart" v-if="brandCartgoods.length === 0">
				<view class="c ">
					<image src="/static/emptyCart.png" mode="aspectFit"></image>
					<view class="empty-tips">
						空空如也
						<navigator class="navigator" url="/pages/shop/shop" open-type="switchTab">随便逛逛></navigator>
					</view>
				</view>
			</view>
			<!-- 如果购物车中有商品 -->
			<view class="cart-view" v-else>
				<view class="list" v-if="isMultiOrderModel == 1">
					<view class="group-item">
						<view class="goods" v-for="(bitem, index) in brandCartgoods" :key="bitem.brandId">
						<!-- 	<navigator :url="'../brandDetail/brandDetail?id=' + bitem.brandId" class="h">
								<view class="l">{{ bitem.brandName }} ></view>
							</navigator> -->
							<view :class="isEditCart ? 'edit item' : 'item'" v-for="item in bitem.cartList" :key="item.id">
								<view :class="item.checked ? 'checked checkbox' : 'checkbox'" @tap="checkedItem" :data-productid="item.productId"></view>
								<view class="cart-goods">
									<image class="img" :src="item.picUrl"></image>
									<view class="info">
										<view class="t">
											<text class="name">{{ item.goodsName }}</text>
										</view>
										<view class="b">
											<text class="price">￥{{ item.price }}</text>
											<text class="num">x{{ item.number }}</text>
											<!-- <text class="attr">{{ isEditCart ? '已选择:' : ''}}{{item.specifications||''}}</text> -->
											<view class="selnum">
												<view class="cut" @tap="cutNumber" :data-productid="item.productId">-</view>
												<input :value="item.number" class="number" disabled="true" type="number" />
												<view class="add" @tap="addNumber" :data-productid="item.productId">+</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 底部的 操作栏 -->
				<view class="cart-bottom">
					<view :class="[checkedAllStatus ? 'checked checkbox' : 'checkbox']" @tap="checkedAll">全选({{ cartTotal.checkedGoodsCount }})</view>
					<view class="total">{{ !isEditCart ? '￥' + cartTotal.checkedGoodsAmount : '' }}</view>
					<view class="action_btn_area">
						<view :class="[!isEditCart ? 'edit' : 'sure']" @tap="editCart">{{ !isEditCart ? '编辑' : '完成' }}</view>
						<view class="delete" @tap="deleteCart" v-if="isEditCart">删除({{ cartTotal.checkedGoodsCount }})</view>
						<view class="checkout" @tap="checkoutOrder" v-if="!isEditCart">下单</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import {
// 	mapState
// } from 'vuex';
import uniNumberBox from '@/components/uni-number-box.vue';

// 模拟数据
import Json from '../../Json.js';

export default {
	components: {
		uniNumberBox
	},
	data() {
		return {
			// 控制空白页的布局
			hasLogin: false, //默认用户未进行登录操作

			total: 0, //总价格
			allChecked: false, //全选状态  true|false
			empty: true, //空白页现实  true|false
			cartList: [],

			// 插件数据
			isMultiOrderModel: 0,
			cartGoods: [],
			brandCartgoods: [],
			cartTotal: {
				goodsCount: 0,
				goodsAmount: 0.0,
				checkedGoodsCount: 0,
				checkedGoodsAmount: 0.0
			},
			isEditCart: false,
			checkedAllStatus: true,
			editCartList: [],
			hasLogin: false
		};
	},
	onLoad(option) {
		console.log('onLoad', option);
		// 判断用户是否进行了登录操作
		// this.hasLogin = true

		// 请求数据
		this.loadData();
	},

	onShow() {
		// 判断用户是否进行了登录操作
		if (uni.getStorageSync('token')) {
			// 用户已经进行了登陆
			this.hasLogin = true;
			this.getCartList();
		} else {
			this.hasLogin = false;
		}
	},
	watch: {
		//显示空白页
		cartList(e) {
			let empty = e.length === 0 ? true : false;
			if (this.empty !== empty) {
				this.empty = empty;
			}
		}
	},
	computed: {
		// ...mapState(['hasLogin'])
	},
	methods: {
		getProductChecked: function(productId) {
			let that = this;
			let isChecked = null;
			if (that.isMultiOrderModel === 1) {
				that.brandCartgoods.forEach(function(v) {
					let cartList = v.cartList;
					cartList.forEach(function(o) {
						if (o.productId === productId) {
							isChecked = o.checked ? 0 : 1;
						}
					});
				});
			} else {
				that.cartGoods.forEach(function(o) {
					if (o.productId === productId) {
						isChecked = o.checked ? 0 : 1;
					}
				});
			}
			return isChecked;
		},
		editCart: function() {
			var that = this;
			if (this.isEditCart) {
				this.getCartList();
				this.isEditCart = !this.isEditCart;
			} else {
				//编辑状态
				if (that.isMultiOrderModel === 1) {
					let tmpBrandCartData = that.brandCartgoods.map(function(element, index, array) {
						let tmpBrandGoods = element.cartList.map(function(childEle, childIndex, childArr) {
							childEle.checked = false;
							return childEle;
						});
						element.cartList = tmpBrandGoods;
						return element;
					});

					(that.brandCartgoods = tmpBrandCartData),
						(that.isEditCart = !that.isEditCart),
						(that.checkedAllStatus = that.isCheckedAll()),
						(that.cartTotal.checkedGoodsCount = that.getCheckedGoodsCount());
				} else {
					let tmpCartData = that.cartGoods.map(function(element, index, array) {
						element.checked = false;
						return element;
					});

					(that.cartGoods = tmpCartList),
						(that.isEditCart = !that.isEditCart),
						(that.checkedAllStatus = that.isCheckedAll()),
						(that.cartTotal.checkedGoodsCount = that.getCheckedGoodsCount());
				}
			}
		},
		checkedItem: function(event) {
			//let itemIndex = event.target.dataset.itemIndex;
			let productId = event.currentTarget.dataset.productid;
			let that = this;

			let productIds = [];
			productIds.push(productId);
			let isChecked = that.getProductChecked(productId);
			if (!this.isEditCart) {
				console.log('2');
				this.api._post(
					'cart/checked',
					{
						productIds: productIds,
						isChecked: isChecked
					},
					function(res) {
						if (res.errno === 0) {
							console.log(res.data);
							if (res.data.isMultiOrderModel === 1) {
								(that.isMultiOrderModel = res.data.isMultiOrderModel), (that.brandCartgoods = res.data.brandCartgoods), (that.cartTotal = res.data.cartTotal);
							} else {
								(that.isMultiOrderModel = res.data.isMultiOrderModel), (that.cartGoods = res.data.cartList), (that.cartTotal = res.data.cartTotal);
							}
						}
						that.checkedAllStatus = that.isCheckedAll();
					}
				);
			} else {
				//编辑状态
				if (that.isMultiOrderModel === 1) {
					let tmpBrandCartData = this.brandCartgoods.map(function(element, index, array) {
						let tmpBrandGoods = element.cartList.map(function(childEle, childIndex, childArr) {
							if (childEle.productId === productId) {
								childEle.checked = !childEle.checked;
							}
							return childEle;
						});
						element.cartList = tmpBrandGoods;
						return element;
					});

					(that.brandCartgoods = tmpBrandCartData), (that.checkedAllStatus = that.isCheckedAll()), (that.cartTotal.checkedGoodsCount = that.getCheckedGoodsCount());
				} else {
					let tmpCartData = this.cartGoods.map(function(element, index, array) {
						if (element.productId === productId) {
							element.checked = !element.checked;
						}
						return element;
					});

					(that.cartGoods = tmpCartData), (that.checkedAllStatus = that.isCheckedAll()), (that.cartTotal.checkedGoodsCount = that.getCheckedGoodsCount());
				}
			}
		},
		getCartList: function() {
			let that = this;
			this.api._get('cart/index', {}, function(res) {
				if (res.errno === 0) {
					if (res.data.isMultiOrderModel === 1) {
						(that.isMultiOrderModel = res.data.isMultiOrderModel), (that.brandCartgoods = res.data.brandCartgoods), (that.cartTotal = res.data.cartTotal);
					} else {
						(that.isMultiOrderModel = res.data.isMultiOrderModel), (that.cartGoods = res.data.cartList), (that.cartTotal = res.data.cartTotal);
					}

					that.checkedAllStatus = that.isCheckedAll();
				}
			});
		},
		isCheckedAll: function() {
			let that = this;
			if (that.isMultiOrderModel === 1) {
				//多店铺模式的商品全选判断
				return that.brandCartgoods.every(function(element, index, array) {
					if (that.isChildCheckedAll(element.cartList)) {
						return true;
					} else {
						return false;
					}
				});
			} else {
				//判断购物车商品已全选
				return that.cartGoods.every(function(element, index, array) {
					if (element.checked == true) {
						return true;
					} else {
						return false;
					}
				});
			}
		},
		//请求数据 获取用户 购物车中的商品
		loadData() {
			let list = Json['cartList'];
			let cartList = list.map(item => {
				item.checked = true;
				return item;
			});
			this.cartList = cartList;
			this.calcTotal(); //计算总价
		},
		//监听image加载完成
		onImageLoad(key, index) {
			this.$set(this[key][index], 'loaded', 'loaded');
		},
		//监听image加载失败
		onImageError(key, index) {
			this[key][index].image = '/static/errorImage.jpg';
		},
		navToLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		//选中状态处理
		check(type, index) {
			if (type === 'item') {
				this.cartList[index].checked = !this.cartList[index].checked;
			} else {
				const checked = !this.allChecked;
				const list = this.cartList;
				list.forEach(item => {
					item.checked = checked;
				});
				this.allChecked = checked;
			}
			this.calcTotal(type);
		},
		//数量
		numberChange(data) {
			this.cartList[data.index].number = data.number;
			this.calcTotal();
		},
		//删除
		deleteCartItem(index) {
			let list = this.cartList;
			let row = list[index];
			let id = row.id;

			this.cartList.splice(index, 1);
			this.calcTotal();
			uni.hideLoading();
		},
		//清空
		clearCart() {
			uni.showModal({
				content: '清空购物车？',
				success: e => {
					if (e.confirm) {
						this.cartList = [];
					}
				}
			});
		},
		//计算总价
		calcTotal() {
			let list = this.cartList;
			if (list.length === 0) {
				this.empty = true;
				return;
			}
			let total = 0;
			let checked = true;
			list.forEach(item => {
				if (item.checked === true) {
					total += item.price * item.number;
				} else if (checked === true) {
					checked = false;
				}
			});
			this.allChecked = checked;
			this.total = Number(total.toFixed(2));
		},
		//创建订单
		createOrder() {
			let list = this.cartList;
			let goodsData = [];
			list.forEach(item => {
				if (item.checked) {
					goodsData.push({
						attr_val: item.attr_val,
						number: item.number
					});
				}
			});

			console.log('创建订单进行跳转 goodsData =>', goodsData);

			uni.navigateTo({
				url: `/pages/order/creatOrder?data=${JSON.stringify({
					goodsData: goodsData
				})}`
			});
			// this.$api.msg('跳转下一页 sendData');
		},

		isChildCheckedAll(cartList) {
			return cartList.every(function(element, index, array) {
				if (element.checked == true) {
					return true;
				} else {
					return false;
				}
			});
		},
		checkedAll: function() {
			let that = this;
			if (!this.isEditCart) {
				console.log('1');
				let productIds = [];
				if (that.isMultiOrderModel === 1) {
					that.brandCartgoods.forEach(function(v) {
						v.cartList.forEach(function(o) {
							productIds.push(o.productId);
						});
					});
				} else {
					let productIds = that.cartGoods.map(function(v) {
						return v.productId;
					});
				}

				this.api._post(
					'cart/checked',
					{
						productIds: productIds,
						isChecked: that.isCheckedAll() ? 0 : 1
					},
					function(res) {
						if (res.errno === 0) {
							console.log(res.data);
							if (res.data.isMultiOrderModel === 1) {
								(that.isMultiOrderModel = res.data.isMultiOrderModel), (that.brandCartgoods = res.data.brandCartgoods), (that.cartTotal = res.data.cartTotal);
							} else {
								(that.isMultiOrderModel = res.data.isMultiOrderModel), (that.cartGoods = res.data.cartList), (that.cartTotal = res.data.cartTotal);
							}
						}
						that.checkedAllStatus = that.isCheckedAll();
					}
				);
			} else {
				//编辑状态,将所有
				let checkedAllStatus = that.isCheckedAll();

				if (that.isMultiOrderModel === 1) {
					let tmpBrandCartData = this.brandCartgoods.map(function(element, index, array) {
						let tmpBrandGoods = element.cartList.map(function(childEle, childIndex, childArr) {
							childEle.checked = !checkedAllStatus;
							return childEle;
						});
						element.cartList = tmpBrandGoods;
						return element;
					});

					that.brandCartgoods = tmpBrandCartData;
					that.checkedAllStatus = that.isCheckedAll();
					that.cartTotal.checkedGoodsCount = that.getCheckedGoodsCount();
				} else {
					let tmpCartData = this.cartGoods.map(function(element, index, array) {
						element.checked = !checkedAllStatus;
						return element;
					});

					that.cartGoods = tmpCartData;
					(that.checkedAllStatus = that.isCheckedAll()), (that.cartTotal.checkedGoodsCount = that.getCheckedGoodsCount());
				}
			}
		},
		getCheckedGoodsCount: function() {
			let that = this;
			let checkedGoodsCount = 0;
			if (that.isMultiOrderModel === 1) {
				that.brandCartgoods.forEach(function(v) {
					v.cartList.forEach(function(o) {
						if (o.checked === true) {
							checkedGoodsCount += o.number;
						}
					});
				});
			} else {
				that.cartGoods.forEach(function(v) {
					if (v.checked === true) {
						checkedGoodsCount += v.number;
					}
				});
			}
			console.log(checkedGoodsCount);
			return checkedGoodsCount;
		},
		cutNumber: function(event) {
			//let itemIndex = event.target.dataset.itemIndex;
			let productId = event.currentTarget.dataset.productid;
			let cartItem = this.getProductItem(productId);
			let number = cartItem.number - 1 > 1 ? cartItem.number - 1 : 1;
			cartItem.number = number;
			this.setProductItem(cartItem, productId);
			this.updateCart(cartItem.productId, cartItem.goodsId, number, cartItem.id);
		},
		addNumber: function(event) {
			// let itemIndex = event.target.dataset.itemIndex;
			let productId = event.currentTarget.dataset.productid;
			let cartItem = this.getProductItem(productId);

			let number = cartItem.number + 1;
			cartItem.number = number;
			this.setProductItem(cartItem, productId);
			this.updateCart(cartItem.productId, cartItem.goodsId, number, cartItem.id);
		},
		getProductItem: function(productId) {
			let that = this;
			let productItem = null;
			if (that.isMultiOrderModel === 1) {
				that.brandCartgoods.forEach(function(v) {
					let cartList = v.cartList;
					cartList.forEach(function(o) {
						if (o.productId === productId) {
							productItem = o;
						}
					});
				});
			} else {
				that.cartGoods.forEach(function(o) {
					if (o.productId === productId) {
						productItem = o;
					}
				});
			}
			return productItem;
		},
		setProductItem: function(cartItem, productId) {
			let that = this;
			if (that.isMultiOrderModel === 1) {
				let tmpBrandCartData = this.brandCartgoods.map(function(element, index, array) {
					let tmpBrandGoods = element.cartList.map(function(childEle, childIndex, childArr) {
						if (childEle.productId === productId) {
							return cartItem;
						} else {
							return childEle;
						}
					});
					element.cartList = tmpBrandGoods;
					return element;
				});

				(that.brandCartgoods = tmpBrandCartData), (that.checkedAllStatus = that.isCheckedAll()), (that.cartTotal.checkedGoodsCount = that.getCheckedGoodsCount());
			} else {
				let tmpCartData = this.cartGoods.map(function(element, index, array) {
					if (element.productId === productId) {
						return cartItem;
					} else {
						return element;
					}
				});
				(that.cartGoods = tmpCartData), (that.checkedAllStatus = that.isCheckedAll()), (that.cartTotal.checkedGoodsCount = that.getCheckedGoodsCount());
			}
		},
		updateCart: function(productId, goodsId, number, id) {
			let that = this;

			this.api._post(
				'cart/update',
				{
					productId: productId,
					goodsId: goodsId,
					number: number,
					id: id
				},
				function(res) {
					that.checkedAllStatus = that.isCheckedAll();
				}
			);
		},
		deleteCart: function() {
			//获取已选择的商品
			let that = this;

			if (that.getCheckedGoodsCount() <= 0) {
				wx.showModal({
					title: '错误信息',
					content: '请勾选需要删除的商品！',
					showCancel: false
				});
				return false;
			}

			let productIds = [];
			if (that.isMultiOrderModel === 1) {
				that.brandCartgoods.forEach(function(v) {
					v.cartList.forEach(function(o) {
						if (o.checked == true) {
							productIds.push(o.productId);
						}
					});
				});
			} else {
				productIds = that.cartGoods.map(function(v) {
					if (v.checked == true) {
						return v.productId;
					}
				});
			}

			this.api._post(
				'cart/delete',
				{
					productIds: productIds
				},
				function(res) {
					if (res.errno === 0) {
						if (res.data.isMultiOrderModel === 1) {
							that.isMultiOrderModel = res.data.isMultiOrderModel;
							that.brandCartgoods = res.data.brandCartgoods;
							that.cartTotal = res.data.cartTotal;
						} else {
							that.isMultiOrderModel = res.data.isMultiOrderModel;
							that.cartGoods = res.data.cartList;
							that.cartTotal = res.data.cartTotal;
						}

						that.checkedAllStatus = that.isCheckedAll();
					}
				}
			);
		},

		checkoutOrder: function() {
			//获取已选择的商品
			let that = this;

			if (that.getCheckedGoodsCount() <= 0) {
				wx.showModal({
					title: '错误信息',
					content: '请勾选需要下单的商品！',
					showCancel: false
				});
				return false;
			}

			// storage中设置了cartId，则是购物车购买
			try {
				wx.setStorageSync('cartId', 0);
				wx.navigateTo({
					// url: '/pages/address/address'
					url: '/pages/order/creatOrder'
				});
			} catch (e) {}
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-bottom: 134upx;
	/* 空白页 */
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 67vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		// background: #fff;
		image {
			width: 240upx;
			height: 160upx;
			margin-bottom: 30upx;
		}
		.empty-tips {
			display: flex;
			font-size: $font-sm + 2upx;
			color: $font-color-disabled;
			.navigator {
				color: $uni-color-primary;
				margin-left: 16upx;
			}
		}
	}
}
/* 购物车列表项 */
.cart-item {
	display: flex;
	position: relative;
	padding: 30upx 40upx;
	.image-wrapper {
		width: 230upx;
		height: 230upx;
		flex-shrink: 0;
		position: relative;
		image {
			width: 100%;
			height: 100%;
			border-radius: 8upx;
		}
	}
	.checkbox {
		position: absolute;
		left: -16upx;
		top: -16upx;
		z-index: 8;
		font-size: 44upx;
		line-height: 1;
		padding: 4upx;
		color: $font-color-disabled;
		background: #fff;
		border-radius: 50px;
	}
	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		position: relative;
		padding-left: 30upx;
		.title,
		.price {
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			height: 40upx;
			line-height: 40upx;
		}
		.clamp {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: block;
		}
		.attr {
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			height: 50upx;
			line-height: 50upx;
		}
		.price {
			height: 50upx;
			line-height: 50upx;
		}
	}
	.del-btn {
		padding: 4upx 10upx;
		font-size: 34upx;
		height: 50upx;
		color: $font-color-light;
	}
}
/* 底部栏 */
.action-section {
	/* #ifdef H5 */
	margin-bottom: 100upx;
	/* #endif */
	position: fixed;
	left: 30upx;
	bottom: 30upx;
	z-index: 95;
	display: flex;
	align-items: center;
	width: 610upx;
	height: 100upx;
	padding: 0 30upx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
	border-radius: 16upx;
	.checkbox {
		height: 52upx;
		position: relative;
		image {
			width: 52upx;
			height: 100%;
			position: relative;
			z-index: 5;
		}
	}
	.clear-btn {
		position: absolute;
		left: 26upx;
		top: 0;
		z-index: 4;
		width: 0;
		height: 52upx;
		line-height: 52upx;
		padding-left: 38upx;
		font-size: $font-base;
		color: #fff;
		background: $font-color-disabled;
		border-radius: 0 50px 50px 0;
		opacity: 0;
		transition: 0.2s;
		&.show {
			opacity: 1;
			width: 120upx;
		}
	}
	.total-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: right;
		padding-right: 40upx;
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
		}
		.coupon {
			font-size: $font-sm;
			color: $font-color-light;
			text {
				color: $font-color-dark;
			}
		}
	}
	.confirm-btn {
		padding: 0 38upx;
		margin: 0;
		border-radius: 100px;
		height: 76upx;
		line-height: 76upx;
		font-size: $font-base + 2upx;
		background: $uni-color-primary;
		box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
	}
}
/* 复选框选中状态 */
.action-section .checkbox.checked,
.cart-item .checkbox.checked {
	color: $uni-color-primary;
}

// 插件样式
page {
	height: 100%;
	min-height: 100%;
	background: #f4f4f4;
}

.container {
	background: #f4f4f4;
	width: 100%;
	height: auto;
	min-height: 100%;
	overflow: hidden;
}

.service-policy {
	width: 750rpx;
	height: 73rpx;
	background: #f4f4f4;
	padding: 0 31.25rpx;
	box-sizing: border-box;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
}

.service-policy .item {
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAM1BMVEWrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKytnkgnjAAAAEHRSTlMAERJMTU5ub3Z3hL7y8/T5Yye+AQAAAEVJREFUCB0FwQkCgCAMwLAyJyrj6P9fawJkrVUXwFDVAZenR/RjUj4An8U0AMLJNADCRfkAvBbp6a31Y8JQ1QFw196V8AOmRAMI0B3h8wAAAABJRU5ErkJggg==')
		0 center no-repeat;
	background-size: 10rpx;
	padding-left: 15rpx;
	display: flex;
	align-items: center;
	font-size: 25rpx;
	color: #666;
}

.no-login {
	width: 100%;
	height: auto;
	margin: 0 auto;
}

.no-login .c {
	width: 100%;
	height: auto;
	margin-top: 200rpx;
}

.no-login .c image {
	margin: 0 auto;
	display: block;
	text-align: center;
	width: 414rpx;
	height: 336rpx;
	margin-bottom: 100rpx;
}

.no-login .c text {
	margin: 0 auto;
	display: block;
	width: 258rpx;
	height: 59rpx;
	line-height: 29rpx;
	text-align: center;
	font-size: 35rpx;
	color: #999;
}

.no-login button {
	width: 90%;
	margin: 40 auto;
	color: #fff;
	font-size: 30rpx;
	height: 96rpx;
	line-height: 96rpx;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	position: flex;
	bottom: 0;
	left: 0;
	border-radius: 0;
	padding: 0;
	margin-left: 5%;
	text-align: center;
	/* padding-left: -5rpx; */
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	border-top-right-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
	letter-spacing: 3rpx;
	background-image: linear-gradient(to right, #9a9ba1 0%, #9a9ba1 100%);
}

.no-cart {
	width: 100%;
	height: auto;
	margin: 0 auto;
}

.no-cart .c {
	width: 100%;
	height: auto;
	margin-top: 200rpx;
}

.no-cart .c image {
	margin: 0 auto;
	display: block;
	text-align: center;
	width: 240rpx;
	height: 160rpx;

	margin-bottom: 10rpx;
}

.no-cart .c .empty-tips {
	// margin: 0 auto;

	display: flex;
	justify-content: center;

	// line-height: 29rpx;
	// text-align: center;
	font-size: 29rpx;
	color: #c0c4cc;
}

.no-cart .c .empty-tips .navigator {
	margin-left: 10rpx;
	color: #fa436a;
}

.cart-view {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.cart-view .list {
	height: auto;
	width: 100%;
	overflow: hidden;
	background: #f4f4f4;
	margin-bottom: 120rpx;
}

.cart-view .group-item {
	height: auto;
	width: 100%;
	margin-top: 20rpx;
	background: #f4f4f4;
	margin-bottom: 18rpx;
}

.goods {
	margin-top: 20rpx;
	background: #fff;
}

.goods .h {
	height: 83.3rpx;
	line-height: 83.3rpx;
	margin-left: 31.25rpx;
	padding-right: 31.25rpx;
	border-bottom: 1px solid #f4f4f4;
	font-size: 30rpx;
	color: #333;
}

.goods .h .l {
	float: left;
	font-weight: bold;
}

.cart-view .item {
	height: 202rpx;
	width: 100%;
	overflow: hidden;
}

.cart-view .item .checkbox {
	float: left;
	height: 34rpx;
	width: 34rpx;
	margin: 65rpx 18rpx 65rpx 26rpx;
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+KUEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2tdt9/1cdxHGmVcAc+dH25Hw0+71cvjhztDIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T2OkM0HjgRyq8V7Y8i/3/V06YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm+D7mMeUn4PoYwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbBZ9v4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC')
		no-repeat;
	background-size: 34rpx;
}

.cart-view .item .checkbox.checked {
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++AMAAADUSURBVDjLndRLEoMgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXBX6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEpnCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88FsNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJUQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eEj8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSThPkNi75AAAAABJRU5ErkJggg==')
		no-repeat;
	background-size: 34rpx;
}

.cart-view .item .cart-goods {
	float: left;
	height: 204rpx;
	width: 672rpx;
	border-bottom: 1px solid #f4f4f4;
}

.cart-view .item .img {
	float: left;
	height: 145.83rpx;
	width: 145.83rpx;
	background: #f4f4f4;
	margin: 12.5rpx 18rpx 12.5rpx 0;
}

.cart-view .item .info {
	flex: 1;
	float: left;
	height: 145.83rpx;
	width: 453rpx;
	margin: 15.5rpx 26rpx 15.5rpx 0;
}

.cart-view .item .t {
	margin: 8rpx 0;
	height: 80rpx;
	font-size: 25rpx;
	color: #333;
}

.cart-view .item .name {
	/*height: 28rpx;
  max-width: 310rpx;
  line-height: 28rpx;
  font-size: 25rpx;
  color: #333;
  overflow: hidden;*/
	display: block;
	float: left;
	height: 33rpx;
	line-height: 33rpx;
	color: #333;
	font-size: 30rpx;
}

.cart-view .item .num {
	height: 28rpx;
	line-height: 28rpx;
	float: right;
}

.cart-view .item .attr {
	margin-bottom: 17rpx;
	height: 24rpx;
	line-height: 24rpx;
	font-size: 22rpx;
	color: #666;
	float: right;
}

.cart-view .item .b {
	height: 28rpx;
	line-height: 28rpx;
	font-size: 25rpx;
	color: #333;
	overflow: hidden;
}

.cart-view .item .price {
	float: left;
}

.cart-view .item .open {
	height: 28rpx;
	width: 150rpx;
	display: block;
	float: right;
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUBAMAAABL3sEiAAAAGFBMVEVmZmZ6enp7e3uDg4OEhITHx8fu7u7///8ummCmAAAARUlEQVQI12MoBwOGUjcwVcyUDqLKBNRAVHkSiMtQXqagBqLAXCAF4gIpEBdElSmYI1EQQagSiAaodohhYA7cIqi1EEcAAHB/LX9QfndHAAAAAElFTkSuQmCC')
		right center no-repeat;
	background-size: 25rpx;
	font-size: 25rpx;
	color: #333;
}

.cart-view .item.edit .num {
	display: none;
}

.cart-view .item.edit .attr {
	text-align: right;
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUBAMAAABL3sEiAAAAGFBMVEVmZmZ6enp7e3uDg4OEhITHx8fu7u7///8ummCmAAAARUlEQVQI12MoBwOGUjcwVcyUDqLKBNRAVHkSiMtQXqagBqLAXCAF4gIpEBdElSmYI1EQQagSiAaodohhYA7cIqi1EEcAAHB/LX9QfndHAAAAAElFTkSuQmCC')
		right center no-repeat;
	padding-right: 25rpx;
	background-size: 12rpx 20rpx;
	margin-bottom: 24rpx;
	height: 39rpx;
	line-height: 39rpx;
	font-size: 24rpx;
	color: #999;
	overflow: hidden;
}

.cart-view .item.edit .b {
	display: flex;
	height: 52rpx;
	overflow: hidden;
}

.cart-view .item.edit .price {
	line-height: 52rpx;
	height: 52rpx;
	flex: 1;
}

.cart-view .item .selnum {
	display: none;
}

.cart-view .item.edit .selnum {
	width: 235rpx;
	height: 50rpx;
	border: 1rpx solid #ccc;
	display: flex;
}

.selnum .cut {
	width: 70rpx;
	height: 100%;
	text-align: center;
	line-height: 50rpx;
}

.selnum .number {
	flex: 1;
	height: 100%;
	text-align: center;
	line-height: 68.75rpx;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	float: left;
}

.selnum .add {
	width: 80rpx;
	height: 100%;
	text-align: center;
	line-height: 50rpx;
}

.cart-view .group-item .header {
	width: 100%;
	height: 94rpx;
	line-height: 94rpx;
	padding: 0 26rpx;
	border-bottom: 1px solid #f4f4f4;
}

.cart-view .promotion .icon {
	display: inline-block;
	height: 24rpx;
	width: 15rpx;
}

.cart-view .promotion {
	margin-top: 25.5rpx;
	float: left;
	height: 43rpx;
	width: 480rpx;
	/*margin-right: 84rpx;*/
	line-height: 43rpx;
	font-size: 0;
}

.cart-view .promotion .tag {
	border: 1px solid #f48f18;
	height: 37rpx;
	line-height: 31rpx;
	padding: 0 9rpx;
	margin-right: 10rpx;
	color: #f48f18;
	font-size: 24.5rpx;
}

.cart-view .promotion .txt {
	height: 43rpx;
	line-height: 43rpx;
	padding-right: 10rpx;
	color: #333;
	font-size: 29rpx;
	overflow: hidden;
}

.cart-view .get {
	margin-top: 18rpx;
	float: right;
	height: 58rpx;
	padding-left: 14rpx;
	border-left: 1px solid #d9d9d9;
	line-height: 58rpx;
	font-size: 29rpx;
	color: #333;
}

.cart-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	height: 100rpx;
	width: 100%;
	background: #fff;
	display: flex;
}

.cart-bottom .checkbox {
	height: 34rpx;
	padding-left: 60rpx;
	line-height: 34rpx;
	margin: 33rpx 18rpx 33rpx 26rpx;
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+KUEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2tdt9/1cdxHGmVcAc+dH25Hw0+71cvjhztDIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T2OkM0HjgRyq8V7Y8i/3/V06YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm+D7mMeUn4PoYwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbBZ9v4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC')
		no-repeat;
	background-size: 34rpx;
	font-size: 29rpx;
}

.cart-bottom .checkbox.checked {
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++AMAAADUSURBVDjLndRLEoMgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXBX6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEpnCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88FsNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJUQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eEj8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSThPkNi75AAAAABJRU5ErkJggg==')
		no-repeat;
	background-size: 34rpx;
}

.cart-bottom .total {
	height: 34rpx;
	flex: 1;
	margin: 33rpx 10rpx;
	font-size: 29rpx;
}

.cart-bottom .delete {
	text-align: center;
	width: 180rpx;
	height: 60rpx;
	line-height: 82rpx;
	padding: 0;
	margin: 0;
	margin-left: -5rpx;
	padding-right: 25rpx;
	font-size: 25rpx;
	color: #f4f4f4;
	/* text-align: center; */
	border-top-left-radius: 0rpx;
	border-bottom-left-radius: 0rpx;
	border-top-right-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
	letter-spacing: 3rpx;
	background-image: linear-gradient(to right, #9a9ba1 0%, #ae8b9c 100%);
}

.cart-bottom .checkout {
	height: 100rpx;
	width: 210rpx;
	text-align: center;
	line-height: 100rpx;
	font-size: 29rpx;
	background: #b4282d;
	color: #fff;
}

.action_btn_area {
	/* border: 1px solid #333; */
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	right: 0;
	top: 0;
	width: 380rpx;
	height: 100rpx;
}

.action_btn_area .edit {
	width: 140rpx;
	/* border: 1px solid #000; */
	height: 70rpx;
	line-height: 70rpx;
	padding: 0;
	margin: 0;
	margin-right: 5rpx;
	text-align: center;
	/* padding-left: 25rpx; */
	font-size: 25rpx;
	color: #f4f4f4;
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	border-top-right-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
	letter-spacing: 3rpx;
	/* background-image: linear-gradient(to right, #ff7701 100%); */
	background-image: linear-gradient(to right, #f8b230 0%, #ee9e09 100%);
}

.action_btn_area .checkout {
	width: 140rpx;
	height: 70rpx;
	line-height: 70rpx;
	padding: 0;
	margin: 0;
	margin-left: 5rpx;
	/* padding-right: 25rpx; */
	font-size: 25rpx;
	color: #f4f4f4;
	text-align: center;
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	border-top-right-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
	letter-spacing: 3rpx;
	background-image: linear-gradient(to right, #ce373c 0%, #b4282d 100%);
}

.action_btn_area .delete {
	width: 140rpx;
	/* border: 1px solid #000; */
	height: 70rpx;
	line-height: 70rpx;
	padding: 0;
	margin: 0;
	margin-right: 5rpx;
	text-align: center;
	padding-left: -5rpx;
	font-size: 25rpx;
	color: #f4f4f4;
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	border-top-right-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
	letter-spacing: 3rpx;
	background-image: linear-gradient(to right, #ff7701 0%, #fe4800 100%);
}

.action_btn_area .sure {
	text-align: center;
	width: 140rpx;
	height: 70rpx;
	line-height: 70rpx;
	padding: 0;
	margin: 0;
	margin-right: 10rpx;
	padding-left: -5rpx;
	font-size: 25rpx;
	color: #f4f4f4;
	/* text-align: center; */
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	border-top-right-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
	letter-spacing: 3rpx;
	background-image: linear-gradient(to right, #f8b230 0%, #ee9e09 100%);
	/* background-image: linear-gradient(to right, #ff7701 0%, #fe4800 100%); */
}

.auth_btn {
	position: fixed;
	top: 55vh;
	left: 10vw;
	width: 80vw;
	height: 96rpx;
	line-height: 96rpx;
	font-size: 25rpx;
	color: #f4f4f4;
	/* text-align: center; */
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	border-top-right-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
	letter-spacing: 3rpx;
	background-image: linear-gradient(to right, #f8b230 0%, #ee9e09 100%);
}
</style>
