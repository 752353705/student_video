<template>
	<view class="txt_detail">
		<view class="uni_vdplayer">
			<!-- 文章的所选择的图片 -->
			<swiper class="txtImg" :indicator-dots="true" :autoplay="true" 
				:interval="3000" :duration="1000" :circular="true" >
				<swiper-item class="swiper-item" 
					v-for=" (item,index) in imgArr " :key="index" 
				>
					<image
						@longpress="downImg(item)"
						:src="item "
						mode="widthFix"
					></image>
				</swiper-item>
			</swiper>
			<!-- 文章 其他信息 -->
			<view class="txtMain">
				<!-- 作者信息 -->
				<view class="head">
					<view class="head_box" @click="goAuthor">
						<!-- 作者头像 -->
						<view class="head_img"><image :src="txtItem.avatarUrl || avatarUrl" mode=""></image></view>
						<!-- 名称 -->
						<view>{{ txtItem.userName || userName }}</view>
					</view>
					<!-- 立即关注 -->
					<span @click="focusOn" v-if="!txtItem.followed">关注</span>
					<span @click="focusOn" v-else>已关注</span>
				</view>
				<!-- 文章标题 -->
				<view class="txtTitle">
					{{txtItem.title}}
				</view>
				<!-- 文章内容 -->
				<view class="txtContent">
					{{txtItem.content}}
				</view>
				
				<!-- 粉丝团 -->
				<view class="fans" @click="gofansLis">
					<view class="tit">粉丝团</view>
					<view class="img_list">
						<!-- 粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团粉丝团 -->
						
							<image src="/static/avatarUrl.png" mode=""
								v-for="(item,index) in fanlist" 
								class="item"
									:key="index"
							></image>
							<text v-if="fanlist.length > 15">...</text>
					</view>
				</view>
				
				
			</view>
			<!-- 返回上一级页面的按钮 -->
			<text class="iconfont iconleft back" @click="back" ></text>

			<!-- 修改为底部操作 -->
			<view class="btm">
				<view class="le">
					<view class="msg" @click="showPop">
						<!-- <image src="/static/signature.png" mode=""></image> -->
						<text class="iconfont iconxie" style="margin-right: 10rpx;"></text>
						<text>写评论</text>
					</view>
				</view>
				<view class="ri">
					<!-- 喜欢 -->
					<view class="like icon" @click="getLike(1)" type="success">
						<!-- 不喜欢 -->
						<u-icon v-if="!txtItem.praseStatus" name="heart" color="black" size="52"></u-icon>
						<!-- 喜欢 -->
						<u-icon v-else name="heart-fill" color="red" size="52"></u-icon>
						<view class="icon_num">{{ txtItem.praseCount || '' }}</view>
					</view>
					<!-- 评论   点击评论显示评论弹出框-->
					<view class="comments icon" @click="showPop">
						<text class="iconfont iconxinxi" ></text>
						<view class="icon_num">{{ txtItem.commentNum || '' }}</view>
					</view>
					<!-- 收藏 -->
					<view class="comments icon" @tap.stop="collection">
						<text v-if="!txtItem.collectionStatus" class="iconfont iconshoucang1"  ></text>
						<text v-else class="iconfont iconshoucangactive" style="color: red;"  ></text>
					</view>
					
					<!-- 转发 -->
					<view class="forwarding icon" @click="confirmShare">
						<text class="iconfont iconforward-null"></text>
						<view class="icon_num">{{ txtItem.forwardCount }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 生成海报图 -->
		<qrcode-poster ref="poster" title="海报标题" subTitle="海报副标题" price="10" @close="close(index)"></qrcode-poster>
		<!-- 送礼物弹出框 -->
		<!-- <uni-popup ref="popupGifts" type="share" ><uni-popup-gifts title="礼物" @recharge="recharge" @select="selectgift"></uni-popup-gifts></uni-popup> -->
		<!-- 评论弹出框 -->
		<uni-popup ref="popupComments" type="share" >
			<uni-popup-comments @changeCommentsNum="changeCommentsNum" title="评论" type="txt"  
			:txtId="txtId" @select="select"
			></uni-popup-comments>
		</uni-popup>
		<!-- 转发弹出框 -->
		<uni-popup ref="popupShare" type="share" ><uni-popup-share title="分享到" @select="select"></uni-popup-share></uni-popup>
		<!-- 充值弹框 -->
		<uni-popup ref="popupRecharge" type="share" ><uni-popup-recharge title="分享到" @select="select"></uni-popup-recharge></uni-popup>
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
			fanlist:[1,2,3,4,5,6,7,8,9,1,1,1,1,1,1,1,1,9,1,1,1,1,1,1],
			clt:false, //表示用户没有进行收藏
			txtItem:{
				title:'',
				content:''
			},
			imgArr:'', //文章的背景图
			txtId:'',
			// 当用户浏览自己的文章 时没有 头像和 姓名
			userName:'',
			avatarUrl:'',
			// 文章的转发数
			forwardCount: 0,
			// 文章的点赞数
			praseCount: 0,
			timeStamp: 0,
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
		// 获取文章的 id
		// 然后在进行请求获取文章详情
		console.log('文章 option',option.txtId);
		// 根据文章的id 发起请求 获取文章的详情
		this.txtId = option.txtId || 6
		this.getTxtDetail(this.txtId)
		
		this.userName = uni.getStorageSync('user_name')
		this.avatarUrl = '/static/avatarUrl.png'

		// 用于显示分享到朋友圈
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
	},
	onShow() {
		console.log('用户进行浏览', this.txtItem);
		this.api._post(
			'history',
			{
				itemId: this.txtId,
				itemType:"A"
			},
			function(res) {
				console.log('用户进行浏览成功', res);
			}
		);
	},
	onReady() {
		// 页面加载完成 进行浏览记录
	
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
			`article/forward/${_this.txtId}`,{},
			function(res) {
				console.log('文章id 用户进行转发成功', res);

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
		// return {
		// 	title: '自定义转发标题',
		// 	query: `videoId=842c376a462548f187d8c37df8f2eab7`
		// 	// imageUrl:'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
		// };
	},

	methods: {
		// 点击粉丝团 跳转到 粉丝列表
		gofansLis(){
			uni.navigateTo({
				url:`/pages/my/myFans`
			})
		},
		// 对图文进行收藏操作
		collection(){
			let _this = this
			this.api._post(
				'collection',
				{
					itemId: this.txtItem.id, //被关注的 作者id
					itemType: 'A', //被关注的 作者id
				},
				function(res) {
					_this.txtItem.collectionStatus = !_this.txtItem.collectionStatus
					console.log('进行收藏成功', res);
				}
			);
		},
		// 用户长按图片，将图片进行下载
		downImg(imgsrc){
			console.log('用户长按图片进行下载')
			//判断用户授权
			wx.downloadFile({
			  url: imgsrc,
			  success: res => {
			    console.log('downloadFile成功',res);
			    // wx.showLoading({
			    //   title: '获取资源中',
			    // })
			    wx.saveImageToPhotosAlbum({
			      filePath: res.tempFilePath,
			      success: file => {
			        console.log('saveVideoToPhotosAlbum成功',file);
			        wx.hideLoading()
			        wx.showToast({
			          title: '下载成功',
			          icon: 'none',
			        })
			      },
			      fail: err => {
			        console.log('saveVideoToPhotosAlbum失败',err)
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
			                      showCancel: false,
			                    })
			                  } else {
			                    wx.showModal({
			                      title: '提示',
			                      content: '获取权限失败，将无法保存到相册哦~',
			                      showCancel: false,
			                    })
			                  }
			                },
			              })
			            }
			          })
			        }
			      }
			    })
			  },
			  fail:res=>{
			    console.log('downloadFile失败', res);
						
						
			  }
			})
		},
		// 获取 要修改文章的详情
		getTxtDetail(id){
			let _this = this
			this.api._get(
				`article/${id}`,{},
				function(res) {
					console.log('获取要修改文章的详情',res)
					_this.txtItem = res.data
					_this.imgArr = res.data.images.split(',')
				}
			);
		},
		
		// 显示充值弹框
		recharge(e, done) {
			this.$refs.popupRecharge.open();
			done();
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
			uni.navigateBack({
				delta: 1
			});
		},
		// 点击用户头像跳转到发布者的详情页
		goAuthor() {
			let item = {
				avatarUrl:this.txtItem.avatarUrl,
				userId:this.txtItem.userId,
			}
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
									console.log('进行取消关注成功', res);
									__this.txtItem.followed = !_this.txtItem.followed;
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
		// 控制送礼物的弹窗
		sendGift() {
			console.log('送礼物');
			this.$refs.popupGifts.open();
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
			console.log('评论窗口 ref',)
			this.$refs.popupComments.open();
			// 当用户打开评论窗口之后，当前视频暂停播放，关闭之后视频继续播放
		},

		// 控制转发弹窗
		confirmShare() {
			console.log('转发 ref',)
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

			console.log('用户进行点赞操作')
			
			if(!this.txtItem.praseStatus){
				// 用户还没有进行点赞
				this.api._post(
					`article/likeArticle/${_this.txtItem.id}`,{},
					function(res) {
						console.log('用户进行文章点赞 点亮红心',res)
						_this.txtItem.praseStatus = true;
						_this.txtItem.praseCount++;
					}
				);
			}else{
				// 用户进行了点赞操作
				this.api._post(
					`article/likeArticle/${_this.txtItem.id}`,{},
					function(res) {
						console.log('用户进行文章取消点赞',res)
						_this.txtItem.praseStatus = false;
						_this.txtItem.praseCount--;
					}
				);
			}
		},
	}
};
</script>

