<template>
	<view class="playVideo">
		<swiper :indicator-dots="false" :duration="200" :vertical="true" :current="videoIndex" @change="handleSlider" style="height: 100%;">
			<block v-for="(item, index) in videoData" :key="index">
				<swiper-item type="success">
							<view class="uni_vdplayer">
								<video
									v-if="videoId"
									:id="'myVideo' + index"
									ref="myVideo"
									class="player-video"
									:data-index="index"
									@click="handleClicked"
									:data-time="lastTime"
									:controls="true"
									:src="item.src"
									:custom-cache="false"
									:loop="true"
									:show-play-btn="false"
									:show-center-play-btn="false"
									:objectFit="fill"
									:poster="avatarUrl"
								></video>
								<!-- 双击红心特效-->
								<like-button v-if="videoId" ref='likeheart' :site="site" ></like-button>
								<!-- 中间播放按钮 -->
								<view v-if="btnShow" class="vd-cover flexbox" :data-index="index" @click="handleClicked">
									<!-- <text v-if="!isPlay" class="iconfont icon-bofang"></text> -->
									<image v-if="!isPlay" src="/static/play.png" mode=""></image>
									<image v-else src="/static/suspended.png" mode=""></image>
								</view>

								<!-- 返回上一级页面的按钮 -->
								<!-- <image class="back" @click="back" src="/static/back.png" mode=""></image> -->
								<text class="iconfont iconleft back" @click="back" ></text>
								<!-- <u-icon class="back" @click="back" size="40" name="arrow-left"></u-icon> -->

								<view class="foot">
									<!-- 头部 -->
									<view class="foot_head">
										<view class="foot_head_box" @click="goAuthor">
											<!-- 发布视频者的头像 -->
											<view class="foot_head_img"><image :src="avatarUrl" mode=""></image></view>
											<!-- 名称 -->
											<view>{{ userName }}</view>
										</view>
										<!-- 立即关注 -->
										<span @click="focusOn" v-if="focus">关注</span>
										<span @click="focusOn" v-else>已关注</span>
									</view>
									<!-- 作品简介 -->
									<view class="video_msg" style="color:white">
										<text>{{ conversation }}</text>
									</view>
								</view>

								<!-- 右侧 -->
								<view class="right">
									<!-- 送礼物 -->
									<view class="gift icon" @click="sendGift(index)">
										<!-- <image src="/static/gift.png" mode=""></image> -->
										<text class="t-icon iconliwu" ></text>
									</view>
									<!-- 喜欢 -->

									<!-- <likeButton  :throttle="100" :large="2" > -->
									<view class="like icon" @click="getLike(1)" type="success">
										<!-- 不喜欢 -->
										<u-icon v-if="!like" name="heart" color="#c3c2c1" size="56"></u-icon>
										<!-- 喜欢 -->
										<u-icon v-else name="heart-fill" color="red" size="56"></u-icon>
										<view class="icon_num">{{ praseCount || '' }}</view>
									</view>
									<!-- 评论   点击评论显示评论弹出框-->
									<view class="comments icon" @click="showPop(index)">
										<!-- <image src="/static/comments.png" mode=""></image> -->
										<text class="iconfont iconxinxi" ></text>
										<view class="icon_num">{{ commentNum }}</view>
									</view>
									<!-- 转发 -->
									<view class="forwarding icon" @click="confirmShare(index)">
										<!-- <image src="/static/forwarding.png" mode=""></image> -->
										<text class="iconfont iconforward-null"></text>
										<view class="icon_num">{{ forwardCount }}</view>
									</view>
								</view>
							</view>

							<!-- 生成海报图 -->
							<qrcode-poster ref="poster" title="海报标题" subTitle="海报副标题" price="10" @close="close(index)"></qrcode-poster>

							<!-- 送礼物弹出框 -->
							<uni-popup ref="popupGifts" type="share" @change="change">
								<uni-popup-gifts title="礼物" @recharge="recharge" @select="selectgift"></uni-popup-gifts>
							</uni-popup>
							<!-- 评论弹出框 -->
							<uni-popup ref="popupComments" type="share" @change="change">
								<uni-popup-comments @changeCommentsNum="changeCommentsNum" 
									title="评论" :videoId="videoId" @select="select"
									type="video"
									></uni-popup-comments>
							</uni-popup>
							<!-- 转发弹出框 -->
							<uni-popup ref="popupShare" type="share" @change="change"><uni-popup-share title="分享到" @select="select"></uni-popup-share></uni-popup>
							<!-- 充值弹框 -->
							<uni-popup ref="popupRecharge" type="share" @change="change"><uni-popup-recharge title="分享到" @select="select"></uni-popup-recharge></uni-popup>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
