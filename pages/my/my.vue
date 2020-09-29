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
						<button v-if="!userInfo.phone" type="default" hover-class="none" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">绑定手机号</button>
						<view v-else style="color:#838383 ;" >已绑定</view>
					</view>
					<view class="box">
						<!-- 关注 -->
						<view class="focus t_c" @click="goFans(1)">
							<view class="">{{focusNum}}</view>
							<view class="">关注</view>
						</view>
						<!-- 粉丝 -->
						<view class="fans t_c" @click="goFans(2)">
							<view class="">{{fansNum}}</view>
							<view class="">粉丝</view>
						</view>
						<!-- 获赞与收藏 -->
						<view class="collection t_c">
							<view class="">{{userInfo.likes}}</view>
							<view class="">获赞与收藏</view>
						</view>
						<!-- 消息通知 -->
					<!-- 	<view style="position: relative;" >
							<view class="iconfont iconxinxiduanxinxiaoxitixingyoujiansixinyouxiang" @tap="goChart" ></view>
							未读消息提示
							<u-badge v-if="showbadge" count="10" :offset="off" size="mini" />
						</view> -->
						<!-- 签到显示 v-if="showsigin" -->
						<view  class="sigin" @click="sigin">
							<image src="../../static/sigin.png" mode=""></image>
							签到
							<text class="iconfont iconfanhui" ></text>
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
						<view class="left_icon">
							 <text class="t-icon" :class="item.icon"  ></text>
						</view>
					
						<view>
							<text v-if="index !== 1">{{item.txt}}</text>
							<text v-else>{{userInfo.hgold || '0' }}H</text>
						</view>
		      </view>
		    </view>
			</view>
			
			<!-- 分类展示头 -->
			<swiperTabHead :flex="true" :tabBars="tabBars" 
				:tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
	
			
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
			<uni-popup-usermsg type="success"  message="成功消息" 
				duration="0" :userInfo="userInfo"
				@closeUsermsg="closeUsermsg"
				/>
		<!-- 	<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view> -->
		</uni-popup>
		
		<!-- 用于进行用户操作的弹出框 -->
		<uni-popup  class="pop" animation="false" ref="popup_useoperation" type="00" mask-click="false">
			<uni-popup-useoperation :opertop="opertop" 
				:txtid="txtid" 
				:operleft="operleft" type="success"  message="成功消息" duration="0" 
				:operType="kw"
				@closeUseroperation="closeUseroperation"
				/>
		</uni-popup>
		
		<!-- 用户进行签到的弹框 -->
	<!-- 	<uni-popup  class="pop" animation="false" ref="popup_sigin"  mask-click="false">
			<uni-popup-sigin @showSigin="showSigin" :opertop="opertop" 
				:operleft="operleft" type="success"  message="成功消息" duration="0"
				 btn_msg="0"
				 />
		</uni-popup> -->
		
		
	</view>
</template>

