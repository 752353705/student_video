<template>
	<view>
		<view class="find">
		  <view class="serach">
		    <span>请搜索选手ID</span>
		  </view>
		  <view class="list">
				<!-- 当 进行渲染时使用 id作为key  -->
		    <view class="list_item" v-for="(item,index) in [1,2,3,4,5,6]" :key="index">
		      <view class="head">
		        <view class="user_img">
		          
		        </view>
		        <view class="user_msg">
		          <view class="user_name">
		            沈博然
		          </view>
		          <view class="user_id">
		            ID:13214816
		          </view>
		        </view>
		      </view>
		      <view class="body">
		        图片
		      </view>
		      <view class="foot">
		        <view class="foot_cont">
		          #乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云乌云
		        </view>
		        <view class="foot_msg">
		          <view class="left">
								<image src="../../static/see.png" mode=""></image>
		            <view class="see">
									27534
		            </view>
								<image src="../../static/my_vote.png" mode=""></image>
		            <view class="say">
		              17928
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
				<image class="img" src="../../static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
		<!-- 底部导航栏 -->
		<tabbar :active="f_active"></tabbar>
	</view>
	
</template>

<script>
	import tabbar from '../../components/tabbar.vue'
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '../../components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				f_active:1
			};
		},
		components:{
			tabbar,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		onLoad(){
			// this.$refs.popup.open()
		},
		methods:{
			// 控制弹窗
			open(){
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
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
		}
		.list{
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
					background-color: red;
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
