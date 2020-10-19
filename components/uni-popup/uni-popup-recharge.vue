<template>
	<view class="uni-popup-recharge">
		<view class="uni-recharge-title"><text class="uni-recharge-title-text">充值</text></view>
		<view class="balance">剩余H币: {{money}}</view>
		<view class="uni-recharge-content">
			<view class="uni-recharge-content-box" @click="addmoney(index)" v-for="(item, index) in priceArr" :key="index">
				<view class="p1">{{item.num}} H币</view>
				<view class="p2">{{item.price}}元</view>
			</view>
		</view>
		<view class="rule">
			<!-- 充值代表已阅读并同意 <text style="color:#efab26 ;">《用户充和协议》</text> -->
		</view>
	</view>
</template>

<script>
export default {
	props: {
		money: {
			type: Number
		}
	},
	data() {
		return {
			// money:0,
			userId:'',
			priceArr:[
				{
					num:10,
					price:1
				},{
					num:50,
					price:5
				},{
					num:100,
					price:10
				},{
					num:500,
					price:50
				},{
					num:1000,
					price:100
				},{
					num:5000,
					price:500
				},
			]
		};
	},
	created() {
		
	},
	methods: {
		addmoney(index){
			let _this = this
			console.log('充值 增加 H币',this.priceArr[index].price)
			
			let fee = this.floatMul(_this.priceArr[index].price,100)
			let hGold = this.priceArr[index].num
			// 跳转到 支付页面
			uni.navigateTo({
				url:`/pages/recharge/pay?userId=${this.userId}&fee=${fee}&hGold=${hGold}`
			})
			// this.userPay()
			// this.api._post(`user/prepay?userId=${this.userId}&fee=${fee}&hGold=${hGold}`,{
				
			// },function(res){
			// 	console.log('测试支付',res.data)
			// 	uni.requestPayment({
			// 		provider: 'wxpay', //服务提供商 通过uni.getProvider获取
			// 		timeStamp:res.data.payResult.timeStamp , //时间戳
			// 		nonceStr:res.data.payResult.nonceStr , //随机字符串
			// 		// 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
			// 		package: res.data.payResult.packageValue,
			// 		signType: res.data.payResult.signType, //签名算法
			// 		paySign: res.data.payResult.paySign, //签名
			// 		success: function(res) {
			// 			console.log('支付接口成功 调用',res);
			// 		},
			// 		fail: function(err) {
			// 			console.log('fail:',err);
			// 		}
			// 	});
			// },function(err){
			// 	console.log('err',err)
			// })
		},
		// 精确乘法
		floatMul(arg1,arg2)   {
			 var m=0,s1=arg1.toString(),s2=arg2.toString();
			 try{m+=s1.split(".")[1].length}catch(e){}
			 try{m+=s2.split(".")[1].length}catch(e){}
			 return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
		 },
	}
};
</script>

<style lang="scss" scoped>
// 充值界面
.uni-popup-recharge {
	background-color: white;
	height: 351px;
	position: relative;
	border-radius: 20rpx 20rpx 0 0;
}
.uni-recharge-title {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 40px;
}
.uni-recharge-title-text {
	font-size: 40rpx;
	font-weight: bolder;
	// color: #666;
}
.balance {
	position: absolute;
	left: 30rpx;
	top: 20rpx;
	font-size: 35rpx;
	color: #858585;
}
.uni-recharge-content {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.uni-recharge-content-box {
	width: 105px;
	height: 75px;
	background-color: #f8f8f8;
	margin-left: 14px;
	margin-top: 20px;
	border-radius: 20rpx;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.p1 {
		font-size: 36rpx;
		font-weight: bold;
		color: black;
	}
	.p2 {
		font-size: 33rpx;
		color: #7b7b7b;
	}
}

.rule{
	text-align: center;
	line-height: 175rpx;
}
</style>
