<template>
	<view class="life">
		<!-- 首页的图片样式 -->
		<view class="img_box">
			<image src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg" mode=""></image>
		</view>
		<!-- 商家展示 -->
		<view class="merchant">
			<view class="merchant_box">
				<view class="merchant_item"
					v-for="(item,index) in [1,2,3,4,5,6,7] "
					:key="index"
					@click="jumpDetail"
					>
					<view class="le">
						<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg" mode=""></image>
					</view>
					<view class="ri">
						<view class="head">
							<text class="type">美食</text>
							<text class="title">鱼兹娃味</text>
						</view>
						<view class="location">
							<text>复兴中路</text>
							<text>495m</text>
						</view>
						<view class="foot">
							美味牛蛙、清江鱼
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商家入驻 -->
		<view class="tenants" @click="goTenants" >
			入驻
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
			// 跳转到商家详情页面
			jumpDetail(){
				uni.navigateTo({
					url:'/pages/huiLife/merchant'
				})
			},
			// 跳转到商家入驻页面
			goTenants(){
				uni.navigateTo({
					url:'/pages/huiLife/tenants'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f1f5f8;
	}
</style>

<style lang="scss">
	.life{
		.img_box{
			height: 370rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		// 商家
		.merchant{
			box-sizing: border-box;
			position: relative;
			.merchant_box{
				position: absolute;
				top: -90rpx;
				left: 20rpx;
				width: 95%;
				.merchant_item{
					width: 100%;
					height: 205rpx;
					background-color: #ffffff;
					margin-bottom: 30rpx;
					box-sizing: border-box;
					padding: 20rpx;
					padding-right: 60rpx;
					border-radius: 10rpx;
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					.le{
						width: 200rpx;
						height: 100%;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.ri{
						width: 100%;
						height: 100%;
						margin-left: 20rpx;
						// 商家信息
						.head{
							.type{
								background-color: #fcf2f0;
								color: #ba766b;
								margin-right: 20rpx;
								padding: 5rpx 13rpx;
								font-size: 20rpx;
								// padding-top: 5rpx;
								// padding-left: 5rpx;
								// padding-right: 5rpx;
								// padding-bottom: 5rpx;
								border-radius: 10rpx;
							}
							.title{
								font-size: 35rpx;
								font-weight: bolder;
							}
						}
						// 商家地点
						.location{
							margin-top: 10rpx;
							display: flex;
							justify-content: space-between;
							color: #525252;
							font-size: 27rpx;
						}
						// 当前热销简介
						.foot{
							margin-top: 10rpx;
							color: #ba766b;
							font-size: 27rpx;
						}
					}
				}
			}
		}
		// 商家入驻
		.tenants{
			width: 100rpx;
			height: 100rpx;
			background-color: red;
			position: fixed;
			bottom: 200rpx;
			right: 20rpx;
			z-index: 10;
		}
	}
</style>