<script>
	// 用户进行签到
	// import uniPopupSigin from '@/components/uni-popup/uni-popup-sigin.vue'
	
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// import {apiSearch} from "@/API/mock.js"
	
	// 上传个人资料的弹框
	import uniPopupUsermsg from '@/components/uni-popup/uni-popup-usermsg.vue'
	//操作 修改个人的  文章
	import uniPopupUseoperation from '@/components/uni-popup/uni-popup-useoperation.vue'
	
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	const app = getApp()
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// 是否显示签到
				showsigin:false,
				
				// 用户的基本信息
				userInfo:{
					likes:0
				},
				// 控制显示未读消息数的位置
				off: [0, -6],
				showbadge:true, //判断用户是否点击查看了未读信息
				// 控制操作窗口的弹窗
				opertop:"300rpx",
				operleft:"100rpx",
				txtid:'',//用户长按要操作的文章id
				// 测试
				swiper_height: "", // 需要固定swiper的高度
				tabIndex: 0, // 当前tab的下标
				
				tabBars:[
					// { name:"视频",id:"myVideo" },
					{ name:"图文",id:"myTxt" },
					// { name:"跳蚤市场",id:"myUsed" },
				],   
				kw:"myTxt",
				// 个人展示
				act:0,
				useList:[
					{icon:"icongerenziliao",txt:'个人资料'},
					{icon:"iconyue",txt:'我的H币'},
					{icon:"iconchongzhi",txt:'充值'},
					{icon:"icontuichudenglu",txt:'退出登录'},
					{icon:"iconshoucang2",txt:'我的收藏'},
					{icon:"icont-icon-test-copy",txt:'浏览记录'},
					// {icon:"iconpaotuibeifen",txt:'跑腿'},
				],
				tic_num:0,
				// 用户信息显示
				user_img:'', //用户头像
				user_name:'',//用户名
				user_phone:'', //用户手机
				fansNum:0, //用户粉丝数
				focusNum:0 //用户关注数
			};
		},
		components:{
			// uniPopupSigin,
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
			// this.$refs.popup_sigin.open()
			let _this = this 
			
			
			
			// 获取用户名
			this.user_name = uni.getStorageSync('user_name')
			// 获取头像
			this.user_img = uni.getStorageSync('user_img') || '/static/avatarUrl.png'
			// 获取用户手机
			this.user_phone = uni.getStorageSync('user_phone')
			// console.log('my界面  onshow',uni.getStorageSync('user_name'))
			
			//获取当前用户的 H 币数量
			this.getUsInfo()
			// 获取关注人数
			this.getFocusNum()
			// 获取粉丝人数
			this.getFansNum()
			
			
			
			// 如果用户已经进行了登陆则显示签到图标
			if(uni.getStorageSync('token')){
				this.showsigin = true
				
			}else{
				this.showsigin = false
			}
		},
		onHide() {
			// 当页面 隐藏之后 关闭操作弹窗
			this.$refs.popup_useoperation.close()
		},
		methods:{
			// 获取用户的个人信息
			getUsInfo(){
				if(uni.getStorageSync('token')){
					// 如果用户进行了登录操作，获取用户的个人信息
					this.api._get(
					'user/info',{},(res)=>{
						console.log('获取用户当前的 H币',res)
						this.userInfo = res.data
					})
				}
			},
			// 获取用户的粉丝人数 getFansNum
			getFansNum(){
				if(uni.getStorageSync('token')){
					// 如果用户进行了登录操作，获取用户的个人信息
					this.api._get(
					'follow/fansCount',{},(res)=>{
						console.log('获取用户当前的 粉丝数量',res)
						this.fansNum = res.data || '0'
					})
				}
			},
			// 获取当前用户关注数量
			getFocusNum(){
				if(uni.getStorageSync('token')){
					// 如果用户进行了登录操作，获取用户的个人信息
					this.api._get(
					'follow/followedCount',{},(res)=>{
						console.log('获取用户当前的 关注人数',res)
						this.focusNum = res.data || 0
					})
				}
			},
			
			// 进行签到
			sigin(){
				console.log('进行签到')
				
				uni.navigateTo({
					url:'/pages/my/mySigin'
				})
				
				
				// 先进行判断是否有sigin 值
				// if(!uni.getStorageSync('sigin')){
				// 	if(!uni.getStorageSync('token')){
				// 		return uni.showToast({
				// 			icon:'none',
				// 			title:'请先完成登录'
				// 		})
				// 	}
				// 	// 没有值 -  进行签到
				// 	this.api._post('user/signResult',{},(res)=>{
				// 		console.log('没有 sigin',res)
				// 		if(res.data =='no'){
				// 			// 正常签到
				// 			this.api._post('user/sign',{},()=>{
				// 				console.log('签到成功')
				// 				this.getUsInfo()
				// 				let time = (new Date().setHours(0, 0, 0, 0) + 24*60*60*1000 - new Date().getTime()) + 1000*60*5
				// 				let sigin_val = {
				// 					state:1 ,//1 表示已经签到
				// 					siginTime:new Date().getTime(), //表示签到的时间  毫秒
				// 					overTime:  time //表示过期时间  毫秒
				// 					// overTime:  1000 * 60 //表示过期时间  毫秒
				// 				}
				// 				uni.setStorage({
				// 				    key: 'sigin',
				// 				    data: JSON.stringify(sigin_val),
				// 				    success: function () {
				// 				        console.log('设置过期时间成功');
				// 				    }
				// 				});
				// 				this.$refs.popup_sigin.open()
				// 			})
							
				// 		}else{
				// 			return uni.showToast({
				// 				icon:'none',
				// 				title:'已进行签到'
				// 			})
				// 		}
				// 	})
					
				// 	// this.sigin_api()
				// }else{
				// 	// 有值 进行 判断是否 已经过期
				// 	console.log('有签到信息')
				// 	this.sigin_api()
				// }
			},
			
			// 签到api
			// sigin_api(){
			// 	let nowTime = new Date().getTime()
			// 	if(nowTime - JSON.parse(uni.getStorageSync('sigin')).siginTime > JSON.parse(uni.getStorageSync('sigin')).overTime ){
			// 		console.log('应当重新进行签到了')
			// 		// 重新进行签到
			// 		this.api._post('user/signResult',{},(res)=>{
			// 			console.log('没有 sigin',res)
			// 			if(res.data =='no'){
			// 				let time = (new Date().setHours(0, 0, 0, 0) + 24*60*60*1000 - new Date().getTime()) + 1000*60*5
			// 				let sigin_val = {
			// 					state:1 ,//1 表示已经签到
			// 					siginTime:new Date().getTime(), //表示签到的时间  毫秒
			// 					overTime:  time //表示过期时间  毫秒
			// 					// overTime:  1000 * 60 //表示过期时间  毫秒
			// 				}
			// 				this.api._post('user/sign',{},()=>{
			// 					console.log('签到成功')
			// 					this.getUsInfo()
			// 					this.$refs.popup_sigin.open()
			// 					uni.setStorage({
			// 					    key: 'sigin',
			// 					    data: JSON.stringify(sigin_val),
			// 					    success: function () {
			// 					        console.log('设置过期时间成功');
			// 					    }
			// 					});
			// 				})
			// 			}else{
			// 				uni.showToast({
			// 					icon:'none',
			// 					title:'已成功签到'
			// 				})
			// 			}
			// 		})
			// 	}else{
			// 				uni.showToast({
			// 					icon:'none',
			// 					title:'已成功签到'
			// 				})
			// 			}
			// },
			
			
			// 控制签到弹窗的显隐
			showSigin(){
				this.$refs.popup_sigin.close()
			},
			// 进入到 查看私信聊天的界面
			goChart(){
				let _this = this
				// 跳转到聊天室
				uni.navigateTo({
					url:'/pages/chart/chartList',
					success() {
						// 消除未读信息的 角标
						_this.showbadge = false
						// 消除底部tabbar 的角标
						// uni.removeTabBarBadge({
						// 	index: 2,
						// 	success() {
						// 		console.log('清除tabbar 下角标');
						// 	},
						// 	fail(err) {
						// 		console.log('清除角标失败', err);
						// 	}
						// });
					}
				})
				
			},
			// 关闭提交个人资料的弹窗
			closeUsermsg(){
				this.$refs.popup_user.close()
			},
			// 控制用户操作弹窗的显隐
			showUseroperation(txtid,location){
				console.log('list 中 按钮显示的位置',"location ==>",JSON.parse(location))
				console.log('用户进行点击的目标信息',txtid)
				
				this.opertop = JSON.parse(location).btntop
				this.operleft = JSON.parse(location).btnleft
				this.txtid = txtid
				
				this.$refs.popup_useoperation.open()
			},
			// 用户关闭弹窗
			closeUseroperation(){
				this.$refs.popup_useoperation.close()
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
						url:`/pages/my/myFocus`
					})
				}else if(num == 2){
					// 进入 粉丝列表
					uni.navigateTo({
						url:`/pages/my/myFans`
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
				if(num === 0){
					// 显示个人资料
					this.$refs.popup_user.open()
				}else if(num === 1){
					// 用户进入 消费记录
					uni.navigateTo({
						url:"/pages/my/myConsumption"
					})
				}
				else if(num === 2){
					// 用户跳转到 充值界面
					console.log('用户进行充值操作')
					uni.navigateTo({
						url:`/pages/recharge/recharge?money=${this.userInfo.hgold}&userId=${this.userInfo.userId}`
					})
				}
				else if(num === 3){
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
				else if(num === 4){
					// 用户进入我的收藏
					uni.navigateTo({
						url:"/pages/my/myCollection"
					})
				}
				else if(num === 5){
					// 用户进入浏览记录
					uni.navigateTo({
						url:"/pages/my/myHistory"
					})
				}
				else if(num === 6){
					// 用户进入 跑腿中
					uni.navigateTo({
						url:"/pages/my/myRun"
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

<style scoped lang="less">
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
				position: relative;
				.box{
					font-size: 28rpx;
					display: flex;
					margin-top: 10rpx;
					justify-content: space-evenly;
					align-items: center;
					color: #5e5e5e;
					
					.sigin{
						background-color: #f4f4f4;
						border-radius:10rpx;
						position: absolute;
						top: 10rpx;
						right: 28rpx;
						display: flex;
						align-items: center;
						image{
							width: 39rpx;
							height: 39rpx;
							margin-right: 10rpx;
						}
					}
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
			// 九宫选择按钮
	    .list{
	      width: 100%;
	      height: 316rpx;
	      background-color: white;
	      border-radius: 20rpx;
	      box-sizing: border-box;
	      padding: 15rpx 30rpx;
	      color: #707070;
				display: flex;
				flex-wrap: wrap;
				
				
	      .list_item{
					// position: relative;
					box-sizing: border-box;
	        display: flex;
					flex-direction: column;
	        justify-content: center;
	        align-items: center;
	        height: 129rpx;
					width: 150rpx;
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
	
	.t-icon{
		width: 32px;
		height: 32px;
	}
	.iconxinxiduanxinxiaoxitixingyoujiansixinyouxiang{
		font-size: 33px;
		margin-left: 25px;
	}
</style>
