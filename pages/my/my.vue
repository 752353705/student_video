<template>
	<view>
		<view class="my box-boder">
			<view class="height" 
				style="background-image: linear-gradient(to bottom, #192936, #786f68);height: 526rpx;" 
				>
				<!-- 头部 -->
				<view class="head pa-r40 pa-b20 pa-l40  box-boder">
					<view class="userImg " @click="jump">
						<image class="w-100 h-100"  :src="userInfo.avatarUrl || '/static/avatarUrl.png'" mode=""></image>
					</view>
					<view class="right ma-l10">
						<view class="right_uname item-end ma-l20" >
							<view class="user_name ma-r20" @click="jump">
								{{userInfo.userName || '昵称' }}
							</view>
						</view>
						<view class="box">
							<view class="code">{{user_phone.slice(0,3)}}****{{user_phone.slice(7)}}</view>
							<view class="location">
								<view class="t-icon" :class=" userInfo.gender == 2 ?  'iconbianzu' : 'iconziyuan' ">
								</view>
								<view class="province">{{userInfo.province}}</view>
								<view class="city">{{userInfo.city}}</view>
							</view>
							<!-- 签到显示 v-if="showsigin" -->
							<view  class="sigin item-center" @click="sigin">
								<image class="ma-r10" src="../../static/sigin.png" mode=""></image>
								签到
								<text class="iconfont iconfanhui" ></text>
							</view>
						</view>
					</view>
				</view>
				<!-- 用户自己的简介 -->
				<view class="desc box-boder pa-l40">
					{{userInfo.personalProfile || ''}}
				</view>
				<!-- 关注收藏 -->
				<view class="box-thr ma-t10 item-center">
					<!-- 关注 -->
					<view class="le">
						<view class="focus t_c" @click="goFans(1)">
							<view class="">{{userInfo.followedNumber || 0}}</view>
							<view class="">关注</view>
						</view>
						<!-- 粉丝 -->
						<view class="fans t_c" @click="goFans(2)">
							<view class="">{{userInfo.fansNumber || 0}}</view>
							<view class="">粉丝</view>
						</view>
						<!-- 获赞与收藏 -->
						<view class="collection t_c">
							<view class="">{{userInfo.likedNumber || 0}}</view>
							<view class="">获赞</view>
						</view>
					</view>
					<!-- 设置按钮 -->
					<view @click="goSetting" class="ri iconfont iconicon-test"></view>
				</view>
			</view>
			<view :style="{height:swiper_height}" style="border-radius:30rpx 30rpx 0 0;overflow: hidden;box-sizing: border-box;padding: 0px 5px;background-color: #f5f5f5;" >
				<!-- 分类展示头 -->
				<swiperTabHead class="height" :flex="false" :tabBars="tabBars" 
					:tabIndex="tabIndex" @tabtap="tabtap"
					></swiperTabHead>
				<!-- <swiper :style="{height:swiper_height}" style="background-color: white;" :current="tabIndex" @change="tabChange"> -->
					<!-- <swiper-item style="box-sizing: border-box;padding: 7px 5px;" v-for="(tab,i) in tabBars" :key="i"> -->
						<mescroll-item ref="mescroll" :waterFullHeight="swiper_height" :i="i" 
							:index="tabIndex" :tabs="tabBars"
							@showUseroperation="showUseroperation"
							:kw="kw"
							></mescroll-item>
					<!-- </swiper-item> -->
				<!-- </swiper> -->
			</view>
		</view>
		<!-- 用于进行用户操作的弹出框 -->
		<uni-popup  class="pop" animation="false" ref="popup_useoperation" type="00" mask-click="false">
			<uni-popup-useoperation :opertop="opertop" 
				:txtid="txtid" 
				:operleft="operleft" type="success"  message="成功消息" duration="0" 
				:operType="kw"
				@closeUseroperation="closeUseroperation" @myDelArticle="myDelArticle"
				/>
		</uni-popup>
	</view>
</template>

<script>
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	//操作 修改个人的  文章
	import uniPopupUseoperation from '@/components/uni-popup/uni-popup-useoperation.vue'
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// 是否显示签到
				showsigin:false,
				// 视频滚动区域距离底部的距离
				mescrollBot:'200',
				// 用户的基本信息
				userInfo:{
					likes:0,
					gender:0, 
					personalProfile:'',
				},
				// 控制操作窗口的弹窗
				opertop:"300rpx",
				operleft:"100rpx",
				//用户长按要操作的文章id
				txtid:'',
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
				//用户手机
				user_phone:'', 
				
				// 用户要进行删除的坐标
				column:'',
				row:'',
				// 显示次数
<<<<<<< HEAD
				showNum:1,
=======
				showNum: 1
