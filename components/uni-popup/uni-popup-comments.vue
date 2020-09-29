<!-- 进行评论的模板 -->
<template>
	<view class="uni-popup-share">
		<view class="uni-share-title">
			<text class="uni-share-title-text">{{ title }}</text>
		</view>
		<view class="uni-share-content" style="height: 400px;">
			<!-- 评论内容区 
				采用 mescroll 进行 评论区的渲染
			-->
			<mescroll-uni class="mescroll" ref="mescrollRef" top="50" bottom="100" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<user-comment @reply="reply" @changeMsgList="changeMsgList" :msgList="msgList" :type="type" :threereplayname="threereplayname" />
				<!-- 当没有评论的时候 -->
				<view v-if="msgList.length === 0" class="user_cmt" style="margin-top: 29px;"><u-divider>快来抢沙发啊~</u-divider></view>
			</mescroll-uni>
		</view>
		<!-- 用户的输入评论区 -->
		<view class="msgBox">
			<!-- 用户的头像 -->
			<view class="img_user"><image :src="userImg" mode=""></image></view>
			<view class="msg">
				<!-- <image src="/static/signature.png" mode=""></image> -->
				<text class="iconfont iconxie" style="margin-right: 10rpx;"></text>
				<input type="text" value="" 
					:placeholder="replayVal" cursor-spacing="15" 
					:value="val" :focus="inputfocus" @input="sendVal" 
					/>
			</view>
			<!-- 发表评论按钮 -->
			<view @click="send" style="color: black;">发送</view>
		</view>
		<!-- 取消按钮 -->
		<view class="close"><image src="../../static/cmt_close.png" mode="" @click="close"></image></view>
	</view>
</template>

<script>
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';

