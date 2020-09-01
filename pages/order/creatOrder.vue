<template>
	<view class="container">
		
		<view class="address-box">
		  <view class="address-item" @tap="selectAddress" v-if="checkedAddress.id > 0">
		    <view class="l">
		      <text class="name">{{checkedAddress.name}}</text>
		      <text class="default" v-if="checkedAddress.isDefault">默认</text>
		    </view>
		    <view class="m">
		      <text class="mobile">{{checkedAddress.mobile}}</text>
		      <text class="address">{{checkedAddress.address}}</text>
		    </view>
		    <view class="r">
		      <image src="/static/images/address_right.png"></image>
		    </view>
		  </view>
		  <view class="address-item address-empty" @tap="selectAddress" v-else>
		    <view class="m">
		      还没有收货地址，去添加
		    </view>
		    <view class="r">
		      <image src="/static/images/address_right.png"></image>
		    </view>
		  </view>
		</view>
		
		<view class="coupon-box">
		  <view class="coupon-item" @tap="selectCoupon">
		    <view class="l" v-if="couponId == 0">
		      <text class="name">没有可用的优惠券</text>
		      <text class="txt">0张</text>
		    </view>
		    <view class="l" v-if="couponId == -1">
		      <text class="name">优惠券</text>
		      <text class="txt">{{availableCouponLength}}张</text>
		    </view>
		    <view class="l" v-if="couponId !== -1 && couponId !== 0">
		      <text class="name">优惠券</text>
		      <text class="txt">￥{{couponPrice}}元</text>
		    </view>      
		    <view class="r">
		      <image src="/static/images/address_right.png"></image>
		    </view>
		  </view>
		</view>
		
		<view class="message-box">
		  <input class="message-item" @input="bindMessageInput" placeholder="如需要，请输入留言"  :value="message" placeholder-style="color: #ccc;" />
		</view>  
		
		<view class="goods-items" v-if="isMultiOrderModel==1">
		  <view class="group-item" v-for="(bitem) in brandCartgoods" :key="bitem.brandId" >
		    <navigator :url=" '../brandDetail/brandDetail?id=' + bitem.brandId"  class="h">
		      <view class="l">{{bitem.brandName}} > </view>
		    </navigator>
		    <view class="item" v-for="(item) in bitem.cartList" :key="item.id">
		      <view class="img">
		        <image :src="item.picUrl"></image>
		      </view>
		      <view class="info">
		        <view class="t">
		          <text class="name">{{item.goodsName}}</text>
		        </view>
		        <view class="m">{{item.specifications}}</view>
		        <view class="b">￥{{item.price}}</view>
		        <text class="number">x{{item.number}}</text>
		      </view>
		    </view>
		    <view class="brand-order">
		      <view class="order-item">
		        <view class="l">
		          <text class="name">商品合计</text>
		        </view>
		        <view class="r">
		          <text class="txt">￥{{bitem.bandGoodsTotalPrice}}元</text>
		        </view>
		      </view>
		      <view class="order-item">
		        <view class="l">
		          <text class="name">运费</text>
		        </view>
		        <view class="r">
		          <text class="txt">￥{{bitem.bandFreightPrice}}元</text>
		        </view>
		      </view>
		    </view>
		  </view>
		</view>
		
		<view class="goods-items" v-else>
		  <view class="item" v-for="(item) in checkedGoodsList" :key="item.id">
		    <view class="img">
		      <image :src="item.picUrl"></image>
		    </view>
		    <view class="info">
		      <view class="t">
		        <text class="name">{{item.goodsName}}</text>
		        <text class="number">x{{item.number}}</text>
		      </view>
		      <view class="m">{{item.specifications}}</view>
		      <view class="b">￥{{item.price}}</view>
		    </view>
		  </view>
		</view>
		
		<view class="order-box" v-if="isMultiOrderModel==1">
		</view>
		
		<view class="order-box" v-else>
		  <view class="order-item">
		    <view class="l">
		      <text class="name">商品合计</text>
		    </view>
		    <view class="r">
		      <text class="txt">￥{{goodsTotalPrice}}元</text>
		    </view>
		  </view>
		  <view class="order-item">
		    <view class="l">
		      <text class="name">运费</text>
		    </view>
		    <view class="r">
		      <text class="txt">￥{{freightPrice}}元</text>
		    </view>
		  </view>
		  <view class="order-item no-border">
		    <view class="l">
		      <text class="name">优惠券</text>
		    </view>
		    <view class="r">
		      <text class="txt">-￥{{couponPrice}}元</text>
		    </view>
		  </view>
		</view>
		
		<view class="order-total">
		  <view class="l">实付：￥{{actualPrice}}</view>
		  <view class="r" @tap="submitOrder">去付款</view>
		</view>
		
	</view>
