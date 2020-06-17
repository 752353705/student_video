<template>
	<view class="playVideo">
		<swiper :indicator-dots="false" :duration="200" :vertical="true" :current="videoIndex" @change="handleSlider" style="height: 100%;">
			<block v-for="(item, index) in [1,2,3]" :key="index">
				<swiper-item>
					<view class="uni_vdplayer">
						<video
							id="myVideo"
							ref="myVideo"
							class="player-video"
							src="https://vdept.bdstatic.com/72784e496c73526a7533676b6b566a6d/3847447a79344535/46d4e9c8758751cb49c893f877e418c838dd8058ad86a0b85c64a3cf3c899dc5439424d4f82c963b71a5213255a508b5.mp4?auth_key=1592274925-0-0-df7d5895859199f09bb47de43b415708"
							:controls="false"
							:loop="true"
							:show-center-play-btn="false"
							objectFit="fill"
							@click="handleClicked(index)"
							allowfullscreen="true"
						></video>
						<!-- 中间播放按钮 -->
						<view v-if="btnShow" class="vd-cover flexbox" @click="handleClicked(index)">
							<!-- <text v-if="!isPlay" class="iconfont icon-bofang"></text> -->
							<image v-if="!isPlay" src="../../static/play.png" mode=""></image>
							<image v-else src="../../static/suspended.png" mode=""></image>
						</view>

						<!-- 全屏按钮 -->
						<!-- 	<view class="full" @click="fullScreen">
										<image src="../../static/fullScreen.png" mode=""></image>
									</view> -->

						<!-- 底部信息 -->
						<!--   <view class="vd-footToolbar flexbox flex_alignb">
	                    <view class="vd-info flex1">
	                        <view class="item at">
	                            <view class="kw" v-for="(kwItem,kwIndex) in item.keyword" :key="kwIndex"><text class="bold fs_18 mr_5">＃</text> {{kwItem}}</view>
	                        </view>
	                        <view class="item subtext">{{item.subtitle}}</view>
	                        <view class="item uinfo flexbox flex_alignc">
	                            <image class="avator" src="http://tmp/touristappid.o6zAJs_XxD5O1isqaB21Mkyb3i-U.iDapCgPeivCIa790cfb7141f2d8146721b8388522ffa.jpg"" mode="aspectFill" />
															<text class="name">{{item.author}}</text> <text class="btn-attention bg_linear1" :class="item.attention ? 'on' : ''" @tap="handleAttention(index)">{{item.attention ? '已关注' : '关注'}}</text>
	                        </view>
	                        <view class="item reply" @tap="handleVideoComment"><text class="iconfont icon-pinglun mr_5"></text> 写评论...</view>
	                    </view>
	                    <view class="vd-sidebar">
	                        <view v-if="item.cart" class="ls cart flexbox bg_linear3" @tap="handleVideoCart(index)"><text class="iconfont icon-cart"></text></view>
	                        <view class="ls" @tap="handleIsLike(index)"><text class="iconfont icon-like" :class="item.islike ? 'like' : ''"></text><text class="num">{{ item.likeNum+(item.islike ? 1: 0) }}</text></view>
	                        <view class="ls" @tap="handleVideoComment"><text class="iconfont icon-liuyan"></text><text class="num">{{item.replyNum}}</text></view>
	                        <view class="ls"><text class="iconfont icon-share"></text><text class="num">{{item.shareNum}}</text></view>
	                    </view>
	                </view> -->

						<view class="foot">
							<!-- 头部 -->
							<view class="foot_head">
								<!-- 发布视频者的头像 -->
								<view class="foot_head_img"></view>
								<!-- 名称 -->
								<view class="">作者名</view>
							</view>
							
							<!-- 作品简介 -->
							<view class="video_msg" style="color:white">
								<text>作品好作品好作品好作品好作品好</text>
							</view>
							
							
							<!-- 写评论 -->
							<view class="msg">
								<image src="../../static/signature.png" mode=""></image>
								<view class="">写评论</view>
							</view>
						</view>

						<!-- 右侧 -->
						<view class="right">
							<!-- 送礼物 -->
							<view class="gift icon" @click="sendGift">
								<image src="../../static/gift.png" mode=""></image>
							</view>
							<!-- 喜欢 -->
							<view class="like icon" @click="getLike">
								<image v-if="!like" src="../../static/like.png" mode=""></image>
								<image v-else src="../../static/like_active.png" mode=""></image>
							</view>
							<!-- 评论   点击评论显示评论弹出框-->
							<view class="comments icon" @click="showPop"><image src="../../static/comments.png" mode=""></image></view>
							<!-- 转发 -->
							<view class="forwarding icon" @click="confirmShare"><image src="../../static/forwarding.png" mode=""></image></view>
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
export default {
	data() {
		return {
			videoIndex: 0,
			// vlist: videoJson,//播放视频的列表组
			isPlay: true, //当前视频是否播放中
			clickNum: 0, //记录点击次数
			btnShow: false, //控制按钮的显示隐藏
			like: false ,//判断用户是否喜欢该视频
			show_pop:false ,//控制评论弹出层显示隐藏
		};
	},
	components: {
		
	},
	onLoad(option) {
		this.videoIndex = parseInt(option.index);
		// 显示评论弹窗
		this.$refs.popupComments[0].open()	
	},
	onReady() {
		// this.init()
		this.videoContext = uni.createVideoContext('myVideo');
		// 用户点击进入后就进行播放
		this.videoContext.play();
	},
	methods: {
		// init() {
		// 		this.videoContextList = []
		// 		for(var i = 0; i < this.vlist.length; i++) {
		// 				// this.videoContextList.push(this.$refs['myVideo' + i][0])
		// 				this.videoContextList.push(uni.createVideoContext('myVideo' + i, this));
		// 		}

		// 		setTimeout(() => {
		// 				this.play(this.videoIndex)
		// 		}, 200)
		// },

		// 滑动切换
		handleSlider(e) {
			let curIndex = e.detail.current;
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
		play(index) {
			console.log('播放');
			// this.videoContextList[index].play()
			this.videoContext.play();
			this.isPlay = true;
		},
		// 暂停
		pause() {
			console.log('暂停');
			// this.videoContextList[index].pause()
			this.videoContext.pause();
			this.isPlay = false;
		},
		// 控制按钮的显示隐藏

		// 点击视频事件
		handleClicked(index) {
			console.log('点击播放');
			if (timer) {
				clearTimeout(timer);
			}
			// this.clickNum++
			timer = setTimeout(() => {
				if (this.clickNum >= 2) {
					console.log('双击视频 进入全屏');
				} else {
					console.log('单击视频');
					this.btnShow = true;
					if (this.isPlay) {
						// this.pause(index)
						this.pause();
					} else {
						// this.play(index)
						this.play();
						// 三秒只有隐藏播放按钮
						setTimeout(() => {
							this.btnShow = false;
						}, 2000);
					}
				}
				// this.clickNum = 0
			}, 300);
		},

		// 进入全屏
		fullScreen() {
			console.log('进入全屏');
			//获取video元素
			var query = uni.createSelectorQuery();
			var ctx = query.select('#myVideo');

			console.log('$refs', view);
			ctx.requestFullScreen();
		},

		// 喜欢
		handleIsLike(index) {
			let vlist = this.vlist;
			vlist[index].islike = !vlist[index].islike;
			this.vlist = vlist;
		},
// 控制弹窗的操作
		
		// 控制送礼物的弹窗
		sendGift(){
			console.log('送礼物')
			this.$refs.popupGifts[0].open()
			
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
								console.log('用户点击确定');
						} else if (res.cancel) {
								console.log('用户点击取消');
						}
			    }
			});
		},
		// 控制评论弹窗
		showPop(){
			console.log('ref',this.$refs)
			this.$refs.popupComments[0].open()		
		},
		
		// 控制转发弹窗
		confirmShare() {
			this.$refs.popupShare[0].open()
		},
		/**
		 * 转发时选择内容
		 */
		select(e, done) {
			uni.showToast({
				title: `您选择了第${e.index+1}项：${e.item.text}`,
				icon: 'none'
			})
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
		height: 100%;
		background-color: black;
		video {
			width: 100%;
			height: 500rpx;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
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
				.foot_head_img {
					width: 60rpx;
					height: 60rpx;
					background-color: yellow;
					border-radius: 50%;
					margin-right: 20rpx;
				}
			}
			.msg {
				width: 75%;
				height: 80rpx;
				box-sizing: border-box;
				padding-left: 30rpx;
				background-color: gray;
				margin-top: 20rpx;
				border-radius: 30rpx;
				display: flex;
				justify-content: start;
				align-items: center;
				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}
		}
		.right {
			width: 100rpx;
			height: 335rpx;
			background-color: transparent;
			position: absolute;
			right: 23rpx;
			top: 68%;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			.icon {
				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
}
</style>
