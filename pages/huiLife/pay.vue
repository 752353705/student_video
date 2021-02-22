<template>
	<view class="pay">
		<view class="time text_center f_12 c_999999">支付剩余时间 09:49</view>
		<view class="money text_center">
			￥<text class="f_24 f_w_bold">20.00</text>
		</view>
		<view class="text_center des f_12 c_999999">购买商品-19831421905</view>
		<!-- 支付方式 -->
		<view class="methods">
			<radio-group @change="radioChange">
				<label class="dis_flex_start item_center">
					<image class="le img" src="/static/wei.png" mode=""></image>
					<view class="ri dis_flex_between item_center">
						<view class="name">微信支付</view>
						<radio value="cb" checked="true" />
					</view>
				</label>
				<!-- <label class="dis_flex_start item_center">
						
					<view class="ri dis_flex_between item_center">
						<view class="name">支付宝支付</view>
						<radio value="cb" checked="true" />
					</view>
				</label> -->
				<!-- <view class="more f_12 c_999999">
					展开更多支付方式
				</view> -->
			</radio-group>
		</view>
		<!-- 确定支付 -->
		<view class="btm text_center f_16">
			确认支付
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.pay{
		.time{
			margin-top: 80rpx;
		}
		.money{
			margin-top: 14rpx;
		}
		.des{
			margin-top: 20rpx;
		}
		.methods{
			padding: 80rpx 0rpx 26rpx 82rpx;
			.le{
				width: 48rpx;
				height: 48rpx;
			}
			.ri{
				width: 528rpx;
				margin-left: 18rpx;
				padding: 40rpx 0rpx;
				border-bottom: 1rpx solid #F4F4F4;
			}
			.more{
				padding-left: 66rpx;
				margin-top: 20rpx;
			}
		}
		.btm{
			width: 706rpx;
			line-height: 84rpx;
			background: #29A04C;
			border-radius: 12rpx;
			color: white;
			position: fixed;
			left: 50%;
			bottom: 138rpx;
			transform: translateX(-50%);
		}
		
	}
</style>
