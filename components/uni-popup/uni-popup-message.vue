<template>
	<view class="uni-popup-message" :class="'uni-popup__'+[type]">
		
		<!-- 赛事规则 -->
		<view v-if="pop_type === 'game'" class="uni-popup-message-text game" :class="'uni-popup__'+[type]+'-text'">
			<view class="head">
				<view class="bg" >
					<view class="tit" >
						赛事规则
					</view>
				</view>
			</view>
			<view class="content">
					1.比赛7天为一轮，共设置9轮不同主题比赛
			</view>
		</view>
		
		<!-- 确认投票规则 -->
		<view v-if="pop_type === 'ticket'" class="uni-popup-message-text ticket" :class="'uni-popup__'+[type]+'-text'">
			<view class="head">
				<view class="bg" >
					<view class="tit" >
						提示
					</view>
				</view>
			</view>
			<view class="content">
				确定投票吗
			</view>
			<view class="btn" @click="vote">
				确定
			</view>
		</view>
			
		<!-- 个人资料 -->
		<view v-if="pop_type === 'user_msg'" class="uni-popup-message-text user_msg" :class="'uni-popup__'+[type]+'-text'">
			<view class="tit" >
				个人资料
			</view>
			<view class="content">
				<view class="input_box">
					<image src="../../static/gender.png" mode=""></image>
					<input type="text" value="" placeholder="姓名" />
				</view>
				<view class="input_box">
					<image src="../../static/signature.png" mode=""></image>
					<input type="text" value="" placeholder="性别"/>
				</view>
				<view class="input_box">
					<image src="../../static/school.png" mode=""></image>
					<input type="text" value="" placeholder="学校"/>
				</view>
				
				
				<view class="user_txt">
					请输入简介
				</view>
			</view>
			<view class="btn">
				保存
			</view>
		</view>
		
		
		<!-- 上传作品 -->	
		<view v-if="pop_type === 'upload'" class="uni-popup-message-text upload" :class="'uni-popup__'+[type]+'-text'">
			<view class="head">
				<view class="bg" >
					<view class="tit" >
						上传作品
					</view>
				</view>
			</view>
			<view class="content" >
				<!-- 十字图案 -->
				<view class="cross" />
				<view class="con_txt">
					上传视频
				</view>
				
			</view>
			<view class="txt_area">
				#输入话题
			</view>
			<view class="btn">
				发布
			</view>
		</view>
		
	</view>
</template>

