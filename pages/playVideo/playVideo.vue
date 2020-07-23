<template>
	<view class="playVideo">
		<swiper 
			:indicator-dots="false" :duration="200" :vertical="true" 
			:current="videoIndex" @change="handleSlider" 
			style="height: 100%;"
		>
			<block v-for="(item, index) in videoData" :key="index">
				<swiper-item>
					<view class="uni_vdplayer">
						
						<!-- 返回上一级页面的按钮 -->
						<image class="back" @click="back" src="/static/back.png" mode=""></image>
						
							<!-- :style=" {'width':videoW ,'height': videoH}" -->
						<video
							:id="'myVideo' + index"
							ref="myVideo"
							class="player-video"
							:src="item.src"
							:loop="true"
							:show-play-btn="false" 
							:show-center-play-btn="false"
							:objectFit="cover"
							@click="handleClicked(index)"
							
						></video>
						<!-- danmu-btn :danmu-list="danmu" -->
						<!-- @click="handleClicked(index)" -->
						<!-- 中间播放按钮 -->
						<view v-if="btnShow" class="vd-cover flexbox" @click="handleClicked(index)" >
							<!-- <text v-if="!isPlay" class="iconfont icon-bofang"></text> -->
							<image v-if="!isPlay" src="/static/play.png" mode=""></image>
							<image v-else src="/static/suspended.png" mode=""></image>
						</view>
						
						<!-- 返回上一级页面的按钮 -->
						<image class="back" @click="back" src="/static/back.png" mode=""></image>
						
						<view class="foot">
							<!-- 头部 -->
							<view class="foot_head">
								<view class="foot_head_box"  @click="goAuthor">
									<!-- 发布视频者的头像 -->
									<view class="foot_head_img" ></view>
									<!-- 名称 -->
									<view>作者名</view>
								</view>
								<!-- 立即关注 -->
								<span @click="focusOn" v-if="focus">关注</span>
								<span @click="focusOn" v-else>已关注</span>
							</view>
							<!-- 作品简介 -->
							<view class="video_msg" style="color:white">
								<text>作品好作品好作品好作品好作品好</text>
							</view>
						</view>

						<!-- 右侧 -->
						<view class="right">
							<!-- 送礼物 -->
							<view class="gift icon" @click="sendGift(index)">
								<image src="/static/gift.png" mode=""></image>
							</view>
							<!-- 喜欢 -->
							<view class="like icon" @click="getLike(index)">
								<image v-if="!like" src="/static/like.png" mode=""></image>
								<image v-else src="/static/like_active.png" mode=""></image>
								<view class="icon_num">177.3W</view>
							</view>
							<!-- 评论   点击评论显示评论弹出框-->
							<view class="comments icon" @click="showPop(index)">
								<image src="/static/comments.png" mode=""></image>
								<view class="icon_num">{{commentsNum}}</view>
							</view>
							<!-- 转发 -->
							<view class="forwarding icon" @click="confirmShare(index)">
								<image src="/static/forwarding.png" mode=""></image>
								<view class="icon_num">2.4W</view>
							</view>
					<!-- 		<view class="forwarding icon" >
								<button type="default" open-type="share" plain="false">
									<image src="/static/weixin.png" mode=""></image>
									<view class="icon_num">2.4W</view>
								</button>
							</view> -->
						</view>
						
					</view>
					
					<!-- 生成海报图 -->
					<qrcode-poster ref="poster" title="海报标题"
						subTitle="海报副标题" 
						price="10"
						@close = "close(index)"
						>
					</qrcode-poster>
					
					<!-- 送礼物弹出框 -->
					<uni-popup ref="popupGifts" type="share" @change="change">
						<uni-popup-gifts title="礼物" @select="selectgift"></uni-popup-gifts>
					</uni-popup>
					<!-- 评论弹出框 -->
					<uni-popup ref="popupComments" type="share" @change="change">
						<uni-popup-comments @changeCommentsNum="changeCommentsNum" title="评论" :videoId="videoId"  @select="select" ></uni-popup-comments>
					</uni-popup>
					<!-- 转发弹出框 -->
					<uni-popup ref="popupShare" type="share" @change="change">
						<uni-popup-share title="分享到" @select="select"></uni-popup-share>
					</uni-popup>
				</swiper-item>
				
				
			</block>
		</swiper>
	</view>
</template>

