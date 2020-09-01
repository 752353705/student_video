<template>
	<view class="txt_detail used_detail">
		<view class="uni_vdplayer">
			<!-- 二手商品发布人的 个人信息 -->
			<view class="used_head">
				<view class="head_box" @click="goAuthor">
					<!-- 返回上一页的按钮 -->
					<text class="iconfont iconleft back" @click.stop="back" ></text>
					<!-- 作者头像 -->
					<view class="head_img"><image :src="txtItem.avatarUrl || avatarUrl" mode=""></image></view>
					<!-- 名称 -->
					<view>{{ txtItem.userName || userName }}</view>
				</view>
				<!-- 立即关注 -->
				<span @click="focusOn" v-if="focus">关注</span>
				<span @click="focusOn" v-else>已关注</span>
			</view>
			<!-- 内容主题 -->
			<view class="main">
				<!-- 二手商品的价格 -->
					<view class="price">
						￥
						 <text class="num"> {{txtItem.price / 100}} </text>
					</view>
				<!-- 二手商品的描述 -->
				<view class="describe">
					{{txtItem.goodsDescribe}}
				</view>
				
				<!-- 二手显示图片 -->
				<view class="used_imgbox" 
					v-for="(item,index) in imgArr " :key="index">
					<image  
						@tap.stop="detailImg"
						:src="item" mode="widthFix"></image>
				</view>
			</view>
			
			<!-- 右侧的 点赞留言 -->
			<view class="right">
				<!-- 喜欢 -->
				<view class="like icon" @click="getLike" type="success">
					<!-- 不喜欢 -->
					<u-icon v-if="!txtItem.praseStatus" name="heart" color="#ffffff" size="56"></u-icon>
					<!-- 喜欢 -->
					<u-icon v-else name="heart-fill" color="red" size="56"></u-icon>
					<view class="icon_num">{{ txtItem.praseCount || '' }}</view>
				</view>
				<!-- 评论   点击评论显示评论弹出框-->
				<view class="comments icon" @click="showPop">
					<text class="iconfont iconxinxi" ></text>
					<view class="icon_num">{{ txtItem.commentNum }}</view>
				</view>
				<!-- 转发 -->
				<view class="forwarding icon" @click="confirmShare">
					<text class="iconfont iconforward-null"></text>
					<view class="icon_num">{{ txtItem.forwardCount }}</view>
				</view>
			</view>
		</view>

		<!-- 生成海报图 -->
		<qrcode-poster ref="poster" title="海报标题" subTitle="海报副标题" price="10" @close="close(index)"></qrcode-poster>

		<!-- 评论弹出框 -->
		<uni-popup ref="popupComments" type="share" @change="change">
			<uni-popup-comments @changeCommentsNum="changeCommentsNum" 
				title='评论'  :txtid="id" @select="select"
				type="used"
			></uni-popup-comments>
		</uni-popup>
		<!-- 转发弹出框 -->
		<uni-popup ref="popupShare" type="share" @change="change"><uni-popup-share title="分享到" @select="select"></uni-popup-share></uni-popup>
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