<script>
	
	/**
	 * PopUp 弹出层-消息提示
	 * @description 弹出层-消息提示
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} message 消息提示文字
	 * @property {String} duration 显示时间，设置为 0 则不会自动关闭
	 */
	
	export default {
		name: 'UniPopupMessage',
		props: {
			/**
			 * 判断弹出框是哪一种类型
			 * */
			pop_type:{
				type:String,
				default:''
			},
			/**
			 * 主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'success'
			},
			/**
			 * 消息文字
			 */
			message: {
				type: String,
				default: ''
			},
			/**
			 * 显示时间，设置为 0 则不会自动关闭
			 */
			duration: {
				type: Number,
				default: 3000
			}
		},
		inject: ['popup'],
		data() {
			return {}
		},
		created() {
			this.popup.childrenMsg = this
		},
		methods: {
			// 控制弹窗
			open() {
				if (this.duration === 0) return
				clearTimeout(this.popuptimer)
				this.popuptimer = setTimeout(() => {
					this.popup.close()
				}, this.duration)
			},
			close() {
				clearTimeout(this.popuptimer)
			},
			// 确定投票
			vote(){
				console.log('投票')
				uni.showToast({
						icon:'none',
				    title: '投票成功',
						position:'top',
				    duration: 2000
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-message{
		display: flex;
		flex-direction: column;
		align-items: center;
		.uni-popup-message-text{
			width: 639.58rpx;
			height: 821.52rpx;
			background-color:#f9ba59 ;
			font-size: 14px;
			border-radius: 50rpx;
			background-image: linear-gradient(to bottom, #fed353 , #ea9b70);
			position: relative;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: hidden;
			
			.head{
				box-sizing: border-box;
				width: 80%;
				height: 100rpx;
				color: #822c37;
				font-size: 40rpx;
				font-weight: bolder;
				text-align: center;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				position: relative;
				.bg{
					width: 100%;
					height: 333rpx;
					background-color: #fed353;
					border-radius: 50%;
					position: absolute;
					top: -203rpx;
					box-shadow: 0 8px 5px #e9a631;
					.tit{
						position: absolute;
						bottom:49rpx;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
			.content{
				color: white;
				font-size: 30rpx;
			}
			.btn{
				width: 181.22rpx;
				height: 60.66rpx;
				text-align: center;
				line-height: 60.66rpx;
				background-image: linear-gradient(to bottom, #ef6a25 , #f41c1f);
				border-radius: 40rpx;
				color: #db986e;
				font-size: 36rpx;
				font-weight: bolder;
				margin-top: 40rpx;
			}
		}
		
		// 投票的弹窗样式
		.ticket{
			width: 537.5rpx;
			height: 348.61rpx;
			box-sizing: border-box;
			.head{
				.bg{
					top:-233rpx ;
					.tit{
						bottom: 29rpx;
						padding-top: 20rpx;
					}
				}
			}
			.content{
				font-size: 40rpx;
				color: #fff3e0;
			}
			.btn{
				width: 181.22rpx;
				height: 60.66rpx;
				border-radius: 40rpx;
				margin-top: 40rpx;
			}
		}
	
		// 个人资料的弹窗样式
		.user_msg{
			width: 644.44rpx;
			height: 722.22rpx;
			padding-top: 40rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
		
			.tit{
				color: #7f3a35;
				font-size: 40rpx;
				font-weight: bolder;
				width: 100%;
				justify-content: start;
				text-align: start;
				height: 89rpx;
				background-color: transparent;
				margin-bottom: 0rpx;
				box-sizing: border-box;
				padding-left: 30rpx;
			}
			
			.content{
				width: 100%;
				.input_box{
					height: 70rpx;
					background-image: linear-gradient(to bottom, #f8c663 , #e4a270);
					border-radius: 20rpx;
					display: flex;
					justify-content: start;
					align-items: center;
					box-sizing: border-box;
					padding-left: 20rpx;
					input{
						display: inline-block;
						height: 32.4rpx;
						border-radius: 20rpx;
					}
					image{
						width: 33rpx;
						height: 33rpx;
						margin-right: 13rpx;
					}
				}
				.user_txt{
					width: 582.63rpx;
					height: 222.22rpx;
					background-image: linear-gradient(to bottom, #fac663 , #e5a172);
					margin-top: 20rpx;
					box-sizing: border-box;
					padding:10rpx 40rpx 10rpx;
					border-radius: 30rpx;
				}
			}
			
		}
		
		// 上传作品的弹出框
		.upload{
			.content{
				width: 214.58rpx;
				height: 189.58rpx;
				background-image: linear-gradient(to bottom, #fdc453 , #f0ac65);
				margin-top: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 23rpx;
				.cross {
				  background: #fa452a;
				  height: 89.58rpx;
				  position: relative;
				  width: 9.88rpx;
				}
				.cross:after {
				 background-color: #fa452a;
				 content: "";
				 height: 9.88rpx;
				 left: -37.77rpx;
				 position: absolute;
				 top: 39.77rpx;
				 width: 89.58rpx;
				}
				.con_txt{
					color: #aa7f5c;
					margin-top: 17rpx;
					font-size: 27rpx;
				}
			}
			
			.txt_area{
				width: 561.11rpx;
				height: 278.47rpx;
				background-image: linear-gradient(to bottom, #fdc453 , #ea9b70);
				margin-top: 20rpx;
				border-radius: 40rpx;
				box-sizing: border-box;
				padding: 30rpx;
				color: #a77142;
			}
		}
	
		// 赛事规则
		.game{
			.head{
				margin-bottom: 60rpx;
			}
		}
	
	
	}
</style>
