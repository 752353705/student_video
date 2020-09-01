<template>
	<view>
		<view class="my">
			<!-- 头部 -->
			<view class="head height">
				<view class="userImg" @click="jump">
					<image  :src="user_img" mode=""></image>
				</view>
				<view class="right">
					<view class="right_uname" >
						<view class="user_name" @click="jump">
							{{user_name || '昵称' }}
						</view>
						<button v-if="!user_phone" type="default" hover-class="none" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">绑定手机号</button>
						<view v-else style="color:#838383 ;" >已绑定</view>
					</view>
					<view class="box">
						<!-- 关注 -->
						<view class="focus t_c" @click="goFans(1)">
							<view class="">1</view>
							<view class="">关注</view>
						</view>
						<!-- 粉丝 -->
						<view class="fans t_c" @click="goFans(2)">
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
		
		  <!-- 展示框 -->
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
								 <text class="iconfont" :class="item.icon"  ></text>
		          </view>
		          <view>
		            {{item.txt}}
		          </view>
		        </view>
		        <view class="right">
							<text v-if="index!=1" class="iconfont iconarrow" ></text>
		          <view class="tic" v-else>
								{{tic_num}}H
							</view>
		        </view>
		      </view>
		    </view>
			</view>
			
			<!-- 分类展示头 -->
			<swiperTabHead :flex="true" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
	
			
			<swiper :style="{height:swiper_height}" :current="tabIndex" @change="tabChange">
				<swiper-item style="box-sizing: border-box;padding: 7px 5px;" v-for="(tab,i) in tabBars" :key="i">
					<mescroll-item :waterFullHeight="swiper_height" :i="i" 
						:index="tabIndex" :tabs="tabBars"
						@showUseroperation="showUseroperation"
						:kw="kw"
						></mescroll-item>
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
		
		<!-- 用于进行用户操作的弹出框 -->
		<uni-popup  class="pop" animation="false" ref="popup_useoperation" type="00" mask-click="false">
			<uni-popup-useoperation :opertop="opertop" 
				:txtid="txtid" 
				:operleft="operleft" type="success"  message="成功消息" duration="0" 
				:operType="kw"
				/>
		</uni-popup>
		
	</view>
</template>

<script>
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// import {apiSearch} from "@/API/mock.js"
	
	// 上传个人资料的弹框
	import uniPopupUsermsg from '@/components/uni-popup/uni-popup-usermsg.vue'
	//操作 修改个人的  文章
	import uniPopupUseoperation from '@/components/uni-popup/uni-popup-useoperation.vue'
	
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// 控制操作窗口的弹窗
				opertop:"300rpx",
				operleft:"100rpx",
				txtid:'',//用户长按要操作的文章id
				// 测试
				swiper_height: "", // 需要固定swiper的高度
				tabIndex: 0, // 当前tab的下标
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					{ name:"视频",id:"myVideo" },
					{ name:"文章",id:"myTxt" },
					{ name:"二手",id:"myUsed" },
				],   
				kw:"myVideo",
				// 个人展示
				act:0,
				useList:[
					{icon:"iconuser-info",txt:'个人资料'},
					{icon:"iconpiao",txt:'我的H币'},
					{icon:"iconchongzhi",txt:'充值'},
					{icon:"icontuichufffpx",txt:'退出登录'},
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
			uniPopupUsermsg,
			uniPopupUseoperation
		},
		onLoad(){
			this.swiper_height = uni.getSystemInfoSync().windowHeight + 'px'
			let _this = this
			console.log('我的页面')
			
			
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
		onHide() {
			// 当页面 隐藏之后 关闭操作弹窗
			this.$refs.popup_useoperation.close()
		},
		methods:{
			// 控制用户操作弹窗的显隐
			showUseroperation(txtid,location){
				console.log('list 中 按钮显示的位置',"location ==>",JSON.parse(location))
				console.log('用户进行点击的目标信息',txtid)
				
				this.opertop = JSON.parse(location).btntop
				this.operleft = JSON.parse(location).btnleft
				this.txtid = txtid
				
				this.$refs.popup_useoperation.open()
			},
			// 获取用户的手机号进行手机绑定
			decryptPhoneNumber(res){
				let _this = this
				// console.log('绑定手机号 encryptedData ==> ',res.detail.encryptedData)
				// console.log('绑定手机号 iv ==> ',res.detail.iv)
				
				// 进行手机号绑定
				this.api._post("auth/bindPhone",{
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
			goFans(num){
				console.log('跳转到粉丝列表')
				// 当进行跳转的时候将，作者的关注列表以及粉丝列表传递过去
				// uni.navigateTo({
				// 	url:`/pages/fansList/fansList?list=${3}`
				// })
				
				// 判断是进入关注列表还是进入粉丝列表
				if(num == 1){
					// 进入 关注列表
					uni.navigateTo({
						url:`/pages/fansList/fansList?name=${'关注'}`
					})
				}else if(num == 2){
					// 进入 粉丝列表
					uni.navigateTo({
						url:`/pages/fansList/fansList?name=${'粉丝'}`
					})
				}
				
				
			},
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
				console.log('滑动的 id',this.tabBars[this.tabIndex].id)
				this.kw = this.tabBars[this.tabIndex].id
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				this.tabIndex = index;
				console.log('点击的 id',this.tabBars[this.tabIndex].id)
				
				this.kw = this.tabBars[this.tabIndex].id
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
				if(num === 2){
					// 用户跳转到 充值界面
					console.log('用户进行充值操作')
					uni.navigateTo({
						url:"/pages/recharge/recharge"
					})
				}else if(num === 0){
					// 显示个人资料
					this.$refs.popup_user.open()
				}else if(num === 3){
					// 显示退出登录
					uni.showModal({
						title:"提示",
						content:"确定退出吗",
						success:function(res){
							if (res.confirm) {
								console.log('用户点击确定');
								// 发起 退出请求
								_this.api._post("auth/logout",{},function(res){
									console.log('用户进行退出操作',res);
									// 如果返回成功，清除本地缓存，并跳转到首页
									uni.clearStorageSync()
									_this.user_name = ''
									_this.user_img = '/static/avatarUrl.png'
									// 显示的绑定手机号也进行切换
									_this.user_phone = ''
									
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
		// iOS端圆角设置失效
				-webkit-backface-visibility: hidden;
				-webkit-transform: translate3d(0, 0, 0);
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
	      height: 264rpx;
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
