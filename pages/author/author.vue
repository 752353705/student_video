<template>
	<view class="author">
		<view class="height" style="background-image: linear-gradient(to bottom, #192936, #786f68);height: 257px;" >
			<!-- 头部 -->
			<view class="head pa-r40 pa-b20 pa-l40  box-boder">
				<view class="userImg " @click="jump">
					<image class="w-100 h-100"  :src="avatarItem.avatarUrl || '/static/avatarUrl.png'" mode=""></image>
				</view>
				<view class="right ma-l10">
					<view class="right_uname item-end ma-l20" >
						<view class="user_name ma-r20" @click="jump">
							{{avatarItem.userName || '昵称' }}
						</view>
					</view>
					<view class="box">
						<view class="rightBtm">
							<view v-if="!avatarItem.followed" class="focusBtn t_c" @click="focusOn">关注</view>
							<view v-else class="focusBtn t_c" @click="focusOn">已关注</view>
						</view>
						<!-- <view class="code">{{user_phone.slice(0,3) || '' }}****{{user_phone.slice(7) || ''}}</view> -->
						<view class="location">
							<view class="t-icon" :class=" avatarItem.gender == 2 ?  'iconbianzu' : 'iconziyuan' ">
							</view>
							<view class="province">{{avatarItem.province || '' }}</view>
							<view class="city">{{avatarItem.city || '' }}</view>
						</view>
					</view>
				</view>
			</view>
					
			<!-- 用户自己的简介 -->
			<view class="desc box-boder pa-l40">
				{{avatarItem.personalProfile || ''}}
			</view>
			
			<!-- 关注收藏 -->
			<view class="box-thr ma-t10 item-center">
				<!-- 关注 -->
				<view class="le">
					<view class="focus t_c" @click="goFans(1)">
						<view class="">{{avatarItem.followedNumber || 0}}</view>
						<view class="">关注</view>
					</view>
					<!-- 粉丝 -->
					<view class="fans t_c" @click="goFans(2)">
						<view class="">{{avatarItem.fansNumber  || 0}}</view>
						<view class="">粉丝</view>
					</view>
					<!-- 获赞与收藏 -->
					<view class="collection t_c">
						<view class="">{{avatarItem.likedNumber || 0}}</view>
						<view class="">获赞</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<!-- 作者相关的视频 -->
		<!-- <view class="content" style="height:643px;border-radius:30rpx 30rpx 0 0;overflow: hidden;"> -->
		<view :style="{height:swiper_height}" style="border-radius:30rpx 30rpx 0 0;overflow: hidden;box-sizing: border-box;padding: 0px 5px;background-color: #f5f5f5;" >
			<!-- 头部 滑动 -->
			<swiperTabHead class="height" :flex="false" :tabBars="tabBars" 
				:tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
			<!-- 作品展示 -->
			<!-- <swiper :style="{height:swiper_height}"  :current="tabIndex" @change="tabChange"> -->
				<!-- <swiper-item style="box-sizing: border-box;padding: 0 10rpx;" v-for="(tab,i) in tabBars" :key="i" > -->
					<mescroll-item :waterFullHeight="swiper_height" style="padding-top: 0;" 
						:i="i" :index="tabIndex" :tabs="tabBars"
						:kw="kw" :uId='avatarItem.userId'
						></mescroll-item>
				<!-- </swiper-item> -->
			<!-- </swiper> -->
		</view>
	</view>
</template>