<style lang="less">
	page{
		background-color: white;
	}
	
	
.txt_detail {
	box-sizing: border-box;
	padding-bottom: 32rpx;
	background-color: white;
	.uni_vdplayer {
		position: relative;
		width: 100%;
		height: 100%;
		
		// 文章详情页的 轮播图片 原始
		.txtImg {
			width: 100%;
			height: 900rpx;
			.swiper-item {
				width: 100%;
				height: 100%;
				// background-color: red;
				position: relative;
				
				image {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 100%;
					// height: 100%;
				}
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
		.iconleft{
			font-size: 45rpx;
		}
		// 文章其他信息
		.txtMain {
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx 40rpx 10rpx;
			margin-bottom: 100rpx;
			color: black;
			// 作者信息
			.head {
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: start;
				align-items: center;
				.head_box {
					display: flex;
					align-items: center;
					.head_img {
						width: 60rpx;
						height: 60rpx;
						// background-color: yellow;
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
			// 文章的标题
			.txtTitle{
				font-size: 38rpx;
				font-weight: bolder;
				margin-bottom: 20rpx;
			}
			// 文章的内容
			.txtContent {
				text-indent:2em;
				box-sizing: border-box;				
			}
			// 粉丝团
			.fans{
				margin-top: 20rpx;
				.tit{
					font-size: 35rpx;
					font-weight: bold;
				}
				.img_list{
					margin-top: 20rpx;
					// width: 304rpx;
					width: 100%;
					font-size:15rpx;
					
					overflow:hidden;//一定要写
					display:-webkit-box;//一定要写
					-webkit-box-orient: vertical;//一定要写
					-webkit-line-clamp: 2;//控制行数
					// text-overflow: ellipsis;//超出省略号
					word-break: break-all;
						image{
							margin-right: 20rpx;
							display: inline-block;
							width: 60rpx;
							height: 60rpx;
						}
				}
			}
		}
		// 右侧礼物栏
			// 修改为 底部栏
		
		.btm{
			position: fixed;
			z-index: 20;
			bottom: 0;
			left: 0;
			background-color: white;
			width: 100%;
			height: 114rpx;
			border-top: 1px solid #d0d0d0;
			box-sizing: border-box;
			padding-left:40rpx ;
			padding-right: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.le{
				background-color: #f0f0f4;
				color: #999aa8;
				border-radius: 20rpx;
				.msg {
					width: 310rpx;
					height: 63rpx;
					display: flex;
					justify-content: start;
					align-items: center;
					.icon_num {
						margin-top: 10rpx;
						// color: white;
					}
					.iconxie{
						font-size: 52rpx;
					}
				}
			}
			.ri{
				display: flex;
				justify-content: space-evenly;
				align-items: flex-start;
				width: 312rpx;
				.icon {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 22rpx;
					.iconfont{
						font-size: 50rpx;
					}
				}
			}
		}
	}
}

// 调控 iconfont 图标的颜色大小
// .iconfont{
// 	font-size: 65rpx;
// 	color: black;
// }
// .t-icon{
// 	width: 27px;
// 	height: 27px;
// }
</style>
