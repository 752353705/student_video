<template>
	<view >
		<view class="cpt">
		  <view class="item">
		    <view class="head">
		      <!--赞助商图标-->
		      <view class="left">
		        
		      </view>
		      <!--赞助商简介-->
		      <view class="right">
		        <!--公司名称-->
		        <view class="title">
		          保定市兆丰食品有限公司
		        </view>
		        <!--公司简介/有的没有，进行判断-->
		        <view class="des">
		          介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍
		        </view>
		      </view>
		    </view>
		    <!--赞助商图片-->
		    <view class="img">
		      图片
		    </view>
		  </view>
		</view>
		<tabbar :active="c_active"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				c_active:3
			};
		},
		components:{
			
		},
		onLoad() {
			console.log('首页')
			// this.$refs.popup.open()
			
			// 显示正在加载弹窗
			// uni.showLoading({
			//    title: '加载中'
			// });
			
			// // 关闭弹窗
			// setTimeout(function () {
			//     uni.hideLoading();
			// }, 2000);
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
		},
		onReachBottom() {
			console.log('上拉 触底 加载') //分页 请求数据
			
		},
	}
</script>

<style lang="less">
	.cpt{
	  position: fixed;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  background-color: #0d0639;
	  box-sizing: border-box;
	  padding: 20rpx 30rpx;
	  .item{
	    width: 100%;
	    height:645rpx;
	    background-color: white;
	    border-radius: 20rpx;
	    .head{
	      box-sizing: border-box;
	      padding: 40rpx 25rpx 15rpx;
	      display: flex;
	      justify-content: start;
	      align-items: center;
	      .left{
	        width: 100rpx;
	        height: 100rpx;
	        border-radius: 50%;
	        background-color: red;
	        margin-right: 20rpx;
	      }
	      .right{
	        width: 500rpx;
	        .title{
	          color: #5c2626;
	        }
	        .des{
	          color: #9c776e;
	          font-size: 25rpx;
	          width: 500rpx;
	          overflow:hidden;
	          text-overflow:ellipsis;
	          display:-webkit-box;
	          -webkit-line-clamp:2;
	          -webkit-box-orient:vertical;
	        }
	      }
	    }
	    .img{
	      width: 100%;
	      height: 438rpx;
	      background-color: green;
	    }
	  }
	}
</style>
