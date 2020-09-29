<template>
	<view class="store">
		<!-- 轮播图 -->
		<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item style="background-color: #00FF00;"><view class="swiper-item">a</view></swiper-item>
			<swiper-item style="background-color: #0062CC;"><view class="swiper-item">b</view></swiper-item>
		</swiper>

		<!-- 内容区 -->
		<view class="cont">
			<!-- 分类 -->
			<view class="store_type">
				<view class="item" v-for="(item, index) in [1, 2, 3, 4]"
						:key="index"
					>
					<view class="">图标</view>
					<view class="">爆款美食</view>
				</view>
			</view>
			<!-- 热门展示 -->
			<view class="store_hot">
				<view class="tit">
					<view class="left">热映影片 在线选座</view>
					<view class="right">更多</view>
				</view>

				<scroll-view scroll-x="true" class="scroll">
					<view class="scroll-view-item" 
						v-for="(item,index) in [1,2,3,4]" :key="index"
						>
						<view class="">影片图片</view>
						<view class="">电影名称</view>
						<view class="">抢购</view>
					</view>
				</scroll-view>
			</view>
			<!-- 商品详情 -->
			<view class="g_detail">
				<view class="img">图片</view>
				<view class="right">
					<view class="intr">商品详情商品详情商品详情商品详情商品详情商品详情</view>
					<view class="">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style scoped lang="less">
.store {
	// 控制轮播图
	swiper {
		height: 200px;
	}
	// 内容展示
	.cont {
		box-sizing: border-box;
		padding-top: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 20rpx;
		// 分类展示
		.store_type {
			width: 100%;
			height: 80rpx;
			background-color: yellow;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.item {
				text-align: center;
			}
		}
		// 热门展示
		.store_hot {
			.tit {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				line-height: 60rpx;
				margin-top: 30rpx;
				.left {
					font-size: 45rpx;
					font-weight: bold;
				}
				.right {
				}
			}
			// 滚动展示详情
			.scroll {
				margin-top: 30rpx;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				.scroll-view-item {
					display: inline-block;
					overflow: hidden;
					width: 130px;
					height: 60px;
					background-color: red;
					margin-right: 30upx;
				}
			}
		}
		// 商品详情
		.g_detail{
			margin-top: 30rpx;
			display: flex;
			justify-content: flex-start;
			.img{
				width: 200rpx;
				height: 200rpx;
				background-color: red;
				margin-right: 30rpx;
			}
			.right{
				
			}
		}
	}
}
</style>
