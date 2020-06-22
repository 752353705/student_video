<template>
	<view class="author">
		<view class="head">
			<view class="userImg">
				
			</view>
			<view class="right">
				<view class="box">
					<!-- 关注 -->
					<view class="focus t_c">
						<view class="">1</view>
						<view class="">关注</view>
					</view>
					<!-- 粉丝 -->
					<view class="fans t_c" @click="goFans">
						<view class="">1.6万</view>
						<view class="">粉丝</view>
					</view>
					<!-- 获赞与收藏 -->
					<view class="collection t_c">
						<view class="">24.3万</view>
						<view class="">获赞与收藏</view>
					</view>
				</view>
				
				<view class="rightBtm">
					<view class="focusBtn t_c">关注</view>
					<view class="">消息</view>
				</view>
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
			goFans(){
				console.log('跳转到粉丝列表')
				uni.navigateTo({
					url:"/pages/fansList/fansList"
				})
			}
		}
	}
</script>

<style lang="less">
.author{
	width: 100%;
	height: 69.44rpx;
	.head{
		display: flex;
		box-sizing: border-box;
		padding: 40rpx 40rpx;
		.userImg{
			width: 150rpx;
			height: 150rpx;
			background-color: yellow;
			border-radius: 50%;
			
		}
		.right{
			width: 77%;
			margin-left: 30rpx;
			.box{
				display: flex;
				justify-content: space-evenly;
				align-items: center;
			}
			.rightBtm{
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.focusBtn{
					width: 80%;
					height: 40rpx;
					border-radius: 40rpx;
					color: white;
					background-color: red;
					padding: 10rpx 0;
				}
			}
		}
	}
}
</style>
