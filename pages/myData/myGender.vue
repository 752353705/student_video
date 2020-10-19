<template>
	<view class="gender">
		<view class="tit">选择性别</view>
		<view class="choose">
			<view class="item" @click="active(index)" 
				v-for="(item,index) in type"
				:key="item.id"
				>
				<view class="">{{item.sex}}</view>
				<view style="color: #ff2440;" v-if="act == index + 1" 
					class="iconfont iconduigou"
					>
				</view>
			</view>
		</view>
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
				type:[{sex:'男',id:1},{sex:'女',id:2}],
				act:1
			}
		},
		onLoad(option) {
			this.act = option.gender
		},
		methods:{
			// 用户进行提交
			submit(){
				console.log('提交')
				this.api._put('user',{
					gender:this.type[this.act - 1].id
				},(res)=>{
					uni.navigateBack({
						delta:1
					})
				})
			},
			// 切换
			active(index){
				this.act = index + 1
			}
		},
	}
</script>

<style>
	page{
		background-color: #f5f5f5;
	}
</style>

<style  lang="less" scoped>
	.gender{
		box-sizing: border-box;
		padding-top: 52rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		.tit{
			color: #999999;
		}
		.choose{
			margin-top: 31rpx;
			border-radius: 30rpx;
			background-color: white;
			width: 100%;
			box-sizing: border-box;
			padding-top: 23rpx;
			padding-left: 36rpx;
			padding-right: 23rpx;
			padding-bottom: 36rpx;
			.item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;
				border-bottom: 1rpx solid #e6e6e6;
			}
			.item:last-child{
				border: none;
			}
		}
		
		.btn{
			width: 67%;
			line-height: 91rpx;
			text-align: center;
			color: white;
			background-color: #ff9933;
			margin: 63rpx auto;
			border-radius: 30rpx;
		}
	}
	
</style>
