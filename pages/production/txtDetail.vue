<template>
	<view class="txt_detail">
		<view class="uni_vdplayer w-100 h-100">
			<!-- 文章的所选择的图片 -->
			<swiper class="txtImg w-100" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item class="swiper-item w-100 h-100" v-for="(item, index) in imgArr" :key="index">
					<image @longpress="downImg(item)" :src="item" mode="widthFix"></image>
				</swiper-item>
			</swiper>

			<!-- 滚动显示送礼物 -->
			<sin-barrage
				v-if="sinBar"
				:list="list.slice(0, 5)"
				:bottom="bottom"
				:left="left"
				:color="color"
				:background="background"
				:opacity="0.7"
				:rows="3"
				:msec="msec"
				@showSinBar="showSinBar"
			></sin-barrage>

			<!-- 当前作品的排名 -->
			<view class="txt_rank" @tap="goRank">
				<view class="rank_item">
					<view class="num">{{ rank.goldNumber || 0 }}</view>
					<view class="desc">票数</view>
				</view>
				<view class="rank_item">
					<view class="num">{{ rank.ranking || 1 }}</view>
					<view class="desc">排名</view>
				</view>
				<view class="rank_item">
					<view class="num">
						<text style="font-size: 14px;font-weight: normal;margin-right: 10rpx;">差</text>
						{{ rank.lastOneGoldNumber || 0 }}
						<text style="font-size: 14px;font-weight: normal;margin-left: 10rpx;">票</text>
					</view>
					<view class="desc">超过上一名</view>
				</view>
			</view>

			<!-- 文章 其他信息 -->
			<view class="txtMain w-100 pa-t20 pa-r40 pa-b10 pa-l40 ma-b100 box-boder">
				<!-- 作者信息 -->
				<view class="head w-100 item-center">
					<view class="head_box item-center" @click="goAuthor">
						<!-- 作者头像 -->
						<view class="head_img ma-r20"><image class="w-100 h-100" :src="txtItem.avatarUrl || avatarUrl" mode=""></image></view>
						<!-- 名称 -->
						<view class="">{{ txtItem.userName || userName }}</view>
					</view>
					<!-- 立即关注 -->
					<span @click="focusOn" v-if="!txtItem.followed">关注</span>
					<span v-else @click="focusOn" style="color: #989898;font-weight: bold;border: 1px solid #989898;"><text>已关注</text></span>
				</view>
				<!-- 文章标题 -->
				<view class="txtTitle">
					<view>{{ txtItem.title }}</view>
					<view class="type" @click="goGameDetail">
						<view class="mark">#</view>
						<view class="txt">{{ txtItem.subjectName || '' }}</view>
					</view>
				</view>
				<!-- 文章内容 -->
				<view class="txtContent">{{ txtItem.content }}</view>

				<!-- 粉丝团  @click="gofansLis"-->
				<view v-if="fanlist.length > 0" class="fans">
					<view class="tit_box">
						<image src="/static/rankBg.png" style="" mode=""></image>
						<view class="tit">粉丝团</view>
					</view>

					<view class="img_list">
						<!-- 粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团 -->
						<image :src="item.avatarUrl" mode="" v-for="(item, index) in fanlist" class="item" :key="index"></image>
						<text v-if="fanlist.length > 15">...</text>
					</view>
				</view>
			</view>

			<!-- 投票按钮  
				当该作品参加的大赛截止之后不显示投票选项 -->
			<view class="sendTicket" v-if="game_statue == 1" :id="!scroll_style ? 'animat' : ''" :class="scroll_style ? 'sendTicket_scroll' : ''" @click="sendGift(index)">
				<image src="../../static/sendTitcket.png" mode=""></image>
			</view>

			<!-- 修改为底部操作 -->
			<view class="btm w-100 bg-w box-boder pa-l40 pa-r10 panel-between item-center ">
				<view class="le">
					<view class="msg item-center" @click="getComment">
						<text class="iconfont iconxie" style="margin-right: 10rpx;margin-left: 10rpx;"></text>
						<text>进行评论</text>
					</view>
				</view>
				<!-- 评论   点击评论显示评论弹出框-->
				<view class="ri item-start">
					<view style="position: relative;" class="comments icon" @click="getComment">
						<text class="iconfont iconxinxi"></text>
						<u-badge :count="txtItem.commentNum || 0" size="mini" :offset="offset" overflow-count="99"></u-badge>
					</view>
					<view class="comments icon" @tap.stop="collection">
						<text v-if="!txtItem.collectionStatus" class="iconfont iconshoucang1"></text>
						<text v-else class="iconfont iconshoucangactive" style="color: red;"></text>
					</view>
					<view style="position: relative;" class=" icon" @click="confirmShare"><text class="iconfont iconzhuanfa forwarding"></text></view>
				</view>
			</view>
		</view>
		<!-- 弹出公众号 二维码 -->
		<qrcode-poster ref="poster" title="海报标题" :headerImg="code" subTitle="海报副标题" price="10" @close="close(index)"></qrcode-poster>

		<!-- 送礼物弹出框 -->
		<uni-popup ref="popupGifts" type="share"><uni-popup-gifts title="投票" @rankPopup="rankPopup" @recharge="recharge" @select="selectgift"></uni-popup-gifts></uni-popup>
		<!-- 评论弹出框 -->
		<uni-popup ref="popupComments" type="share">
			<uni-popup-comments
				:msgList="msgList"
				@changeCommentsNum="changeCommentsNum"
				@changeComment="changeComment"
				@changeMsgList="changeMsgList"
				@getComment="getComment"
				@showDetailComment="showDetailComment"
				title="评论"
				type="txt"
				:txtId="txtId"
			></uni-popup-comments>
		</uni-popup>

		<!-- 评论详情 弹出框 -->
		<uni-popup ref="popupDetailComments" type="share">
			<uni-popup-detail-comments
				:detail_index="detail_index"
				:detailMsgList="detailMsgList"
				@changeCommentsNum="changeCommentsNum"
				@changeComment="changeComment"
				@changeMsgList="changeMsgList"
				@getComment="getComment"
				@showDetailComment="showDetailComment"
				title="评论详情"
				type="txt"
				:txtId="txtId"
			></uni-popup-detail-comments>
		</uni-popup>
		<!-- 浏览进度环 -->
		<circle v-if="percent !== limit" class="circle" :limit="limit" :percent="percent"></circle>
		<!-- 转发弹出框 -->
		<uni-popup ref="popupShare" type="share"><uni-popup-share title="分享到"></uni-popup-share></uni-popup>
		<!-- 收藏提醒 赠送票提醒 -->
		<uni-popup ref="popup" type="message"><uni-popup-message type="success" :message="msg" :duration="2000"></uni-popup-message></uni-popup>
		<!-- 送礼排行 -->
		<uni-popup ref="popupRank" type="share"><uni-popup-rank title="排行榜" :articleId="txtId"></uni-popup-rank></uni-popup>
	</view>
