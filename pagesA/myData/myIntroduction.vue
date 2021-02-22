<template>
	<view style="position: relative;">
		<view style="position: relative;">
			<textarea
				class="textarea"
				:value="value" 
				placeholder="有趣的个人简介会吸引更多粉丝哦" 
				placeholder-style="color:#9c9c9c;margin-left:20rpx"
				maxlength="60"
				@input="input"
				>
				<!-- 最多的字数 -->
			</textarea>
			<view class="num">{{num}}/60</view>
		</view>
			
		<!-- 保存按钮 -->	
		<view class="btn" @click="submit">
			保 存
		</view>
			
	</view>
</template>

<script>
	export default {
		data(){
			return {
				value:'',
				num:0
			}
		},
		onLoad(option) {
			this.value = option.personalProfile
		},
		methods:{
			// 用户输入 简介
			input(e){
				this.value = e.detail.value
				this.num = e.detail.cursor
			},
			// 用户进行提交
			submit(){
				this.http({
					url:'user',
					method:'PUT',
					data:{
						personalProfile:this.value
					}
				}).then(res => {
					uni.navigateBack({
						delta:1
					})
				})
			}
		},
	}
</script>

<style>
	page{
		background-color: #f5f5f5;
	}
</style>

<style lang="scss" scoped>
	.textarea{
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		background-color: white;
		border-radius: 30rpx;
		margin: 80rpx auto;
	}
	.num{
		position: absolute;
		bottom:21rpx;
		right: 94rpx;
		color: #9c9c9c;
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
