<template>
	<view class="">
		<view class="container">
		
		  <view class="h">
		    <view :class=" [status == 0 ? 'active item' : 'item']" @tap="switchTab" data-index="0">
		      <view class="txt">未使用</view>
		    </view>
		    <view :class=" [ status == 1 ? 'active item' : ' item']" @tap="switchTab" data-index="1">
		      <view class="txt">已使用</view>
		    </view>
		    <view :class="  [status == 2 ? 'active item' : 'item']" @tap="switchTab" data-index="2">
		      <view class="txt">已过期</view>
		    </view>
		  </view>
		
		  <scroll-view class="coupon-list" scroll-y="true" :scroll-top="scrollTop">
		
		    <view class="item" v-for=" (item,index) in couponList" :key="item.id" @tap="getCoupon" :data-index="item.id">
		     <view class="tag">{{item.tag}}</view>
		     <view class="content">
		         <view class="left">
		            <view class="discount">{{item.discount}}元</view>
		            <view class="min"> 满{{item.min}}元使用</view>
		         </view>
		         <view class="right">
		            <view class="name">{{item.name}}</view>
		            <view class="desc">{{item.desc}}</view>
		            <view class="time" v-if="item.days && item.days != 0">有效期：{{item.days}}天</view>
		            <view class="time" v-else> 有效期：{{item.startTime}} - {{item.endTime}}</view>
		         </view>
		         <view class="couponbg"></view>
		      </view>
		    </view>
		
		    <view class="page" v-if="showPage">
		      <view :class="  page <= 1 ? 'disabled prev' : 'prev' " @tap="prevPage">上一页</view>
		      <view :class="  (count / size) < page ? 'disabled next' : 'next' " @tap="nextPage">下一页</view>
		    </view>
		  </scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				couponList: [],
				code: '',
				status: 0,
				page: 1,
				size: 10,
				count: 0,
				scrollTop: 0,
				showPage: false
			}
		},
		onLoad() {
			this.getCouponList();
		},
		methods:{
			getCouponList: function() {
			
			  let that = this;
			  that.scrollTop = 0
			    that.showPage = false
			    that.couponList = []
					
				this.api._get('coupon/mylist',{
					status: that.status,
					page: that.page,
					size: that.size
				},function(res) {
			    if (res.errno === 0) {
			
			      that.scrollTop = 0
			        that.couponList = res.data.data
							if(res.data.data.length > 4){
								
			        that.showPage = true
							}
			        that.count = res.data.count
			    }
			  })	
					
			//   util.request(api.CouponMyList, {
			//     status: that.data.status,
			//     page: that.data.page,
			//     size: that.data.size
			//   }).then(function(res) {
			//     if (res.errno === 0) {
			
			//       that.setData({
			//         scrollTop: 0,
			//         couponList: res.data.data,
			//         showPage: true,
			//         count: res.data.count
			//       });
			//     }
			//   });
			
			},
			
			bindExchange: function (e) {
			  this.code = e.detail.value
			},
			
			clearExchange: function () {
			  this.code = ''
			},
			
			goExchange: function() {
			  if (this.code.length === 0) {
			    util.showErrorToast("请输入兑换码");
			    return;
			  }
			
			  let that = this;
				this.api._post('coupon/exchange',{
					code: that.code
				},function (res) {
			    if (res.errno === 0) {
			      that.getCouponList();
			      that.clearExchange();
			      wx.showToast({
			        title: "领取成功",
			        duration: 2000
			      })
			    }
			    else{
			      util.showErrorToast(res.errmsg);
			    }
			  })
				
				
			  // util.request(api.CouponExchange, {
			  //   code: that.code
			  // }, 'POST').then(function (res) {
			  //   if (res.errno === 0) {
			  //     that.getCouponList();
			  //     that.clearExchange();
			  //     wx.showToast({
			  //       title: "领取成功",
			  //       duration: 2000
			  //     })
			  //   }
			  //   else{
			  //     util.showErrorToast(res.errmsg);
			  //   }
			  // });
			},
			
			nextPage: function(event) {
			  var that = this;
			  if (this.page > that.count / that.size) {
			    return true;
			  }
			
			  that.page = that.page + 1
			
			  this.getCouponList();
			
			},
			
			prevPage: function(event) {
			  if (this.page <= 1) {
			    return false;
			  }
			
			  var that = this;
			  that.page = that.page - 1
			  this.getCouponList();
			},
			
			switchTab: function(e) {
			
			  this.couponList = [],
			    this.status = e.currentTarget.dataset.index
			    this.page = 1
			    this.size = 10
			    this.count = 0
			    this.scrollTop = 0
			    this.showPage = false
			
			  this.getCouponList();
			},
		}
	}