<script>
let timer = null;
// 生成海报图进行转发
import QrcodePoster from "@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue"
// 引入送礼物、评论、转发弹出框
import userComment from '../../components/user-comment.vue'
import uniPopupShare from '../../components/uni-popup/uni-popup-share.vue'
import uniPopupComments from '../../components/uni-popup/uni-popup-comments.vue'
import uniPopupGifts from '../../components/uni-popup/uni-popup-gifts.vue'
export default {
	data() {
		return {
			// img:'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg',
			videoId:'',//播放视频的Id
			videoData:[],
			videoIndex: 0,
			videoW:'',
			videoH:'',
			// vlist: videoJson,//播放视频的列表组
			isPlay: true, //当前视频是否播放中
			clickNum: 0, //记录点击次数
			btnShow: false, //控制按钮的显示隐藏
			like: false ,//判断用户是否喜欢该视频
			show_pop:false ,//控制评论弹出层显示隐藏
			videoContextList:'' ,//储存所有的视频区
			focus:true,  //判断是否进行关注  true 未关注  false 已关注
			commentsNum:'',
			danmu:[{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1,
						top:10
					},{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 1
					}],
		};
	},
	components: {
		userComment,
		uniPopupShare,
		uniPopupComments,
		uniPopupGifts,
		QrcodePoster
	},
	onLoad(option) {
		console.log('onload 进行加载 获取视频的 videoId ==》 ',option.videoId)
		
		// 在这里获取用户在首页点击进来的 视屏ID 用于发起请求，获取视频
		this.videoId = option.videoId || '842c376a462548f187d8c37df8f2eab7'
		let _this = this
		
		
		// 用于显示分享到朋友圈
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		})
		
		// 获取手机屏幕大小
		// uni.getSystemInfo({
		// 	success: function (res) {
		// 		console.log('获取手机屏幕大小',res.windowHeight,res.windowWidth)
		// 		_this.videoH = res.windowHeight + 'px'
		// 		_this.videoW = res.windowWidth + 'px'
		// 	}
		// });
		
	},
	onShow() {
		// this.videoId = "842c376a462548f187d8c37df8f2eab7"
		let _this = this
				// 当用户进行转发的时候，根据 id 判断 给用户显示相应的视频
				// 根据传递过来的数据，请求相应的视频，并将其赋值到列表
				
				// 根据页面传递过来的 视频index
				// this.videoIndex = parseInt(option.index);
				// 显示评论弹窗
				// this.$refs.popupComments[0].open()	
				// this.videoData = [{src:'https://outin-f59d57597eae11ea9e5100163e1c35d5.oss-cn-shanghai.aliyuncs.com/842c376a462548f187d8c37df8f2eab7/c09881cd47414f8cadbd94b9a0f1641a-7f95544d379950865b7adbe384980872-fd.mp4?Expires=1595387276&OSSAccessKeyId=LTAI4FfD63zoqnm6ckiBFfXZ&Signature=12mN%2B0M4E%2FqK3rXNUNHa1wrtwWE%3D'}]
				// 	_this.init()
		// 根据页面点击后传递过来的videoID，进行播放
				this._post("vod/getPlayInfo",{
					"videoId":_this.videoId
				},function(res){
					console.log('获取进行播放的视频 res ===>', res)
					
					// 将返回的视频播放地址 进行赋值  而后播放
					_this.videoData = [{src:res.data.playUrlList[0]}]
					_this.init()
					
				})
	},
	onReady() {
		// console.log('播放 onReady')
		
		// this.videoContext = uni.createVideoContext('myVideo0');
		console.log('video onready',this.videoContext)
		// 用户点击进入后就进行播放
		// this.videoContext.play();
		
		// 刷新页面
		
		
	},
	
	// 触发页面的转发事件
	onShareAppMessage:function(res){
		console.log('playVideo 进行转发 设置转发内容')
		
	
		
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log('按钮进行的转发',res)
		}
		return {
			title: '转发到好友和群聊',
			path: '/pages/playVideo/playVideo?videoId=842c376a462548f187d8c37df8f2eab7',
			imageUrl: '自定义转发图片',
			desc:'自定义描述'
		}
	},
	// 触发页面中的分享到朋友圈的功能
	onShareTimeline:function(){
		console.log('playVideo 进行转发 到朋友圈')
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log('按钮进行的朋友圈转发',res)
		}
		return {
			title: '自定义转发标题',
			query: `videoId=842c376a462548f187d8c37df8f2eab7`,
			// imageUrl:'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
		}
	},
	
	
	
	methods: {
		// 当海报图生成之后，关闭分享弹窗
		close(index){
			console.log('海报图生成 关闭分享弹窗 this.$refs.popupShare ===>',this.$refs.popupShare)
			this.$refs.popupShare[index].close()
		},
		
		// 控制页面评论数的改变
		changeCommentsNum(num){
			this.commentsNum = num
		},
		
		// 返回上一页面
		back(){
			console.log('返回上一级页面')
			
			// 直接跳转到作品列表
			uni.switchTab({
				url:"/pages/list/list"
			})
			
		},
		// 点击用户头像跳转到发布者的详情页
		goAuthor(){
			uni.navigateTo({
			    url: "/pages/author/author"
			});
		},
		// 判断用户是否进行关注
		focusOn(){
			let _this = this
			if(this.focus){
				// 用户未关注
				this.focus = false
			}else{
				// 用户已经进行了关注，此时再进行点击表示用户是否要取消关注
				uni.showModal({
					content:"确认不在关注",
					success:function(res){
						if (res.confirm) {
							console.log('用户点击确定');
							_this.focus = true //用户取消关注
						} else if (res.cancel) {
								console.log('用户点击取消');
						}
					}
				})
				
			}
		},
		init() {
				this.videoContextList = []
				for(var i = 0; i < this.videoData.length; i++) {
						// this.videoContextList.push(this.$refs['myVideo' + i][0])
						this.videoContextList.push(uni.createVideoContext('myVideo' + i, this));
				}
				console.log('init初始化 获取视频内容列表this.videoContextList ===> ',this.videoContextList)
				
				// 将第一个视频进行播放
				this.videoContextList[0].play()
				// 按钮状态为播放
				this.isPlay = true
		},

		// 滑动切换
		handleSlider(e) {
			let curIndex = e.detail.current;
			console.log('videoIndex',this.videoIndex)
			if (this.videoIndex >= 0) {
				this.videoContextList[this.videoIndex].pause();
				this.videoContextList[this.videoIndex].seek(0);
				this.isPlay = false;
			}
			if (curIndex === this.videoIndex + 1) {
				this.videoContextList[this.videoIndex + 1].play();
				this.isPlay = true;
			} else if (curIndex === this.videoIndex - 1) {
				this.videoContextList[this.videoIndex - 1].play();
				this.isPlay = true;
			}
			this.videoIndex = curIndex;
		},
		// 播放
		play() {
			console.log('播放 play');
			// this.videoContextList[index].play()
			// this.videoContext.play();
			this.isPlay = true;
		},
		// 暂停
		pause(index) {
			console.log('暂停 pause');
			this.videoContextList[index].pause()
			this.videoContext.pause();
			this.isPlay = false;
		},
		
		// 点击视频事件
		handleClicked(index) {
			console.log('点击播放第' +  index + '个视频');
			let ctx = this.videoContextList[index]
			if (timer) {
				clearTimeout(timer);
			}
			this.clickNum++
			timer = setTimeout(() => {
				if (this.clickNum >= 2) {
					// console.log('双击视频 进入全屏');
					console.log('双击视频 点亮红心');
					this.like = true
					
// 并且要显示 红心的动画效果
					
					
					
					
					// ctx.requestFullScreen()
					
				} else {
					console.log('单击视频');
					this.btnShow = true;
					if (this.isPlay) {
						// this.pause(index)
						console.log('暂停')
							// this.videoContextList[index].pause()
							// this.videoContext.pause();
						this.isPlay = false
						ctx.pause();
					} else {
						// this.play(index)
						ctx.play();
						console.log('播放')
						this.isPlay = true
						// 三秒只有隐藏播放按钮
						setTimeout(() => {
							this.btnShow = false;
						}, 1000);
					}
				}
				this.clickNum = 0
			}, 300);
		},

		// 喜欢
		handleIsLike(index) {
			let vlist = this.vlist;
			vlist[index].islike = !vlist[index].islike;
			this.vlist = vlist;
		},
// 控制弹窗的操作
		
		// 控制送礼物的弹窗
		sendGift(index){
			
			console.log('送礼物',index)
			this.$refs.popupGifts[this.videoIndex].open()
			
		// App端
			// const subNvue=uni.getSubNVueById('gift');   //获取 
			// subNvue.show()  // 显示
			// subNvue.hide() //隐藏
		},
		selectgift(e, done){
			console.log('送礼物')
			uni.showModal({
			    title: '提示',
			    content: `您确定赠送${e.item.text}吗`,
			    success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定',uni.getProvider,);
							// 然后调用支付功能进行支付操作
				// 微信小程序支付
							uni.requestPayment({
							    provider: 'wxpay', //服务提供商 通过uni.getProvider获取
							    timeStamp: String(Date.now()), //时间戳
							    nonceStr: 'A1B2C3D4E5', //随机字符串
									// 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
							    package: 'prepay_id=wx20180101abcdefg',
							    signType: 'MD5', //签名算法
							    paySign: 'appid=wxd930ea5d5a258f4f&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA',  //签名
							    success: function (res) {
							        console.log('success:' + JSON.stringify(res));
							    },
							    fail: function (err) {
							        console.log('fail:' + JSON.stringify(err));
							    }
							});
						} else if (res.cancel) {
								console.log('用户点击取消');
						}
			    }
			});
		},
		// 控制评论弹窗
		showPop(){
			console.log('评论窗口 ref',this.$refs.popupComments)
			this.$refs.popupComments[this.videoIndex].open()		
			// 当用户打开评论窗口之后，当前视频暂停播放，关闭之后视频继续播放		
		},
		
		// 控制转发弹窗
		confirmShare() {
			this.$refs.popupShare[this.videoIndex].open()
			// 当打开转发窗口之后当前视频暂停，取消之后视频继续播放		
		},
		//分享海报
		sharePoster(){
			//获取带参数二维码
			this.is_show_model = false
			
			// 将要在海报图中进行绘制的二维码传送过去
			this.$refs.poster[0].showCanvas('https://oss.zhangyubk.com/cmqrcode.jpg')
		},
		/**
		 * 转发时选择内容
		 */
		select(e, done) {
			// uni.showToast({
			// 	title: `您选择了第${e.index+1}项：${e.item.text}`,
			// 	icon: 'none'
			// })
			console.log('进行转发 生成海报图分享')
			// 生成海报图进行分享
			this.sharePoster()
			
			
			
		},
		
		// 点击红心喜欢该视频
		getLike() {
			this.like = !this.like;
		},
		/**
		 * popup 状态发生变化触发
		 * @param {Object} e
		 */
		change(e) {
			console.log('popup ' + e.type + ' 状态', e.show)
			
			let ctx = this.videoContextList[this.videoIndex]
			
			console.log('获取视频播放 videoContextList',this.videoContextList)
			
			// 当弹窗消失之后自动对视频进行播放
			if(e.show){
				// 当弹窗进行显示之后暂停当前视频
				this.isPlay = false
				console.log('弹窗显示 暂停视频 isPlay ==》',this.isPlay)
				ctx.pause();
			}else{
				this.isPlay = true
				ctx.play();
				console.log('弹窗隐藏 播放视频 isPlay ==》',this.isPlay)
				// if(e.type == 'share'){
				// 	// console.log('share 类型')
				// 	this.isPlay = false
				// }
			}
			
		},
		
		// handleVideoComment() {
		// 	this.$refs.videoComment.show();
		// },

		// // 显示购物车
		// handleVideoCart(index) {
		// 	this.$refs.videoCart.show(index);
		// },

		
	}
};
</script>

