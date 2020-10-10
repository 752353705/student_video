<template>
	<view class="game_detail">
		<!-- 当前比赛的 图片简介 -->
		<swiper :indicator-dots="true" :autoplay="true"
			:interval="3000" :duration="1000" :circular="true"
			>
			<swiper-item>
				<image 
					style="width: 100%;height: 100%;"
					src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg"
					mode="widthFix"
					></image>
			</swiper-item>
			<swiper-item>
				<image
					style="width: 100%;height: 100%;"
					src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771978851,2906984932&fm=26&gp=0.jpg"
					mode="widthFix"
					></image>
			</swiper-item>
		</swiper>
		<!-- tab切换 -->
		<view class="tab">
			<view class="item" :class=" tab_act == 0 ? 'act' : '' ">
				详情
			</view>
			<view class="item">
				参加选手
			</view>
		</view>
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
						<view class="host">举办方</view>
						<view class="loca">{{game_detail.subjectAddress}}</view>
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
				<view class="">{{game_detail.subjectSponsorName}}</view>
			</view>
		</view>
		<!-- 参赛选手 -->
		<view class="game_player">
			<view class="tit">
				<view class="le">参赛选手</view>
				<view class="ri">
					<text>21/32</text>
					<text class="iconfont iconfanhui"></text>
				</view>
			</view>
			<view class="player_img">
				<image src="" mode=""></image>
			</view>
		</view>
		<!-- 比赛的进度 -->
		<view class="game_progress">
			<view class="tit">流程进度</view>
			<view class="item">
				<view class="le">
					<view class="num">1</view>
					<view class="state">可报名</view>
				</view>
				<view class="ri">
					未执行
				</view>
			</view>
			<view class="item">
				<view class="le">
					<view class="num">1</view>
					<view class="state">可报名</view>
				</view>
				<view class="ri">
					未执行
				</view>
			</view>
			<view class="item">
				<view class="le">
					<view class="num">1</view>
					<view class="state">可报名</view>
				</view>
				<view class="ri">
					未执行
				</view>
			</view>
		</view>
		<!-- 当前大赛的简介 -->
		<view class="Introduction">
			<view class="tit">比赛简介</view>
			<!-- 赛制 -->
			<view class="format">
				<view class="head">
					<view class="boder"></view>
					<view style="font-size: 30rpx;">赛制</view>
				</view>
				<view class="desc">指定系列B03，瑞士轮4轮出四强</view>
			</view>
			<!-- 费用 -->
			<view class="cost">
				<view class="head">
					<view class="boder"></view>
					<view style="font-size: 30rpx;">费用</view>
				</view>
				<view class="desc">0</view>
			</view>
			<!-- 奖品 -->
			<view class="prize">
				<view class="head">
					<view class="boder"></view>
					<view style="font-size: 30rpx;">奖品</view>
				</view>
				
				<!-- <editor id="editor" class="ql-container" 
					:placeholder="placeholder" @ready="onEditorReady"></editor> -->
					
				<rich-text :nodes="game_detail.subjectContent"></rich-text>
				
				<!-- <block>
					{{game_detail.subjectContent}}
					转化代码
				</block> -->
				
				<!-- 奖品展示 -->
				
				<!-- 奖品描述 -->
				
				
			</view>
			<!-- 联系方式 -->
			<view class="contact">
				<view class="head">
					<view class="boder"></view>
					<view style="font-size: 30rpx;">联系方式</view>
				</view>
				
				<view class="weixin">
					<text>微信: 1111</text>
				</view>
				<view class="phone">
					<text>电话: 2222</text>
				</view>
			</view>
			<!-- 备注 -->
			<view class="note">
				<view class="head">
					<view class="boder"></view>
					<view style="font-size: 30rpx;">备注</view>
				</view>
				<view class="body">
					备注备注备注备注备注备注备注
				</view>
			</view>
			
		</view>
		<!-- 报名按钮 -->
		<view class="btn">
			我要报名
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
			}
		},
		onLoad(option) {
			let _this = this 
			this.api._get(`subject/${option.subjectId}`,{},function(res){
				console.log('获取大赛详情',res)
				_this.game_detail = res.data
			})
		},
		onShow() {
			let _this = this 
			
			this.$eventHub.$on('subjectId', function (data) {
			 	console.log('subjectId '+ data);
				_this.subjectId = data
				// 监听完成之后进行取消
				_this.$eventHub.$off('subjectId');
			});
			
			// 获取大赛的详情
			// this.api._get(`subject/${option.subjectId}`,{},function(res){
			// 	console.log('获取大赛详情',res)
			// 	_this.game_detail = res.data
			// })
			
			uni.setNavigationBarTitle({
				title:"大赛111"
			})
		},
		methods:{
			
		}
	}
</script>

<style>
	page{
		background-color: #0a121b;
	}
</style>

<style scoped lang="less">
	// 设置灰色边框
	.boder{
		width: 10rpx;
		height: 20rpx;
		background-color: #aaaaaa;
		margin-right: 10rpx;
	}
	.game_detail{
		color: white;
		padding-bottom: 70rpx;
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
			background-color: #264e91;
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
				// margin-top: 20rpx;
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
			// height: 200rpx;
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
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
				background-color: yellow;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		// 流程进度
		.game_progress{
			width: 92%;
			// height: 316rpx;
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
				font-size: 36rpx;
				font-weight: bold;
				margin-bottom: 37rpx;

			}
			.item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #d9d9d9;
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				.le{
					display: flex;
					align-items: center;
					.num{
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						text-align: center;
						line-height: 40rpx;
						background-color: #0062CC;
						color: white;
						margin-right: 10rpx;
					}
				}
				
			}
			.item:last-child{
				border: none;
			}
		}
		// 比赛简介
		.Introduction{
			width: 92%;
			// height: 500rpx;
			margin: 46rpx auto;
			background-color: #ffffff;
			color: black;
			border-radius: 30rpx;
			box-sizing: border-box;
			padding-left: 40rpx;
			padding-top: 20rpx;
			padding-bottom: 40rpx;
			padding-right: 20rpx;
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
			line-height: 80rpx;
			color: white;
			font-size: 30rpx;
			text-align: center;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #244b8d;
			z-index: 20;
		}
	}
</style>
