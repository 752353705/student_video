<template>
	<view class="uni-popup-rank">
		<view class="uni-rank-title">
			<text class="uni-rank-title-text">{{ title }}</text>
		</view>
		
		<scroll-view scroll-y="true" enable-flex="true" class="cont">
			<view v-if="giftRank.length == 0" 
				style="text-align: center;color: #999999;"
				>
				—— 快来抢榜吧 ~ ——
			</view>
			<view  v-else class="item" v-for="(item,index) in giftRank" :key="index">
				<view class="le">
					<view class="rank">
						<view v-if="index == 0" class="t-icon iconicon_huangguandiyi"></view>
						<view v-if="index == 1" class="t-icon icondier"></view>
						<view v-if="index == 2" class="t-icon icondisanming"></view>
						<view v-if="index > 2" >{{index+1}}</view>
					</view>
					<view class="img">
						<image :src="item.avatarUrl" mode=""></image>
					</view>
					<text class="name">{{item.userName}}</text>
				</view>
				<view class="ri">
					{{item.goldNumber}}
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		name: 'UniPopupRank',
		props: {
			title: {
				type: String,
				default: '分享到'
			},
			articleId:{
				type:Number
			}
		},
		data(){
			return {
				giftRank:[]
			}
		},
		created() {
			setTimeout(()=>{
				console.log('articleId',this.articleId)
				this.getUserGift(this.articleId)
			},0)
		},
		methods:{
			// 获取用户刷礼物的记录
			getUserGift(articleId){
				this.api._get(`gift/article/user/gift/${articleId}`,{},(res)=>{
					console.log('获取刷礼物 res',res)
					this.giftRank = res.data
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	
	
	.uni-popup-rank {
		overflow: auto;
		height: 706rpx;
		background-color: white;
		position: relative;
		background-color: white;
		color: black;
		border-radius: 20rpx 20rpx 0 0;
		.uni-rank-title {
			position: fixed;
			top: 0;
			left: 0;
			height: 40px;
			width: 100%;
			background-color: white;
			text-align: center;
			line-height: 40px;
			border-radius:20rpx 20rpx 0 0 ;
			overflow: hidden;
			z-index: 20;
			// /* #ifndef APP-NVUE */
			// display: flex;
			// /* #endif */
			// flex-direction: row;
			// align-items: center;
			// justify-content: center;
			.uni-rank-title-text {
				font-size: 40rpx;
				font-weight: bolder;
				// color: #666;
			}
		}
		.cont{
			height: 697rpx;
			box-sizing: border-box;
			padding-left: 34rpx;
			padding-right: 34rpx;
			padding-top: 50px;
			.item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				.le{
					display: flex;
					align-items: center;
					// 排行
					.rank{
						width: 92rpx;
						height: 74rpx;
						// background-color: red;
						text-align: center;
						margin-right: 21rpx;
					}
					
					// .num{
					// 	margin-right: 21rpx;
					// }
					.img{
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						overflow: hidden;
						// background-color: red;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.name{
						margin-left: 34rpx;
						font-size: 30rpx;
						font-weight: bold;
					}
				}
			}
		}
	}

	.iconicon_huangguandiyi{
		width: 38px;
		height: 29px;
	}
	.icondier{
		width: 30px;
		height: 29px;
	}
	.icondisanming{
		width: 30px;
		height: 29px;
	}
</style>
