<template>
	<view class="mall">
		<view class="head_box">
			<!-- 分类导航 -->
			<view class="classification dis_flex_center item_center f_13">
				<view class="classification_item dis_flex_start item_center" v-for="(item, index) in head_list" :key="index" :class="index == act ? 'act' : ''" @click="changeAct(index)">
					<view class="txt">{{ item }}</view>
					<!-- 点击态底部 -->
					<view v-if="index == act" class="btm_border"></view>
				</view>
			</view>
		</view>
		<!-- 订单主体 -->
		<view class="main box_size" v-if="listData">
			<view class="item"
				v-for="(item,index) in [1,2,3,4] "
				:key="index"
				>
				<view class="item_head dis_flex_start item_start">
					<view class="item_head_le">
						
					</view>
					<view class="item_head_ri">
						<view class="item_head_ri_head dis_flex_between">
							<view class="item_head_ri_head_le f_13">
								商品名称
							</view>
							<view class="item_head_ri_head_ri f_12">
								订单配送
							</view>
						</view>
						<!-- 产品描述 介绍 -->
						<view class="goods_des dis_flex_between">
							<view class="c_6D7278 f_10 describe">
								商品描述 相关介绍
							</view>
							<view class="f_9 c_6D7278">
								x1
							</view>
						</view>
						<!-- 价格 -->
						<view class="f_14 price">
							￥378
						</view>
						<!-- 总价，实付款 -->
						<view class="sum_price text_right">
							<text class="f_11 c_6D7278">总价：</text>
							<text style="font-weight: 500;" class="c_6D7278 f_17">￥395</text>
							<text class="f_11 ">实付款：</text>
							<text style="font-weight: 400;" class="c_FF3B30 f_17">￥378</text>
						</view>
						<!-- 查看物流，确认收货 -->
						<view class="wuliu dis_flex_end item_center">
							<view class="wuliu_li f_11 text_center">
								查看物流
							</view>
							<view class="wuliu_ri f_11 text_center">
								确认收货
							</view>
						</view>
						
					</view>
				</view>
				<view class="item_btm">
					
				</view>
			</view>
		</view>
		<!-- 没有订单 -->
		<view class="no_order text_center" v-else>
			<image src="/static/dingdan.png" mode=""></image>
			<view style="margin-top: 16rpx;" class="c_6D7278 f_14">您还没有相关订单</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 头部分类
			head_list: ['全部', '待付款', '待发货', '待收货', '待评价'],
			act: 0,
			// 控制是否有数据
			listData:true,
		};
	},
	methods: {
		// 头部切换类型
		changeAct(index) {
			this.act = index;
		}
	}
};
</script>

<style>
page {
	background: #F5F5F9;
}
</style>

<style lang="scss">
image {
	width: 100%;
	height: 100%;
}
.mall {
	padding-bottom: 60rpx;
	.head_box {
		background-color: #ffffff;
		position: sticky;
		top: 0rpx;
		z-index: 10;
		.classification {
			background-color: #ffffff;
			width: 100%;
			padding-bottom: 12rpx;
			.classification_item {
				color: #6d7278;
				box-sizing: border-box;
				position: relative;
				border-left: 1rpx solid #e7ecf1;
				flex-direction: column;
				padding: 0rpx 20rpx;
				width: 150rpx;
				&.act {
					color: #358d4d;
				}
				.fri_img {
					width: 4rpx;
					height: 28rpx;
				}
				.btm_border {
					width: 78rpx;
					height: 5rpx;
					background-color: #358d4d;
					margin-top: 8rpx;
					position: absolute;
					bottom: -11rpx;
					left: 50%;
					transform: translateX(-50%);
				}
			}
			.classification_item:nth-child(1) {
				border-right: 1rpx solid #e7ecf1;
				padding-right: 20rpx;
			}
			.classification_item:nth-child(1) .fri_img {
				margin-left: 20rpx;
			}
			.classification_item:nth-child(1) .btm_border {
				width: 28rpx;
			}
			.classification_item:nth-child(2) {
				border: none;
			}
		}
	}
	.main{
		padding: 0rpx 20rpx 0rpx;
		.item{
			margin-top: 14rpx;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			padding: 24rpx 14rpx 14rpx 22rpx;
			.item_head{
				.item_head_le{
					width: 174rpx;
					height: 174rpx;
					background-color: #F1F8FF;
					border-radius: 4rpx;
					margin-right: 26rpx;
				}
				.item_head_ri{
					width: 488rpx;
					.item_head_ri_head{
						.item_head_ri_head_ri{
							color: #2DA450;
						}
					}
					.goods_des{
						.describe{
							font-weight: 400;
						}
					}
					.price{
						font-weight: 400;
					}
					.sum_price{
						
					}
					.wuliu{
						margin-top: 42rpx;
						.wuliu_li{
							width: 134rpx;
							line-height: 40rpx;
							border-radius: 22rpx;
							border: 2rpx solid #3CAA5D;
							color: #000000;
						}
						.wuliu_ri{
							width: 134rpx;
							line-height: 40rpx;
							border-radius: 22rpx;
							border: 2rpx solid #3CAA5D;
							color: #3CAA5D;
							margin-left: 20rpx;
						}
					}
				}
			}
		}
	}
	.no_order{
		position: absolute;
		top: 38%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 224rpx;
		white-space: 224rpx;
		image{
			width: 182rpx;
			height: 172rpx;
		}
	}
}
</style>
