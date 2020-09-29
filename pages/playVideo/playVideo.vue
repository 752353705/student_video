<template>
	<view class="playVideo">
		<swiper :indicator-dots="false" :duration="200" :vertical="true" :current="videoIndex" @change="handleSlider" style="height: 100%;">
			<block v-for="(item, index) in playInfo.playUrlList" :key="index">
				<swiper-item type="success">
					<view class="uni_vdplayer">
						<video
							:id="'myVideo' + index"
							ref="myVideo"
							class="player-video"
							:data-index="index"
							@click="handleClicked"
							:data-time="lastTime"
							:controls="true"
							:src="playInfo.playUrlList[0]"
							:custom-cache="false"
							:loop="true"
							:show-play-btn="false"
							:show-center-play-btn="false"
							:objectFit="fill"
							:poster="avatarUrl"
							:enable-progress-gesture="false"
							@waiting="videoWaiting"
						></video>

						<cover-image class="player-video" @click="play" :src="coverUrl"></cover-image>

						<!-- 双击红心特效-->
						<like-button v-if="videoItem.videoId" ref="likeheart" :site="site"></like-button>
						<!-- 中间播放按钮 -->
						<view v-if="btnShow" class="vd-cover flexbox" :data-index="index" @click="handleClicked">
							<image v-if="!isPlay" src="/static/play.png" mode=""></image>
							<image v-else src="/static/suspended.png" mode=""></image>
						</view>

						<!-- 返回上一级页面的按钮 -->
						<text class="iconfont iconleft back" @click="back"></text>

						<view class="foot">
							<!-- 头部 -->
							<view class="foot_head">
								<view class="foot_head_box" @click="goAuthor">
									<!-- 发布视频者的头像 -->
									<view class="foot_head_img"><image :src="videoItem.avatarUrl || avatarUrl" mode=""></image></view>
									<!-- 名称 -->
									<view>{{ videoItem.userName || userName }}</view>
								</view>
								<!-- 立即关注 -->
								<span @click="focusOn" v-if="!playInfo.followState">关注</span>
								<span @click="focusOn" v-else>已关注</span>
								<!-- 进行收藏 -->
								<span @tap.stop="collection" v-if="!playInfo.collectionState">收藏</span>
								<span @tap.stop="collection" v-else>已收藏</span>
								
								<!-- <text @tap.stop="collection">收藏</text> -->
							</view>
							<!-- 作品简介 -->
							<view class="video_msg" style="color:white">
								<!-- 视频描述限制长度 -->
								{{ videoItem.conversation }}
							</view>
						</view>

						<!-- 右侧 -->
						<view class="right">
							<!-- 送礼物 -->
							<view class="gift icon" @click="sendGift(index)"><text class="t-icon iconliwu"></text></view>
							<!-- 喜欢 -->
							<view class="like icon" @click.stop="getLike" type="success">
								<!-- 不喜欢 -->
								<u-icon v-if="!playInfo.praseState" name="heart" color="#c3c2c1" size="56"></u-icon>
								<!-- 喜欢 -->
								<u-icon v-else name="heart-fill" color="red" size="56"></u-icon>
								<view class="icon_num">{{ videoItem.praseCount || '' }}</view>
							</view>
							<!-- 评论   点击评论显示评论弹出框-->
							<view class="comments icon" @click="showPop(index)">
								<text class="iconfont iconxinxi"></text>
								<view class="icon_num">{{ videoItem.commentNum }}</view>
							</view>
							<!-- 转发 -->
							<view class="forwarding icon" @click="confirmShare(index)">
								<text class="iconfont iconforward-null"></text>
								<view class="icon_num">{{ videoItem.forwardCount }}</view>
							</view>
							<!-- 下载视频 -->
							<view class="forwarding icon" @click="downVideo(index)">
								<text class="iconfont iconxiazai"></text>
								<!-- <view class="icon_num">{{ forwardCount }}</view> -->
							</view>
						</view>
					</view>

					<!-- 生成海报图 -->
					<qrcode-poster ref="poster" title="海报标题" subTitle="海报副标题" price="10" @close="close(index)"></qrcode-poster>

					<!-- 送礼物弹出框 -->
					<uni-popup ref="popupGifts" type="share" @change="change"><uni-popup-gifts title="礼物" @recharge="recharge" @select="selectgift"></uni-popup-gifts></uni-popup>
					<!-- 评论弹出框 -->
					<uni-popup ref="popupComments" type="share" @change="change">
						<uni-popup-comments @changeCommentsNum="changeCommentsNum" title="评论" :videoId="videoItem.videoId" @select="select" type="video"></uni-popup-comments>
					</uni-popup>
					<!-- 转发弹出框 -->
					<uni-popup ref="popupShare" type="share" @change="change"><uni-popup-share title="分享到" @select="select"></uni-popup-share></uni-popup>
					<!-- 充值弹框 -->
					<uni-popup ref="popupRecharge" type="share"><uni-popup-recharge title="分享到" @select="select"></uni-popup-recharge></uni-popup>
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
			userInfo:'', //用户的个人信息
			videoItem:'', //用户点击视频的所有信息
			
			// 防止没有用户的信息
			avatarUrl:"",
			userName:"",
			
			// 用户进入到视频播放页面 请求到的播放信息
			playInfo: '',
			// 红心出现的位置
			site: '',
			videoIndex: 0,
			isPlay: true, //当前视频是否播放中
			timeStamp: 0,
			clickNum: 0, //记录点击次数  判断单击还是双击
			btnShow: false, //控制按钮的显示隐藏
			// like: false, //判断用户是否喜欢该视频
			show_pop: false, //控制评论弹出层显示隐藏
			videoContextList: '', //储存所有的视频区
			focus: true, //判断是否进行关注  true 未关注  false 已关注
			col:false,//用户是否进行了收藏
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
		console.log('播放视频页面 的 option 中的 item', JSON.parse(decodeURIComponent(option.item)));
		// 包含视频的所有信息
		this.videoItem = JSON.parse(decodeURIComponent(option.item))
		
		
		
		console.log('this.videoItem',this.videoItem)
		// 获取传递过来的 点击目标的信息
		// 在这里获取用户在首页点击进来的 视屏ID 用于发起请求，获取视频
		this.videoId = option.videoId;
		this.avatarUrl = uni.getStorageSync('user_img')
		this.userName = uni.getStorageSync('user_name');
		
		// if (!this.videoItem.avatarUrl) {
		// 	console.log('传递过来的 用户头像为空')
		// 	// 传过来为空
		// 	this.videoItem.avatarUrl = uni.getStorageSync('user_img');
		// 	this.videoItem.avatarUrl = option.avatarUrl;
		// } else {
		// 	// console.log('传递过来的 用户头像不为空')
		// }
		// if (!this.videoItem.userName) {
		// 	// 传过来为空
		// 	this.videoItem.userName = uni.getStorageSync('user_name');
		// } else {
		// 	this.videoItem.userName = option.userName;
		// }
		// 用于显示分享到朋友圈
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
	},
	onShow() {
		let _this = this;
		// 根据页面点击后传递过来的videoID，进行播放
		// 如果用户 浏览的是 视频
		this.api._post(
			'vod/getPlayInfo',
			{
				videoId: _this.videoItem.videoId
			},
			function(res) {
				console.log('获取进行播放的视频 res ===>', res);
				_this.playInfo = res.data;
				// 将返回的视频播放地址 进行赋值  而后播放
				_this.init();
			}
		);
		
		// 获取用户的个人信息
		if(true){
			this.api._get(
			'user/info',{},(res)=>{
				console.log('获取用户的当前信息',res)
				// this.userInfo = res.data
			})
		}
		
		
	},
	onHide() {
		// 当进行页面之间的切换时
		
		
		
	},
	
	
	
	onReady() {
		// 页面加载完成 进行浏览记录
		this.api._post(
			'history',
			{
				itemId: this.videoItem.id,
				itemType:"V"
			},
			function(res) {
				console.log('用户进行浏览成功', res);
			}
		);
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
				id: _this.videoItem.id
			},
			function(res) {
				console.log('用户进行转发成功', res);

				_this.forwardCount++;
			}
		);

		return {
			// title: '转发到好友和群聊',
			path: '/pages/playVideo/playVideo?videoId=' + this.videoItem.videoId
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
		// 对视频进行收藏操作
		collection(){
			this.api._post(
				'collection',
				{
					itemId: this.videoItem.id, //被关注的 作者id
					itemType: 'V', //被关注的 作者id
				},
				(res) => {
					console.log('进行收藏成功', res);
					this.playInfo.collectionState = !this.playInfo.collectionState
				}
			);
		},
		
		
		// 当视频 进行 缓冲的时候触发
		videoWaiting() {
			// console.log('视频进行缓冲');
		},

		// 用户点击下载按钮进行当前视频的下载操作
		downVideo(index) {
			console.log('下载视频');
			let _this = this;
			// 判断用户是否开启了保存到相册
			wx.downloadFile({
				url: _this.playInfo.playUrlList[index],
				success: res => {
					console.log('downloadFile成功', res);
					// wx.showLoading({
					//   title: '获取资源中',
					// })
					wx.saveVideoToPhotosAlbum({
						filePath: res.tempFilePath,
						success: file => {
							console.log('saveVideoToPhotosAlbum成功', file);
							wx.hideLoading();
							wx.showToast({
								title: '下载成功',
								icon: 'none'
							});
						},
						fail: err => {
							console.log('saveVideoToPhotosAlbum失败', err);
							if (err.errMsg === 'saveVideoToPhotosAlbum:fail auth deny') {
								wx.showModal({
									title: '提示',
									content: '需要您授权保存相册',
									showCancel: false,
									success: data => {
										wx.openSetting({
											success(settingdata) {
												if (settingdata.authSetting['scope.writePhotosAlbum']) {
													wx.showModal({
														title: '提示',
														content: '获取权限成功,再次点击下载即可保存',
														showCancel: false
													});
												} else {
													wx.showModal({
														title: '提示',
														content: '获取权限失败，将无法保存到相册哦~',
														showCancel: false
													});
												}
											}
										});
									}
								});
							}
						}
					});
				},
				fail: res => {
					console.log('downloadFile失败', res);
				}
			});
			// uni.authorize({
			//     scope: 'scope.writePhotosAlbum',
			//     success() {
			// 			console.log('开启了保存到相册')
			//         uni.saveVideoToPhotosAlbum({
			//         	filePath: _this.playInfo.playUrlList[index],
			//         	success: function(res) {
			//         		console.log('save success',res);
			//         	},
			//         	fail: function(err){
			//         		console.log('err',err)
			//         	}
			//         });
			//     }
			// })
		},
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
			// 用户点击 作者头像 跳转到 作者详情页面
			// 作者详情页需要的信息
			let item = {
				avatarUrl:this.videoItem.avatarUrl,
				userId:this.videoItem.userId,
				userName:this.videoItem.userName || uni.getStorageSync('user_name')
			}
			
			uni.navigateTo({
				url: `/pages/author/author?item=${JSON.stringify(item)}`
			});
		},
		// 判断用户是否进行关注
		focusOn() {
			let _this = this;
			if (!this.playInfo.followState) {
				// 用户未关注
				// 原先未关注 ，现在进行关注操作
				this.api._post(
					'follow',
					{
						followedId: _this.videoItem.userId //被关注的 作者id
					},
					function(res) {
						// console.log('进行关注成功',res);
						_this.playInfo.followState = !_this.playInfo.followState;
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
									followedId: _this.videoItem.userId //被关注的 作者id
								},
								function(res) {
									console.log('进行取消关注成功', res);
									_this.playInfo.followState = !_this.playInfo.followState
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
			for (var i = 0; i < this.playInfo.playUrlList.length; i++) {
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
			let index = e.currentTarget.dataset.index;
			let _this = this;
			let ctx = this.videoContextList[index];
			this.clickNum++;
			// 只要用户点击的次数大于二都进行动画显示
			if (this.clickNum >= 2) {
				console.log('出现红心');
				// // 红心动画
				this.site = [e.detail.x, e.detail.y];
				// 调用显示 红心的动画效果
				this.$refs.likeheart[index].handleClick({ timeStamp: Date.now() });
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
					this.getLike();
				} else {
					console.log('单机视频');
					this.btnShow = true;
					if (this.isPlay) {
						this.isPlay = false;
						ctx.pause();
					} else {
						ctx.play();
						this.isPlay = true;
						// 三秒只有隐藏播放按钮
						setTimeout(() => {
							this.btnShow = false;
						}, 1000);
					}
				}
				console.log('清除点击数');
				this.clickNum = 0;
			}, 300);
		},
		// 控制送礼物的弹窗
		sendGift(index) {
			console.log('送礼物', index);
			this.$refs.popupGifts[this.videoIndex].open();
		},
		selectgift(e, done) {
			let _this = this;
			// console.log('送礼物')
			uni.showModal({
				title: '提示',
				content: `您确定赠送${e.item.name}吗`,
				success: function(res) {
					if (res.confirm) {
						// console.log('用户点击确定',uni.getProvider,);
						// 然后调用支付功能进行支付操作
						// 微信小程序支付
						_this.userPay();
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 用户进行支付操作
		userPay() {
			let _this = this;
			// 判断用户的 手机系统
			let platform = uni.getSystemInfoSync().platform;
			if (platform == 'ios') {
				return uni.showToast({
					title: 'ioc系统暂时无法支付',
					duration: 2000
				});
			}
			// 先请求 后端的下单支付接口
			this.api._post('user/prepay?userId=29', {}, function(res) {
				console.log('测试支付', res);
			});

			// 返回支付参数（5个参数和sign）
			// 然后鉴权调起支付

			// 所有的参数值，后端生成，返回给前端

			// uni.requestPayment({
			// 	provider: 'wxpay', //服务提供商 通过uni.getProvider获取
			// 	timeStamp: , //时间戳
			// 	nonceStr: , //随机字符串
			// 	// 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
			// 	package: 'prepay_id=wx20180101abcdefg',
			// 	signType: 'MD5', //签名算法
			// 	paySign: 'appid=wxd930ea5d5a258f4f&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA', //签名
			// 	success: function(res) {
			// 		console.log('success:' + JSON.stringify(res));
			// 	},
			// 	fail: function(err) {
			// 		console.log('fail:' + JSON.stringify(err));
			// 	}
			// });
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
		getLike() {
			let _this = this;
			// 视频点赞 发起请求 ，
			// 则用户只能在未点赞之时发起请求，之后再次进行点击则 只显示红心特效
			if (!_this.playInfo.praseState) {
				// 当前没有进行点赞
				this.api._post(
					'vod/likeVideo',
					{
						videoId: _this.videoItem.id
					},
					function(res) {
						// console.log('用户进行视频点赞 点亮红心',res)
						_this.playInfo.praseState = true;
						_this.videoItem.praseCount++;
					}
				);
			} else {
				this.api._post(
					'vod/likeVideo',
					{
						videoId: _this.videoItem.id
					},
					function(res) {
						// console.log('用户取消视频点赞 消灭红心',res)
						_this.playInfo.praseState = false;
						_this.videoItem.praseCount--;
					}
				);
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
			// width: 40rpx;
			// height: 40rpx;
			position: absolute;
			top: 67rpx;
			left: 30rpx;
			color: white;
			font-size: 50rpx;
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
			.video_msg {
				color: white;
				// background-color: red;
				width: 87%;
				font-size: 30rpx;
			}
		}
		.right {
			width: 100rpx;
			height: 439rpx;
			background-color: transparent;
			position: absolute;
			right: 23rpx;
			top: 61%;
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
.iconfont {
	color: white;
	font-size: 65rpx;
}
.t-icon {
	width: 27px;
	height: 27px;
}
</style>
