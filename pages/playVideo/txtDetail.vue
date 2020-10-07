<template>
	<view class="txt_detail">
		<view class="uni_vdplayer w-100 h-100">
			<!-- 文章的所选择的图片 -->
			<swiper class="txtImg w-100" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item class="swiper-item w-100 h-100" v-for="(item, index) in imgArr" :key="index">
					<image @longpress="downImg(item)" :src="item" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			
			<!-- 礼物图片 -->
			<!-- <view class="barrage-item">
				<image class="barrage-image" src="../../static/avatarUrl.png" mode=""></image>
				
				<view class="body">
					<view class="">谁送的</view>
					<view class="">票数增加</view>
				</view>
				<view class="img">
					礼物图片
				</view>
			</view> -->
			
			
			<!-- 滚动显示送礼物 -->
			<sin-barrage v-if="sinBar" :list="list" :bottom="bottom" :left="left" 
				:color="color" :background="background" :opacity="0.7" 
					:rows="3"  :msec="msec" @showSinBar="showSinBar"
				 >
			</sin-barrage>
			
			<!-- 当前作品的排名 -->
			<view class="txt_rank" @tap="goRank">
				<view class="rank_item" v-for="(item,index) in rankList" :key="index">
					<view class="num">{{item.num}}</view>
					<view class="desc">{{item.txt}}</view>
				</view>
			</view>
			
			<!-- 文章 其他信息 -->
			<view class="txtMain w-100 pa-t20 pa-r40 pa-b10 pa-l40 ma-b100 box-boder">
				<!-- 作者信息 -->
				<view class="head w-100 item-center">
					<view class="head_box item-center" @click="goAuthor">
						<!-- 作者头像 -->
						<view class="head_img ma-r20">
							<image class="w-100 h-100" :src="txtItem.avatarUrl || avatarUrl" mode=""></image>
						</view>
						<!-- 名称 -->
						<view class="">{{ txtItem.userName || userName }}</view>
					</view>
					<!-- 立即关注 -->
					<span @click="focusOn">
						{{ !txtItem.followed ? '关注' : '已关注'}}
					</span>
					<!-- <span @click="focusOn" v-else>已关注</span> -->
					
					<!-- 排行榜 -->
					<!-- <span>排行榜</span> -->
					
				</view>
				<!-- 文章标题 -->
				<view class="txtTitle">{{ txtItem.title }}</view>
				<!-- 文章内容 -->
				<view class="txtContent">{{ txtItem.content }}</view>

				<!-- 粉丝团 -->
				<view v-if="fanlist.length > 0" class="fans" @click="gofansLis">
					<view class="tit">粉丝团</view>
					<view class="img_list">
						<!-- 粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团 -->
						<image :src="item.avatarUrl" mode="" v-for="(item, index) in fanlist" class="item" :key="index"></image>
						<text v-if="fanlist.length > 15">...</text>
					</view>
				</view>
			</view>
			<!-- 返回上一级页面的按钮 -->
			<text class="iconfont iconleft back" @click="back"></text>

			<!-- 修改为底部操作 -->
			<view class="btm w-100 bg-w box-boder pa-l40 pa-r10 panel-between item-center ">
				<view class="le">
					<view class="msg item-center" @click="showPop">
						<!-- <image src="/static/signature.png" mode=""></image> -->
						<text class="iconfont iconxie" style="margin-right: 10rpx;"></text>
						<text>写评论</text>
					</view>
				</view>
				<view class="ri item-start">
					<!-- 喜欢 -->
					<view class="like icon" @click="getLike(1)" type="success">
						<!-- 不喜欢 -->
						<u-icon v-if="!txtItem.praseStatus" name="heart" color="black" size="52"></u-icon>
						<!-- 喜欢 -->
						<u-icon v-else name="heart-fill" color="red" size="52"></u-icon>
						<view class="icon_num ma-t10">{{ txtItem.praseCount || '' }}</view>
					</view>
					<!-- 送礼物 -->
					<view class="gift icon" @click="sendGift(index)">
						<text class="t-icon iconliwu"></text>
					</view>
					
					<!-- 评论   点击评论显示评论弹出框-->
					<view class="comments icon" @click="showPop">
						<text class="iconfont iconxinxi"></text>
						<view class="icon_num ma-t10">{{ txtItem.commentNum || '' }}</view>
					</view>
					<!-- 收藏 -->
					<view class="comments icon" @tap.stop="collection">
						<text v-if="!txtItem.collectionStatus" class="iconfont iconshoucang1"></text>
						<text v-else class="iconfont iconshoucangactive" style="color: red;"></text>
					</view>

					<!-- 转发 -->
					<view class="forwarding icon" @click="confirmShare">
						<text class="iconfont iconforward-null"></text>
						<view class="icon_num ma-t10">{{ txtItem.forwardCount }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 生成海报图 -->
		<qrcode-poster ref="poster" title="海报标题" subTitle="海报副标题" price="10" @close="close(index)"></qrcode-poster>
		<!-- 送礼物弹出框 -->
		<uni-popup ref="popupGifts" type="share" >
			<uni-popup-gifts title="礼物" @rank="rank"  @recharge="recharge" @select="selectgift"></uni-popup-gifts>
		</uni-popup>
		<!-- 评论弹出框 -->
		<uni-popup ref="popupComments" type="share">
			<uni-popup-comments @changeCommentsNum="changeCommentsNum" title="评论" type="txt" :txtId="txtId" @select="select"></uni-popup-comments>
		</uni-popup>
		<!-- 转发弹出框 -->
		<uni-popup ref="popupShare" type="share"><uni-popup-share title="分享到" @select="select"></uni-popup-share></uni-popup>
		<!-- 充值弹框 -->
		<uni-popup ref="popupRecharge" type="share">
			<uni-popup-recharge :money="money" title="分享到" @select="select"></uni-popup-recharge>
		</uni-popup>
		<!-- 送礼排行 -->
		<uni-popup ref="popupRank" type="share" >
			<uni-popup-rank title="排行榜"  @select="select"></uni-popup-rank>
		</uni-popup>
	</view>
</template>

<script>
let timer = null;
// 滚动送礼物
import sinBarrage from '@/components/sin-barrage/sin-barrage.vue'
// 生成海报图进行转发
import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue';
// 引入送礼物、评论、转发弹出框 排行榜
import userComment from '@/components/user-comment.vue';
import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue';
import uniPopupComments from '@/components/uni-popup/uni-popup-comments.vue';
import uniPopupGifts from '@/components/uni-popup/uni-popup-gifts.vue';
import uniPopupRecharge from '@/components/uni-popup/uni-popup-recharge.vue';
import uniPopupRank from '@/components/uni-popup/uni-popup-rank.vue';

// 引入双击红心特效
import likeButton from '@/components/like-button/like-button.vue';
export default {
	data() {
		return {
			// 控制礼物弹窗的显隐
			sinBar:true,
			// 送礼物的数据
			list: [{
						id: 1,
						image: "http://thirdwx.qlogo.cn/mmopen/vi_32/ZU1C66ckT0O8GUrhQXWV6Bak4T1e23ZDBbYNH65t1so8QUI4EzibUtPenyX2CmPOcO4p1x38ophZ3ZtTPc5yjlw/132",
						text: '张三赠送鲜花'
				}, {
						id: 2,
						image: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTII4gjVwfYnnn08OYnQvNx6Azhd6WLAX2lRdEjy0u5VnWMlLkFdno9MiaY9RMX539IibpFCcNklk9Xw/132",
						text: '李四赠送鲜花'
				}, {
						id: 3,
						image: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKxu6TyMBhVsj8kC6uDAicXGNuZczpiaVUsk7Wh1ianReX1ne8TGGEDVymfm4UicS21FXUQzUibV5HyP8Q/132",
						text: '王五赠送鲜花'
				}, {
						id: 4,
						image: "http://thirdwx.qlogo.cn/mmopen/vi_32/pyOZXTibxo7HOonF8yjTCicY7pA0onoHNh5V2pic6qibB7MeF5hMSBFr6SdAbmjaKZ4XMt5pQiabwSicviaiarLicBEYkyg/132",
						text: '赵六赠送鲜花'
				}, {
						id: 5,
						image: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLY9xp1nsR6qcJoiaacjlzhQY8OndsvaVS2yd6s8OtWkkzvGk2wpibQNxbyrH4rYIJljO1Vg0ZmgbkA/132",
						text: '钱七赠送鲜花'
				}],
				bottom: 500,
				left: 42,
				color: '#FFFFFF',
				background: '#000000',
				msec: 2000,
			
			
			// 排名
			rankList:[{
				num:667,
				txt:'投票'
			},{
				num:1,
				txt:'排名'
			},{
				num:0,
				txt:'距离上一名'
			}],
			money:0,
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
			// 文章的点赞数
			// praseCount: 0,
			timeStamp: 0,
			focus: true, //判断是否进行关注  true 未关注  false 已关注
			commentNum: ''
		};
	},
	components: {
		sinBarrage,
		userComment,
		uniPopupShare,
		uniPopupComments,
		uniPopupGifts,
		uniPopupRecharge,
		likeButton,
		QrcodePoster,
		uniPopupRank
	},
	onLoad(option) {
		// this.$refs.popupGifts.open();
		// this.$refs.popupRank.open();
		// 获取文章的 id
		// 然后在进行请求获取文章详情
		// console.log('文章 option',option.txtId);
		// 根据文章的id 发起请求 获取文章的详情
		// this.txtId = option.txtId || 6;
		this.txtId = option.txtId;
		// 获取文章信息
		this.getTxtDetail(this.txtId);

		this.userName = uni.getStorageSync('user_name');
		this.avatarUrl = '/static/avatarUrl.png';

		// 用于显示分享到朋友圈
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
	},
	onShow() {
		// console.log('用户进行浏览', this.txtItem);
		this.api._post(
			'history',
			{
				itemId: this.txtId,
				itemType: 'A'
			},
			function(res) {
				// console.log('用户进行浏览成功', res);
			}
		);
	},
	// 触发页面的转发事件
	onShareAppMessage: function(res) {
		let _this = this;
		console.log('进行转发')
		if (res.from === 'button') {
			// 来自页面内转发按钮
			// console.log('按钮进行的转发', res);
		}
		// 调用 转发请求 记录用户转发了多少次
		this.api._post(`article/forward/${_this.txtId}`, {}, function(res) {
			// console.log('文章id 用户进行转发成功', res);

			_this.txtItem.forwardCount++;
		});

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
		// return {
		// 	title: '自定义转发标题',
		// 	query: `videoId=842c376a462548f187d8c37df8f2eab7`
		// 	// imageUrl:'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
		// };
	},

	methods: {
		// 控制弹窗显隐
		showSinBar(){
			// console.log('隐藏弹窗')
			this.sinBar = false
		},
		
		// 跳转到排行榜详情
		goRank(){
			uni.navigateTo({
				url:'/pages/rank/rank'
			})
		},
		
		// 显示送礼物排行榜弹窗
		rank(e, done) {
			this.$refs.popupRank.open();
			done();
		},
		// 隐藏排行弹窗
		hiddenRank(){
			this.$refs.popupRank.close();
		},
		// 获取用户的粉丝的头像
		getOtherFans() {
			this.api._get(
				'follow/otherUserfans',
				{
					userId: this.txtItem.userId,
					pageNum: 1,
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
					// console.log('进行收藏成功', res);
				}
			);
		},
		// 用户长按图片，将图片进行下载
		downImg(imgsrc) {
			// console.log('用户长按图片进行下载')
			//判断用户授权
			wx.downloadFile({
				url: imgsrc,
				success: res => {
					// console.log('downloadFile成功',res);
					// wx.showLoading({
					//   title: '获取资源中',
					// })
					wx.saveImageToPhotosAlbum({
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
							// console.log('saveVideoToPhotosAlbum失败',err)
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
		},
		// 获取 要修改文章的详情
		getTxtDetail(id) {
			let _this = this;
			this.api._get(`article/${id}`, {}, function(res) {
				console.log('获取要修改文章的详情', res);
				_this.txtItem = res.data;
				_this.imgArr = res.data.images.split(',');

				// 获取粉丝团
				_this.getOtherFans();
			});
		},
		// 获取用户的H币
		getHgold(){
			let _this = this
			// 请求H币个数
			this.api._get('user/gold',{},function(res){
				_this.money = res.data.goldNumber
				_this.$refs.popupRecharge.open();
				
			})
		},
		
		// 显示充值弹框
		recharge(e, done) {
			this.getHgold()
			done()
		},
		// 当海报图生成之后，关闭分享弹窗
		close(index) {
			// console.log('海报图生成 关闭分享弹窗 this.$refs.popupShare ===>',this.$refs.popupShare)
			this.$refs.popupShare.close();
		},
		// 控制页面评论数的改变
		changeCommentsNum(num) {
			this.commentNum += 1;
		},
		// 返回上一页面
		back() {
			// uni.switchTab({
			// 	url:'/pages/list/list'
			// })
			uni.navigateBack({
				delta:1
			})
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
			if (this.focus) {
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
									followedId: _this.txtItem.userId //被关注的 作者id
								},
								function(res) {
									// console.log('进行取消关注成功', res);
									__this.txtItem.followed = !_this.txtItem.followed;
								}
							);

							// _this.focus = true //用户取消关注
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			}
		},
		// 控制送礼物的弹窗
		sendGift() {
			// console.log('送礼物');
			this.$refs.popupGifts.open();
		},
		selectgift(e, done) {
			let _this = this 
			// console.log('送礼物',e)
			// console.log('送礼物',e.item[e.index],e.item[e.index].giftId)
			uni.showModal({
				title: '提示',
				content: `您确定赠送${e.item.giftName}吗`,
				success: function(res) {
					if (res.confirm) {
						// console.log('用户点击确定',uni.getProvider,);
						// 用户点击确定之后，进行赠送礼物
						_this.api._post('gift/article',{
							"articleId":_this.txtItem.id,
							"giftId":e.item.giftId
						},function(res){
							// console.log('赠送礼物成功',res)
							if(res.data.errno === 507){
								// 调用获取用户金币
								_this.recharge()
							}else{
								uni.showToast({
									icon:'none',
									duration:2000,
									title:`加油成功`
								})
							}
						})
						
						
						
						
						// 当用户的余额足够时,从余额进行扣除,反之提醒进行充值
						// 之后 提示充值成功
						
						
						
						
						// uni.requestPayment({
						// 	provider: 'wxpay', //服务提供商 通过uni.getProvider获取
						// 	timeStamp: String(Date.now()), //时间戳
						// 	nonceStr: 'A1B2C3D4E5', //随机字符串
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
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 控制评论弹窗
		showPop() {
			// console.log('评论窗口 ref',)
			this.$refs.popupComments.open();
			// 当用户打开评论窗口之后，当前视频暂停播放，关闭之后视频继续播放
		},

		// 控制转发弹窗
		confirmShare() {
			// console.log('转发 ref',)
			this.$refs.popupShare.open();
			// 当打开转发窗口之后当前视频暂停，取消之后视频继续播放
		},
		//分享海报
		sharePoster() {
			//获取带参数二维码
			this.is_show_model = false;

			// 将要在海报图中进行绘制的二维码传送过去
			this.$refs.poster.showCanvas('https://oss.zhangyubk.com/cmqrcode.jpg');
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

		// 点击红心 对文章进行点赞操作
		getLike(num) {
			let _this = this;
			// this.like = !this.like;
			// 视频点赞 发起请求 ，

			// console.log('用户进行点赞操作')

			if (!this.txtItem.praseStatus) {
				// 用户还没有进行点赞
				this.api._post(`article/likeArticle/${_this.txtItem.id}`, {}, function(res) {
					// console.log('用户进行文章点赞 点亮红心',res)
					_this.txtItem.praseStatus = true;
					_this.txtItem.praseCount++;
				});
			} else {
				// 用户进行了点赞操作
				this.api._post(`article/likeArticle/${_this.txtItem.id}`, {}, function(res) {
					// console.log('用户进行文章取消点赞',res)
					_this.txtItem.praseStatus = false;
					_this.txtItem.praseCount--;
				});
			}
		}
	}
};
</script>

<style lang="less">
	
	page {
		background-color: #f8f8f8;
	}
	.t-icon {
		width: 25px;
		height: 25px;
	}
.txt_detail {
	box-sizing: border-box;
	padding-bottom: 32rpx;
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
		
		
		// 测试
		// .barrage-item{
		// 	width: 286rpx;
		// 	height: 100rpx;
		// 	// display: flex;
		// 	// justify-content: space-between;
		// 	// align-items: center;
		// 	.barrage-image{
		// 		background-color: yellow;
		// 		width: 60rpx;
		// 		height: 60rpx;
		// 		border-radius: 50%;
		// 	}
		// 	.body{
		// 		display: inline;
		// 		margin-left: 20rpx;
		// 	}
		// 	.img{
		// 		display: inline;
		// 	}
		// }
		
		
		// 当前作品的排名
		.txt_rank{
			width: 92%;
			height: 134rpx;
			background-color: white;
			// background-image: linear-gradient(to bottom, #f2e2b6, #caac70);
			margin: 30rpx auto;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-radius: 39rpx;
			box-sizing: border-box;
			// color: #b23027;
			.rank_item{
				width: 33%;
				// border-right: 1px solid #bb7233;
				text-align: center;
				// padding-right: 20rpx;
				.num{
					font-size: 47rpx;
					font-weight: bold;
				}
				.desc{
					font-size: 26rpx;
					color: #cacaca;
				}
			}
			.rank_item:nth-child(3){
				border: none;
				padding: 0;
			}
		}
		// 设置返回 上一页面 的按钮
		.back {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 67rpx;
			left: 30rpx;
		}
		.iconleft {
			font-size: 45rpx;
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
			}
			// 文章的内容
			.txtContent {
				text-indent: 2em;
				box-sizing: border-box;
			}
			// 粉丝团
			.fans {
				margin-top: 20rpx;
				.tit {
					font-size: 35rpx;
					font-weight: bold;
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
				border-radius: 20rpx;
				.msg {
					width: 310rpx;
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
				width: 354rpx;
				.icon {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 22rpx;
					.iconfont {
						font-size: 50rpx;
					}
				}
			}
		}
	}
}
</style>
