<template>
	<view class="game_tmp">
		<swiper class="swiper" :indicator-dots="false" :autoplay="true"
			:interval="3000" :duration="1000" :circular="true"
			>
			<swiper-item class="swiper-item" 
				>
				<image
					style="width: 100%;height: 100%;"
					src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg" 
					mode="widthFix"
					>
				</image>
			</swiper-item>
		</swiper>
		
		<!-- 大赛主体展示 -->
		<view class="game_main">
			<!-- 大赛标题以及参赛显示 -->
			<view class="game_head">
				<view class="game_head_tit">
					小驴邦插画大赛
				</view>
				<view class="game_head_body">
					<view class="item">
						<view class="item_contestant">4</view>
						<view class="item_txt">参赛选手</view>
					</view>
					<view class="item">
						<view class="item_contestant">600</view>
						<view class="item_txt">总投票数</view>
					</view>
					<view class="item">
						<view class="item_contestant">500</view>
						<view class="item_txt">总访问数</view>
					</view>
				</view>
			</view>
			<!-- 大赛开启的时间 -->
			<view class="game_start_time">
				<view class="title">
					距离活动开始还有
				</view>
				<view class="time">
					<text class="start_time">3</text>
					天
					<text class="start_time">3</text>
					时
					<text class="start_time">3</text>
					分
					<!-- <text class="start_time">3</text>
					秒 -->
				</view>
				<view class="see_game_detail">
					点击查看活动详情
				</view>
			</view>
			<!-- 投票榜 -->
			<view class="ticket_list">
				<image src="/static/rankBg.png" mode=""></image>
				<view class="ticket_txt">投票风云榜</view>
			</view>
		</view>
		
		<!-- tab 编号排名以及人气排名 -->
		<view class="type_tab">
			<view class="tab_item" 
				v-for="(item,index) in tab_head "
				:key="index"
				@click="tabChange(index)"
				>
				<view class="tab_item_txt">{{item.tab_item_txt}}</view>
				<view 
					:class="tab_act == index ? 'tab_item_bg' : '' "
					>
				</view>
			</view>
		</view>
		
		<!-- 展示参赛人员 -->
		<!-- 按照编号进行展示 -->
		<view v-if="tab_act === 0" class="user_list">
			<view class="user_list_item"
				v-for="(item,index) in code_rank"
				:key="index"
				>
				<view class="user_img">
					<!-- mode="widthFix" -->
					<image 
						:src="item.user_img" 
						
						>
					</image>
				</view>
				<view class="user_name">
					{{item.name}}
				</view>
				<view class="user_foot">
					<view class="sentiment">{{item.sentiment}}人气</view>
					<view class="ticket">投票</view>
				</view>
				<!-- 编号 -->
				<view class="user_code">
					{{item.code}}
				</view>
				
			</view>
		</view>
		
		<!-- 按照人气排名进行展示 -->
		<view v-else class="user_list">
			<view class="user_list_item"
				v-for="(item,index) in sentiment_rank "
				:key="index"
				>
				<view class="user_img">
					<image 
						:src="item.user_img" 
						>
					</image>
				</view>
				<view class="user_name">
					{{item.name}}
				</view>
				<view class="user_foot">
					<view class="sentiment">{{item.sentiment}}人气</view>
					<view class="ticket">投票</view>
				</view>
				<!-- 编号 -->
				<view class="user_code">
					{{item.code}}
				</view>
			</view>
		</view>
		
		<!-- 底部按钮制作活动 -->
		<view class="btm_btn" @click="jumpCreateGame">
			立即创建大赛
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				// tab切换 头部
				tab_head:[
					{
						tab_item_txt:'编号排名',
					},
					{
						tab_item_txt:'人气排名',
					}
				],
				// 编号排名
				code_rank:[
					{
						code:'编号:1',
						name:'耿秋',
						user_img:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3922492015,1260666100&fm=26&gp=0.jpg',
						sentiment:'112'
					},
					{
						code:'编号:2',
						name:'匡颖洁',
						user_img:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3418095326,1749745681&fm=26&gp=0.jpg',
						sentiment:'98'
					},
					{
						code:'编号:3',
						name:'宁溪',
						user_img:'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3749508727,409229377&fm=26&gp=0.jpg',
						sentiment:'168'
					},
					{
						code:'编号:4',
						name:'潘燕丽',
						user_img:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2953747674,2368913723&fm=26&gp=0.jpg',
						sentiment:'135'
					},
				],
				// 人气排名
				sentiment_rank:[
					{
						code:'编号:3',
						name:'宁溪',
						user_img:'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3749508727,409229377&fm=26&gp=0.jpg',
						sentiment:'168'
					},
					{
						code:'编号:4',
						name:'潘燕丽',
						user_img:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2953747674,2368913723&fm=26&gp=0.jpg',
						sentiment:'135'
					},
					{
						code:'编号:1',
						name:'耿秋',
						user_img:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3922492015,1260666100&fm=26&gp=0.jpg',
						sentiment:'112'
					},
					{
						code:'编号:2',
						name:'匡颖洁',
						user_img:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3418095326,1749745681&fm=26&gp=0.jpg',
						sentiment:'98'
					},
				],
				
				
				// 当前激活的tab
				tab_act:0,
			}
		},
		methods:{
			jumpCreateGame(){
				uni.navigateTo({
					url:'/pages/creatGame/creatGame'
				})
			},
			// 进行tab切换
			tabChange(index){
				this.tab_act = index
			}
		}
	}
