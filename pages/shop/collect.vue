<template>
	<view class="container">
	  <view class="no-collect"v-if="collectList.length <= 0">
	    <view class="c">
	      <image src="/static/images/noCart_old.png" />
	      <text>还没有收藏</text>
	    </view>
	  </view>
	  <view class="collect-list"v-else>
	    <view class="item" @tap="openGoods" @touchstart="touchStart" 
				@touchend="touchEnd" v-for=" (item,index) in collectList" 
				:key="id" :data-index="index"
				>
	      <image class="img" :src="item.picUrl"></image>
	      <view class="info">
	        <view class="name jhx_f7">{{item.name}}</view>
	        <view class="subtitle jhx_f5">{{item.brief}}</view>
	        <view class="price jhx_f8">￥{{item.retailPrice}}</view>
	      </view>
	    </view>
	  </view>
	
	</view>
</template>

<script>
	export default {
		data(){
			return {
				type: 0,
				collectList: [],
				page: 1,
				size: 10,
				totalPages: 1
			}
		},
		onLoad() {
			this.getCollectList();
		},
		onReachBottom() {
		  if (this.totalPages > this.page) {
		    this.page = this.page + 1
		    this.getCollectList();
		  } else {
		    wx.showToast({
		      title: '没有更多用户收藏了',
		      icon: 'none',
		      duration: 2000
		    });
		    return false;
		  }
		},
		methods:{
			getCollectList() {
			  wx.showLoading({
			    title: '加载中...',
			  });
			  let that = this;
				this.api._get('collect/list',{
					type: that.type,
					page: that.page,
					size: that.size
				},function(res) {
			    if (res.errno === 0) {
			      that.collectList = that.collectList.concat(res.data.collectList)
			        that.totalPages = res.data.totalPages
			    }
			    wx.hideLoading();
			  })
				
			  // util.request(api.CollectList, {
			  //   type: that.data.type,
			  //   page: that.data.page,
			  //   size: that.data.size
			  // }).then(function(res) {
			  //   if (res.errno === 0) {
			  //     that.setData({
			  //       collectList: that.data.collectList.concat(res.data.collectList),
			  //       totalPages: res.data.totalPages
			  //     });
			  //   }
			  //   wx.hideLoading();
			  // });
			},
			
			openGoods(event) {
			
			  let that = this;
			  let index = event.currentTarget.dataset.index;
			  let goodsId = this.collectList[index].valueId;
			
			  //触摸时间距离页面打开的毫秒数  
			  var touchTime = that.touchEnd - that.touchStart;
			  console.log(touchTime);
			  //如果按下时间大于350为长按  
			  if (touchTime > 350) {
			    wx.showModal({
			      title: '',
			      content: '确定删除吗？',
			      success: function(res) {
			        if (res.confirm) {
								that.api._post('collect/addordelete',{
									type: that.type,
									valueId: goodsId
								},function(res) {
			            if (res.errno === 0) {
			              console.log(res.data);
			              wx.showToast({
			                title: '删除成功',
			                icon: 'success',
			                duration: 2000
			              });
			              that.collectList.splice(index, 1)
			              that.collectList = that.collectList
			            }
			          })
								
								
			     //      util.request(api.CollectAddOrDelete, {
			     //        type: that.data.type,
			     //        valueId: goodsId
			     //      }, 'POST').then(function(res) {
			     //        if (res.errno === 0) {
			     //          console.log(res.data);
			     //          wx.showToast({
			     //            title: '删除成功',
			     //            icon: 'success',
			     //            duration: 2000
			     //          });
			     //          that.data.collectList.splice(index, 1)
			     //          that.setData({
			     //            collectList: that.data.collectList
			     //          });
			     //        }
			     //      });
			        }
			      }
			    })
			  } else {
			
			    wx.navigateTo({
			      url: '/pages/shopdetail/shopdetail?id=' + goodsId,
			    });
			  }
			},
			
			//按下事件开始
			touchStart(e){
			  let that = this;
			  that.touchStart = e.timeStamp
			},
			
			//按下事件结束
			touchEnd(e){
			  let that = this;
			  that.touchEnd = e.timeStamp
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
	  width: 100%;
	  height: auto;
	  overflow: hidden;
	}
	
	.no-collect {
	  width: 100%;
	  height: auto;
	  margin: 0 auto;
	}
	
	.no-collect .c {
	  width: 100%;
	  height: auto;
	  margin-top: 200rpx;
	}
	
	.no-collect .c image {
	  margin: 0 auto;
	  display: block;
	  text-align: center;
	  width: 258rpx;
	  height: 258rpx;
	}
	
	.no-collect .c text {
	  margin: 0 auto;
	  display: block;
	  width: 258rpx;
	  height: 29rpx;
	  line-height: 29rpx;
	  text-align: center;
	  font-size: 29rpx;
	  color: #999;
	}
	
	.collect-list {
	  width: 100%;
	  height: auto;
	  overflow: hidden;
	  background: #fff;
	  padding-left: 30rpx;
	  border-top: 1px solid #e1e1e1;
	}
	
	.item {
	  height: 242rpx;
	  width: 720rpx;
	  background: #fff;
	  padding: 30rpx 30rpx 30rpx 0;
	  border-bottom: 1px solid #e1e1e1;
	}
	
	.item:last-child {
	  border-bottom: 1px solid #fff;
	}
	
	.item .img {
	  float: left;
	  width: 170rpx;
	  height: 170rpx;
	}
	
	.item .info {
	  float: right;
	  width: 520rpx;
	  height: 200rpx;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  padding-left: 20rpx;
	}
	
	.item .info .name {
	  line-height: 50rpx;
	  display: -webkit-box;
	 -webkit-box-orient: vertical;
	 -webkit-line-clamp: 1;
	  overflow: hidden;
	}
	
	.item .info .subtitle {
	  margin-top: 8rpx;
	  line-height: 50rpx;
	  display: -webkit-box;
	 -webkit-box-orient: vertical;
	 -webkit-line-clamp: 2;
	 overflow: hidden;
	}
	
	.item .info .price {
	  margin-top: 8rpx;
	  line-height: 50rpx;
	}
	
</style>
