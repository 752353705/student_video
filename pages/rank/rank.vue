<template>
	<view class="rank">
		<view class="cont">
			<view v-if="rankList.length == 0" 
				style="text-align: center;color: #999999;"
				>
				—— 快来抢榜吧 ~ ——
			</view>
			<view v-else class="item" v-for="(item,index) in rankList" :key="index">
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankList:[]
			};
		},
		onLoad(option) {
			this.getUserGift(option.articleId)
		},
		methods:{
			// 获取用户刷礼物的记录
			getUserGift(articleId){
				this.api._get(`gift/article/user/gift/${articleId}`,{},(res)=>{
					console.log('获取刷礼物 res',res)
					this.rankList = res.data
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.rank{
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		padding-right: 20rpx;
		margin-top: 20rpx;
		.cont{
			box-sizing: border-box;
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
						text-align: center;
						margin-right: 21rpx;
					}
					.img{
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						overflow: hidden;
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
	}
	
</style>