</template>

<script>
	var lastTime = null;
	var util = require('../../utils/util.js');
	export default {
		data() {
			return {
				isMultiOrderModel: 0,
				brandCartgoods:[],
				checkedGoodsList: [],
				checkedAddress: {},
				availableCouponLength: 0, // 可用的优惠券数量
				goodsTotalPrice: 0.00, //商品总价
				freightPrice: 0.00, //快递费
				couponPrice: 0.00, //优惠券的价格
				grouponPrice: 0.00, //团购优惠价格
				orderTotalPrice: 0.00, //订单总价
				actualPrice: 0.00, //实际需要支付的总价
				cartId: 0,
				addressId: 0,
				couponId: 0,
				message: '',
				grouponLinkId: 0, //参与的团购，如果是发起则为0
				grouponRulesId: 0 //团购规则ID
			}
		},
		onLoad(option){
			
		},
		onShow() {
			// 页面显示
			wx.showLoading({
			  title: '加载中...',
			});
			try {
			  var cartId = wx.getStorageSync('cartId');
			  if (cartId) {
			    this.cartId = cartId
			  }
			
			  var addressId = wx.getStorageSync('addressId');
			  if (addressId) {
			    this.addressId = addressId
			  }
			
			  var couponId = wx.getStorageSync('couponId');
			  if (couponId) {
			    this.couponId = couponId
			  }
			
			  var grouponRulesId = wx.getStorageSync('grouponRulesId');
			  if (grouponRulesId) {
			    this.grouponRulesId = grouponRulesId
			  }
			
			  var grouponLinkId = wx.getStorageSync('grouponLinkId');
			  if (grouponLinkId) {
			    this.grouponLinkId = grouponLinkId
			  }
			} catch (e) {
			  // Do something when catch error
			  console.log(e);
			}
			
			this.getCheckoutInfo();
		},
		
		methods: {
			// 跳转到 地址记录 页面
			selectAddress() {
			  uni.navigateTo({
			    url: '/pages/address/address',
			  })
			},
			// 跳转到优惠券
			selectCoupon() {
			  wx.navigateTo({
			    url: '/pages/shopCard/shopCard',
			  })
			},
			//获取checkou信息
			getCheckoutInfo: function() {
			  let that = this;
				this.api._get('cart/checkout',{
					cartId: that.cartId,
					addressId: that.addressId,
					couponId: that.couponId,
					grouponRulesId: that.grouponRulesId
				},function(res) {
			    if (res.errno === 0) {
			      let brandCartgoods = [];
			      let checkedGoodsList = [];
			      if (res.data.isMultiOrderModel === 1) {
			        brandCartgoods = res.data.brandCartgoods;
			      } else {
			        checkedGoodsList = res.data.checkedGoodsList;
			      }
			      that.isMultiOrderModel = res.data.isMultiOrderModel
			        that.brandCartgoods = brandCartgoods
			        that.checkedGoodsList = checkedGoodsList
			        that.checkedAddress = res.data.checkedAddress
			        that.availableCouponLength = res.data.availableCouponLength
			        that.actualPrice = res.data.actualPrice
			        that.couponPrice = res.data.couponPrice
			        that.grouponPrice = res.data.grouponPrice
			        that.goodsTotalPrice = res.data.goodsTotalPrice
			        that.orderTotalPrice = res.data.orderTotalPrice
			        that.addressId = res.data.addressId
			        that.couponId = res.data.couponId
			        that.grouponRulesId = res.data.grouponRulesId
			    }
			    wx.hideLoading();
			  })
				
			},
			
			bindMessageInput: function(e) {
			  this.message = e.detail.value
			},
			
			submitOrder: function() {
				let that = this
			  if (this.addressId <= 0) {
			    util.showErrorToast('请选择收货地址');
			    return false;
			  }
			  util.jhxLoadShow("正在下单，请稍后...");
			  let nowTime = + new Date();
			  if (nowTime - lastTime > 5000 || !lastTime) { //5秒内避免重复提交订单
			    lastTime = nowTime;
			  } else {
			    return false;
			  }
			
				this.api._post('order/submit',{
					cartId: this.cartId,
					addressId: this.addressId,
					couponId: this.couponId,
					message: this.message,
					grouponRulesId: this.grouponRulesId,
					grouponLinkId: this.grouponLinkId
				},res => {
			    util.jhxLoadHide();
			    if (res.errno === 0) {
			      
			      // 下单成功，重置couponId
			      try {
			        wx.setStorageSync('couponId', 0);
			      } catch (error) {
			
			      }
			
			      const orderId = res.data.orderId;
						
						// 进行 支付操作
						that.api._post('order/prepay',{
							 orderId: orderId
						},function(res) {
			        if (res.errno === 0) {
			          const payParam = res.data;
			          console.log("支付过程开始");
			          wx.requestPayment({
			            'timeStamp': payParam.timeStamp,
			            'nonceStr': payParam.nonceStr,
			            'package': payParam.packageValue,
			            'signType': payParam.signType,
			            'paySign': payParam.paySign,
			            'success': function(res) {
			              console.log("支付过程成功");
			              wx.redirectTo({
			                url: '/pages/payResult/payResult?status=1&orderId=' + orderId
			              });
			            },
			            'fail': function(res) {
			              console.log("支付过程失败");
			              wx.redirectTo({
			                url: '/pages/payResult/payResult?status=0&orderId=' + orderId
			              });
			            },
			            'complete': function(res) {
			              console.log("支付过程结束")
			            }
			          });
			        } else {
			          wx.redirectTo({
			            url: '/pages/payResult/payResult?status=0&orderId=' + orderId
			          });
			        }
			      })
						
			    } else {
			      wx.redirectTo({
			        url: '/pages/payResult/payResult?status=0&orderId=' + orderId
			      });
			    }
			  })
			
			}
		}
	}
