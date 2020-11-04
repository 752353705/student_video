<template>
	<view class="game_detail">
		<!-- 当前比赛的 图片简介 -->
		<swiper :indicator-dots="false" :autoplay="true"
			:interval="3000" :duration="1000" :circular="true"
			>
			<swiper-item>
				<image 
					style="width: 100%;height: 100%;"
					:src="game_detail.image"
					mode="widthFix"
					></image>
			</swiper-item>
		</swiper>
		
		<!-- tab切换 -->
		<view class="tab">
			<view class="item" :class=" tab_act == index ? 'act' : '' "
				v-for="(item,index) in tab_msg"
				:key="index"
				@click="tabAct(index)"
				>
				{{item}}
			</view>
		</view>
		
		<!-- 详情 -->
		<block v-if="tab_act === 0">
			<!-- 赛事的基本信息 -->
			<view class="game_detail">
				<view class="tit">基本信息</view>
				<!-- 地点 -->
				<view class="location boder_btm">
					<view class="le">
						<text style="color: #2ca4e1;margin-right: 10rpx;" class="icon iconfont icondidian"></text>
						<text>地点</text>
					</view>
					<view class="ri">
						<view class="ri_l">
							<view class="host">{{game_detail.subjectAddress}}</view>
						</view>
						<view class="iconfont iconfanhui"></view>
					</view>
				</view>
				<!-- 时间 -->
				<view class="time boder_btm">
					<view class="le">
						<text style="color: #2ca4e1;margin-right: 10rpx;" class="icon iconfont iconshijian"></text>
						<text>时间</text>
					</view>
					<view class="">{{game_detail.beginTime}}</view>
				</view>
				<!-- 主办方 -->
				<view class="host boder_btm">
					<view class="le">
						<text style="color: #2ca4e1;margin-right: 10rpx;" class="icon iconfont iconlouceng"></text>
						<text>主办方</text>
					</view>
					<view style="width: 60%;word-break: break-all;text-align: center;">{{game_detail.subjectSponsorName}}</view>
				</view>
			</view>
			<!-- 参赛选手 -->
			<view class="game_player" @click="tabAct(1)" v-if="game_user.length !== 0">
				<view class="tit">
					<view class="le">参赛选手</view>
					<view class="ri">
						<text>{{game_user.length}}</text>
						<text class="iconfont iconfanhui"></text>
					</view>
				</view>
				<view class="player_img">
					<image v-for="(item,index) in game_user_part" :key="item.userId"
						:src="item.avatarUrl" mode=""
						>
					</image>
					<!-- 当参赛选手人数大于  5 时，显示省略号 -->
					<text v-if="game_user.length > 5" >...</text>
				</view>
			</view>

			<!-- 当前大赛的简介 -->
			<view class="Introduction">
				<view class="tit">比赛简介</view>
				<!-- 奖品 -->
				<view class="prize">
					<!-- 后端传递的富文本内容 -->
					<rich-text :nodes="game_detail.subjectContent"
						space="ensp"
						>
					</rich-text>
				</view>
			</view>
		</block>
		
		<!-- 参赛人员 -->
		<block  v-if="game_user.length !== 0 && tab_act !== 0" >
			<view class="user">
				<view class="head">
					<view class="tit">参赛选手</view>
					<view class="user_num">{{game_user.length}}</view>
				</view>
				<view class="item" 
					v-for="(item,index) in game_user "
					:key="item.userId"
					>
					<view class="img">
						<image :src="item.avatarUrl" mode=""></image>
					</view>
					<view class="name">{{item.nickName}}</view>
				</view>
			</view>
		</block>
		<view v-if="game_user.length == 0 && tab_act !== 0" class="">
			<view style="text-align: center;margin-top: 40rpx;color: white;">—— 暂无参赛人员 ——</view>
		</view>
		
		
		<!-- 报名按钮 v-if="hasBtn" -->
		<view class="btn" @click="jumpList" >
			立即报名
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				tab_act:0,
				// 大赛详情
				game_detail:'',
				// 当前大赛的参赛人员
				game_user:[],
				// 展示一部分大赛参赛人员
				game_user_part:[],
				
				tab_msg:['详情','参赛选手'],
				hasBtn:false,
			}
		},
		onLoad(option) {
			// 获取是否显示立即报名按钮
			this.btnStyle()
			
			// 获取大赛的详情
			this.getGameDetail(option.subjectId)
			// 获取大赛的参赛人员
			this.getGamePlayers(option.subjectId)
		},
		methods:{
			// 获取是否显示报名按钮
			btnStyle(){
				this.api._get(`parame/config/uploadArticle`,{},(res)=>{
					console.log('res 报名按钮',res)
					if(res.data.parameStatus == 1){
						this.hasBtn = true
					}else{
						this.hasBtn = false
					}
				})
			},
			
			// 获取大赛详情
			getGameDetail(subjectId){
				this.api._get(`subject/${subjectId}`,{},(res) => {
					// console.log('获取大赛详情',res)
					this.game_detail = res.data
					uni.setNavigationBarTitle({
						title:this.game_detail.subjectTitle
					})
				})
			},
			
			// 获取参赛人员
			getGamePlayers(subjectId){
				this.api._get(`subject/players/${subjectId}`,{},(res) => {
					// 参加大赛的全部人员
					this.game_user = res.data
					// 当参赛人数大于 4 的时候 进行截取显示一部分
					if(this.game_user.length > 5){
						this.game_user_part = res.data.slice(0,5)
					}else {
						this.game_user_part = res.data
					}
				})
			},
			// 当前激活选中的 tab
			tabAct(index){
				if(index == this.tab_act) return ;
				this.tab_act = index
			},
			// 进行报名，跳转到 上传作品页面
			jumpList(){
				// 将该赛事进行储存
				let gameMsg = {
					subjectId:this.game_detail.subjectId,
					logo:this.game_detail.logoUrl,
					subjectTitle:this.game_detail.subjectTitle,
					introduction:this.game_detail.introduction,
				}
				uni.setStorageSync('gameMsg',JSON.stringify(gameMsg))
				
				uni.switchTab({
					url:'/pages/publish/publishNotice'
				})
				
				// uni.navigateTo({
				// 	url:'/pages/publish/publishNotice'
				// })
				
			},
		}
	}