<style lang="less">
.playVideo {
	// width: 100%;
	// height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	.uni_vdplayer {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: black;
		.back{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 67rpx;
			left: 30rpx;
		}
		video {
			width: 100%;
			height: 100%;
			position: static;
			// position: absolute;
			// top: 1rpx;
			// top: 50%;
			// transform: translateY(-50%);
		}
		.vd-cover {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100rpx;
			height: 100rpx;
			image {
				width: 100rpx;
				height: 100rpx;
			}
		}
		.full {
			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.foot {
			width: 100%;
			height: 280rpx;
			// background-color: red;
			position: absolute;
			bottom: 0;
			box-sizing: border-box;
			padding: 20rpx 40rpx 10rpx;
			.foot_head {
				width: 100%;
				height: 100rpx;
				// background-color: green;
				color: white;
				display: flex;
				justify-content: start;
				align-items: center;
				.foot_head_box{
					display: flex;
					align-items: center;
					.foot_head_img {
						width: 60rpx;
						height: 60rpx;
						background-color: yellow;
						border-radius: 50%;
						margin-right: 20rpx;
					}
				}
				
				span{
					display: inline-block;
					background-color: red;
					box-sizing: border-box;
					padding: 10rpx 20rpx;
					font-size: 20rpx;
					border-radius: 30rpx;
					margin-left: 20rpx;
				}
			}
		}
		.right {
			width: 100rpx;
			height: 439rpx;
			background-color: transparent;
			position: absolute;
			right: 23rpx;
			top: 62%;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			button[type=default][plain] {
				border: 0px solid #353535;
				background-color: transparent;
			}
			button{
				position: relative;
				display: block;
				
				box-sizing: border-box;
				font-size: 20rpx;
				color: white;
				text-align: center;
				text-decoration: none;
				line-height: 30rpx;
				overflow: hidden;

			}
			.forwarding{
				width: 90px;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				justify-content: center;
				// padding: 10px 0;
				align-items: center;
			}
			.icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: white;
				font-size: 20rpx;
				.icon_num{
					margin-top: 10rpx;
				}
				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
}
</style>
