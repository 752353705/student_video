<template>
	<view class="">
		<view class="head" >
		  <view class="pri">
		    需支付金额
		  </view>
		  <view>
		    <span style="color:#ff8a00;font-size:100rpx">
		      {{fee / 100 || '0' }}
		    </span>
		    元
		  </view>
		  <!-- <view class="des">
		    跑腿费{{msg.orderPrice}}元
		  </view> -->
		</view>
		
		<view class="choose">
		  <!-- <view class="item"> -->
		  <label class="item">
		    <image src="/static/wei.png"  />
		    <view class="cont">
		      <view >
		        微信支付
		      </view>
		      <view style="color:#b0b0b2;margin-top:10rpx;">
		        推荐安装微信5.0及以上版本的使用
		      </view>
		    </view>
		    
		   <!-- <radio color="red" style="margin-left:20px;"
		       value="wei" checked="true"
		       /> -->
		  <!-- </view> -->
		  </label>
		</view>
		
		<view class="btn" @click="oderPay">
		  支付
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				userId:'',
				// 支付金额
				fee:'',
				// 获取的H币
				hGold:'',
				// 订单id
				orderCode:''
			}
		},
		onLoad(option) {
			this.userId = option.userId
			this.fee = option.fee
			this.hGold = option.hGold
		},
		methods:{
			
			// 用户点击进行支付操作
			oderPay(){
				let _this = this
				this.api._post(`user/prepay?userId=${this.userId}&fee=${this.fee}&hGold=${this.hGold}`,{
					
				},function(res){
					// let orderCode
					console.log('测试支付',res.data)
					_this.orderCode = res.data.orderCode
					uni.requestPayment({
						provider: 'wxpay', //服务提供商 通过uni.getProvider获取
						timeStamp:res.data.payResult.timeStamp , //时间戳
						nonceStr:res.data.payResult.nonceStr , //随机字符串
						// 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
						package: res.data.payResult.packageValue,
						signType: res.data.payResult.signType, //签名算法
						paySign: res.data.payResult.paySign, //签名
						success: function() {
							console.log('支付接口成功 调用',res);
							// uni.showToast({
							// 	title:'充值成功',
							// 	icon:'none'
							// })
							// _this.getUsInfo()
							// 询问用户是否进行 通知
							uni.requestSubscribeMessage({
							  tmplIds: ['lqaQsaedBYoH8lvRB7oGtConmMmO_AuJnG79RQ6CR0g'],
							  success (res_subMsg) {
									// console.log('进行订阅成功)
									
									// 如果用户进行订阅成功了，则调用接口
									if(res_subMsg.errMsg == 'requestSubscribeMessage:ok'){
										console.log('用户订阅成功',_this.orderCode)
										_this.api._get(`notify/wxPaymentMessage/${_this.orderCode}`,{},(res)=>{
											console.log('订阅成功，再次调用接口',res)
										})
										
									}else{
										console.log('用户订阅失败')
									}
								}
							})
							
							
						},
						fail: function(err) {
							console.log('fail:',err);
						}
					});
				},function(err){
					console.log('err',err)
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.head{
	  width: 100%;
	  height: 500rpx;
	  // background-color: yellowgreen;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  .pri{
	    margin-bottom: 20rpx;
	  }
	  .des{
	    color: #b0b0b2;
	    margin-top: 20rpx;
	  }
	}
	.choose{
	  box-sizing: border-box;
	  padding-top: 20rpx;
	  padding-right: 20rpx;
	  padding-bottom: 20rpx;
	  padding-left: 42rpx;
	  .item{
	    display: flex;
	    justify-content: flex-start;
	    align-items: center;
	    image{
	      width: 60rpx;
	      height: 60rpx;
	    }
	    .cont{
	      margin-left: 30rpx;
	    }
	  }
	}
	.btn{
	  position: fixed;
	  bottom: 60rpx;
	  left: 50%;
	  transform: translateX(-50%);
	  color: white;
	  text-align: center;
	  width: 80%;
	  height: 100rpx;
	  line-height: 100rpx;
		background-color: $bg-color;
		border-radius: 30rpx;
	}

</style>
