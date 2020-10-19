<template>
	<view class="setting">
		<view class="head">
			<view class="le">
				<view class="name">{{userInfo.userName}}</view>
				<view class="phone" v-if="user_phone">{{user_phone.slice(0,3)}}****{{user_phone.slice(7)}}</view>
				<view style="font-size: 46rpx;" class="phone" @click="jump" v-else>登录</view>
			</view>
			<view class="ri">
				<image :src="userInfo.avatarUrl || '/static/avatarUrl.png' " mode=""></image>
			</view>
		</view>
		<!-- 展示框 -->
			<view class="content">
		      <view 
						v-for="(item,index) in useList" 
						:key="index"
						@click="open(index)"
						class="list_item" 
					>
						<view class="left_icon">
							 <text class="t-icon" :class="item.icon"  ></text>
							 <text>{{item.txt}}</text>
						</view>
						<view v-if="index !== 1" class="iconfont iconfanhui"></view>
						<text v-else>
							{{userInfo.goldNumber || '0' }}
							<text class="iconfont iconfanhui"></text>
						</text>
		      </view>
			</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				userInfo:'',
				user_phone:'',
				useList:[
					{icon:"iconweibiaoti--",txt:'个人资料'},
					{icon:"iconzu",txt:'H币'},
					{icon:"iconIcon",txt:'充值'},
					{icon:"iconwodeshoucang",txt:'我的收藏'},
					{icon:"iconliulanjilu-tianchong",txt:'浏览记录'},
					{icon:"icontuichudenglu",txt:'退出登录'},
					// {icon:"iconpaotuibeifen",txt:'跑腿'},
				],
			}
		},
		components:{
			
		},
		onLoad() {
			
		},
		onShow() {
			this.user_phone = uni.getStorageSync('user_phone')
			this.getUsInfo()
		},
		methods:{
			// 跳转到注册页
			jump(){
				console.log('跳转页面')
				uni.navigateTo({
				    url: "/pages/login/login"
				});
			},
			// 获取用户的个人资料
			getUsInfo(){
				if(uni.getStorageSync('token')){
					// 如果用户进行了登录操作，获取用户的个人资料
					this.api._get(
					'user/info',{},(res)=>{
						console.log('获取用户当前的 H币',res)
						this.userInfo = res.data
						// this.userInfo = res.data
					})
				}
			},
			
			// 进行弹窗的控制
			open(num){
				let _this = this 
				
				if(!this.user_phone){
					// 如果当前没有了电话号
					uni.navigateTo({
					    url: "/pages/login/login"
					});
					return
				}
				
				if(num === 0){
					// 跳转到资料编辑
					uni.navigateTo({
						url:'/pages/myData/myData'
					})
					// this.$refs.popup_user.open()
				}else if(num === 1){
					// 用户进入 消费记录
					uni.navigateTo({
						url:"/pages/my/myWallet"
					})
				}
				else if(num === 2){
					// 用户跳转到 充值界面
					uni.navigateTo({
						url:`/pages/recharge/recharge?money=${this.userInfo.goldNumber}&userId=${this.userInfo.userId}`
					})
				}
				else if(num === 5){
					// 显示退出登录
					uni.showModal({
						title:"提示",
						content:"确定退出吗",
						success:function(res){
							if (res.confirm) {
								// 发起 退出请求
								_this.api._post("auth/logout",{},function(res){
									// 如果返回成功，清除本地缓存，并跳转到首页
									// uni.clearStorageSync()
									_this.userInfo.userName = ''
									// _this.userInfo = []
									_this.userInfo.avatarUrl = '/static/avatarUrl.png'
									// 显示的绑定手机号也进行切换
									_this.user_phone = ''
									
									
									uni.removeStorageSync('user_name');
									uni.removeStorageSync('user_img');
									uni.removeStorageSync('token');
									uni.removeStorageSync('user_phone');
									
									
								})
							} else if (res.cancel) {
								// 不进行操作弹出框取消即可
							}
						},
						fail:function() {
							console.log('调用接口失败')
						}
					})
				}
				else if(num === 3){
					// 用户进入我的收藏
					uni.navigateTo({
						url:"/pages/my/myCollection"
					})
				}
				else if(num === 4){
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
		}
	}
</script>

<style scoped lang="less">
	.setting{
		box-sizing: border-box;
		padding-left: 44rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-right: 44rpx;
		.head{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
			.le{
				.name{
					font-size: 39rpx;
					font-weight: bold;
				}
				.phone{
					margin-top: 10rpx;
					color: #797979;
					font-size: 23rpx;
				}
			}
			.ri{
				width: 125rpx;
				height: 125rpx;
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
		}
		
		// 内容区样式
		.content{
			font-size: 30rpx;
			.list_item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 97rpx;
				.left_icon{
					display: flex;
					align-items: center;
					.t-icon{
						width:25px ;
						height:25px ;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
