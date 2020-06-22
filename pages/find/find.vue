<template>
	<view>
		<view class="find">
		  <view class="serach">
		    <span>请搜索选手ID</span>
				<image src="/static/search.png" mode=""></image>
		  </view>
			
			
		  <view class="list">
				<!-- 当 进行渲染时使用 id作为key  -->
		    <view class="list_item" v-for="(item,index) in [1,2,3,4,5,6]" :key="index">
		      <view class="head">
		        <view class="user_img">
		          
		        </view>
		        <view class="user_msg">
		          <view class="user_name">
		            {{user_name}}
		          </view>
		          <view class="user_id">
		            ID:{{user_id}}
		          </view>
		        </view>
		      </view>
		      <view class="body">
						<!-- 展示拍摄的视频 -->
		        <!-- 图片 -->
						<video id="myVideo" 
							src="https://f.us.sinaimg.cn/002M5hMzlx07si8OOEpy010412008ooq0E010.mp4?label=mp4_hd&template=852x480.28.0&ori=0&ps=1BThCpMKz9z2Xh&Expires=1592816448&ssig=y6E6%2Fjjumz&KID=unistore,video"
						   @error="videoErrorCallback" 
							 :danmu-list="danmuList" 
							 enable-danmu danmu-btn 
							 :controls="false"
							 :show-center-play-btn="false"
							 show-center-play-btn
							 @play="fillScreen"
							 
							 @click="goPlayVideo"
						>
							<!-- <cover-view class="controls">
								<cover-image class="img"  src="../../static/head.png" />
							</cover-view> -->
						</video>
						
						
		      </view>
		      <view class="foot">
		        <view class="foot_cont">
		          #乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云
		        </view>
		        <view class="foot_msg">
		          <view class="left">
								<image src="/static/see.png" mode=""></image>
		            <view class="see">
									{{see_num}}
		            </view>
								<image src="/static/my_vote.png" mode=""></image>
		            <view class="say">
		              {{say_num}}
		            </view>
		          </view>
		          <view class="vote"  @click="open">
		            投 票
		          </view>
		        </view>
		      </view>
		    </view>
		  </view>
		</view>
		
		<!-- 投票弹出框 -->
		<uni-popup class="pop" animation="false" ref="popup" type="center" mask-click="false">
			<uni-popup-message type="success" pop_type="ticket" message="成功消息" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
		<!-- 底部导航栏 -->
		<tabbar :active="f_active"></tabbar>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				f_active:1,
				// 用户信息
				user_name:'沈博然',
				user_id:13214816,
				// 视频
				src: '',
				danmuList: [{
								text: '第 1s 出现的弹幕',
								color: '#ff0000',
								time: 1
						},
						{
								text: '第 3s 出现的弹幕',
								color: '#ff00ff',
								time: 3
						}
				],
				danmuValue: '',
				// 票数
				see_num:27534,
				say_num:17928
			};
		},
		components:{
			
		},
		onLoad(){
			// this.$refs.popup.open()
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
		},
		onReachBottom() {
			console.log('上拉 触底 加载') //分页 请求数据
			
		},
		methods:{
			// 点击进入播放页面
			goPlayVideo(){
				uni.navigateTo({
					url: "/pages/playVideo/playVideo"
				})
			},
			
			// 控制弹窗
			open(){
				// 先判断用户是否一金进行了登录
				// 如果没有则先进行登录再进行敏感操作
				console.log('用户是否已经登录')
				
				
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			
			// 控制视频组件
		 sendDanmu: function() {
				console.log('sendDanmu')
				this.videoContext.sendDanmu({
						text: this.danmuValue,
						color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				console.log('videoErrorCallback')
				console.log('err',e.target.errMsg)
					uni.showModal({
							content: e.target.errMsg,
							showCancel: false
					})
			},
			getRandomColor: function() {
					console.log('getRandomColor')
					const rgb = []
					for (let i = 0; i < 3; ++i) {
							let color = Math.floor(Math.random() * 256).toString(16)
							color = color.length == 1 ? '0' + color : color
							rgb.push(color)
					}
					return '#' + rgb.join('')
			},
			fillScreen(){
				console.log('满屏显示')
				// 获取 video 上下文 videoContext 对象
				this.videoContext = uni.createVideoContext('myVideo');
				// 进入全屏状态
				this.videoContext.requestFullScreen({direction:0});
			}
		}
	}
</script>

<style lang="less">
	.pop{
		.imgBox{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.img{
				width: 62.5rpx;
				height: 62.5rpx;
				margin-top: 20rpx;
			}
		}
	}
	.find{
		box-sizing: border-box;
		padding: 33rpx 30rpx 0;
		background-color: #0d0639;
		.serach{
			background-color:#1a0d53 ;
			border-radius: 20rpx;
			width: 100%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			color: #453a74;
			margin-bottom: 20rpx;
			image{
				width: 40rpx;
				height:40rpx ;
				float: right;
				transform: translateY(50%);
				margin-right: 30rpx;
			}
		}
		.list{
			box-sizing: border-box;
			padding-bottom: 100rpx;
			.list_item{
				width:100% ;
				height: 820rpx;
				background-color: #311a8e;
				margin-bottom: 26rpx;
				border-radius: 20rpx;
				overflow: hidden;
				.head{
					width: 100%;
					height:122rpx ;
					background-color: #311a8e;
					display: flex;
					justify-content: start;
					align-items: center;
					box-sizing: border-box;
					padding-left: 20rpx;
					.user_img{
						width: 80rpx;
						height: 80rpx;
						background-color: white;
						border-radius: 50%;
					}
					.user_msg{
						margin-left: 20rpx;
						color: #c1bcc2;
						font-size: 25rpx;
					}
				}
				.body{
					width: 100%;
					height: 540rpx;
					#myVideo{
						width: 345.2px;
						height: 247px;
					}
				}
				.foot{
					width: 100%;
					height: 150rpx;
					box-sizing: border-box;
					padding: 20rpx;
					color: #988bc3;
					.foot_cont{
						font-size: 26rpx;
					}
					.foot_msg{
						width: 100%;
						height: 70rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 25rpx;
						.left{
							display: flex;
							align-items: center;
							height: 30rpx;
							image{
								width: 30rpx;
								height: 26rpx;
							}
							.see{
								margin-left: 14rpx;
								margin-right: 25rpx;
							}
							.say{
								margin-left: 14rpx;
								
							}
						}
						.vote{
							width: 146rpx;
							height: 48rpx;
							text-align: center;
							line-height: 45rpx;
							color: #822f37;
							background-color: #f6bc58;
							border-radius: 12rpx;
							font-weight: bolder;
							font-size: 30rpx;
							
						}
					}
      }
    }
  }

}
</style>
