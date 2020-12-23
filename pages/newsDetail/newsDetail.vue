<template>
	<view class="news">
		<view class="body">
			<!-- 新闻标题 -->
			<view class="title">
				{{newsInfo.title || ''}}
			</view>
			<view class="time">
				{{newsInfo.createTime || ''}}
			</view>
			<!-- 新闻图 -->
			<view class="news_img">
				<image :src="newsInfo.image" mode="widthFix"></image>
			</view>
			<!-- 新闻内容 -->
			<view class="news_conent">
				<rich-text :nodes="newsInfo.content"></rich-text>
			</view>
		</view>
		<!-- 转发 -->
		<view class="share panel-end item-center">
			<!-- <view class="le text-center">
				不喜欢
			</view> -->
			<view class="ri panel-between item-center">
				<button hover-class="none" open-type="share" 
					
					>
					<view class="img_box">
						<image src="/static/weixin.png" mode=""></image>
					</view>
				</button>
				<view class="img_box" @click="shareCircle">
					<image src="/static/pengyouquan.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 广告图 -->
		<!-- <view class="ad_img">
			广告
		</view> -->
		<!-- 相关推荐 -->
<!-- 		<view class="recommended box_size">
			<view class="head panel-center item-center">
				<view class="line"></view>
				<view class="tit">相关推荐</view>
				<view class="line"></view>
			</view>
			<view class="cont">
				<view class="item panel-between item_start"
					v-for="(item,index) in [1,2,3] "
					:key="index"
					>
					<view class="item_le">
						<view class="item_le_title ">
							不忘初心，践行担当 七一主题红细胞赋能活动
						</view>
						<view class="from">中国新闻网</view>
					</view>
					<view class="item_ri">
					</view>
				</view>
			</view>
		</view> -->
		
		<!-- 转发朋友圈操作提示 -->
		<view class="operation" v-if="operation_style">
			点击转发到朋友圈
			<view class="triangle"></view>
		</view>
		<view class="mask" 
			v-if="operation_style"
			@click="changeMask"
			>
		</view>
		
		<!-- 收藏提醒 赠送票提醒 -->
		<uni-popup ref="popup" type="message"><uni-popup-message type="success" :message="msg" :duration="2000"></uni-popup-message></uni-popup>
		<!-- 浏览进度环 -->
		<circle v-if="percent !== limit" class="circle" :limit="limit" :percent="percent"></circle>
		
		
	</view>
</template>