</template>

<script>
	// 浏览进度圆
	let cirTime;
// 滚动送礼物
import sinBarrage from '@/components/sin-barrage/sin-barrage.vue';
// 生成海报图进行转发
import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue';
// 浏览进度环
import circle from '@/components/circle.vue';

// 收藏提醒
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';

import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue';
import uniPopupComments from '@/components/uni-popup/uni-popup-comments.vue';
import uniPopupDetailComments from '@/components/uni-popup/uni-pupup-detail-comments.vue';
import uniPopupGifts from '@/components/uni-popup/uni-popup-gifts.vue';
import uniPopupRank from '@/components/uni-popup/uni-popup-rank.vue';

export default {
	data() {
		return {
			// 浏览进度环，进度
			percent: 0,
			// 达到多少秒进行奖励票
			limit: 30,
			cirStatue: true,

			// 票数不够，弹框进行关注公众号充值
			// 公众号二维码
			code: 'https://i.loli.net/2020/12/14/QFs4AmIiw3Hyequ.jpg',
			// 参加的大赛 当前进行状态
			// 1 进行中  0 未开始 2 已结束
			game_statue: 1,
			// 收藏，和浏览时长达标，弹出信息
			msg: '',
			// 监听页面滚动是控制送礼物的位置
			scroll_style: false,
			// 控制角标的位置
			offset: [-12, -12],
			// 控制礼物弹窗的显隐
			sinBar: true,
			// 送礼物的数据
			list: [],
			bottom: 500,
			left: 42,
			color: '#FFFFFF',
			background: '#000000',
			msec: 2000,
			// 排名数据
			rank: [],
			money: 0,
			fanlist: [],
			clt: false, //表示用户没有进行收藏
			txtItem: {
				title: '',
				content: ''
			},
			imgArr: '', //文章的背景图
			txtId: '',
			// 当用户浏览自己的文章 时没有 头像和 姓名
			userName: '',
			avatarUrl: '',
			// 文章的转发数
			forwardCount: 0,
			timeStamp: 0,
			// 请求评论的页数
			pageNum: 1,
			// 评论整体
			msgList: [],
			// 评论详情
			detailMsgList: {},
			//判断是否有下一页
			commentState: true,
			detail_index: '',
			
			// 当前用户的个人信息
			userInfo:''
		};
	},
	components: {
		circle,
		uniPopupMessage,
		sinBarrage,
		uniPopupShare,
		uniPopupComments,
		uniPopupGifts,
		uniPopupDetailComments,
		QrcodePoster,
		uniPopupRank
	},
	onLoad(option) {
		this.txtId = option.txtId;
		// 获取礼物弹幕信息
		this.getGift(option.txtId);
		// 获取文章信息
		this.getTxtDetail(this.txtId);
		this.userName = uni.getStorageSync('user_name');
		this.avatarUrl = '/static/avatarUrl.png';
		// 用于显示分享到朋友圈
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		// 获取当前用户的使用环境
		// this.getPhoneType()
		
		// 获取当前用户的个人信息
		this.getUsInfo()
		
	},
	onShow() {
		this.api._post(
			'history',
			{
				itemId: this.txtId,
				itemType: 'A'
			},
			function(res) {}
		);
		this.getRank();
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
	// 触发页面的转发事件
	onShareAppMessage: function(res) {
		let _this = this;
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log('按钮进行的转发', res);
		}
		// 调用 转发请求 记录用户转发了多少次
		this.api._post(`article/forward/${_this.txtId}`, {}, function(res) {
			// console.log('文章id 用户进行转发成功', res);

			_this.txtItem.forwardCount++;
		});

		return {
			title: this.txtItem.title,
			path: '/pages/production/txtDetail?txtId=' + this.txtId
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
			title: this.txtItem.title,
			query: `txtId=${this.txtId}`,
			imageUrl: this.imgArr[0]
		};
	},
	// 页面滚动
	onPageScroll() {
		// console.log('页面进行滚动');
		var timer;
		if (!this.scroll_style) {
			this.scroll_style = true;
		} else {
			// 判断是否已经有了定时器
			if (!this.timeout) {
				// 没有
				this.timeout = true;
				// console.log('设置定时器');
				timer = setTimeout(() => {
					this.scroll_style = false;
					this.timeout = false;
				}, 3000);
			} else {
				// 有了
				// console.log('销毁定时器');
				clearTimeout(timer);
				return;
			}
		}

		// 当用户进行滑动开启定时器 percent
		// 达到一定时间，奖励票数
		// 弹出信息提示
		if (this.cirStatue) {
			this.seeTxtAward();
			this.cirStatue = false;
		}
	},
	methods: {
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

		// 根据该作品参加大赛的id 判断大赛的进程
		// 然后决定是否显示  送礼物
		subjectStatue(subjectId) {
			this.api._get(`subject/${subjectId}`, {}, res => {
				this.game_statue = res.data.progressStatus;
				console.log('获取大赛详情', res);
			});
		},
		// 显示评论详情弹窗
		showDetailComment(index) {
			let _this = this;
			this.detail_index = index;
			// Object.assign(_this.detailMsgList,_this.msgList[index],{})
			_this.detailMsgList = _this.msgList[index];
			this.$refs.popupDetailComments.open();
		},
		// 获取当前作品的排名状况
		getRank() {
			this.api._get(`article/ranking/${this.txtId}`, {}, res => {
				console.log('获取当前作品排行', res);
				this.rank = res.data;
			});
		},
		// 获取用户刷礼物的记录
		getUserGift(articleId) {
			this.api._get(`gift/article/user/gift/${articleId}`, {}, res => {
				console.log(' 获取刷礼物 res', res);
				this.giftRank = res.data;
			});
		},
		// 用户点击大赛类型跳转到 该大赛详情
		goGameDetail() {
			uni.navigateTo({
				url: `/pages/Introduction/gameDetail?subjectId=${this.txtItem.subjectId}`
			});
		},
		// 用户单击图片查看当前图片的详情
		previewImg() {
			uni.previewImage({
				current: 0,
				urls: this.imgArr
			});
		},
		// 获取礼物弹幕信息
		getGift(articleId) {
			this.api._get(`gift/article/gift/${articleId}`, {}, res => {
				this.list = res.data;
			});
		},
		// 控制弹窗显隐
		showSinBar() {
			// console.log('隐藏弹窗')
			this.sinBar = false;
		},
		// 跳转到排行榜详情
		goRank() {
			uni.navigateTo({
				url: `/pages/rank/rank?articleId=${this.txtItem.id}`
			});
		},
		// 显示送礼物排行榜弹窗
		rankPopup(e, done) {
			this.$refs.popupRank.open();
			done();
		},
		// 隐藏排行弹窗
		hiddenRank() {
			this.$refs.popupRank.close();
		},
		// 获取用户的粉丝的头像
		getOtherFans() {
			this.api._get(
				'follow/otherUserfans',
				{
					userId: this.txtItem.userId,
					pageNum: this.pageNum,
					pageSize: 10
				},
				res => {
					console.log('获取其他人的粉丝列表 res ===>', res);
					this.fanlist = res.data.list;
				}
			);
		},
		// 点击粉丝团 跳转到 粉丝列表
		gofansLis() {
			uni.navigateTo({
				url: `/pages/my/myFans`
			});
		},
		// 对图文进行收藏操作
		collection() {
			let _this = this;
			this.api._post(
				'collection',
				{
					itemId: this.txtItem.id, //被关注的 作者id
					itemType: 'A' //被关注的 作者id
				},
				function(res) {
					_this.txtItem.collectionStatus = !_this.txtItem.collectionStatus;
					console.log('进行收藏', res);
					if (_this.txtItem.collectionStatus) {
						console.log('进行收藏');
						_this.msg = '收藏成功';
						_this.$refs.popup.open();
					} else {
						_this.msg = '取消收藏';
						_this.$refs.popup.open();
					}
				}
			);
		},
		// 用户长按图片，将图片进行下载
		downImg(imgsrc) {
			console.log('用户长按图片进行下载');
			//判断用户授权
			uni.showModal({
				title: '是否下载当前图片',
				success(res) {
					if (res.confirm) {
						uni.downloadFile({
							url: imgsrc,
							success: res => {
								console.log('downloadFile成功', res);
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: file => {
										console.log('saveVideoToPhotosAlb、um成功', file);
										wx.hideLoading();
										wx.showToast({
											title: '下载成功',
											icon: 'none'
										});
									},
									fail: err => {
										console.log('saveVideoToPhotosAlbum失败', err);
										if (err.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
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
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				},
				fail() {
					uni.showToast({
						icon: 'none',
						title: '下载失败'
					});
				}
			});
		},
		// 获取 文章的详情
		getTxtDetail(id) {
			let _this = this;
			this.api._get(`article/${id}`, {}, function(res) {
				console.log('获取文章的详情', res);
				_this.txtItem = res.data;
				_this.imgArr = res.data.images.split(',');

				// 获取粉丝团
				_this.getOtherFans();
				// 获取大赛进行转态
				_this.subjectStatue(_this.txtItem.subjectId);
			});
		},
		// 获取用户的H币
		getHgold() {
			let _this = this;
			// 请求H币个数
			this.api._get('user/gold', {}, function(res) {
				_this.money = res.data.goldNumber;
				_this.$refs.popupRecharge.open();
			});
		},
		// 当海报图生成之后，关闭分享弹窗
		close(index) {
			// console.log('海报图生成 关闭分享弹窗 this.$refs.popupShare ===>',this.$refs.popupShare)
			this.$refs.popupShare.close();
		},
		// 控制页面评论数的改变
		changeCommentsNum(num) {
			this.txtItem.commentNum += 1;
		},
		// 点击用户头像跳转到发布者的详情页
		goAuthor() {
			let item = {
				avatarUrl: this.txtItem.avatarUrl,
				userId: this.txtItem.userId
			};
			uni.navigateTo({
				url: `/pages/author/author?item=${JSON.stringify(item)}`
			});
		},
		// 判断用户是否进行关注
		focusOn() {
			let _this = this;
			if (!this.txtItem.followed) {
				// 用户未关注
				// 原先未关注 ，现在进行关注操作
				this.api._post(
					'follow',
					{
						followedId: _this.txtItem.userId //被关注的 作者id
					},
					function(res) {
						// console.log('进行关注成功',res);
						_this.txtItem.followed = !_this.txtItem.followed;
						_this.getOtherFans();
					}
				);
			} else {
				_this.api._post(
					'follow',
					{
						followedId: _this.txtItem.userId //被关注的 作者id
					},
					function(res) {
						// console.log('进行取消关注成功', res);
						_this.txtItem.followed = !_this.txtItem.followed;
						_this.getOtherFans();
					}
				);
			}
		},
		// 控制送礼物的弹窗
		sendGift() {
			// console.log('送礼物');
			this.$refs.popupGifts.open();
		},
		// 送礼物确认弹窗
		selectgift(e, done) {
			let _this = this;
			uni.showModal({
				title: '提示',
				content: `您确定投${e.item.goldNumber}票吗`,
				success: function(res) {
					if (res.confirm) {
						// 用户点击确定之后，进行赠送礼物
						_this.api._post(
							'gift/article',
							{
								articleId: _this.txtItem.id,
								giftId: e.item.giftId
							},
							function(res) {
								if (res.data.errno === 507) {
									// 票数不足然后弹出关注公众号，进行充值
									_this.$refs.poster.showCanvas('https://oss.zhangyubk.com/cmqrcode.jpg');
									// 关闭礼物弹窗
									_this.$refs.popupGifts.close();
								} else {
									wx.hideLoading();
									setTimeout(function() {
										uni.showToast(
											{
												icon: 'none',
												duration: 2000,
												title: `投票成功`,
												success() {
													// wx.hideLoading()
													setTimeout(function() {
														_this.getRank();
														// 重新弹出 谁谁送礼物的 弹框
														_this.sinBar = true;
														// console.log('头像',uni.getStorageSync('user_img'))
														_this.list = [
															{
																avatarImage: uni.getStorageSync('user_img'),
																giftImage: e.item.giftImage,
																goldNumber: e.item.goldNumber
															}
														];
													}, 2000);
												}
											},
											500
										);
									});
								}
							}
						);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 获取评论
		getComment() {
			let _this = this;
			_this.$refs.popupComments.open();
			// 判断是否发起请求
			if (!this.commentState) {
				return;
			} else {
				// 发起请求 ，请求评论数据
				this.api._get(
					'article/comment/list',
					{
						pageNum: this.pageNum,
						pageSize: 10,
						articleId: this.txtId
					},
					function(res) {
						console.log('请求文章评论 ===》 res', res.data.list);
						// 修改默认的页数
						// 参数一：当前页获取的数据量
						// _this.mescroll.endSuccess(res.data.list.length);

						// console.log('_this.msgList ===》',_this.msgList,"res.data.list ==>",res.data.list)
						// 进行数组之间的拼接 如果请求回的内容相同 ，则不进行拼接
						if (JSON.stringify(_this.msgList) == JSON.stringify(res.data.list) && res.data.list.length !== 0) return false;
						_this.msgList = _this.msgList.concat(res.data.list);

						if (res.data.list.length == 10) {
							console.log('请求');
							_this.pageNum++;
							// 判断是否进行请求
							_this.commentState = true;
						} else {
							console.log('不请求');
							_this.commentState = false;
						}
					}
				);
			}
		},
		// 点击发送评论 更新 评论信息
		changeComment(obj) {
			// index用来判断是进行评论还是评论回复
			console.log('进行评论回复111111000', obj);
			if (obj.replayVal) {
				console.log('二级回复');
				this.msgList[obj.index].replyList.unshift({
					content: obj.val,
					avatarUrl: uni.getStorageSync('user_img'),
					// 应当有 回复  某人
					userName: uni.getStorageSync('user_name'),
					createTime: '',
					praseCount: '',
					id: obj.commentId
				});
			} else {
				console.log('一级回复');
				this.msgList.unshift({
					avatarUrl: uni.getStorageSync('user_img'),
					userName: uni.getStorageSync('user_name'),
					content: obj.val,
					createTime: '',
					praseCount: '',
					replyList: [],
					id: obj.commentId
				});
			}
		},
		// 对评论进行点赞操作
		changeMsgList(obj) {
			console.log('txtdetail');
			if (obj.index2 == undefined) {
				// 当对视频评论进行 点赞
				if (this.msgList[obj.index].liked) {
					// 已经进行了点赞 则现在是取消点赞
					this.msgList[obj.index].liked = false;
					this.msgList[obj.index].praseCount--;
				} else {
					this.msgList[obj.index].liked = true;
					this.msgList[obj.index].praseCount++;
				}
			} else {
				// 当对回复进行点赞
				if (this.msgList[obj.index].replyList[obj.index2].liked) {
					// 回复已经进行了点赞
					this.msgList[obj.index].replyList[obj.index2].liked = false;
					this.msgList[obj.index].replyList[obj.index2].praseCount--;
				} else {
					// 还未点赞
					this.msgList[obj.index].replyList[obj.index2].liked = true;
					this.msgList[obj.index].replyList[obj.index2].praseCount++;
				}
			}
		},
		// 控制转发弹窗
		confirmShare() {
			// console.log('转发 ref',)
			this.$refs.popupShare.open();
			// 当打开转发窗口之后当前视频暂停，取消之后视频继续播放
		}
	}
};
</script>

<style>
page {
	background-color: #f8f8f8;
}
</style>

<style lang="scss" scoped>
.t-icon {
	width: 25px;
	height: 25px;
}
.txt_detail {
	box-sizing: border-box;
	padding-bottom: 100px;
	// background-color: white;
	.uni_vdplayer {
		position: relative;
		// 文章详情页的 轮播图片 原始
		.txtImg {
			height: 900rpx;
			.swiper-item {
				position: relative;
				image {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 100%;
				}
			}
		}
		// 当前作品的排名
		.txt_rank {
			width: 92%;
			height: 134rpx;
			// background-color: white;
			background-color: #fcf0c2;
			// background-image: linear-gradient(to bottom, #f2e2b6, #caac70);
			margin: 30rpx auto;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-radius: 39rpx;
			box-sizing: border-box;
			// color: #b23027;
			.rank_item {
				width: 33%;
				// border-right: 1px solid #bb7233;
				text-align: center;
				// padding-right: 20rpx;
				.num {
					font-size: 47rpx;
					font-weight: bold;
					color: $bg-color;
				}
				.desc {
					font-size: 26rpx;
					// color: #cacaca;
					color: #595a5e;
				}
			}
			.rank_item:nth-child(3) {
				border: none;
				padding: 0;
			}
		}
		// 设置投票按钮
		.sendTicket {
			width: 142rpx;
			height: 147rpx;
			position: fixed;
			bottom: 200rpx;
			right: 10rpx;
			// background-color: red;
			// transform: translateX(-30rpx);
			// transition: transform 0.4s;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.sendTicket_scroll {
			transform: translateX(44rpx);
			transition: transform 0.4s;
		}

		// 缩放动画
		#animat {
			// position:relative;
			animation: mymove 5s infinite;
			-webkit-animation: mymove 5s infinite; /*Safari and Chrome*/
			animation-direction: alternate; /*轮流反向播放动画。*/
			animation-timing-function: ease-in-out; /*动画的速度曲线*/
			/* Safari 和 Chrome */
			-webkit-animation: mymove 5s infinite;
			-webkit-animation-direction: alternate; /*轮流反向播放动画。*/
			-webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
		}
		@keyframes mymove {
			0% {
				transform: scale(1); /*开始为原始大小*/
			}
			25% {
				transform: scale(1.1); /*放大1.1倍*/
			}
			50% {
				transform: scale(1);
			}
			75% {
				transform: scale(1.1);
			}
		}

		@-webkit-keyframes mymove /*Safari and Chrome*/ {
			0% {
				transform: scale(1); /*开始为原始大小*/
			}
			25% {
				transform: scale(1.1); /*放大1.1倍*/
			}
			50% {
				transform: scale(1);
			}
			75% {
				transform: scale(1.1);
			}
		}

		// 文章其他信息
		.txtMain {
			color: black;
			// 作者信息
			.head {
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				.head_box {
					display: flex;
					.head_img {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						overflow: hidden;
						// iOS端圆角设置失效
						-webkit-backface-visibility: hidden;
						-webkit-transform: translate3d(0, 0, 0);
					}
				}
				span {
					display: inline-block;
					box-sizing: border-box;
					padding: 12rpx 20rpx;
					border: 1px solid #ff234f;
					color: #ff234f;
					font-size: 20rpx;
					border-radius: 18rpx;
					box-sizing: border-box;
				}
			}
			// 文章的标题
			.txtTitle {
				font-size: 38rpx;
				font-weight: bolder;
				margin-bottom: 20rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.type {
					// height: 80rpx;
					// width: 100rpx;
					font-size: 24rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-left: 10rpx;
					background-color: #e0e9f7;
					border-radius: 20rpx;
					color: #5d91e5;
					padding: 10rpx 15rpx;

					.txt {
						width: 200rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					// padding-left: 14rpx;
					// padding-right: 15rpx;
					// padding-top: 10rpx;
					// padding-bottom: 10rpx;

					.mark {
						font-size: 21rpx;
						margin-right: 12rpx;
						background-color: #5d91e5;
						color: white;
						border-radius: 50%;
						// padding: 6rpx;
						width: 37rpx;
						line-height: 37rpx;
						text-align: center;
					}
				}
			}
			// 文章的内容
			.txtContent {
				text-indent: 2em;
				box-sizing: border-box;
				word-break: break-all;
			}
			// 粉丝团
			.fans {
				margin-top: 20rpx;
				.tit_box {
					position: relative;
					width: 100%;
					height: 139rpx;
					margin: 50rpx 0;
					image {
						width: 80%;
						height: 139rpx;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
					.tit {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						text-align: center;
						font-size: 35rpx;
						font-weight: bold;
						color: $bg-color;
					}
				}

				.img_list {
					margin-top: 20rpx;
					width: 100%;
					font-size: 15rpx;
					image {
						margin-right: 20rpx;
						display: inline-block;
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}
				}
			}
		}
		// 右侧礼物栏
		// 修改为 底部栏
		.btm {
			position: fixed;
			z-index: 20;
			bottom: 0;
			left: 0;
			height: 114rpx;
			border-top: 1px solid #d0d0d0;
			.le {
				background-color: #f0f0f4;
				color: #999aa8;
				border-radius: 25rpx;
				.msg {
					width: 323rpx;
					height: 63rpx;
					display: flex;
					justify-content: start;
					.iconxie {
						font-size: 52rpx;
					}
				}
			}
			.ri {
				display: flex;
				justify-content: space-evenly;
				width: 325rpx;
				.icon {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 22rpx;

					.iconfont {
						font-size: 50rpx;
						color: #323131;
					}
					.forwarding {
						font-size: 54rpx;
					}
					.iconforward-null {
						// font-size: 80rpx;
					}
				}
			}
		}
	}
	.circle {
		position: fixed;
		right: 10rpx;
		top: 10rpx;
	}
}
</style>