import userComment from '../user-comment.vue';
export default {
	mixins: [MescrollMixin], // 使用mixin
	name: 'UniPopupShare',
	props: {
		// 表示当前是哪类的评论，
		// 视频 二手 文章
		type: {
			type: String
		},
		title: {
			type: String,
			default: '分享到'
		},
		// 当前视频的ID
		videoId: {
			type: String
		},
		// 当前文章的 id
		txtId: {
			type: String
		},
		//当前二手 id
		usedId: {
			type: String
		}
	},
	inject: ['popup'],
	data() {
		return {
			// 输入框是否聚焦
			inputfocus: false,
			// 上拉加载
			upOption: {
				toTop: {
					src: '' // 不显示回到顶部按钮
				},
				empty: {
					use: false
				}
			},
			// 下拉刷新
			downOption: {
				isLock: true
			},
			// 控制空布局的使用

			// 用户头像
			userImg: '',
			//动态修改输入框中的值，进行用户之间的交流互评
			replayVal: '留下你的精彩评论吧',
			// 控制发送请求 是视频评论 还是 进行回复
			sendStyle: true, //默认是 对视频进行评论
			commentId: '', //进行评论回复的ID
			replayIndex: '', //进行评论的 在msgList中的index
			// 当进行三级评论时，储存评论的用户名
			threereplayname: '回复 旭东：',

			twoShow: false,
			val: '',
			msgList: [],
			pageNum: 1 //默认从第0页开始请求
		};
	},
	components: {
		MescrollEmpty,
		userComment
	},
	created() {
		console.log('创建 uni-popup-comments');
		console.log('当前的时间 data==>', new Date());
	},
	mounted() {
		let _this = this;
		// console.log('挂载 当前评论区的 类型==> ',_this.txtId)
		uni.getStorage({
			key: 'user_img',
			success: function(res) {
				// console.log('赋值 user_img',res);
				_this.userImg = res.data || '/static/avatarUrl.png';
			},
			fail: function(res){
				_this.userImg = '/static/avatarUrl.png'
			}
		});

		console.log('txtDetail 传递过来的参数', this.msg);
	},
	methods: {
		// 传递给子组件的方法，用于用户对其修改当前页面中的数据
		changeMsgList(index, index2) {
			if (index2 == undefined) {
				// 当对视频评论进行 点赞
				if (this.msgList[index].liked) {
					// 已经进行了点赞 则现在是取消点赞
					this.msgList[index].liked = false;
					this.msgList[index].praseCount--;
				} else {
					this.msgList[index].liked = true;
					this.msgList[index].praseCount++;
				}
			} else {
				// 当对回复进行点赞
				if (this.msgList[index].replyList[index2].liked) {
					// 回复已经进行了点赞
					this.msgList[index].replyList[index2].liked = false;
					this.msgList[index].replyList[index2].praseCount--;
				} else {
					// 还未点赞
					this.msgList[index].replyList[index2].liked = true;
					this.msgList[index].replyList[index2].praseCount++;
				}
			}
		},
		/**
		 * 控制mescroll 进行操作
		 * */
		/*下拉刷新的回调*/
		downCallback() {
			// console.log('下拉刷新')
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调*/
		upCallback(page) {
			this.type == 'video'
				? this.getVideoCmt(page.num)
				: this.type == 'txt' 
				? this.getTxtCmt(page.num) 
				: this.type == 'used' 
				? this.getUsedCmt(page.num) 
				: '';
		},
		// 获取视频界面的 评论
		getVideoCmt(pageNum) {
			let _this = this;
			this.api._get(
				'comment/getComments',
				{
					pageNum: pageNum,
					pageSize: 10,
					videoId: _this.videoId
				},
				function(res) {
					console.log('请求评论 上拉加载 ===》 res', res.data.list);
					// 修改默认的页数
					// _this.pageNum = res.data.nextPage
					// 参数一：当前页获取的数据量
					_this.mescroll.endSuccess(res.data.list.length);

					// console.log('_this.msgList ===》',_this.msgList,"res.data.list ==>",res.data.list)
					// 进行数组之间的拼接 如果请求回的内容相同 ，则不进行拼接
					if (JSON.stringify(_this.msgList) == JSON.stringify(res.data.list)) return false;
					_this.msgList = _this.msgList.concat(res.data.list);
					// console.log('请求下一页拼接后的数组 _this.msgList ===》',_this.msgList)
				}
			);
		},
		// 获取文章页面的评论
		getTxtCmt(pageNum) {
			let _this = this;
			this.api._get(
				'article/comment/list',
				{
					pageNum: pageNum,
					pageSize: 10,
					articleId: _this.txtId
				},
				function(res) {
					console.log('请求文章评论 ===》 res', res.data.list);
					// 修改默认的页数
					// 参数一：当前页获取的数据量
					_this.mescroll.endSuccess(res.data.list.length);

					// console.log('_this.msgList ===》',_this.msgList,"res.data.list ==>",res.data.list)
					// 进行数组之间的拼接 如果请求回的内容相同 ，则不进行拼接
					if (JSON.stringify(_this.msgList) == JSON.stringify(res.data.list)) return false;
					_this.msgList = _this.msgList.concat(res.data.list);
					// console.log('请求下一页拼接后的数组 _this.msgList ===》',_this.msgList)
				}
			);
		},
		// 获取 二手 页面的评论
		getUsedCmt(pageNum) {
			let _this = this;
			this.api._get(
				'secondGoods/commentList',
				{
					pageNum: pageNum,
					pageSize: 10,
					goodsId: _this.usedId
				},
				function(res) {
					console.log('请求二手评论 ===》 res', res.data.list);
					// 参数一：当前页获取的数据量
					_this.mescroll.endSuccess(res.data.list.length);

					// console.log('_this.msgList ===》',_this.msgList,"res.data.list ==>",res.data.list)
					// 进行数组之间的拼接 如果请求回的内容相同 ，则不进行拼接
					if (JSON.stringify(_this.msgList) == JSON.stringify(res.data.list)) return false;
					_this.msgList = _this.msgList.concat(res.data.list);
					// console.log('请求下一页拼接后的数组 _this.msgList ===》',_this.msgList)
				}
			);
		},
		// 将评论推入列表中
		sendVal(e) {
			this.val = e.detail.value;
		},
		// 发送评论  判断是 对视频进行的评论还是评论回复
		send() {
			let _this = this;
			// 当用户的评论为空时不进行发表
			if (this.val === '' || !this.val.trim()) return;
			// 根据传递过来的 type类型 判断 当前评论为 那个部分的
			this.type == 'video'
				? this.sendVideoCmt()
				: this.type == 'txt'
				? this.sendTxtCmt()
				: this.type == 'used'
				? this.sendUsedCmt() 
				: '';
		},
		//给视频 发送评论
		sendVideoCmt() {
			let _this = this;
			if (this.sendStyle) {
				//对当前视频进行评论
				this.api._post(
					'comment/add',
					{
						videoId: _this.videoId, //视频ID
						content: _this.val
					},
					function(res) {
						console.log('发表评论成功 res==>', res);
						// 发表言论成功后，修改列表的距离
						_this.msgList.unshift({
							avatarUrl: uni.getStorageSync('user_img'),
							userName: uni.getStorageSync('user_name'),
							content: _this.val,
							createTime: '',
							praseCount: ''
						});
						_this.val = '';
						// 添加了言论之后，修改当前的 评论数量
						_this.$emit('changeCommentsNum');
					}
				);
			} else {
				// 进行评论的回复
				this.api._post(
					'comment/addReply',
					{
						commentId: _this.commentId, //评论中的ID
						content: _this.val
					},
					function(res) {
						console.log('进行评论回复 res==>', res);
						_this.sendStyle = true;
						// 对评论列表进行修改，
						_this.msgList[_this.replayIndex].replyList.unshift({
							content: _this.val,
							avatarUrl: uni.getStorageSync('user_img'),
							userName: uni.getStorageSync('user_name'),
							createTime: '',
							praseCount: ''
						});
						console.log('评论的回复 msgList ==》', _this.msgList);
						_this.val = '';
					}
				);
			}
		},
		//给文章 发送评论
		sendTxtCmt() {
			let _this = this;
			if (this.sendStyle) {
				//对当前文章进行评论
				this.api._post(
					'article/comment',
					{
						articleId: _this.txtId, //文章ID
						content: _this.val
					},
					function(res) {
						console.log('发表文章评论成功 res==>', res);
						// 隐藏当前的 评论的空布局

						// 发表言论成功后，修改列表的距离
						_this.msgList.unshift({
							avatarUrl: uni.getStorageSync('user_img'),
							userName: uni.getStorageSync('user_name'),
							content: _this.val,
							createTime: '',
							praseCount: ''
						});
						console.log('msgList', _this.msgList);
						_this.val = '';
						// 添加了言论之后，修改当前的 评论数量
						_this.$emit('changeCommentsNum');
					}
				);
			} else {
				// 进行评论的回复
				this.api._post(
					'article/comment/addReply',
					{
						commentId: _this.commentId, //评论中的ID
						content: _this.val
					},
					function(res) {
						console.log('进行文章评论回复 res==>', res);
						_this.sendStyle = true;
						// 对评论列表进行修改，
						_this.msgList[_this.replayIndex].replyList.unshift({
							content: _this.val,
							avatarUrl: uni.getStorageSync('user_img'),
							userName: uni.getStorageSync('user_name'),
							createTime: '',
							praseCount: ''
						});
						console.log('评论的回复 msgList ==》', _this.msgList);
						_this.val = '';
					}
				);
			}
		},
		//给二手 发送 评论
		sendUsedCmt() {
			let _this = this;
			if (this.sendStyle) {
				//对当前 二手 进行评论
				this.api._post(
					'secondGoods/addComment',
					{
						goodsId: _this.usedId, //视频ID
						content: _this.val
					},
					function(res) {
						console.log('发表文章评论成功 res==>', res);
						// 发表言论成功后，修改列表的距离
						_this.msgList.unshift({
							avatarUrl: uni.getStorageSync('user_img'),
							userName: uni.getStorageSync('user_name'),
							content: _this.val,
							createTime: '',
							praseCount: ''
						});
						_this.val = '';
						// 添加了言论之后，修改当前的 评论数量
						_this.$emit('changeCommentsNum');
					}
				);
			} else {
				// 进行评论的回复
				this.api._post(
					'secondGoods/addCommentReply',
					{
						commentId: _this.commentId, //评论中的ID
						content: _this.val
					},
					function(res) {
						console.log('进行二手评论回复 res==>', res);
						_this.sendStyle = true;
						// 对评论列表进行修改，
						_this.msgList[_this.replayIndex].replyList.unshift({
							content: _this.val,
							avatarUrl: uni.getStorageSync('user_img'),
							userName: uni.getStorageSync('user_name'),
							createTime: '',
							praseCount: ''
						});
						console.log('评论的回复 msgList ==》', _this.msgList);
						_this.val = '';
					}
				);
			}
		},
		// 进行评论的回复
		reply(index, index2) {
			// console.log('父级中 reply')
			// 首先要确定是 给那个类型的进行二级评论
			this.type == 'video'
				? this.replyVideoCmt(index, index2)
				: this.type == 'txt'
				? this.replyTxtCmt(index, index2)
				: this.type == 'used'
				? this.replyUsedCmt(index, index2)
				: '';
		},
		// 给 视频页面 的评论进行回复
		replyVideoCmt(index, index2) {
			if (index2 == undefined) {
				// console.log('对视频评论进行回复')
				// 对视频评论进行回复
				// 修改输入框中的值
				this.replayVal = '回复 @' + this.msgList[index].userName;
				this.commentId = this.msgList[index].id;
				this.sendStyle = false;
				// 修改评论的序号
				this.replayIndex = index;
				// 拉起输入框，进行聚焦
				this.inputfocus = true;
			} else {
				// 对 二级评论机型回复
				console.log('进行二级回复', this.msgList[index].replyList[index2]);
				this.replayVal = '回复 @' + this.msgList[index].replyList[index2].userName; //用于显示进行二级回复的用户名
				// this.replayVal = '回复 @' + "旭东"  //用于显示进行二级回复的用户名
				this.commentId = this.msgList[index].id;
				this.sendStyle = false;
				this.replayIndex = index;
				this.inputfocus = true;
			}
		},
		// 给 文章页面 的评论进行回复
		replyTxtCmt(index, index2) {
			if (index2 == undefined) {
				// console.log('对视频评论进行回复')
				// 对视频评论进行回复

				// 修改输入框中的值
				this.replayVal = '回复 @' + this.msgList[index].userName;
				this.commentId = this.msgList[index].id;
				this.sendStyle = false;

				// 修改评论的序号
				this.replayIndex = index;

				// 拉起输入框，进行聚焦
				this.inputfocus = true;
			} else {
				// 对 二级评论机型回复
				console.log('进行二级回复', this.msgList[index].replyList[index2]);
				this.replayVal = '回复 @' + this.msgList[index].replyList[index2].userName; //用于显示进行二级回复的用户名
				// this.replayVal = '回复 @' + "旭东"  //用于显示进行二级回复的用户名

				this.commentId = this.msgList[index].id;
				this.sendStyle = false;

				this.replayIndex = index;

				this.inputfocus = true;
			}
		},
		// 给二手页面 的评论进行回复
		replyUsedCmt(index, index2) {
			if (index2 == undefined) {
				// console.log('对视频评论进行回复')
				// 对视频评论进行回复

				// 修改输入框中的值
				this.replayVal = '回复 @' + this.msgList[index].userName;
				this.commentId = this.msgList[index].id;
				this.sendStyle = false;

				// 修改评论的序号
				this.replayIndex = index;

				// 拉起输入框，进行聚焦
				this.inputfocus = true;
			} else {
				// 对 二级评论机型回复
				console.log('进行二级回复', this.msgList[index].replyList[index2]);
				this.replayVal = '回复 @' + this.msgList[index].replyList[index2].userName; //用于显示进行二级回复的用户名
				// this.replayVal = '回复 @' + "旭东"  //用于显示进行二级回复的用户名

				this.commentId = this.msgList[index].id;
				this.sendStyle = false;

				this.replayIndex = index;

				this.inputfocus = true;
			}
		},

		// 选择内容
		select(item, index) {
			this.$emit(
				'select',
				{
					item,
					index
				},
				() => {
					this.popup.close();
				}
			);
		},
		//关闭窗口
		close() {
			this.popup.close();
		},
		//显示更多回复
		showMore() {
			console.log('显示更多');
			//显示二级对话框
			this.twoShow = true;
		}
	}
};
</script>
<style lang="scss" scoped>
.uni-popup-share {
	position: relative;
	background-color: #fff;
	height: 70%;
	border-radius: 20rpx 20rpx 0 0;
	box-sizing: border-box;
	// padding: 0 40rpx 0;
	position: relative;
	color: black;
}
.uni-share-title {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 40px;
	position: absolute;
	opacity: 1;
	z-index: 10;
	background-color: white;
	border: none;
	border-radius: 20rpx 20rpx 0 0;
}
.uni-share-title-text {
	font-size: 35rpx;
	font-weight: bolder;
	color: #666;
}
.uni-share-content {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	// height: 800rpx;
	flex-direction: row;
	justify-content: center;
	box-sizing: border-box;
	padding: 0 20rpx;
	padding-top: 10px;
}

// 用户书写评论
.msgBox {
	display: flex;
	align-items: center;
	background-color: white;
	z-index: 10;
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	color: black;
	.img_user {
		width: 60rpx;
		height: 60rpx;
		background-color: yellow;
		border-radius: 50%;
		margin-right: 20rpx;
		margin-left: 27rpx;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.msg {
		width: 70%;
		height: 66rpx;
		box-sizing: border-box;
		padding-left: 13rpx;
		border: 1px solid gray;
		margin-top: 20rpx;
		margin-right: 10rpx;
		margin-bottom: 20rpx;
		border-radius: 30rpx;
		display: flex;
		justify-content: start;
		align-items: center;
		bottom: 20rpx;

		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}
	}
}

.close {
	position: absolute;
	top: 14rpx;
	right: 19rpx;
	z-index: 11;
	image {
		width: 60rpx;
		height: 60rpx;
	}
}

.iconfont{
	font-size: 50rpx;
	color: black;
}
</style>