<script>
	// 浏览的进度环计时器
	let cirTime
	
	// 浏览进度环
	import circle from '@/components/circle.vue';
	// 收藏提醒
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
	export default {
		data() {
			return {
				newsInfo:'',
				// 显示遮罩层，然后点击后消失
				operation_style:false,
				// 当前用户的信息
				userInfo:'',
				// 浏览进度环，进度
				percent: 0,
				// 达到多少秒进行奖励票
				limit: 30,
				cirStatue: true,
				// 收藏，和浏览时长达标，弹出信息
				msg: '',
			};
		},
		components:{
			circle,
			uniPopupMessage,
		},
		onLoad(options) {
			console.log('新闻详情页 options',options)
			// 请求新闻详情
			this.getNewDetail(options.newsId)
			// 用于显示分享到朋友圈
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
			// 获取当前用户的个人信息
			this.getUsInfo()
		},
		onHide() {
			// 当用户退出页面之后，清除定时器
			clearInterval(cirTime);
			console.log('页面隐藏')
		},
		onUnload() {
			console.log('页面卸载')
			clearInterval(cirTime);
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target);
			} else {
				// 分享tabbar页面，直接运用小程序原生菜单中的分享按钮
				uni.showShareMenu({});
			}
			// return {
			// 	title: '首页分享',
			// 	path: '/page/list/list'
			// }
		},
		// 页面滚动
		onPageScroll() {
			// 当用户进行滑动开启定时器 percent
			// 达到一定时间，奖励票数
			// 弹出信息提示
			if (this.cirStatue) {
				this.seeTxtAward();
				this.cirStatue = false;
			}
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
			// 用户浏览作品，倒计时奖励
			seeTxtAward() {
				cirTime = setInterval(() => {
					// console.log(1);
					if (this.percent !== this.limit) {
						this.percent++;
					} else {
						// 弹出，提示框
						this.msg = '恭喜浏览作品获得1票';
						this.$refs.popup.open();
						// 请求分享的接口增加票数
						this.api._post(
							`user/increaseGold?userId=${this.userInfo.userId}&goldNumber=1`,
							{
							
							},
							(res) => {
								console.log('浏览成功，加票')
								
							}
						);
						
						setTimeout(() => {
							this.$refs.popup.close();
						}, 1500);
						clearInterval(cirTime);
					}
				}, 1000);
			},
			
			// 显示转发到朋友圈的操作提示
			showOperation(){
				console.log('显示转发朋友圈提示')
			},
			changeMask(){
				this.operation_style = !this.operation_style
			},
			// 请求新闻详情
			getNewDetail(newsId){
				this.api._get(
					`news/find/${newsId}`,
					{
						
					},
					(res) => {
						console.log('新闻详情',res)
						this.newsInfo = res.data
					}
				);
			},
			// 分享到朋友圈
			shareCircle(){
				this.operation_style = !this.operation_style
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #F5F4F9;
	}
</style>

<style lang="scss">
	button{
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
	image{
		width: 100%;
		height: 100%;
	}
	.news{
		box-sizing: border-box;
		padding: 20rpx 22rpx;
		.body{
			box-sizing: border-box;
			background-color: #FFFFFF;
			padding: 40rpx 28rpx;
			.title{
				font-size: 32rpx;
				margin-bottom: 24rpx;
			}
			.time{
				color: #999999;
				font-size: 24rpx;
				margin-bottom: 40rpx;
			}
			.news_img{
				margin-bottom: 40rpx;
			}
			.news_conent{
				margin-top: 40rpx;
			}
		}
		.share{
			margin-top: 40rpx;
			height: 66rpx;
			.le{
				color: #999999;
				width: 182rpx;
				line-height: 66rpx;
				background-color: #FFFFFF;
				border-radius: 32rpx;
			}
			.ri{
				.img_box{
					margin-left: 20rpx;
					width: 138rpx;
					height: 66rpx;
				}
			}
		}
		.ad_img{
			height: 196rpx;
			background-color: blue;
			margin-bottom: 42rpx;
			margin-top: 42rpx;
		}
		.ad_img{
			
		}
		.recommended{
			background-color: #FFFFFF;
			height: 844rpx;
			padding: 40rpx 26rpx 30rpx 30rpx;
			border-radius: 8rpx;
			.head{
				.line{
					width: 50rpx;
					height: 1rpx;
					background-color: #D8D8D8;
				}
				.tit{
					margin: 0rpx 12rpx;
				}
			}
			.cont{
				.item{
					padding: 26rpx 0rpx;
					border-bottom: 1rpx solid #E3E3E3;
					.item_le{
						width: 364rpx;
						.item_le_title{
							font-size: 32rpx;
						}
						.from{
							margin-top: 70rpx;
							color: #999999;
							font-size: 24rpx;
						}
					}
					.item_ri{
						width: 242rpx;
						height: 198rpx;
						background-color: red;
						border-radius: 16rpx;
					}
				}
				.item:last-child{
					border:none;
				}
			}
		}
		// 提示操作
		.operation{
			width: 297rpx;
			line-height: 59rpx;
			background-color: white;
			position: fixed;
			top: 30rpx;
			right: 24rpx;
			z-index: 10;
			text-align: center;
			border-radius: 20rpx;
			.triangle{
				position: absolute;
				top: -28rpx;
				right: 123rpx;
				width: 0;
				height: 0;
				border-left: 9px solid transparent;
				border-right: 9px solid transparent;
				border-bottom: 15px solid white;
			}
		}
		// 遮罩层
		.mask{
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: gray;
			opacity: .7;
		}
		.circle {
			position: fixed;
			right: 10rpx;
			top: 10rpx;
		}
	}
</style>
