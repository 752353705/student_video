<template>
	<view class="merchant">
		<!-- 当前商家的背景图 -->
		<view class="bg">
			<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg" mode=""></image>
		</view>
		
		<!-- 商家的信息以及菜品展示 -->
		<view class="merchant_msg_box">
			<view class="merchant_msg_msg">
				<!-- 商家名称，营业时间等 -->
				<view class="head">
					<text class="title">鱼兹娃味</text>
					<view class="time">
						<text class="icon iconfont iconshijian"></text>
						<text>营业时间：11:00~15:00、17:00~22:00</text>
					</view>
					<view class="location">
						<text class="icon iconfont icondidian"></text>
						<text>复兴中路仁达园南门西侧底商</text>
					</view>
					<!-- 当前店铺的商标 -->
					<view class="logo">
						<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg" mode=""></image>
					</view>
					<!-- 打电话的图标 -->
					<view class="phone">
						<text class="t-icon icondianhua"></text>
					</view>
					
				</view>
				<!-- 当前火热的套餐 -->
				<view class="list">
					<view class="li_head">
						<text class="icon t-icon iconcanyin" ></text>
						<text class="tit">到店套餐</text>
					</view>
					<!-- 列表展示 -->
					<view class="li_item" 
						v-for="(item,index) in [1,2,3] "
						:key="index"
						>
						<view class="le">
							<image src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg" mode=""></image>
						</view>
						<view class="ri">
							<view class="ri_tit">小锅套餐</view>
							<view class="desc">美蛙鱼2.5斤 3种配菜</view>
							<view class="price">
								<text class="now_price">￥128</text>
								<text class="del">￥168</text>
								<text class="discount">7.6折</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 商户相册 -->
				<view class="photo">
					<view class="photo_tit">
						<text class="icon t-icon iconxiangce"></text>
						<text>商户相册</text>
					</view>
				</view>
				<!-- 使用说明 -->
				<view class="use_msg">
					<view class="use_tit">
						<text class="icon t-icon iconshiyongbangzhu"></text>
						<text>使用说明</text>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 底部的获取优惠的按钮 -->
		<view class="btn">
			<view class="get_code">获取优惠码</view>
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
		background-color: #f1f5f8;
		
	}
</style>

<style scoped lang="scss">
	// 控制图标与 文字之间的距离
	.icon{
		margin-right: 20rpx;
	}
	.t-icon{
		width: 22px;
		height: 22px;
	}
	.merchant{
		// 当前商家的背景图
		.bg{
			width: 100%;
			height: 370rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		//商家的信息以及菜品展示
		.merchant_msg_box{
			position: relative;
			.merchant_msg_msg{
				padding-bottom: 187rpx;
				position: absolute;
				top: -132rpx;
				left: 20rpx;
				width: 93%;
				// 头部样式
				.head{
					position: relative;
					border-radius: 10rpx;
					box-sizing: border-box;
					padding-top: 24rpx;
					padding-left: 39rpx;
					padding-right: 39rpx;
					padding-bottom: 38rpx;
					background-color: #FFFFFF;
					.title{
						font-size: 50rpx;
					}
					.time{
						margin-top: 50rpx;
						margin-bottom: 20rpx;
						font-size: 27rpx;
						color: #575757;
					}
					.location{
						font-size: 27rpx;
						color: #575757;
					}
					// 当前店的 图标
					.logo{
						width: 200rpx;
						height: 200rpx;
						position: absolute;
						top: -83rpx;
						right: 55rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					// 打电话的图标
					.phone{
						position: absolute;
						bottom: 20rpx;
						right: 20rpx;
						.t-icon{
							width: 30px;
							height: 30px;
						}
					}
				}
				// 详情展示
				.list{
					border-radius: 10rpx;
					box-sizing: border-box;
					padding-top: 38rpx;
					padding-left: 39rpx;
					padding-right: 39rpx;
					padding-bottom: 38rpx;
					margin-top: 30rpx;
					background-color: #FFFFFF;
					.li_head{
						display: flex;
						align-items: center;
						justify-content: flex-start;
					}
					.li_item{
						margin-top: 33rpx;
						width: 100%;
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
						.le{
							width: 200rpx;
							height: 164rpx;
							margin-right: 20rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
						.ri{
							.ri_tit{
								font-size: 30rpx;
								margin-bottom: 10rpx;
							}
							.desc{
								font-size: 27rpx;
								color: #919191;
								margin-bottom: 6rpx;
							}
							.price{
								.now_price{
									font-size: 34rpx;
									color: #ff5239;
								}
								.del{
									margin:0 10rpx ;
									font-size: 20rpx;
									text-decoration:line-through;
									color: #aeaeae;
								}
								.discount{
									font-size: 20rpx;
									padding-top: 10rpx;
									padding-left: 10rpx;
									padding-right: 10rpx;
									padding-bottom: 10rpx;
									background-color: #fff3f3;
									color: #ea6159;
									border-radius: 10rpx;
								}
							}
						}
					}
				}
				// 商户相册
				.photo{
					box-sizing: border-box;
					padding-top: 38rpx;
					padding-left: 39rpx;
					padding-right: 39rpx;
					padding-bottom: 38rpx;
					margin-top: 20rpx;
					border-radius: 10rpx;
					width: 100%;
					height: 300rpx;
					background-color: white;
					.photo_tit{
						display: flex;
						align-items: center;
						justify-content: flex-start;
					}
				}
				// 使用说明
				.use_msg{
					box-sizing: border-box;
					padding-top: 38rpx;
					padding-left: 39rpx;
					padding-right: 39rpx;
					padding-bottom: 38rpx;
					margin-top: 20rpx;
					border-radius: 10rpx;
					width: 100%;
					height: 300rpx;
					background-color: white;
					.use_tit{
						display: flex;
						align-items: center;
						justify-content: flex-start;
					}
				}
			}
		}
		// 底部的回去优惠按钮
		.btn{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 140rpx;
			background-color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			.get_code{
				width: 90%;
				height: 96rpx;
				line-height: 96rpx;
				margin: auto;
				background-color: $bg-color;
				color: white;
				border-radius: 50rpx;
				text-align: center;
			}
		}
	}
	
	
</style>
