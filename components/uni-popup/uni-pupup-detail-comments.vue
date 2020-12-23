<!-- 进行评论的模板 -->
<template>
	<view class="uni-popup-share">
		<view class="uni-share-title">
			<text class="uni-share-title-text">{{ title }}</text>
		</view>
		<!-- 顶部取消按钮 -->
			<view class="close"><image src="../../static/cmt_close.png" mode="" @click="close"></image></view>
		
		<view class="uni-share-content" style="height: 400px;">
			<!-- 当没有评论的时候 -->
			<view v-if="detailMsgList.length === 0" class="user_cmt" style="margin-top: 29px;">
				<u-divider>快来抢沙发啊~</u-divider>
			</view>
			<user-detail-comment
				v-else
				style="width: 100%;margin-top: 36rpx;"
				:detailMsgList="detailMsgList"
				:detail_index="detail_index"
				:type="type"
				:threereplayname="threereplayname"
				@showDetailComment="showDetailComment"
				@getComment="getComment"
				@reply="reply"
				@changeMsgList="changeMsgList"
			/>
		</view>
		<!-- 用户的输入评论区 -->
		<view class="msgBox" :style="{bottom:btm}">
			<!-- 用户的头像 -->
			<view class="img_user"><image :src="userImg" mode=""></image></view>
			<view class="msg" :style=" { height:lineHeight } " >
				<!-- <image src="/static/signature.png" mode=""></image> -->
				<text class="iconfont iconxie" style="margin-right: 10rpx;color: #858585;"></text>
				<textarea
					type="text"
					maxlength="100"
					cursor-spacing="15"
					:placeholder=" '回复: ' + detailMsgList.userName "
					:show-confirm-bar="false"
					:adjust-position="false"
					:value="val"
					:focus="inputfocus"
					@blur="blur"
					@input="sendVal"
					@confirm="send"
					@linechange="linechange"
					@keyboardheightchange="keyboardheightchange"
				></textarea>
			</view>
			<!-- 选择表情按钮 -->
			<view @click="showExpression" class="expression iconfont iconbiaoqing"></view>
			<!-- 发表评论按钮 -->
			<view @click="send" :style="send_btn_style ? 'color: #6ac4f9;' : 'color: #858585;'">发送</view>
			<scroll-view scroll-y="true" enable-flex="true" class="express_body" v-if="express_show">
				<view class="express_item" v-for="(item, index) in express_list" :key="index">
					<!-- 相应的表情 -->
					<view :data-item="item.des" @click="chooseExpress" 
						class="t-icon" :class="item.icon"
						>
					</view>
				</view>
			</scroll-view>
		</view>
		</view>
</template>

