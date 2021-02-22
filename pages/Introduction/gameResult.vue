<template>
	<view class="game_result">
		<view class="head_bg">
			<!-- 榜单展示 -->
			<view class="head_tit">
				荣耀榜
				<image src="../../static/bang2.png" mode=""></image>
			</view>
			<!-- 展示获奖名单 -->
			<!-- 将前三名 进行单独显示 -->
			<view class="top_three">
					<!-- 第二名 -->
				<view class="item" >
					<!-- 选手头像 -->
					<view class="user_img">
						<image :src="rank[1].avatarUrl" mode=""></image>
					</view>
					<!-- 选手名次 -->
					<view class="rank_num">{{rank[1].rankingNumber || ''}}</view>
					<!-- 选手获取的票数 -->
					<view class="titcket_num">{{rank[1].goldNumber || '0' }}票</view>
					<!-- 选手的姓名 -->
					<view class="user_name">{{rank[1].userName || ''}}</view>
					<!-- 当这个用户为 第二名的时候 添加一个皇冠 -->
					<view class="logo">
						<image src="/static/second.png" mode=""></image>
					</view>
				</view>
				<!-- 第一名 -->
				<view class="item" >
					<!-- 选手头像 -->
					<view class="user_img">
						<image :src="rank[0].avatarUrl" mode=""></image>
					</view>
					<!-- 选手名次 -->
					<view class="rank_num">{{rank[0].rankingNumber || ''}}</view>
					<!-- 选手获取的票数 -->
					<view class="titcket_num">{{rank[0].goldNumber || '0'}}票</view>
					<!-- 选手的姓名 -->
					<view class="user_name">{{rank[0].userName || ''}}</view>
					<!-- 当这个用户为 第一名的时候 添加一个皇冠 -->
					<view class="logo">
						<image src="/static/first.png" mode=""></image>
					</view>
				<!-- 第三名 -->
				</view>
					<view class="item" >
					<!-- 选手头像 -->
					<view class="user_img">
						<image :src="rank[2].avatarUrl" mode=""></image>
					</view>
					<!-- 选手名次 -->
					<view class="rank_num">{{rank[2].rankingNumber || ''}}</view>
					<!-- 选手获取的票数 -->
					<view class="titcket_num">{{rank[2].goldNumber || '0'}}票</view>
					<!-- 选手的姓名 -->
					<view class="user_name">{{rank[2].userName || ''}}</view>
					<!-- 当这个用户为 第一名的时候 添加一个皇冠 -->
					<view class="logo">
						<image src="/static/third.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		 
		<!-- 其余的排行 -->
		<scroll-view class="other_rank"
			scroll-y="true"
			>
			<view class="other_rank_item"
				v-for="(item,index) in rank_other"
				:key="index"
				>
				<view class="le">
					<view class="rank_num">{{item.rankingNumber || ''}}</view>
					<view class="user_img">
						<image :src="item.avatarUrl" mode=""></image>
					</view>
					<view class="user_name">{{item.userName || ''}}</view>
				</view>
				<view class="ri">{{item.goldNumber || '0'}}票</view>
			</view>
		</scroll-view>
		
		<!-- 查看本次大赛的 作品 -->
		<view class="btm_btn" >
			<!-- 浏览作品 -->
			<view class="le" @click="goList">
				浏览作品
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rank:[],
				rank_other:'',
				subjectId:''
			}
		},
		onLoad(option) {
			this.subjectId = option.subjectId
			this.rank_other = this.rank.slice(3)
			this.getRankList(option.subjectId)
		},
		methods:{
			// 跳转到 大赛颁奖详情中
			goFlashTime(){
				console.log('大赛详情颁奖')
				uni.navigateTo({
					url:`/pages/Introduction/flashTime?subjectId=${this.subjectId}`
				})
			},
			// 跳转到大赛作品列表
			goList(){
				uni.navigateTo({
					url: `/pages/list/list?tab_act=2`
				});
			},
			// 获取当前排名信息
			getRankList(subjectId){
				this.http({
					url:`subject/ranking?subjectId=${subjectId}`,
					data:{},
				}).then(res => {
					this.rank = res
					this.rank_other = res.slice(3)
				})
			},
		}
	}