</script>

<style>
	page{
		background-color: #0a121b;
	}
</style>

<style scoped lang="scss">
	// 设置灰色边框
	.boder{
		width: 10rpx;
		height: 20rpx;
		background-color: #aaaaaa;
		margin-right: 10rpx;
	}
	// 参赛人员
	.user{
		width: 92%;
		box-sizing: border-box;
		padding: 20rpx 44rpx 0 44rpx;
		margin: 30rpx auto;
		background-color: white;
		border-radius: 30rpx;
		color: black;
		.head{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
			.tit{
				font-size: 30rpx;
				font-weight: bold;
			}
			.user_num{
				color: #999999;
			}
		}
		.item{
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #d9d9d9;
			margin-bottom: 30rpx;
			padding-bottom: 30rpx;
			.img{
				width: 65rpx;
				height: 65rpx;
				background-color: red;
				border-radius: 50%;
				margin-right: 30rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.name{
				
			}
		}
		.item:last-child{
			border: none;
		}
	}
	// 大赛详情
	.game_detail{
		color: white;
		padding-bottom: 113rpx;
		swiper{
			height: 423rpx;
			swiper-item {
				position: relative;
				image {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 100%;
				}
			}
		}
		.tab{
			position: sticky;
			top: 0rpx;
			left: 0;
			z-index: 20;
			background-image: linear-gradient(to bottom,#42557d,#13458a);
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.item{
				padding-bottom: 18rpx;
				&.act{
					border-bottom: 1rpx solid #419aba;
				}
			}
		}
		// 赛事基本信息
		.game_detail{
			width: 92%;
			margin: 46rpx auto;
			border-radius: 30rpx;
			background-color: white;
			color: black;
			box-sizing: border-box;
			padding-left: 40rpx;
			padding-top: 20rpx;
			padding-bottom: 40rpx;
			padding-right: 20rpx;
			.tit{
				font-size: 36rpx;
				font-weight: bold;
			}
			// 下边框线
			.boder_btm{
				border-bottom: 1rpx solid #d9d9d9;
				padding-top: 20rpx;
				padding-bottom: 20rpx;
			}
			.boder_btm:last-child{
				border: none;
			}
			.location{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.le{
					.icon{
						
					}
				}
				.ri{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					width: 80%;
					.ri_l{
						.host{
							font-size: 31rpx;
							font-weight: bold;
						}
						.loca{
							color: #aaaaaa;
							font-size: 20rpx;
						}
					}
				}
			}
			.time{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.host{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		// 参赛选手
		.game_player{
			width: 92%;
			margin: 46rpx auto;
			background-color: white;
			color: black;
			border-radius: 30rpx;
			box-sizing: border-box;
			padding-left: 40rpx;
			padding-top: 20rpx;
			padding-bottom: 40rpx;
			padding-right: 20rpx;
			.tit{
				display: flex;
				justify-content: space-between;
				margin-bottom: 37rpx;
				.le{
					font-size: 36rpx;
					font-weight: bold;
				}
			}
			.player_img{
				width: 100%;
				height: 100%;
				margin-right: 20rpx;
				image{
					margin-right: 30rpx;
					width: 80rpx;
					height: 80rpx;
				}
			}
		}
		// 流程进度
		// .game_progress{
		// 	width: 92%;
		// 	// height: 316rpx;
		// 	margin: 46rpx auto;
		// 	background-color: white;
		// 	color: black;
		// 	border-radius: 30rpx;
		// 	box-sizing: border-box;
		// 	padding-left: 40rpx;
		// 	padding-top: 20rpx;
		// 	padding-bottom: 40rpx;
		// 	padding-right: 20rpx;
		// 	.tit{
		// 		font-size: 36rpx;
		// 		font-weight: bold;
		// 		margin-bottom: 37rpx;

		// 	}
		// 	.item{
		// 		display: flex;
		// 		justify-content: space-between;
		// 		align-items: center;
		// 		border-bottom: 1rpx solid #d9d9d9;
		// 		padding-top: 20rpx;
		// 		padding-bottom: 20rpx;
		// 		.le{
		// 			display: flex;
		// 			align-items: center;
		// 			.num{
		// 				width: 40rpx;
		// 				height: 40rpx;
		// 				border-radius: 50%;
		// 				text-align: center;
		// 				line-height: 40rpx;
		// 				background-color: #0062CC;
		// 				color: white;
		// 				margin-right: 10rpx;
		// 			}
		// 		}
				
		// 	}
		// 	.item:last-child{
		// 		border: none;
		// 	}
		// }
		// 比赛简介
		.Introduction{
			width: 92%;
			margin: 46rpx auto;
			background-color: #ffffff;
			color: black;
			border-radius: 30rpx;
			box-sizing: border-box;
			padding: 20rpx 20rpx 40rpx 40rpx;
			// padding-left: 40rpx;
			// padding-top: 20rpx;
			// padding-bottom: 40rpx;
			// padding-right: 20rpx;
			.tit{
				font-size: 36rpx;
				font-weight: bold;
				margin-bottom: 37rpx;

			}
			// 赛制
			.format{
				margin-bottom: 20rpx;
				.head{
					display: flex;
					align-items: center;
					color: #aaaaaa;
					margin-bottom: 10rpx;
				}
				.desc{
					font-size: 31rpx;
				}
			}
			// 费用
			.cost{
				margin-bottom: 20rpx;
				.head{
					display: flex;
					align-items: center;
					color: #aaaaaa;
					margin-bottom: 10rpx;
				}
				.desc{
					font-size: 41rpx;
				}
			}
			// 奖品
			.prize{
				margin-bottom: 20rpx;
				.head{
					display: flex;
					align-items: center;
					color: #aaaaaa;
					margin-bottom: 10rpx;
				}
				.desc{
					font-size: 31rpx;
				}
			}
			// 联系方式
			.contact{
				margin-bottom: 20rpx;
				.head{
					display: flex;
					align-items: center;
					color: #aaaaaa;
					margin-bottom: 10rpx;
				}
				.desc{
					font-size: 31rpx;
				}
			}
			// 备注
			.note{
				margin-bottom: 20rpx;
				.head{
					display: flex;
					align-items: center;
					color: #aaaaaa;
					margin-bottom: 10rpx;
				}
				.desc{
					font-size: 31rpx;
				}
			}
		}
		.btn{
			width: 100%;
			line-height: 110rpx;
			color: white;
			font-size: 39rpx;
			text-align: center;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #336699;
			z-index: 20;
		}
	}
</style>
