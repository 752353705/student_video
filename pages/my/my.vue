<template>
	<view>
		<view class="my">
			<view class="head height">
				<view class="userImg" @click="jump">
					<image :src="user_img" mode=""></image>
				</view>
				<view class="right">
					
					<view class="right_uname" >
						<view class="user_name" @click="jump">
							{{user_name || '昵称' }}
						</view>
						<button v-if="!user_phone" type="default" hover-class="none" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">绑定手机号</button>
						<view v-else style="color:#838383 ;" >已绑定</view>
						<view v-else class="user_phone">15930245253</view>
					</view>
					
					<view class="box">
						<!-- 关注 -->
						<view class="focus t_c" @click="goFans">
							<view class="">1</view>
							<view class="">关注</view>
						</view>
						<!-- 粉丝 -->
						<view class="fans t_c" @click="goFans">
							<view class="">1.6万</view>
							<view class="">粉丝</view>
						</view>
						<!-- 获赞与收藏 -->
						<view class="collection t_c">
							<view class="">24.3万</view>
							<view class="">获赞与收藏</view>
						</view>
					</view>
					
					
				</view>
			</view>
		
		  <view class="content height">
		    <view class="list">
		      <view 
						v-for="(item,index) in useList" 
						:key="index"
						@click="open(index)"
						class="list_item" 
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
			</view>
			
			<!-- 分类展示头 -->
			<swiperTabHead  :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
	
			
			<swiper :style="{height:swiper_height}" :current="tabIndex" @change="tabChange">
				<swiper-item style="box-sizing: border-box;padding: 0 10rpx;" v-for="(tab,i) in tabBars" :key="i">
					<mescroll-item :waterFullHeight="swiper_height" :i="i" :index="tabIndex" :tabs="tabBars"></mescroll-item>
				</swiper-item>
			</swiper>
			
			
		</view>
		<!-- 个人资料填写的弹出框 -->
		<uni-popup class="pop" animation="false" ref="popup_user" type="center" mask-click="false">
			<uni-popup-usermsg type="success"  message="成功消息" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// import {apiSearch} from "@/API/mock.js"
	
	// 上传个人资料的弹框
	import uniPopupUsermsg from '@/components/uni-popup/uni-popup-usermsg.vue'
	
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// 测试
				swiper_height: "", // 需要固定swiper的高度
				tabIndex: 0, // 当前tab的下标
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					{ name:"收藏",id:"guanzhu" },
					{ name:"赞过",id:"tuijian" },
				],   
				// 个人展示
				act:0,
				useList:[
					{icon:"/static/my_use.png",txt:'个人资料'},
					{icon:"/static/my_ticket.png",txt:'剩余票数（每日限投3票）'},
					{icon:"/static/my_exit1.png",txt:'退出登录'}
				],
				tic_num:3,
				// 用户信息显示
				user_img:'', //用户头像
				user_name:'',//用户名
				user_phone:'' //用户手机
			};
		},
		components:{
			swiperTabHead,
			MescrollItem,
			uniPopupUsermsg
		},
		onLoad(){
			this.swiper_height = uni.getSystemInfoSync().windowHeight + 'px'
			let _this = this
			console.log('我的页面')
		
			// this.$refs.popup_video.open()	
			// this.$refs.popup_user.open()
			uni.showLoading({
			   title: '加载中'
			});
		},
		onReady() {
			// 页面加载完毕
			console.log('页面加载完毕')
			uni.hideLoading();
		},
		onShow() {
			// 获取用户名
			this.user_name = uni.getStorageSync('user_name')
			// 获取头像
			this.user_img = uni.getStorageSync('user_img') || '/static/avatarUrl.png'
			// 获取用户手机
			this.user_phone = uni.getStorageSync('user_phone')
			// console.log('my界面  onshow',uni.getStorageSync('user_name'))
		},
		methods:{
			// 获取用户的手机号进行手机绑定
			decryptPhoneNumber(res){
				let _this = this
				// console.log('绑定手机号 encryptedData ==> ',res.detail.encryptedData)
				// console.log('绑定手机号 iv ==> ',res.detail.iv)
				
				// 进行手机号绑定
				this._post("auth/bindPhone",{
					"encryptedData":res.detail.encryptedData,
					"iv":res.detail.iv
				},function(res){
					console.log('绑定手机号 res',res);
					
					// 结果成功，将页面中的绑定手机号显示为用户手机，并加以保密 ***
						// 绑定手机号成功，进行本地存储
						wx.setStorageSync('user_phone', res.data.phone);
						_this.user_phone = res.data.phone
				})
				
				
			},
			// 跳转查看关注、粉丝
			goFans(){
				console.log('跳转到粉丝列表')
				// 当进行跳转的时候将，作者的关注列表以及粉丝列表传递过去
				uni.navigateTo({
					url:`/pages/fansList/fansList?list=${3}`
				})
			},
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				this.tabIndex = index;
			},
			// 制作瀑布流
			getLoadNum(num){
			    console.log('共加载了:'+num);
			    !this.isNewRenderDone&&uni.hideLoading()
			    this.isNewRenderDone = true
			},	
			// 点击我的视频跳转到视频播放页
			goPlayVideo(){
				uni.navigateTo({
					url: "/pages/playVideo/playVideo"
				})
			},
			// 进行弹窗的控制
			open(num){
				let _this = this 
				if(num === 9){
				// 显示上传视频
					this.$refs.popup_video.open()
				}else if(num === 0){
					// 显示个人资料
					this.$refs.popup_user.open()
				}else if(num === 2){
					// 显示退出登录
					uni.showModal({
						title:"提示",
						content:"确定退出吗",
						success:function(res){
							if (res.confirm) {
								console.log('用户点击确定');
								// 发起 退出请求
								_this._post("auth/logout",{},function(res){
									console.log('用户进行退出操作',res);
									// 如果返回成功，清除本地缓存，并跳转到首页
									uni.clearStorageSync()
									_this.user_name = ''
									_this.user_img = ''
									
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
								// 不进行操作弹出框取消即可
								
							}
						},
						fail:function() {
							console.log('调用接口失败')
						}
					})
				}
			},
			close(num){
				// console.log('关闭')
				this.$refs.popup_user.close()
				// this.$refs.popup_video.close()
			},
			// 跳转到注册页
			jump(){
				console.log('跳转页面')
				uni.navigateTo({
				    url: "/pages/login/login"
				});
			},
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
	
	// button
	button{
		height: 61.86rpx;
		width: 122.13rpx;
		line-height: 79.13rpx;
		color: white;
		border-radius: 40rpx;
		overflow: hidden;
		margin: 0;
		font-size: 11px;
		padding: 0;
		text-align: end;
		color:#838383 ;
	}
	button::after{
		border: none;
	}
	.my{
	  background-color: #f6f6f6;
	  box-sizing: border-box;
		color: black;
		.head{
			display: flex;
			box-sizing: border-box;
			padding: 20rpx 40rpx;
			.userImg{
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				width: 77%;
				margin-left: 30rpx;
				.box{
					width: 70%;
					font-size: 28rpx;
					display: flex;
					margin-top: 10rpx;
					justify-content: space-evenly;
					align-items: center;
					color: #5e5e5e;
				}
				.right_uname{
					margin-left: 20rpx;
					display: flex;
					align-items: flex-end;
					.user_name{
						margin-right: 20rpx;
						font-size: 41rpx;
						font-weight: bolder;
						color: #838383;
					}
					.user_phone{
						color: #838383;
					}
				}
			}
		}
		
		
		// 内容区样式
	  .content{
	    box-sizing: border-box;
	    padding: 0 40rpx 10rpx;
			font-size: 30rpx;
	    .list{
	      width: 100%;
	      height: 218rpx;
	      background-color: white;
	      border-radius: 20rpx;
	      box-sizing: border-box;
	      padding: 20rpx 45.83rpx;
	      color: #707070;
				
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
			}
	    .title{
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
	        background-color: white;
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
	          color: black;
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
	    }
		}
	}
</style>