>>>>>>> master
			};
		},
		components:{
			swiperTabHead,
			MescrollItem,
			uniPopupUseoperation
		},
		onLoad(){
			let height = 0
			let _this = this
			this.swiper_height = uni.getSystemInfoSync().windowHeight - 20 + 'px'
		},
		onShow() {
			let _this = this 
			// 获取用户手机
			this.user_phone = uni.getStorageSync('user_phone')
			//获取当前用户的 H 币数量
			this.getUsInfo()
			// 如果用户已经进行了登陆则显示签到图标
			if(uni.getStorageSync('token')){
				this.showsigin = true
			}else{
				this.showsigin = false
			}
			//判断用户什么情况下进行下拉刷新
<<<<<<< HEAD
			if(this.showNum != 1){
				console.log('进行下拉更新')
				// 第二次进入在进行下拉
				this.$refs.mescroll.refash();
				
			}else{
				this.showNum = 2
			}
			
=======
			if (this.showNum != 1) {
				console.log('进行下拉更新');
				// 第二次进入在进行下拉
				this.$refs.mescroll.refash();
			} else {
				this.showNum = 2;
			}
>>>>>>> master
		},
		onHide() {
			// 当页面 隐藏之后 关闭操作弹窗
			this.$refs.popup_useoperation.close()
		},
		methods:{
			// 进行了删除操作，将该作品进行删除
			myDelArticle(){
				this.$refs.mescroll.swiperDelArticle(this.txtid)
				this.$refs.mescroll.refash();
			},
			
			
			// 跳转到设置界面
			goSetting(){
				uni.navigateTo({
					url:'/pages/my/setting'
				})
			},
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
			// 跳转到签到页面
			sigin(){
				console.log('进行签到')
				uni.navigateTo({
					url:'/pages/my/mySigin'
				})
			},
			// 控制签到弹窗的显隐
			showSigin(){
				this.$refs.popup_sigin.close()
			},
			// 控制用户操作弹窗的显隐
			showUseroperation(txtid,location){
				console.log('显示')
				this.opertop = JSON.parse(location).btntop
				this.operleft = JSON.parse(location).btnleft
				this.txtid = txtid
				this.$refs.popup_useoperation.open()
				
				// 用户长按要删除的第几个,将坐标存储起来
				// this.column = JSON.parse(location).column
				// this.row = JSON.parse(location).row
			},
			// 用户关闭弹窗
			closeUseroperation(){
				console.log('关闭')
				this.$refs.popup_useoperation.close()
			},
			// 跳转查看关注、粉丝
			goFans(num){
				
				// 判断是进入关注列表还是进入粉丝列表
				if(num == 1){
					console.log('跳转到 关注列表')
					// 进入 关注列表
					uni.navigateTo({
						url:`/pages/my/myFocus`
					})
				}else if(num == 2){
					console.log('跳转到 粉丝列表')
					// 进入 粉丝列表
					uni.navigateTo({
						url:`/pages/my/myFans`
					})
				}
			},
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
				this.kw = this.tabBars[this.tabIndex].id
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				this.tabIndex = index;
				this.kw = this.tabBars[this.tabIndex].id
			},
			close(num){
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

<style scoped lang="scss">
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
	  background-color: #786f68;
		color: white;
		.head{
			display: flex;
			padding-top: 150rpx;
			.userImg{
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				overflow: hidden;
		// iOS端圆角设置失效
				-webkit-backface-visibility: hidden;
				-webkit-transform: translate3d(0, 0, 0);
			}
			.right{
				width: 77%;
				position: relative;
				.box{
					box-sizing: border-box;
					padding-left: 20rpx;
					padding-top: 20rpx;
					padding-right: 20rpx;
					// padding-bottom: 20rpx;
					font-size: 28rpx;
					// color: white;
					.code{
						font-size: 20rpx;
					}
					.location{
						margin-top: 10rpx;
						display: flex;
						align-items: center;
						font-size: 25rpx;
						.t-icon{
							width: 19px;
							height: 19px;
							margin-right: 10rpx;
						}
						.province{
							margin-right: 10rpx;
						}
						.city{
							
						}
					}
					// 签到按钮
					.sigin{
						border-radius:10rpx;
						position: absolute;
						top: 10rpx;
						right: 28rpx;
						display: flex;
						image{
							width: 39rpx;
							height: 39rpx;
						}
					}
				}
				.right_uname{
					display: flex;
					.user_name{
						font-size: 41rpx;
						font-weight: bolder;
					}
					.user_phone{
						
					}
				}
			}
		}
		// 用户自己的简介
		.desc{
			margin: 20rpx;
			overflow:hidden; 
			text-overflow:ellipsis;
			display:-webkit-box;
			/* autoprefixer: off */
			-webkit-box-orient:vertical;
			/* autoprefixer: on */
			-webkit-line-clamp:1; 
		}
		// 关注 收藏
		.box-thr{
			margin-bottom: 30rpx;
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			// color: #5e5e5e;
			box-sizing: border-box;
			padding: 0 40rpx;
			.le{
				width: 50%;
				display: flex;
				justify-content: space-evenly;
			}
			.ri{
				box-sizing: border-box;
				padding: 7rpx 14rpx;
				border-radius: 20rpx;
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
	.iconicon-test{
		font-size: 20px;
	}
	
</style>
