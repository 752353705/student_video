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
						<!-- <cover-view class="back">
						  <navigator open-type="navigateBack">
						    <cover-image src="/static/back.png" /> <!--填写自己的图标地址-->
						  </navigator>
						</cover-view> -->
						
						
						<video
							:id="'myVideo' + index"
							ref="myVideo"
							class="player-video"
							:src="item.src"
							:loop="true"
							:show-play-btn="false" 
							:controls="false"
							:show-center-play-btn="false"
							objectFit="fill"
							@click="handleClicked(index)"
							
						></video>
						<!-- @click="handleClicked(index)" -->
						<!-- 中间播放按钮 -->
						<view v-if="btnShow" class="vd-cover flexbox" @click="handleClicked(index)">
							<!-- <text v-if="!isPlay" class="iconfont icon-bofang"></text> -->
							<image v-if="!isPlay" src="/static/play.png" mode=""></image>
							<image v-else src="/static/suspended.png" mode=""></image>
						</view>

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
								<view class="icon_num">2.4W</view>
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
					<!-- 送礼物弹出框 -->
					<uni-popup ref="popupGifts" type="share" @change="change">
						<uni-popup-gifts title="礼物" @select="selectgift"></uni-popup-gifts>
					</uni-popup>
					<!-- 评论弹出框 -->
					<uni-popup ref="popupComments" type="share" @change="change">
						<uni-popup-comments title="评论" @select="select"></uni-popup-comments>
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
import userComment from '../../components/user-comment.vue'
// 引入送礼物、评论、转发弹出框
import uniPopupShare from '../../components/uni-popup/uni-popup-share.vue'
import uniPopupComments from '../../components/uni-popup/uni-popup-comments.vue'
import uniPopupGifts from '../../components/uni-popup/uni-popup-gifts.vue'
export default {
	data() {
		return {
			videoData:[{
			        src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-01.mp4'
			    },
			    {
			        src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-02.mp4'
			    },
			    {
			        src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-03.mp4'
			    },
			    {
			        src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-01.mp4'
			    },
			    {
			        src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-02.mp4'
			    },
			    {
			        src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-03.mp4'
			    }
			],
			videoIndex: 0,
			// vlist: videoJson,//播放视频的列表组
			isPlay: true, //当前视频是否播放中
			clickNum: 0, //记录点击次数
			btnShow: false, //控制按钮的显示隐藏
			like: false ,//判断用户是否喜欢该视频
			show_pop:false ,//控制评论弹出层显示隐藏
			videoContextList:'' ,//储存所有的视频区
			focus:true  //判断是否进行关注  true 未关注  false 已关注
		};
	},
	components: {
		userComment,
		uniPopupShare,
		uniPopupComments,
		uniPopupGifts,
	},
	onLoad(option) {
		// 当用户进行转发的时候，根据 id 判断 给用户显示相应的视频
		console.log('onload option',option)
		// 根据传递过来的数据，请求相应的视频，并将其赋值到列表
		
		
		
		// 根据页面传递过来的 视频index
		// this.videoIndex = parseInt(option.index);
		// 显示评论弹窗
		// this.$refs.popupComments[0].open()	
	},
	onReady() {
		console.log('播放 onReady')
		this.init()
		this.videoContext = uni.createVideoContext('myVideo0');
		console.log('video onready',this.videoContext)
		// 用户点击进入后就进行播放
		this.videoContext.play();
	},
	// 触发页面的转发事件
	onShareAppMessage:function(res){
		console.log('playVideo 进行转发 设置转发内容')
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log('按钮进行的转发',res)
		}
		return {
			// title: '自定义转发标题',
			path: `/pages/playVideo/playVideo?video_id=${123}`,
			// imageUrl: '自定义转发图片',
			// desc:'自定义描述'
		}
	},
	methods: {
		// 返回上一页面
		back(){
			console.log('返回上一级页面')
			uni.navigateBack({
			    delta: 1
			});
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
				
				// setTimeout(() => {
				// 		this.play(this.videoIndex)
				// }, 200)
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
		
		// // 进入全屏
		// fullScreen() {
		// 	console.log('进入全屏');
		// 	//获取video元素
		// 	// var query = uni.createSelectorQuery();
		// 	// var ctx = query.select('#myVideo');
			
		// 	// 获取 video 上下文 videoContext 对象
		// 	this.videoContext = uni.createVideoContext('myVideo');
		// 	// 进入全屏状态
		// 	this.videoContext.requestFullScreen();
		// },
		

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
					console.log('双击视频 进入全屏');
					ctx.requestFullScreen()
					
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
			console.log('ref',this.$refs)
			this.$refs.popupComments[this.videoIndex].open()		
			// 当用户打开评论窗口之后，当前视频暂停播放，关闭之后视频继续播放		
		},
		
		// 控制转发弹窗
		confirmShare() {
			this.$refs.popupShare[this.videoIndex].open()
			// 当打开转发窗口之后当前视频暂停，取消之后视频继续播放		
		},
		/**
		 * 转发时选择内容
		 */
		select(e, done) {
			// uni.showToast({
			// 	title: `您选择了第${e.index+1}项：${e.item.text}`,
			// 	icon: 'none'
			// })
		console.log('进行转发')
			this.$refs.popupShare[this.videoIndex].open()
			done()
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
			
			// 当弹窗消失之后自动对视频进行播放
			if(e.show){
				// 当弹窗进行显示之后暂停当前视频
				this.isPlay = false
				ctx.pause();
			}else{
				this.isPlay = true
				ctx.play();
				if(e.type == 'share'){
					// console.log('share 类型')
					this.isPlay = false
				}
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