<script>
	// 使用 mescroll
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import wfallsFlow from '../../components/wfallsflow.vue'
	// 引入tabHead 切换
	import swiperTabHead from "../../components/swiper-tab-head.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// focusNum:'',
				// fansNum:'',
				// 传递过来的用户信息
				avatarItem:{
					avatarUrl:'/static/avatarUrl.png',
					// personalProfile:''
				},
				// 用户的头像
				swiper_height: "", // 需要固定swiper的高度
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					// { name:"视频",id:"otherVideo" },
					{ name:"图文",id:"otherTxt" },
					// { name:"跳蚤市场",id:"otherUsed" },
				],   
				// 请求数据的关键词
				kw:"otherTxt",
				act:0,
				// 作者的个人作品
				list:[],
				focus:false,
				// userId:'',
			};
		},
		components:{
			wfallsFlow,
			MescrollItem,
			swiperTabHead
		},
		onLoad(option) {
			console.log('查看用户信息 option',JSON.parse(option.item))
			// 用户跳转过来时的信息
			this.avatarItem = JSON.parse(option.item) 			
			let userId = this.avatarItem.userId
			// this.avatarItem = {uId:100}
			
			// 设置导航栏
			// uni.setNavigationBarTitle({
			// 	title:this.avatarItem.userName
			// })
			
			// 根据用户 id 发请求获取详细数据
			this.api._get(`user/otherUserInfo/${this.avatarItem.userId}`,{},(res)=>{
				console.log('获取其他用户的信息 res',res)
				this.avatarItem = res.data 	
				this.avatarItem.userId = userId
			})
			
			// 测试
			this.swiper_height = uni.getSystemInfoSync().windowHeight -20 + 'px'
			// console.log('屏幕高度',uni.getSystemInfoSync().windowHeight)
			
			// console.log('作者页')
			// 显示正在加载弹窗
			uni.showLoading({
			   title: '加载中'
			});
		
			
		},
		onReady() {
			uni.hideLoading();
		},
		onShow() {
			
			// 获取用户的粉丝
				// this.getOtherFansNum()
			// 获取用户的关注
				// this.getOtherFocusNum()
			// 获取用户的赞和收藏  

			
			
			
		},
		methods:{
		// 获取用户的粉丝人数
		// getOtherFocusNum(){
		// 		// 如果用户进行了登录操作，获取用户的个人信息
		// 	if(uni.getStorageSync('token')){
		// 		this.api._get(
		// 		'follow/otherUserFollowedCount',{
		// 			userId:this.avatarItem.userId
		// 		},(res)=>{
		// 			console.log('获取用户当前的 粉丝数量',res)
		// 			this.focusNum = res.data 
		// 		})
		// 	}
		// },
		// 获取当前用户关注数量
		// getOtherFansNum(){
		// 		// 如果用户进行了登录操作，获取用户的个人信息
		// 	if(uni.getStorageSync('token')){
		// 		this.api._get(
		// 		'follow/otherUserFansCount',{
		// 			userId:this.avatarItem.userId
		// 		},(res)=>{
		// 			console.log('获取用户当前的 关注人数',res)
		// 			this.fansNum = res.data  
		// 		})
		// 	}
		// },
			
			
			// 点击聊天图标，跳转到聊天室
			goChart(){
				uni.navigateTo({
					url:`/pages/chart/chartRoom?uname=${'小红'}`
				})
			},
			// 判断当前用户是否对其进行了关注
			focusOn(){
				let _this = this 
				console.log('关注')
				if(!this.focus){
					//未关注 进行关注
					this.api._post(
						'follow',
						{
							followedId: _this.avatarItem.userId //被关注的 作者id
						},
						function(res) {
							// console.log('进行关注成功',res);
							_this.avatarItem.followed = !_this.avatarItem.followed
						}
					);
				}else{
					// 已关注，再次点击表示是否取消关注
					uni.showModal({
						content: '确认不在关注',
						success: function(res) {
							if (res.confirm) {
								// console.log('用户点击确定');
								_this.api._post(
									'follow',
									{
										followedId: _this.avatarItem.userId //被关注的 作者id
									},
									function(res) {
										console.log('进行关注成功', res);
										_this.avatarItem.followed = true;
									}
								);
					
								// _this.focus = true //用户取消关注
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			// 切换作品以及关注
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
				// console.log('滑动的 id',this.tabBars[this.tabIndex].id)
				this.kw = this.tabBars[this.tabIndex].id
				// console.log('kw',kw)
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				this.tabIndex = index;
				this.kw = this.tabBars[this.tabIndex].id
			},
			goFans(num){
				// 判断是进入关注列表还是进入粉丝列表
				if(num == 1){
					// 进入 关注列表
					uni.navigateTo({
						url:`/pages/my/myFocus?userId=${this.avatarItem.userId}`
					})
				}else if(num == 2){
					// 进入 粉丝列表
					uni.navigateTo({
						url:`/pages/my/myFans?userId=${this.avatarItem.userId}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.author{
	width: 100%;
	color: white;
	background-color: #786f68;
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
				font-size: 28rpx;
				.rightBtm {
					// margin-top: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					image {
						width: 60rpx;
						height: 60rpx;
					}
					.focusBtn {
						width: 80%;
						height: 40rpx;
						border-radius: 40rpx;
						color: white;
						background-color: red;
						padding: 10rpx 0;
					}
				}
				// .code{
				// 	font-size: 20rpx;
				// }
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
		// margin: 20rpx;
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
		box-sizing: border-box;
		padding: 0 40rpx;
		.le{
			width: 50%;
			display: flex;
			justify-content: space-evenly;
		}
	}
	.content{
		background-color: white;
	}
	.authorMsg{
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		padding: 0 40rpx;
	}
}
</style>