</script>

<style>
	page {
	  background: #f4f4f4;
	  min-height: 100%;
	}
	
	.container {
	  background: #f4f4f4;
	  min-height: 100%;
	  padding-top: 30rpx;
	}
	
	.container .h {
	  position: fixed;
	  left: 0;
	  top: 0;
	  z-index: 1000;
	  width: 100%;
	  display: flex;
	  background: #fff;
	  height: 84rpx;
	  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	}
	
	.container .h .item {
	  display: inline-block;
	  height: 82rpx;
	  width: 50%;
	  padding: 0 15rpx;
	  text-align: center;
	}
	
	.container .h .item .txt {
	  display: inline-block;
	  height: 82rpx;
	  padding: 0 20rpx;
	  line-height: 82rpx;
	  color: #333;
	  font-size: 30rpx;
	  width: 170rpx;
	}
	
	.container .h .item.active .txt {
	  color: #ab2b2b;
	  border-bottom: 4rpx solid #ab2b2b;
	}
	
	.coupon-list {
	  width: 710rpx;
	  height: auto;
	  margin-top: 68rpx;
	  overflow: hidden;
	}
	
	.coupon-list .item {
	  position: relative;
	  height: 200rpx;
	  width: 680rpx;
	  background: linear-gradient(to right, #d8050f, #e68d08);
	  margin: 18rpx;
	  overflow:hidden;
	  border-radius: 10rpx;
	}
	
	.coupon-list .item:before, .item:after {
	  content: '.';
	  width: 0;
	  height: 200%;
	  position: absolute;
	  top: 20rpx;
	} 
	
	.coupon-list .item:before {
	  border-right: 20rpx dotted #eeeeee;
	  left: -10rpx;
	  width: 1rpx;
	}
	
	.coupon-list .item:after {
	  border-left: 20rpx dotted #eeeeee;
	  right: -10rpx;
	}
	
	
	.coupon-list .tag {
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
	
	.coupon-list .content {
	  margin-left: 30rpx;
	  display: flex;
	  margin-right: 40rpx;
	  flex-direction: row;
	}
	
	.coupon-list .content .left {
	  padding-top: 50rpx; 
	  flex: 1;
	  border-right: 2rpx dashed rgba(230,230,230,.5);
	}
	
	.coupon-list .discount {
	  font-size: 50rpx;
	  color: #e9f814;
	}
	
	.coupon-list .min {
	  color: #fff;
	}
	
	.coupon-list .content .right {
	  padding: 11px 8px;
	  width: 410rpx;
	}
	
	.coupon-list .name {
	  font-size: 44rpx;
	  color: #fff;
	  margin-bottom: 14rpx;
	}
	
	.coupon-list .desc {
	  font-size: 24rpx;
	  color: #fff;
	}
	
	.coupon-list .time {
	  font-size: 24rpx;
	  color: #fff;
	  line-height: 30rpx;
	}
	
	.coupon-list .couponbg{
	  position: absolute;
	  left: 20%;
	  top: 95rpx;
	  height: 290rpx;
	  width: 730rpx;
	  background-color: rgba(255,255,255,.15);
	  transform: rotate(-20deg);
	}
	
	.condition {
	  position: absolute;
	  width: 100%;
	  bottom: 0;
	  left: 0;
	  height: 78rpx;
	  background: rgba(0, 0, 0, 0.08);
	  padding: 24rpx 40rpx;
	  display: flex;
	  flex-direction: row;
	}
	
	 .condition .txt {
	  display: block;
	  height: 30rpx;
	  flex: 1;
	  overflow: hidden;
	  font-size: 24rpx;
	  line-height: 30rpx;
	  color: #fff;
	}
	
	.condition .icon {
	  margin-left: 30rpx;
	  width: 24rpx;
	  height: 24rpx;
	}
	
	.page {
	  width: 750rpx;
	  height: 108rpx;
	  background: #fff;
	  margin-bottom: 20rpx;
	}
	
	.page view {
	  height: 108rpx;
	  width: 49%;
	  float: left;
	  font-size: 29rpx;
	  color: #333;
	  text-align: center;
	  line-height: 108rpx;
	}
	
	.page .prev {
	  border-right: 1px solid #d9d9d9;
	}
	
	.page .disabled {
	  color: #ccc;
	}
</style>
