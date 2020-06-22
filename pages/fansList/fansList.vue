<template>
	<view>
		<view class="fans" v-for="(index,item) in [1,2,3]">
			<view class="left">
				<view class="img">
					
				</view>
				<view class="name">粉丝</view>
			</view>
			<view class="focus" @click="focus">
				关注
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			focus(){
				console.log('点击关注粉丝')
			}
		}
	}
</script>

<style lang="less">
.fans{
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 20rpx 40rpx;
	padding-left: 0;
	margin: 20rpx 40rpx;
	position: relative;
	.left{
		display: flex;
		align-items: center;
		.img{
			width: 100rpx;
			height: 100rpx;
			background-color: yellow;
			border-radius: 50%;
			margin-right: 40rpx;
		}
	}
	.focus{
		border: 1px solid red;
		color: red;
		padding: 10rpx 20rpx;
		border-radius: 40rpx;
		font-size: 20rpx;
	}
}
// 绘制0.5px的底线
.fans:after{
	content: "  ";
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	 border-bottom:1px solid black;
	/* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
	-webkit-transform: scaleY(.5);
	transform:scaleY(.5);
}
.fans:last-child::after{
	content: "  ";
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	border-bottom:1px solid white;
	/* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
	-webkit-transform: scaleY(.5);
	transform:scaleY(.5);
}
</style>