<script>
import userDetailComment from '@/components/user-detail-comment.vue';
import express from '../../assets/express.js'
export default {
	name: 'UniPopupShare',
	props: {
		// 当前评论
		detailMsgList: {
			type: Object
		},
		// 当前评论排第几
		detail_index:{
			type:Number
		},
		// msgList: {
		// 	type: Array
		// },
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
			// 是否显示表情列表
			express_show: false,
			// 表情存储
			express_list: express,
			
			btm:'0',
			// 文本域的行数
			lineHeight:'66rpx',
			
			// 输入框是否聚焦
			inputfocus: false,
			// 上拉加载
			upOption: {
				use: false,
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
			// 控制发送请求 是视频评论 还是 进行回复
			sendStyle: true, //默认是 对视频进行评论
			commentId: '', //进行评论回复的ID
			replayIndex: '', //进行评论的 在msgList中的index
			// 当进行三级评论时，储存评论的用户名

			twoShow: false,
			val: '',
			// 控制发送按钮的 颜色
			send_btn_style: false,

			// msgList: [],
			pageNum: 1 //默认从第0页开始请求
		};
	},
	components: {
		userDetailComment
	},
	created() {
		// console.log('创建 uni-popup-comments');
		// console.log('当前的时间 data==>', new Date());
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
			fail: function(res) {
				_this.userImg = '/static/avatarUrl.png';
			}
		});

		// 获取当前的节点信息

	},
	methods: {
		
		// 显示表情图案
		showExpression() {
			console.log('显示表情');
			this.express_show = !this.express_show;
			if(this.express_show){
				this.btm = 361 + 'rpx';
			}else{
				this.btm = 0
			}
		},
		// 选择表情图案
		chooseExpress(e) {
			console.log('选择表情,输入框中展示的是表情对应的字符', e);
			this.val = this.val + '[' + e.currentTarget.dataset.item + ']' ; 
			this.send_btn_style = true
		},
		
		
		
		showDetailComment(index){
			console.log('index popup',index)
		
			this.$emit('showDetailComment',index)
		},
		// 当文本框的行数改变
		linechange(e){
			// console.log('行数发生改变，高度变化',e,e.detail.lineHeight)
			// 当前文本框的行数 e.detail.lineHeight
			// 当前文本框的高度 e.detail.heightRpx
			if(e.detail.lineCount == 0){
				return
			} else if(e.detail.lineCount < 4){
				this.lineHeight = e.detail.lineCount * 66 + 'rpx'
			} else {
				this.lineHeight = 3 * 66 + 'rpx'
			}
		},
		
		// 传递给子组件的方法，用于用户对其修改当前页面中的数据
		changeMsgList(index, index2) {
			console.log('uni-pop');
			this.$emit('changeMsgList', { index, index2 });
		},
		// 传递给下一组件的 获取评论的方法
		getComment() {
			this.$emit('getComment');
		},

		/**
		 * 控制mescroll 进行操作
		 * */
		/*下拉刷新的回调*/
		// downCallback() {
		// 	// console.log('下拉刷新')
		// 	this.mescroll.resetUpScroll();
		// },
		// /*上拉加载的回调*/
		// upCallback(page) {
		// 	console.log('上拉')
		// },
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
		// 将评论推入列表中
		sendVal(e) {
			this.val = e.detail.value;
			if (this.val !== '' && this.val.trim()) {
				// 评论中不为空或都是 空格
				this.send_btn_style = true;
			} else {
				this.send_btn_style = false;
			}
		},
		// 键盘高度发生变化
		keyboardheightchange(e){
			console.log('键盘高度变了e',e.detail.height)
			if(e.detail.height == 0){
				this.btm = 0
				this.express_show = false;
			}else{
				this.btm = e.detail.height * 2 + 10 + 'rpx'
			}
		},
		// 输入框失焦
		blur(){
			this.btm = 0
			this.inputfocus = false;
			// 表情框隐藏
			// if(this.express_show){
			// 	this.btm = 361 + 'rpx';
			// }else{
			// 	this.btm = 0
			// }
			this.inputfocus = false;
		},
		// 发送评论  判断是 对视频进行的评论还是评论回复
		send() {
			let _this = this;
			// 当用户的评论为空时不进行发表
			if (this.val === '' || !this.val.trim()) return;
			// 根据传递过来的 type类型 判断 当前评论为 那个部分的
			this.type == 'video' ? this.sendVideoCmt() : this.type == 'txt' ? this.sendTxtCmt() : this.type == 'used' ? this.sendUsedCmt() : '';
			this.reply()
		},
		//给文章 发送评论
		sendTxtCmt() {
			let _this = this;
				// 进行评论的回复
				this.api._post(
					'article/comment/addReply',
					{
						commentId: _this.commentId, //评论中的ID
						content: _this.val
					},
					function(res) {
						// console.log('进行文章评论回复 res==>', res);
						_this.sendStyle = true;
						// 对评论列表进行修改，
						_this.$emit('changeComment', {
							val: _this.val,
							index: _this.replayIndex,
							replayVal: _this.replayVal,
							commentId: res.data
						});
						// _this.$emit('changeComment',_this.val,_this.replayIndex);
						// console.log('评论的回复 msgList ==》', _this.msgList);
						_this.val = '';
						_this.replayVal = '留下你的精彩评论吧';
					})
			},
	
		// 进行评论的回复
		reply(index, index2) {
			
			console.log('父级中 reply')
			// 首先要确定是 给那个类型的进行二级评论
			this.type == 'video' ? this.replyVideoCmt(this.detail_index, index2) : this.type == 'txt' ? this.replyTxtCmt(this.detail_index, index2) : this.type == 'used' ? this.replyUsedCmt(this.detail_index, index2) : '';
			console.log('父级中 reply')
		},
		// 给 文章页面 的评论进行回复
		replyTxtCmt(index, index2) {
			// this.inputfocus = true
			if (index2 == undefined) {
				// console.log('对视频评论进行回复')
				// 对视频评论进行回复

				// 修改输入框中的值
				this.replayVal = '回复 @' + this.detailMsgList.userName;
				this.commentId = this.detailMsgList.id;
				this.sendStyle = false;

				// 修改评论的序号
				this.replayIndex = index;

				// 拉起输入框，进行聚焦
				this.inputfocus = true;
			} else {
				// 对 二级评论机型回复
				console.log('进行二级回复', this.detailMsgList.replyList[index2]);
				this.replayVal = '回复 @' + this.detailMsgList.replyList[index2].userName; //用于显示进行二级回复的用户名
				// this.replayVal = '回复 @' + "旭东"  //用于显示进行二级回复的用户名

				this.commentId = this.detailMsgList.id;
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
	position: absolute;
	left: 0;
	z-index: 20;
	opacity: 1;
	.img_user {
		width: 60rpx;
		height: 60rpx;
		background-color: yellow;
		border-radius: 50%;
		margin-right: 20rpx;
		margin-left: 27rpx;
		overflow: hidden;
		// iOS端圆角设置失效
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		image {
			width: 100%;
			height: 100%;
		}
	}
	.msg {
		width: 63%;
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
		textarea {
			width: 100%;
			height: 100%;
			padding-top: 16rpx;
			// overflow-x:hidden;
			// overflow: auto;
		}
	}
	// 表情
	.expression {
		margin-right: 10rpx;
	}
	// 表情列表
	.express_body {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 361rpx;
		background-color: white;
		display: flex;
		// flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.express_item {
			margin-top: 27rpx;
			margin-left: 65rpx;
			margin-bottom: 20rpx;
			width: 50rpx;
			height: 50rpx;
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
.iconfont {
	font-size: 50rpx;
	color: black;
}

.plcolor{
color: #bbb;
}
</style>
