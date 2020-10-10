<template>
	<view>
		<input type="text" value="" 
			placeholder="添加一个名字"
			placeholder-style="color:#a3a3a3"
			@input="input"
			/>
		
		<!-- 保存按钮 -->
		<view class="btn" @click="submit">
			保存
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				value:''
			}
		},
		methods:{
			input(e){
				// console.log('e',e)
				this.value = e.detail.value
				// this.num = e.detail.cursor
			},
			// 用户进行提交
			submit(){
				console.log('提交')
				this.api._put('user',{
					userName:this.value
				},(res)=>{
					uni.navigateBack({
						delta:1
					})
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f5f5f5;
	}
</style>

<style lang="less" scoped>
	input{
		width: 89%;
		height: 90rpx;
		background-color: white;
		margin: 80rpx auto;
		border-radius: 30rpx;
		padding-left: 20rpx;
	}
	
	.btn{
		width: 67%;
		line-height: 91rpx;
		text-align: center;
		color: white;
		background-color: #ff2440;
		margin: 20rpx auto;
		border-radius: 30rpx;
	}
</style>
