<template>
	<view class="recharge">
		<view class="uni-recharge-title"><text class="uni-recharge-title-text">充值</text></view>
		<view class="balance">剩余H币: 
			<text style="font-size: 21px;color:#ff9933;margin-left: 10rpx;">{{user_money || '0' }}</text>
		</view>
		<view class="histroy" @click="rechHis" >充值记录</view>
		<view class="uni-recharge-content">
			<view class="uni-recharge-content-box" :class="act == index ? 'act' : '' " @click="addmoney(index)" v-for="(item, index) in priceArr" :key="index">
				<view class="p1" :class="act == index ? 'act' : '' " >
					{{item.num}} H币
				</view>
				<view class="p2" :class="act == index ? 'act' : '' " >
					{{item.price}}元
				</view>
			</view>
		</view>
		
		<view class="btn" @click="jumpPay">
			去充值
		</view>
		
		
		
		<view class="rule">
			<!-- 充值代表已阅读并同意 <text style="color:#efab26 ;">《用户充和协议》</text> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_money:0,
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
				],
				// 当前用户选中的充值数
				act:0,
				// 用户选择的充值金额
				fee:'',
				hGold:''
			};
		},
		onLoad(option) {
			
			this.user_money = option.money || ''
			this.userId = option.userId
			console.log('充值',option)
		},
		onShow() {
			// 每次显示都默认用户选择的 第一个充值方案
			this.addmoney(0)
			
		},
		methods:{
			// 跳转到 充值记录页面
			rechHis(){
				uni.navigateTo({
					url:`/pages/recharge/rechHis`
				})
				
				
			},
			
			addmoney(index){
				this.act = index
				this.fee = this.floatMul(this.priceArr[index].price,100)
				this.hGold = this.priceArr[index].num
			},
			
			// 跳转到支付页面
			jumpPay(){
				uni.navigateTo({
					url:`/pages/recharge/pay?userId=${this.userId}&fee=${this.fee}&hGold=${this.hGold}`
				})
			},
			
			// 精确乘法
			floatMul(arg1,arg2)   {
				 var m=0,s1=arg1.toString(),s2=arg2.toString();
				 try{m+=s1.split(".")[1].length}catch(e){}
				 try{m+=s2.split(".")[1].length}catch(e){}
				 return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
			 },
			 // 获取用户的个人信息
			 getUsInfo(){
			 	
			 	if(uni.getStorageSync('user_img')){
			 		// 如果用户进行了登录操作，获取用户的个人信息
			 		this.api._get(
			 		'user/info',{},(res)=>{
			 			console.log('获取用户当前的 H币',res)
			 			this.user_money = res.data.hgold
			 			
			 		})
			 	}
			 },
		}
	}
</script>

<style lang="less">
// 充值界面
.uni-popup-recharge {
	background-color: white;
	height: 356px;
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
	font-size: 29rpx;
	color: #858585;
}

.histroy{
	position: absolute;
	right: 30rpx;
	top: 20rpx;
	font-size: 29rpx;
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
	
	// 用户当前激活的
	&.act{
		color:  #ff9933;
		border: 1rpx solid  #ff9933;
	}
	
	.p1 {
		font-size: 36rpx;
		font-weight: bold;
		color: black;
		&.act{
			color:  #ff9933;
		}
	}
	.p2 {
		font-size: 33rpx;
		color: #7b7b7b;
		&.act{
			color:  #ff9933;
		}
	}
}

.btn {
		width: 67%;
		line-height: 91rpx;
		text-align: center;
		color: white;
		background-color: #ff9933;
		margin: 150rpx auto;
		border-radius: 30rpx;
	}

.rule{
	text-align: center;
	line-height: 175rpx;
}
</style>
