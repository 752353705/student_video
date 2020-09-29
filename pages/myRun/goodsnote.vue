<template>
	<view class="note">
		<textarea :value="val" placeholder="请填写备注信息" 
			@input='input' maxlength="80"
			/>
		
		<view class="btn" @click="sub">
			确定
		</view>
		
		<!-- 限制备注字数 -->
		<view class="num">
			{{num}}/80
		</view>
		
	</view>
</template>

<script>
	export default{
		data (){
			return {
				val:'',
				num:0
			}
		},
		methods:{
			sub(){
				// console.log('提交订单备注') encodeURIComponent(JSON.stringify(this.val))
				let val = this.val
				uni.navigateTo({
					url:'/pages/my/myRun?note=' + encodeURIComponent(JSON.stringify(val))
				})
				
				
			},
			input(e){
				// console.log('文本域内容',e)
				this.val = e.detail.value
				this.num = e.detail.cursor
			}
		},
		
		
	}
</script>

<style scoped lang="less">
	.note{
		position: relative;
		// background-color: red;
		box-sizing: border-box;
		padding-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		textarea{
			width: 100%;
			// background-color: green;
		}
		.btn{
			width: 50%;
			height: 80rpx;
			background-color:#1a1a1a ;
			margin: 79rpx auto;
			color: white;
			text-align: center;
			line-height: 80rpx;
			border-radius: 30rpx;
			font-size: 30rpx;
		}
		.num{
			position: absolute;
			bottom: 180rpx;
			right: 30rpx;
			width: 60rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			color: #cdcdcd;
		}
		
	}
	
</style>