</script>

<style>
	page{
		background-image: linear-gradient(to bottom right,#ff8320,#fd7452);
		/* background-color: #ff8320; */
	}
</style>

<style lang="scss" scoped>
	swiper{
		height: 206px;
	}
	.game_result{
		padding-bottom: 100rpx;
		.head_bg{
			// 榜单名称
			color: white;
			.head_tit{
				
				color: #ffcc33;
				font-size: 46rpx;
				font-weight: bold;
				text-align: center;
				font-family: 'Times New Roman', Times, serif;
				line-height: 255rpx;
				height: 222rpx;

				image{
					width: 550rpx;
					height: 148rpx;
					position: absolute;
					left: 50%;
					top: 10rpx;
					transform: translateX(-50%);
					
				}
				
			}
			// 前三名排行
			.top_three{
				margin-top: 74rpx;
				display: flex;
				justify-content: space-evenly;
				align-items: flex-end;
				height: 295rpx;
				padding-bottom: 60rpx;
				.item{
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					align-items: center;
					position: relative;
					width: 30%;
					// overflow: hidden;
					
					.user_img{
						width: 104rpx;
						height: 104rpx;
						border-radius: 50%;
						overflow: hidden;
						-webkit-backface-visibility: hidden;
						-webkit-transform: translate3d(0, 0, 0);
						image{
							width: 100%;
							height: 100%;
						}
					}
					.rank_num{
						margin-top: 20rpx;
					}
					.titcket_num{
						color: #ffcc33;
						margin-top: 20rpx;
					}
					.user_name{
						margin-top: 20rpx;
					}
				}
				.item:nth-child(2) .user_img{
					width: 139rpx;
					height: 139rpx;
				}
				// 第一名图标
				.item:nth-child(2) .logo{
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: -59rpx;
					image{
						width: 110rpx;
						height: 92rpx;
					}
				}
				// 第二名
				.item:nth-child(1) .logo{
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: -54rpx;
					image{
						width: 97rpx;
						height: 76rpx;
					}
				}
				// 第三名
				.item:nth-child(3) .logo{
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: -43rpx;
					image{
						width: 97rpx;
						height: 61rpx;
					}
				}
			}
		}
		// 其余排行
		.other_rank{
			height: 500rpx;
			border-radius: 37rpx;
			background-color: white;
			padding-bottom: 40rpx;
			width: 95%;
			margin: auto;
			.other_rank_item{
				box-sizing: border-box;
				padding-left:49rpx ;
				padding-right:49rpx ;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				.le{
					display: flex;
					justify-content: center;
					align-items: center;
					.rank_num{
						margin-right: 40rpx;
						display: inline-block;
						width: 45rpx;
						text-align: center;
					}
					.user_img{
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						overflow: hidden;
						-webkit-backface-visibility: hidden;
						-webkit-transform: translate3d(0, 0, 0);
						image{
							width: 100%;
							height: 100%;
						}
					}
					.user_name{
						margin-left: 40rpx;
					}
				}
				.ri{
					color: #fd9643;
				}
			}
		}
		// 浏览大赛作品
		.btm_btn{
			position: fixed;
			bottom: 0;
			left: 0;
			line-height: 101rpx;
			text-align: center;
			background-color: #fd9643;
			color: white;
			font-size: 40rpx;
			right: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			// .le{
			// 	width: 40%;
			// 	height: 60rpx;
			// 	border-right: 1rpx solid white;
			// 	line-height: 60rpx;
			// }
			// .ri{
			// 	width: 40%;
			// }
		}
	}
</style>
