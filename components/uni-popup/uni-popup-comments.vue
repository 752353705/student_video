<!-- 进行评论的模板 -->
<template>
	<view class="uni-popup-share">
		<view class="uni-share-title">
			<text class="uni-share-title-text">{{ title }}</text>
		</view>
		<view class="uni-share-content" style="height: 400px;">
			<!-- 当没有评论的时候 -->
			<view v-if="msgList.length === 0" class="user_cmt" style="margin-top: 29px;">
				<u-divider>快来抢沙发啊~</u-divider>
			</view>
			<user-comment
				v-else
				style="width: 100%;margin-top: 36rpx;"
				@reply="reply"
				@changeMsgList="changeMsgList"
				@getComment="getComment"
				@showDetailComment="showDetailComment"
				:msgList="msgList"
				:type="type"
				:threereplayname="threereplayname"
			/>
		</view>
		<!-- 用户的输入评论区 -->
		<view class="msgBox">
			<!-- 用户的头像 -->
			<view class="img_user"><image :src="userImg" mode=""></image></view>
			<view class="msg" :style=" { height:lineHeight } " >
				<!-- <image src="/static/signature.png" mode=""></image> -->
				<text class="iconfont iconxie" style="margin-right: 10rpx;color: #858585;"></text>
				<textarea
					:placeholder="replayVal"
					maxlength="100"
					:show-confirm-bar="false"
					:adjust-position="true"
					type="text"
					cursor-spacing="15"
					:value="val"
					:focus="inputfocus"
					@blur="blur"
					@input="sendVal"
					@confirm="send"
					@linechange="linechange"
					@focus="focus"
				></textarea>
			<!-- 	<u-input 
					style="width: 100%;"
					v-model="val" 
					type="textarea"
					height="28" 
					placeholder="请输入评论"
					@input="sendVal"
					@confirm="send"
					@linechange="linechange"
					/> -->
			</view>
			<!-- 发表评论按钮 -->
			<view @click="send" :style="send_btn_style ? 'color: #6ac4f9;' : 'color: #858585;'">发送</view>
		</view>
		<!-- 取消按钮 -->
		<view class="close"><image src="../../static/cmt_close.png" mode="" @click="close"></image></view>
	</view>
</template>

<script>
import userComment from '../user-comment.vue';
export default {
	name: 'UniPopupShare',
	props: {
		// 当前评论
		msgList: {
			type: Array
		},

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
			replayVal: '留下你的精彩评论吧',
			// 控制发送请求 是视频评论 还是 进行回复
			sendStyle: true, //默认是 对视频进行评论
			commentId: '', //进行评论回复的ID
			replayIndex: '', //进行评论的 在msgList中的index
			// 当进行三级评论时，储存评论的用户名
			threereplayname: '回复 旭东：',

			twoShow: false,
			val: '',
			// 控制发送按钮的 颜色
			send_btn_style: false,

			// msgList: [],
			pageNum: 1 //默认从第0页开始请求
		};
	},
	components: {
		userComment
	},
	created() {
		// this.val = 'hahha'
		// this.val = ''
		// this.focus()
		// this.sendVal({
		// 	detail:{
		// 		value:'h'
		// 	}
		// })
		// this.sendVal({
		// 	detail:{
		// 		value:''
		// 	}
		// })
		// this.blur()
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
	},
	methods: {
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
		// 将评论推入列表中
		sendVal(e) {
			console.log('输入')
			this.val = e.detail.value;
			if (this.val !== '' && this.val.trim()) {
				// 评论中不为空或都是 空格
				this.send_btn_style = true;
			} else {
				this.send_btn_style = false;
			}
		},
		// 输入框聚焦
		focus(e){
			console.log('聚焦')
		},
		// 输入框失焦
		blur(){
			console.log('失焦')
			if(!this.val){
				this.inputfocus = false;
				this.val = '';
				this.replayVal = '留下你的精彩评论吧';
				this.sendStyle = true;
				this.send_btn_style = false;
			}
		},
		// 发送评论  判断是 对视频进行的评论还是评论回复
		send() {
			let _this = this;
			// 当用户的评论为空时不进行发表
			if (this.val === '' || !this.val.trim()) return;
			// 根据传递过来的 type类型 判断 当前评论为 那个部分的
			this.type == 'video' ? this.sendVideoCmt() : this.type == 'txt' ? this.sendTxtCmt() : this.type == 'used' ? this.sendUsedCmt() : '';
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

						// 发表言论成功后，修改评论数据
						_this.$emit('changeComment', {
							val: _this.val,
							commentId: res.data
						});

						_this.val = '';
						_this.replayVal = '留下你的精彩评论吧';
						_this.sendStyle = true;
						_this.send_btn_style = false;
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
					}
				);
			}
		},
		// 进行评论的回复
		reply(index, index2) {
			// console.log('父级中 reply')
			// 首先要确定是 给那个类型的进行二级评论
			this.type == 'video' ? this.replyVideoCmt(index, index2) : this.type == 'txt' ? this.replyTxtCmt(index, index2) : this.type == 'used' ? this.replyUsedCmt(index, index2) : '';
		},
		// 给 文章页面 的评论进行回复
		replyTxtCmt(index, index2) {
			// this.inputfocus = true
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
		// iOS端圆角设置失效
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
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
		textarea {
			width: 100%;
			height: 100%;
			padding-top: 16rpx;
			// overflow-x:hidden;
			// overflow: auto;
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