let timer = null;
// 生成海报图进行转发
import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue';
// 引入送礼物、评论、转发弹出框
import userComment from '../../components/user-comment.vue';
import uniPopupShare from '../../components/uni-popup/uni-popup-share.vue';
import uniPopupComments from '../../components/uni-popup/uni-popup-comments.vue';
import uniPopupGifts from '../../components/uni-popup/uni-popup-gifts.vue';
import uniPopupRecharge from '../../components/uni-popup/uni-popup-recharge.vue';

// 引入双击红心特效
import likeButton from '@/components/like-button/like-button.vue';
export default {
	data() {
		return {
			videoItem:'', //用户点击 进行播放目标的信息
			
			
			// 红心渲染的参数
			// viewList: [], // 渲染元素
			// elId: 0, // 元素渲染id
			// oldTime: 0, // 全局时间用于函数节流
			// timer: null, // 定时器

			// 红心出现的位置
			site: '',
			// 视频封面截图
			coverUrl: '',
			// 视频的转发数
			forwardCount: 0,
			// 视频的点赞数
			praseCount: 0,
			// 当前视频页 作者的 用户ID
			userId: '',
			// 用于控制双击动画特效
			pageDate: new Date(), //全局时间用于函数节流

			// 视频发布者的信息
			avatarUrl: '',
			userName: '',
			conversation: '',

			videoId: '', //播放视频的Id
			videoData: [],
			videoIndex: 0,
			videoW: '',
			videoH: '',
			// vlist: videoJson,//播放视频的列表组
			isPlay: true, //当前视频是否播放中
			timeStamp: 0,
			clickNum: 0, //记录点击次数  判断单击还是双击
			btnShow: false, //控制按钮的显示隐藏
			like: false, //判断用户是否喜欢该视频
			show_pop: false, //控制评论弹出层显示隐藏
			videoContextList: '', //储存所有的视频区
			focus: true, //判断是否进行关注  true 未关注  false 已关注
			commentNum: ''
		};
	},
	components: {
		userComment,
		uniPopupShare,
		uniPopupComments,
		uniPopupGifts,
		uniPopupRecharge,
		likeButton,
		QrcodePoster
	},
	onLoad(option) {
		// 获取传递过来的 点击目标的信息
		this.videoItem = option.item
		
		
		
		// 在这里获取用户在首页点击进来的 视屏ID 用于发起请求，获取视频
		// this.videoId = option.videoId;
		this.videoId = option.videoId || '842c376a462548f187d8c37df8f2eab7';
		this.avatarUrl = option.avatarUrl;
		this.userName = option.userName;
		this.conversation = option.conversation;
		this.userId = option.userId;
		this.id = option.id;
		// 点赞数
		this.praseCount = option.praseCount;
		// 当前用户的评论数
		this.commentNum = parseInt(option.commentNum);
		// 当前视频的 转发量
		this.forwardCount = option.forwardCount;
		// 当前的视频页面的截图
		this.coverUrl = option.coverUrl;

		let _this = this;

		// 用于显示分享到朋友圈
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
	},
	onShow() {
		let _this = this;
		// 根据页面点击后传递过来的videoID，进行播放
		if(this.videoId){
			// 如果用户 浏览的是 视频
			this.api._post(
				'vod/getPlayInfo',
				{
					videoId: _this.videoId
				},
				function(res) {
					console.log('获取进行播放的视频 res ===>', res);
					// 将返回的视频播放地址 进行赋值  而后播放
					_this.videoData = [{ src: res.data.playUrlList[0] }];
					_this.init();
					// 然后判断 当前播放的视频 用户 是否进行了 关注 点赞
					_this.like = res.data.praseState; //点赞
					_this.focus = !res.data.followState; //关注
				}
			);
		}else if( !this.videoId ){
			// 用户选择的不是视频
			
			
			
			
		}
		
	},
	// 触发页面的转发事件
	onShareAppMessage: function(res) {
		let _this = this;
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log('按钮进行的转发', res);
		}
		// 调用 转发请求 记录用户转发了多少次
		this.api._post(
			'vod/forward',
			{
				id: _this.id
			},
			function(res) {
				console.log('用户进行转发成功', res);

				_this.forwardCount++;
			}
		);

		return {
			// title: '转发到好友和群聊',
			path: '/pages/playVideo/playVideo?videoId=' + this.videoId
			// imageUrl: '自定义转发图片',
			// desc:'自定义描述'
		};
	},
	// 触发页面中的分享到朋友圈的功能
	onShareTimeline: function() {
		// console.log('playVideo 进行转发 到朋友圈')
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log('按钮进行的朋友圈转发', res);
		}
		return {
			title: '自定义转发标题',
			query: `videoId=842c376a462548f187d8c37df8f2eab7`
			// imageUrl:'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
		};
	},

	methods: {
		// 显示充值弹框
		recharge(e, done) {
			// console.log('播放页面 显示充值弹窗')
			// this.$refs.popupGifts[0].close()
			this.$refs.popupRecharge[0].open();
			done();
		},
		// 当海报图生成之后，关闭分享弹窗
		close(index) {
			// console.log('海报图生成 关闭分享弹窗 this.$refs.popupShare ===>',this.$refs.popupShare)
			this.$refs.popupShare[index].close();
		},

		// 控制页面评论数的改变
		changeCommentsNum(num) {
			this.commentNum += 1;
		},

		// 返回上一页面
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 点击用户头像跳转到发布者的详情页
		goAuthor() {
			uni.navigateTo({
				url: '/pages/author/author'
			});
		},
		// 判断用户是否进行关注
		focusOn() {
			let _this = this;
			if (this.focus) {
				// 用户未关注
				// 原先未关注 ，现在进行关注操作
				this.api._post(
					'follow',
					{
						followedId: _this.userId //被关注的 作者id
					},
					function(res) {
						// console.log('进行关注成功',res);
						_this.focus = false;
					}
				);
			} else {
				// 用户已经进行了关注，此时再进行点击表示用户是否要取消关注
				uni.showModal({
					content: '确认不在关注',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							_this.api._post(
								'follow',
								{
									followedId: _this.userId //被关注的 作者id
								},
								function(res) {
									console.log('进行关注成功', res);
									_this.focus = true;
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
		init() {
			this.videoContextList = [];
			for (var i = 0; i < this.videoData.length; i++) {
				// this.videoContextList.push(this.$refs['myVideo' + i][0])
				this.videoContextList.push(uni.createVideoContext('myVideo' + i, this));
			}
			// console.log('init初始化 获取视频内容列表this.videoContextList ===> ',this.videoContextList)

			// 将第一个视频进行播放
			this.videoContextList[0].play();
			// 按钮状态为播放
			this.isPlay = true;
		},

		// 滑动切换
		handleSlider(e) {
			let curIndex = e.detail.current;
			// console.log('videoIndex',this.videoIndex)
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
			this.isPlay = true;
		},
		// 暂停
		pause(index) {
			// console.log('暂停 pause');
			this.videoContextList[index].pause();
			this.videoContext.pause();
			this.isPlay = false;
		},
		
		// 点击视频事件
		handleClicked(e) {
			let index = e.currentTarget.dataset.index
			let _this = this
			let ctx = this.videoContextList[index]
			this.clickNum++
			// 只要用户点击的次数大于二都进行动画显示
			if(this.clickNum >= 2){
				console.log('出现红心')
				// // 红心动画
				this.site = [e.detail.x,e.detail.y]
				// 调用显示 红心的动画效果
				this.$refs.likeheart[index].handleClick({timeStamp: Date.now()})
			}
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				// 判断用户进行的是单击还是双击
				if (this.clickNum >= 2) {
					// console.log('双击视频 进入全屏');
					console.log('双击视频 ');
					// 进行点赞
					this.getLike(0)
				} else {
					console.log('单机视频')
					this.btnShow = true;
					if (this.isPlay) {
						this.isPlay = false
						ctx.pause();
					} else {
						ctx.play();
						this.isPlay = true
						// 三秒只有隐藏播放按钮
						setTimeout(() => {
							this.btnShow = false;
						}, 1000);
					}
				}
				console.log('清除点击数')
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
		sendGift(index) {
			console.log('送礼物', index);
			this.$refs.popupGifts[this.videoIndex].open();
		},
		selectgift(e, done) {
			// console.log('送礼物')
			uni.showModal({
				title: '提示',
				content: `您确定赠送${e.item.text}吗`,
				success: function(res) {
					if (res.confirm) {
						// console.log('用户点击确定',uni.getProvider,);
						// 然后调用支付功能进行支付操作
						// 微信小程序支付
						uni.requestPayment({
							provider: 'wxpay', //服务提供商 通过uni.getProvider获取
							timeStamp: String(Date.now()), //时间戳
							nonceStr: 'A1B2C3D4E5', //随机字符串
							// 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
							package: 'prepay_id=wx20180101abcdefg',
							signType: 'MD5', //签名算法
							paySign: 'appid=wxd930ea5d5a258f4f&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA', //签名
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
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
		showPop() {
			// console.log('评论窗口 ref',this.$refs.popupComments)
			this.$refs.popupComments[this.videoIndex].open();
			// 当用户打开评论窗口之后，当前视频暂停播放，关闭之后视频继续播放
		},

		// 控制转发弹窗
		confirmShare() {
			this.$refs.popupShare[this.videoIndex].open();
			// 当打开转发窗口之后当前视频暂停，取消之后视频继续播放
		},
		//分享海报
		sharePoster() {
			//获取带参数二维码
			this.is_show_model = false;

			// 将要在海报图中进行绘制的二维码传送过去
			this.$refs.poster[0].showCanvas('https://oss.zhangyubk.com/cmqrcode.jpg');
		},
		/**
		 * 转发时选择内容
		 */
		select(e, done) {
			// uni.showToast({
			// 	title: `您选择了第${e.index+1}项：${e.item.text}`,
			// 	icon: 'none'
			// })
			// console.log('进行转发 生成海报图分享')
			// 生成海报图进行分享
			this.sharePoster();
		},

		// 点击红心喜欢该视频
		getLike(num) {
			let _this = this;
			// this.like = !this.like;
			// 视频点赞 发起请求 ，

			// 通过 num 来进行判断 用户是通过那种方式进行的点击操作
			if (num == 0) {
				// 用户是通过双击进行的点赞
				// 则用户只能在未点赞之时发起请求，之后再次进行点击则 只显示红心特效
				if (!_this.like) {
					// 当前没有进行点赞
					this.api._post(
						'vod/likeVideo',
						{
							videoId: _this.id
						},
						function(res) {
							// console.log('用户进行视频点赞 点亮红心',res)
							_this.like = true;
							_this.praseCount++;
						}
					);
				}
			} else if (num == 1) {
				// 用户直接点击的 红心图标
				if (!_this.like) {
					// 当前没有进行点赞
					this.api._post(
						'vod/likeVideo',
						{
							videoId: _this.id
						},
						function(res) {
							// console.log('用户进行视频点赞 点亮红心',res)
							_this.like = true;
							_this.praseCount++;
						}
					);
				} else {
					// 当前已经进行了点赞
					this.api._post(
						'vod/likeVideo',
						{
							videoId: _this.id
						},
						function(res) {
							// console.log('用户取消视频点赞 消灭红心',res)
							_this.like = false;
							_this.praseCount--;
						}
					);
				}
			}
		},
		/**
		 * popup 状态发生变化触发
		 * @param {Object} e
		 */
		change(e) {
			// console.log('popup ' + e.type + ' 状态', e.show)

			let ctx = this.videoContextList[this.videoIndex];

			// console.log('获取视频播放 videoContextList',this.videoContextList)

			// 当弹窗消失之后自动对视频进行播放
			if (e.show) {
				// 当弹窗进行显示之后暂停当前视频
				this.isPlay = false;
				// console.log('弹窗显示 暂停视频 isPlay ==》',this.isPlay)
				ctx.pause();
			} else {
				this.isPlay = true;
				ctx.play();
				// console.log('弹窗隐藏 播放视频 isPlay ==》',this.isPlay)
			}
		}
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
	background-color: black;
	.uni_vdplayer {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: black;
		.back {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 67rpx;
			left: 30rpx;
			color: white;
		}
		video {
			width: 100%;
			height: 100%;
			position: static;
		}
		// 视频中间的 播放暂停按钮
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
			position: absolute;
			bottom: 0;
			box-sizing: border-box;
			padding: 20rpx 40rpx 10rpx;
			.foot_head {
				width: 100%;
				height: 100rpx;
				color: white;
				display: flex;
				justify-content: start;
				align-items: center;
				.foot_head_box {
					display: flex;
					align-items: center;
					.foot_head_img {
						width: 60rpx;
						height: 60rpx;
						background-color: yellow;
						border-radius: 50%;
						margin-right: 20rpx;
						overflow: hidden;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				span {
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
			button[type='default'][plain] {
				border: 0px solid #353535;
				background-color: transparent;
			}
			button {
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
			.forwarding {
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
				.icon_num {
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
// 调控 iconfont 图标的颜色大小
.iconfont{
	color: white;
	font-size: 65rpx;
}
.t-icon{
	width: 27px;
	height: 27px;
}
</style>