</script>

<style lang="scss">
	page {
	  height: auto;
	  min-height: 100%;
	  background: #f4f4f4;
	}
	
	.address-box {
	  width: 100%;
	  height: 166.55rpx;
	  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAKCAMAAADfAc3wAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURc2AgICg1v///+rw+ffq6tKMjI2p2ouo2QT3I5MAAAA9SURBVCjPpcs5EgAgCARB5ND//9jEYwlZJp1q0ZTNAS3L10OgcGlYlYZNuGoRly3guv2YsA8z9mLKHsxZ3e5sBBsNqhCTAAAAAElFTkSuQmCC') 0 0 repeat-x;
	  background-size: 62.5rpx 10.5rpx;
	  margin-bottom: 20rpx;
	  padding-top: 10.5rpx;
	}
	
	.address-item {
	  display: flex;
	  height: 155.55rpx;
	  background: #fff;
	  padding: 41.6rpx 0 41.6rpx 31.25rpx;
	}
	
	.address-item.address-empty {
	  line-height: 75rpx;
	  text-align: center;
	}
	
	.address-box .l {
	  width: 125rpx;
	  height: 100%;
	}
	
	.address-box .l .name {
	  margin-left: 6.25rpx;
	  margin-top: -7.25rpx;
	  display: block;
	  width: 125rpx;
	  height: 43rpx;
	  line-height: 43rpx;
	  font-size: 30rpx;
	  color: #333;
	  margin-bottom: 15rpx;
	}
	
	.address-box .l .default {
	  margin-left: 6.25rpx;
	  display: block;
	  width: 62rpx;
	  height: 33rpx;
	  border-radius: 5rpx;
	  border: 1px solid #b4282d;
	  font-size: 20.5rpx;
	  text-align: center;
	  line-height: 29rpx;
	  color: #b4282d;
	}
	
	.address-box .m {
	  flex: 1;
	  height: 72.25rpx;
	  color: #999;
	}
	
	.address-box .mobile {
	  display: block;
	  height: 29rpx;
	  line-height: 29rpx;
	  margin-bottom: 16.25rpx;
	  font-size: 30rpx;
	  color: #333;
	}
	
	.address-box .address {
	  display: block;
	  height: 37.5rpx;
	  line-height: 37.5rpx;
	  font-size: 25rpx;
	  color: #666;
	}
	
	.address-box .r {
	  width: 77rpx;
	  height: 77rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.address-box .r image {
	  width: 52.078rpx;
	  height: 52.078rpx;
	}
	
	.coupon-box {
	  width: 100%;
	  height: auto;
	  overflow: hidden;
	  background: #fff;
	  border-bottom: 1px solid #fafafa;
	}
	
	.coupon-box .coupon-item {
	  width: 100%;
	  height: 78.3rpx;
	  overflow: hidden;
	  background: #fff;
	  display: flex;
	  padding-left: 31.25rpx;
	}
	
	.coupon-box .l {
	  flex: 1;
	  height: 33rpx;
	  line-height: 33rpx;
	  padding-top: 25rpx;
	}
	
	.coupon-box .l .name {
	  float: left;
	  font-size: 30rpx;
	  color: #666;
	}
	
	.coupon-box .l .txt {
	  float: right;
	  font-size: 30rpx;
	  color: #666;
	}
	
	.coupon-box .r {
	  margin-top: 10.5rpx;
	  width: 77rpx;
	  height: 57rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.coupon-box .r image {
	  width: 52.078rpx;
	  height: 52.078rpx;
	}
	
	.message-box {
	  width: 100%;
	  height: auto;
	  overflow: hidden;
	  background: #fff;
	  margin-bottom: 16.25rpx;
	}
	
	.message-box .message-item {
	  height: 72.078rpx;
	  overflow: hidden;
	  background: #fff;
	  display: flex;
	  margin-left: 31.25rpx;
	  padding-right: 31.25rpx;
	  padding-top: 10rpx;
	}
	
	.group-item {
	 width: 100%;
	 background: #fff;
	 height: auto;
	 padding-right: 11.25rpx;
	 margin-bottom: 26.25rpx;
	}
	.group-item .h {
	  height: 83.3rpx;
	  line-height: 83.3rpx;
	  margin-left: 21.25rpx;
	  padding-right: 11.25rpx;
	  border-bottom: 1px solid #f4f4f4;
	  font-size: 30rpx;
	  color: #333;
	}
	
	.group-item .h .l {
	  float: left;
	  font-weight:bold;
	}
	
	.brand-order{
	  width: 100%;
	  height: auto;
	  overflow: hidden;
	  background: #fff;
	}
	
	
	.brand-order .order-item {
	  height: 64.3rpx;
	  overflow: hidden;
	  background: #fff;
	  display: flex;
	  margin-left: 31.25rpx;
	  padding-right: 31.25rpx;
	  padding-top: 16rpx;
	  border-bottom: 1px solid #fafafa;
	}
	
	.brand-order .order-item .l {
	  float: left;
	  height: 42rpx;
	  width: 50%;
	  line-height: 42rpx;
	  overflow: hidden;
	}
	
	.brand-order .order-item .r {
	  float: right;
	  text-align: right;
	  width: 50%;
	  height: 42rpx;
	  line-height: 42rpx;
	  overflow: hidden;
	}
	
	.order-box {
	  margin-top: 10rpx;
	  width: 100%;
	  height: auto;
	  overflow: hidden;
	  background: #fff;
	  margin-bottom: 120rpx;
	}
	
	.order-box .order-item {
	  height: 64.3rpx;
	  overflow: hidden;
	  background: #fff;
	  display: flex;
	  margin-left: 31.25rpx;
	  padding-right: 31.25rpx;
	  padding-top: 16rpx;
	  border-bottom: 1px solid #fafafa;
	}
	
	.order-box .order-item .l {
	  float: left;
	  height: 42rpx;
	  width: 50%;
	  line-height: 42rpx;
	  overflow: hidden;
	}
	
	.order-box .order-item .r {
	  float: right;
	  text-align: right;
	  width: 50%;
	  height: 42rpx;
	  line-height: 42rpx;
	  overflow: hidden;
	}
	
	.order-box .order-item.no-border {
	  border-bottom: none;
	}
	
	.goods-items {
	  margin-top: 20rpx;
	  width: 100%;
	  height: auto;
	  overflow: hidden;
	  margin-bottom: 20rpx;
	}
	
	.goods-items .item {
	  height: 162rpx;
	  padding-left: 11.25rpx;
	  padding-right: 31.25rpx;
	  display: flex;
	  align-items: center;
	  border-bottom: 1px solid #fafafa;
	}
	
	.goods-items .item.no-border {
	  border-bottom: none;
	}
	
	.goods-items .item:last-child {
	  border-bottom: none;
	}
	
	.goods-items .img {
	  height: 145.83rpx;
	  width: 145.83rpx;
	  background-color: #f4f4f4;
	  margin-right: 20rpx;
	}
	
	.goods-items .img image {
	  height: 145.83rpx;
	  width: 145.83rpx;
	}
	
	.goods-items .info {
	  flex: 1;
	  height: 145.83rpx;
	  padding-top: 5rpx;
	}
	
	.goods-items .t {
	  height: 33rpx;
	  line-height: 33rpx;
	  margin-bottom: 10rpx;
	  overflow: hidden;
	  font-size: 30rpx;
	  color: #333;
	}
	
	.goods-items .t .name {
	  display: block;
	  float: left;
	}
	
	.goods-items .b {
	  float: left;
	  height: 41rpx;
	  overflow: hidden;
	  line-height: 41rpx;
	  font-size: 30rpx;
	  color: #ec4223;
	}
	.goods-items .number {
	  display: block;
	  float: right;
	  text-align: right;
	}
	
	.goods-items .m {
	  height: 29rpx;
	  overflow: hidden;
	  line-height: 29rpx;
	  margin-bottom: 25rpx;
	  font-size: 25rpx;
	  color: #999;
	}
	
	
	.order-total {
	  position: fixed;
	  left: 0;
	  bottom: 0;
	  height: 100rpx;
	  width: 100%;
	  display: flex;
	}
	
	.order-total .l {
	  flex: 1;
	  height: 100rpx;
	  line-height: 100rpx;
	  color: #b4282d;
	  background: #fff;
	  font-size: 33rpx;
	  padding-left: 31.25rpx;
	  border-top: 1rpx solid rgba(0, 0, 0, 0.2);
	  border-bottom: 1rpx solid rgba(0, 0, 0, 0.2);
	}
	
	.order-total .r {
	  width: 233rpx;
	  height: 100rpx;
	  background: #b4282d;
	  border: 1px solid #fafafa;
	  line-height: 100rpx;
	  text-align: center;
	  color: #fff;
	  font-size: 30rpx;
	}
	
</style>