</script>

<style>
	page{
		background-color: #ddf1e1;
	}
</style>

<style lang="scss" scoped >
	.game_tmp{
		// 大赛的主题图
		padding-bottom: 130rpx;
		.swiper{
			height: 423rpx;
			.swiper-item {
				// background-color: red;
				height: 100%;
				position: relative;
				image {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 100%;
				}
			}
		}
		// 大赛的主体内容
		.game_main{
			box-sizing: border-box;
			padding-top: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 30rpx;
			padding-left: 30rpx;
			// 大赛标题
			.game_head{
				width: 100%;
				background-color: white;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding-top: 30rpx;
				padding-right: 30rpx;
				padding-bottom: 30rpx;
				padding-left: 30rpx;
				margin-bottom: 30rpx;
				.game_head_tit{
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 20rpx;
				}
				.game_head_body{
					background-color: #fff0bd;
					border-radius: 20rpx;
					padding-top: 30rpx;
					padding-right: 30rpx;
					padding-bottom: 30rpx;
					padding-left: 30rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					.item{
						.item_contestant{
							text-align: center;
							font-size: 54rpx;
							font-weight: bolder;
							color: #ff8800;
						}
						.item_txt{
							font-size: 27rpx;
							text-align: center;
						}
					}
				}
			}
			// 大赛开启时间
			.game_start_time{
				background-color: white;
				border-radius: 20rpx;
				padding-top: 30rpx;
				padding-right: 30rpx;
				padding-bottom: 30rpx;
				padding-left: 30rpx;
				position: relative;
				margin-bottom: 30rpx;
				.title{
					font-size: 36rpx;
					text-align: center;
					margin-bottom: 30rpx;
					font-weight: bolder;
				}
				.time{
					text-align: center;
					font-size: 40rpx;
					margin-bottom: 30rpx;
					// 倒计时样式
					.start_time{
						font-size: 50rpx;
						font-weight: bolder;
						color: white;
						background-color: #ffb700;
						padding-top: 13rpx;
						padding-right: 29rpx;
						padding-bottom: 13rpx;
						padding-left: 29rpx;
						margin-right: 10rpx;
						border-radius: 20rpx;
						margin-left: 10rpx;

					}
					
				}
				.see_game_detail{
					background-color: #ffcc00;
					border-radius: 20rpx;
					color: black;
					text-align: center;
					width: 80%;
					margin: auto;
					line-height: 75rpx;
				}
			}
			// 投票榜
			.ticket_list{
				position: relative;
				height: 100rpx;
				image{
					display: inline-block;
					width: 70%;
					height: 100rpx;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
				}
				.ticket_txt{
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					color: #cb7022;
					font-weight: bold;
				}
			}
		}
		// tab 类型进行分类
		.type_tab{
			display: flex;
			justify-content: space-around;
			align-items: center;
			background-color: white;
			margin-top: 30rpx;
			padding-top: 20rpx;
			.tab_item{
				width: 40%;
				color: #349149;
				text-align: center;
				height: 75rpx;
				position: relative;
				font-size: 40rpx;
				font-weight: bolder;
				.tab_item_bg{
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 124rpx;
					height: 6rpx;
					background-color: #ff7f4d;
				}
			}
		}
		// 参赛人员展示
		.user_list{
			box-sizing: border-box;
			padding-top: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 30rpx;
			padding-left: 30rpx;
			margin-top: 30rpx;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-wrap: wrap;
			.user_list_item{
				width: 47%;
				height: 382rpx;
				box-sizing: border-box;
				position: relative;
				// padding-top: 30rpx;
				// padding-right: 30rpx;
				// padding-bottom: 30rpx;
				// padding-left: 30rpx;
				background-color: white;
				border-radius: 30rpx;
				overflow: hidden;
				margin-bottom: 35rpx;
				.user_img{
					image{
						width: 100%;
						height: 254rpx;
					}
				}
				// 姓名
				.user_name{
					padding-left: 30rpx;
				}
				// 底部人气和投票
				.user_foot{
					padding-left: 30rpx;
					padding-right: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.sentiment{
						font-size: 30rpx;
						color: #ffa947;
					}
					.ticket{
						// padding-top: 30rpx;
						// padding-right: 30rpx;
						// padding-bottom: 30rpx;
						// padding-left: 30rpx;
						padding: 11rpx;
						color: white;
						background-color: #ff983d;
						border-radius: 20rpx;
					}
				}
				.user_code{
					padding-top: 10rpx;
					padding-right: 10rpx;
					padding-bottom: 10rpx;
					padding-left: 10rpx;
					position: absolute;
					top: 0;
					left: 0;
					background-color: #969797;
					opacity: 0.7;
					color: white;
					border-radius: 0 0 10rpx 0;
				}
			}
			.user_list_item:nth-child(2n){
				margin-left: 35rpx;
			}
		}
		// 底部按钮制作活动
		.btm_btn{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 100rpx;
			background-color: #ff8b02;
			color: white;
			text-align: center;
			font-size: 46rpx;
			line-height: 100rpx;
		}
	}
</style>
