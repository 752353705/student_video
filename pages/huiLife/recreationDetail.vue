<template>
	<view class="live">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" 
			:interval="3000" :duration="1000"
			circular="true"
			>
			<swiper-item
				v-for="(item,index) in [1,2,3] "
				:key="index"
				>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
		<!-- 头部 民宿 -->
		<view class="head border_5">
			<view class="head_tit f_w_bold">
				时光真人密室逃脱
			</view>
			<view class="location dis_flex_between item_center">
				<view class="le">
					<view class="txt f_12">
						地址：莲池区军校街9号芭莎美发二楼（军校公园对面，五四东路与军校街交叉口南行100米）
					</view>
					<view class="des f_10 c_999999">距保定军校公园29m</view>
				</view>
				<view class="ri">
					电话
				</view>
			</view>
			<view class="time dis_flex_between item_center">
				<view class="f_13">营业时间：10:00-22:00</view>
				<image src="/static/huilife/arrow.png" mode=""></image>
			</view>
		</view>
		<!-- 商家会员 -->
		<view class="card">
			<view class="f_w_bold">商家会员卡</view>
			<view class="box">
				<view class="item border_5">
					<view class="t1 f_11 f_w_bold">会员卡名称</view>
					<view class="t2 f_9">会员卡详情</view>
					<view class="t3 f_11">￥19/次</view>
					<view class="tag text_center">卡</view>
				</view>
			</view>
		</view>
		
		<!-- 预定 -->
		<view class="reserve border_5">
			<view class="reserve_tit f_13 f_w_bold">团购</view>
			<!-- 床类展示 -->
			<view class="list">
				<view class="list_item dis_flex_between item_center"
					v-for="(item,indx) in [1,2] "
					:key="index"
					>
					<view class="list_item_le dis_flex_start item_start">
						<view class="img"></view>
						<view class="list_cont">
							<view class="f_12">套餐名称</view>
							<view style="margin-top: 18rpx;" class="f_9 c_6D7278">房间描述</view>
							<view class="f_9 c_6D7278">优惠描述</view>
							<view style="margin-top: 24rpx;">
								<text style="color: #FF3B30;margin-right: 10rpx;" class="f_11">￥37.5</text>
								<text class="f_9 c_999999" style="text-decoration: line-through;">￥300</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F9;
	}
</style>

<style lang="scss" scoped>
	.live{
		padding: 30rpx 22rpx 150rpx 18rpx;
		swiper{
			height: 320rpx;
			swiper-item{
				.swiper-item{
					height: 320rpx;
					background-color: #D8D8D8;
					border-radius: 30rpx;
				}
			}
		}
		.head{
			margin-top: 28rpx;
			background-color: #FFFFFF;
			.head_tit{
				padding: 24rpx 0rpx 24rpx 28rpx;
				border-bottom: 2rpx solid #F1F1F1;
			}
			.location{
				padding: 18rpx 14rpx 28rpx 28rpx;
				.le{
					.txt{
						width: 550rpx;
						margin-bottom: 12rpx;
					}
				}
				.ri{
					width: 97rpx;
					height: 78rpx;
					padding-left: 18rpx;
					border-left: 2rpx solid #F1F1F1;
				}
			}
			.time{
				padding: 28rpx;
				border-top: 2rpx solid #F1F1F1;
				image{
					width: 26rpx;
					height: 20rpx;
				}
			}
		}
		.card{
			margin-top: 14rpx;
			padding: 24rpx 0rpx 40rpx 28rpx;
			background-color: #FFFFFF;
			.box{
				margin-top: 32rpx;
				
				.item{
					position: relative;
					padding: 16rpx 0rpx 16rpx 20rpx;
					width: 280rpx;
					height: 162rpx;
					background: #FFEBCA;
					color: #492C16;
					.t2{
						margin-top: 12rpx;
					}
					.t3{
						margin-top: 26rpx;
					}
					.tag{
						color: white;
						position: absolute;
						right: 0rpx;
						top: 0rpx;
						width: 40rpx;
						line-height: 40rpx;
						background: linear-gradient(180deg, #E4CCA0 0%, #D1AB70 100%);
					}
				}
				
			}
		}
		.reserve{
			margin-top: 14rpx;
			background: #FFFFFF;
			padding: 24rpx 0rpx 0rpx 0rpx;
			.reserve_tit{
				margin-bottom: 24rpx;
				padding-left: 28rpx;
			}
			.list{
				padding-bottom: 40rpx;
				.list_item{
					padding: 12rpx 28rpx;
					border-bottom: 2rpx solid #E7ECF1;
					.list_item_le{
						.img{
							width: 142rpx;
							height: 142rpx;
							background: #F1F8FF;
							border-radius: 2rpx;
							margin-right: 22rpx;
						}
						.list_cont{
							
						}
					}
				}
				.list_item:last-child{
					border: none;
				}
			}
		}
	}
</style>
