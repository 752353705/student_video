<template>
	<view>
		<input type="text" :value="value" 
			placeholder="添加一个名字"
			placeholder-style="color:#a3a3a3"
			@input="input"
			maxlength="6"
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
		onLoad(option) {
			this.value = option.name
		},
		methods:{
			input(e){
				this.value = e.detail.value
			},
			// 用户进行提交
			submit(){
				this.http({
					url:'user',
					method:'PUT',
					data:{
						userName:this.value
					}
				}).then(() => {
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

<style lang="scss" scoped>
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
		background-color: $bg-color;
		margin: 20rpx auto;
		border-radius: 30rpx;
	}
</style>
