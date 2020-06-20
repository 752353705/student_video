<template>
	<view>
		<view class="my">
		  <view class="head">
		    <view class="user_img" @click="jump">
					<image :src="userMsg.userImg" mode=""></image>
				 </view>
		    <view class="user_name">
		      {{userMsg.userName || '昵称' }}
		    </view>
		    <view class="user_id">
		      ID：{{ userMsg.user_id || '暂无' }}
		    </view>
		  </view>
		
		  <view class="content">
		    <view class="list">
		      <view 
						v-for="(item,index) in list" 
						:key="index"
						@click="open(index)"
						:class="  index!==2 ? 'list_b  list_item' : 'list_item' " 
					>
		        <view class="left">
		          <view class="left_icon">
		             <image :src=item.icon mode=""></image>
		          </view>
		          <view>
		            {{item.txt}}
		          </view>
		        </view>
		        <view class="right">
		          <image v-if="index!=1" src="/static/right.png" mode=""></image>
		          <view class="tic" v-else>
								{{tic_num}}票
							</view>
		        </view>
		      </view>
		    </view>
		
		    <view class="title">
		      <view class="title_icon">
		        <image src="/static/my_video.png" mode=""></image>
		      </view>
		      <view>
		        我的视频
		      </view>
		    </view>
		
		    <!--我的视频-->
		    <view class="video_list"> 
		      <!--存在视频  循环渲染-->
		      <view class="video_item">
		        <view class="video_box">
		          <!-- 视频 -->
							<video id="myVideo"
								src="https://vdept.bdstatic.com/72784e496c73526a7533676b6b566a6d/3847447a79344535/46d4e9c8758751cb49c893f877e418c838dd8058ad86a0b85c64a3cf3c899dc5439424d4f82c963b71a5213255a508b5.mp4?auth_key=1592274925-0-0-df7d5895859199f09bb47de43b415708"
								@error="videoErrorCallback" 
								:danmu-list="danmuList" 
								enable-danmu danmu-btn
								:controls="false"
								:show-center-play-btn="false"
							>
							</video>
		        </view>
		
		        <view class="msg">
		          <view class="see">
		            <view class="see_icon">
		              <image src="/static/see.png" mode=""></image>
		            </view>
		            <view>
		              27534
		            </view>
		          </view>
		          <view class="say">
		            <view class="say_icon">
		              <image src="/static/my_vote.png" mode=""></image>
		            </view>
		            <view>
		              17928
		            </view>
		          </view>
		        </view>
		      </view>
		      
		
		      <!--渲染结束 点击可以上传视频-->
		      <view class="push_video" @click="open(9)">
						<view class="cross" />
						<view class="txt">
							上传短视频
						</view>
		      </view>
		    </view>
		  </view>
		
		</view>
		
		<!-- 个人资料填写的弹出框 -->
		<uni-popup class="pop" animation="false" ref="popup_user" type="center" mask-click="false">
			<uni-popup-message type="success" pop_type="user_msg" message="成功消息" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
		
		<!-- 上传视频的弹出框 -->
		<uni-popup class="pop" animation="false" ref="popup_video" type="center" mask-click="false">
			<uni-popup-message type="success" pop_type="upload" message="成功消息" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
		<!-- 底部导航栏 -->
		<tabbar :active="m_active"></tabbar>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				list:[
					{icon:"/static/my_use.png",txt:'个人资料'},
					{icon:"/static/my_ticket.png",txt:'剩余票数（每日限投3票）'},
					{icon:"/static/my_exit.png",txt:'退出登录'}
				],
				tic_num:3,
				m_active:4,
				userMsg:'',
				src: '',
				danmuList: [
						{
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
				danmuValue: ''
			};
		},
		components:{
		
		},
		onLoad(){
			let _this = this
			console.log('我的页面')
			uni.getStorage({
			    key: 'userMsg',
			    success: function (res) {
			        console.log('本地信息',res.data);
							_this.userMsg = JSON.parse(res.data)
			    }
			});
			// this.$refs.popup_video.open()	
			// this.$refs.popup_user.open()
		},
		onShow() {
			let _this = this
			console.log('我的页面')
			uni.getStorage({
			    key: 'userMsg',
			    success: function (res) {
			        console.log('本地信息',res.data);
							_this.userMsg = JSON.parse(res.data)
			    }
			});
		},
		methods:{
			// 进行弹窗的控制
			open(num){
				if(num === 9){
					this.$refs.popup_video.open()
				}else if(num === 0){
					this.$refs.popup_user.open()
				}
			},
			close(num){
				this.$refs.popup_user.close()
				this.$refs.popup_video.close()
			},
			
			// 获取用户的信息  暂时用不到，
			// 逻辑：跳转到手机登录页面，进行登录然后将返回的信息进行本地存储，在my 页面再次显示时，获取信息
			getUserMsg(){
				let _this = this
				// 获取用户信息
				uni.getUserInfo({
				    // 获取信息成功
				    success(res) {
				        console.log('请求成功',res);
								// 获取个人昵称、头像、ID
								let userMsg = {
									userName:res.userInfo.nickName,
									userImg:res.userInfo.avatarUrl
								}
								_this.userMsg = userMsg
								// 进行本地存储
								uni.setStorage({
								    key: 'userMsg',
								    data: JSON.stringify(userMsg),
								    success: function () {
								        console.log('success');
								    }
								});
				        // 成功后进行登录,获取code
				        uni.login({
				          success (res) {
				             console.log('成功登录',res);
				            if (res.code) {
				              //发起网络请求 请求个人信息
				              // uni.request({
				              //   // 请求路径
				              //   url: 'https://test.com/onLogin',  
				              //   // 请求参数code
				              //   data: {
				              //     code: res.code
				              //   },
				              //   method: 'GET',
				              //   success(res){
				              //       // 请求成功后获取openid和session_key
				              //       console.log(res)
				              //   }
				              // })
				            } else {
				              console.log('登录失败！' + res.errMsg)
				            }
				          }
				        })
				    },
				    fail() {
				        console.log("获取用户信息失败");
				    }
				})
			},
		
			// 跳转到注册页
			jump(){
				console.log('跳转页面')
				uni.navigateTo({
				    url: "/pages/login/login"
				});
			},
			
			// 控制视频组件
			sendDanmu: function() {
					this.videoContext.sendDanmu({
							text: this.danmuValue,
							color: this.getRandomColor()
					});
					this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				console.log('err',e.target.errMsg)
					uni.showModal({
							content: e.target.errMsg,
							showCancel: false
					})
			},
			getRandomColor: function() {
					const rgb = []
					for (let i = 0; i < 3; ++i) {
							let color = Math.floor(Math.random() * 256).toString(16)
							color = color.length == 1 ? '0' + color : color
							rgb.push(color)
					}
					return '#' + rgb.join('')
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
	.my{
	  background-color: #0d0639;
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  box-sizing: border-box;
	  .head{
	    color: white;
	    font-size: 30rpx;
	    display: flex;
	    align-items: center;
	    flex-direction: column;
			box-sizing: border-box;
	    padding-top: 64rpx;
	    // 花个半圆
	    width: 750rpx;
	    height: 310.47rpx;
	    border:1px solid black;
	    background-image: linear-gradient(to right, #3d1c9e , #7255a5);
	    border-radius:0 0 750rpx 750rpx ;
			// border-radius: 0 0 25% 100% ;
	    .user_img{
	      width: 120rpx;
	      height: 120rpx;
	      background-color: white;
	      border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
	    }
	    .user_name{
	      margin-top: 20rpx;
	    }
	  }
	  .content{
	    box-sizing: border-box;
	    padding: 40rpx;
			font-size: 30rpx;
	    .list{
	      width: 100%;
	      height: 218rpx;
	      background-color: #311a8e;
	      border-radius: 20rpx;
	      box-sizing: border-box;
	      padding: 20rpx 45.83rpx;
	      color: #c4badf;
				
	      .list_item{
					position: relative;
					box-sizing: border-box;
	        display: flex;
	        justify-content: space-between;
	        align-items: center;
	        height: 58rpx;
	        .left{
	          display: flex;
	          justify-content: space-between;
	          align-items: center;
						.left_icon{
							width: 38rpx;
							height: 32rpx;
							margin-right: 20rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
	        }
					.right{
						width:46.66rpx ;
						height: 37.16rpx;
						.tic{
							width: 48rpx;
							padding-right: 20rpx;
						}
						image{
							width: 100%;
							height: 100%;
						}
					}
					
				}
				// 绘制0.5px的底线
				.list_b:before{
						content: " ";
					  position: absolute;
					  left: 0;
					  bottom: 0;
					  width: 100%;
					  height: 1px;
					  border-bottom: 1px solid #220c78;
					  -webkit-transform-origin: 0 0;
					  transform-origin: 0 0;
					  -webkit-transform: scaleY(0.5);
					  transform: scaleY(0.5);
				}
			}
	    .title{
	      color: white;
	      display: flex;
	      justify-content: start;
				align-items: center;
	      margin: 39rpx 20rpx;
				.title_icon{
					width: 40.77rpx;
					height: 44.77rpx;
					margin-right: 16rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
	    }
	    .video_list{
	      width: 100%;
	      display: flex;
	      justify-content: space-between;
	      flex-wrap: wrap;
	      .video_item{
	        width:314rpx;
	        height:308rpx ;
	        background-color: #311a8e;
	        border-radius: 20rpx;
	        box-sizing: border-box;
	        padding-top: 25rpx;
	        .video_box{
	          height: 227rpx;
	          width: 100%;
						#myVideo{
							height: 227rpx;
							width:314rpx;
						}
	        }
	        .msg{
	          display: flex;
	          justify-content: start;
	          font-size: 20rpx;
	          box-sizing: border-box;
	          padding-left: 20rpx;
	          margin-top: 10rpx;
	          color: #c8bbf3;
	          .see{
	            margin-right: 20rpx;
							display: flex;
							justify-content: start;
							align-items: center;
							.see_icon{
								width: 40.77rpx;
								height: 44.77rpx;
								margin-right: 16rpx;
								image{
									width: 100%;
									height: 100%;
								}
							}
	          }
						.say{
							margin-right: 20rpx;
							display: flex;
							justify-content: start;
							align-items: center;
							.say_icon{
								width: 40.77rpx;
								height: 35.77rpx;
								margin-right: 16rpx;
								image{
									width: 100%;
									height: 100%;
								}
							}
						}
	        }
	      
					
				}
				
				.push_video{
					width:314rpx;
					height:308rpx ;
					background-color: #311a8e;
					border-radius: 20rpx;
					box-sizing: border-box;
					padding-top: 25rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					// 绘制十字
					.cross {
					  background: #120a43;
					  height: 138.88rpx;
					  position: relative;
					  width: 14rpx;
						margin-bottom: 20rpx;
					}
					.cross:after {
						background-color: #120a43;
						content: "";
						height: 14rpx;
						left: -59.77rpx;
						position: absolute;
						top: 60.77rpx;
						width: 138.88rpx;
					}
					.txt{
						color: #433775;
						font-size:33rpx;
						font-weight: bolder;
					}
				}
	    }
	  
			
		}
	}
</style>