// 引入双击红心特效
import likeButton from '@/components/like-button/like-button.vue';
export default {
	data() {
		return {
			id:'',
			txtItem:'',
			imgArr:'', //文章的背景图

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
		likeButton,
		QrcodePoster
	},
	onLoad(option) {
		// 获取文章的 id
		// 然后在进行请求获取二手详情
		console.log('文章 option',option.txtId);
		// 根据文章的id 发起请求 获取文章的详情
		this.id = option.usedId
		this.getTxtDetail(option.usedId || 7)
		

		this.userName = uni.getStorageSync('user_name')
		this.avatarUrl = uni.getStorageSync('user_img')
		
		// 用于显示分享到朋友圈
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
	},
	onShow() {
		console.log('当前作品的浏览量 onshow')
		// 显示当前 二手商品的 浏览量
		this.api._post(
			`secondGoods/views/${_this.txtItem.id}`,{},
			function(res) {
				console.log('当前作品的浏览量',res)
				
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
			`secondGoods/forward/${_this.txtItem.id}`,{},function(res) {
				console.log('用户进行转发成功', res);
				_this.txtItem.forwardCount++;
			}
		);

		// return {
		// 	// title: '转发到好友和群聊',
		// 	path: '/pages/playVideo/playVideo?videoId=' + this.videoId
		// 	// imageUrl: '自定义转发图片',
		// 	// desc:'自定义描述'
		// };
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
		// 对当前二手图片进行详细的 浏览
		detailImg() {
			// 预览图片
			uni.previewImage({
				urls: this.imgArr,
				indicator: 'number',
				loop: true
			});
		},
		
		// 获取 文章的详情
		getTxtDetail(id){
			let _this = this
			this.api._get(
				`secondGoods/${id}`,{},
				function(res) {
					console.log('获取文章的详情',res)
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
				// this.api._post(
				// 	'follow',
				// 	{
				// 		followedId: _this.userId //被关注的 作者id
				// 	},
				// 	function(res) {
				// 		// console.log('进行关注成功',res);
				// 		_this.focus = false;
				// 	}
				// );
			} else {
				// 用户已经进行了关注，此时再进行点击表示用户是否要取消关注
				uni.showModal({
					content: '确认不在关注',
					success: function(res) {
						// if (res.confirm) {
						// 	// console.log('用户点击确定');
						// 	_this.api._post(
						// 		'follow',
						// 		{
						// 			followedId: _this.userId //被关注的 作者id
						// 		},
						// 		function(res) {
						// 			console.log('进行关注成功', res);
						// 			_this.focus = true;
						// 		}
						// 	);

						// 	// _this.focus = true //用户取消关注
						// } else if (res.cancel) {
						// 	console.log('用户点击取消');
						// }
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

		// 点击红心 对文章进行点赞操作
		getLike() {
			let _this = this;
			// this.like = !this.like;
			// 视频点赞 发起请求 ，

			console.log('用户进行点赞操作')
			
			if(!this.txtItem.praseStatus){
				// 用户还没有进行点赞
				this.api._post(
					`secondGoods/likeSecondGoods/${_this.txtItem.id}`,{},
					function(res) {
						console.log('用户进行二手点赞 点亮红心',res)
						_this.txtItem.praseStatus = true;
						_this.txtItem.praseCount++;
					}
				);
			}else{
				// 用户进行了点赞操作
				this.api._post(
					`secondGoods/likeSecondGoods/${_this.txtItem.id}`,{},
					function(res) {
						console.log('用户进行二手取消点赞',res)
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
	background-color: black;
}
// 二手详情页面的 样式
.used_detail{
	
	color: white;
	// 二手商品的 发布者信息
	.used_head {
		width: 100%;
		height: 140rpx;
		box-sizing: border-box;
		padding-top: 54rpx;
		// padding-right: 20rpx;
		background-color: black;
		padding-bottom: 20rpx;
		
		display: flex;
		justify-content: start;
		align-items: center;
		position: fixed;
		top: 0rpx;
		left: 20rpx;
		z-index: 10;
		opacity: 1;
		// background-color: white;
		
		.head_box {
			display: flex;
			align-items: center;
			.head_img {
				width: 60rpx;
				height: 60rpx;
				background-color: yellow;
				border-radius: 50%;
				margin-right: 20rpx;
				margin-left: 20rpx;
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
	// 二手内容主体
	.main{
		box-sizing: border-box;
		padding-top:140rpx ;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 20rpx;
		// 二手商品的 价格显示
		.price{
			box-sizing: border-box;
			// padding: 5rpx 20rpx;
			color: #fc3c3b;
			.num{
				font-weight: bolder;
				font-size: 38rpx;
			}
		}
		// 二手商品的描述
		.describe{
			font-size: 30rpx;
			// font-weight: bold;
		}
		//二手发布 图片
		.used_imgbox{
			border-radius: 30rpx;
			overflow: hidden;
			margin-top: 30rpx;
			width: 100%;
			image{
				width: 100%;
			}
		}
	}
	
	// 右侧的操作栏
	.right {
		width: 100rpx;
		height: 439rpx;
		background-color: transparent;
		position: fixed;
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
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.icon {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 22rpx;
			.icon_num {
				margin-top: 10rpx;
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
	.back{
		font-size: 45rpx;
	}
</style>
