<template>
	<view>
		<scroll-view enable-flex="true" scroll-y="true" lower-threshold="80" @scrolltolower="scrolltolower" style="height: 320px;overflow: hidden;">
			<view class="wrap">
				<view class="comment">
					<view class="top">
						<view class="left">
							<view class="heart-photo"  >
								<image @click="goAuthor(detailMsgList.userId)" :src="detailMsgList.avatarUrl" mode=""></image>
							</view>
							<view class="user-info" @click="goAuthor(detailMsgList.userId)">
								<view class="name">{{ detailMsgList.userName }}</view>
								<view class="date">{{time.changetime(detailMsgList.createTime)}}</view>
							</view>
						</view>
						<view class="right" :class="{ highlight: detailMsgList.liked }"
							@click="seeActive(detailMsgList.id,detail_index)"
							>
							{{ detailMsgList.praseCount }}
							<u-icon v-if="!detailMsgList.liked" name="thumb-up" class="like" color="#9a9a9a" :size="30" ></u-icon>
							<u-icon v-if="detailMsgList.liked" name="thumb-up-fill" class="like" :size="30" ></u-icon>
						</view>
					</view>
					<view class="content">
						<!-- {{ detailMsgList.content }} -->
						<rich-text
							:nodes="express.text2pic(detailMsgList.content)"
							>
						</rich-text>
					</view>
				</view>
				
				<view class="all-reply">
					<view class="all-reply-top">全部回复（{{ detailMsgList.replyList.length }}）</view>
					<view class="item" v-for="(item, index) in detailMsgList.replyList" :key="index">
						<view class="comment">
							<view class="top">
								<view class="left">
									<view class="heart-photo" @click="goAuthor(item.userId)" >
										<image :src="item.avatarUrl" mode=""></image>
									</view>
									<view class="user-info" @click="goAuthor(item.userId)" >
										<view class="name">{{ item.userName }}</view>
										<view class="date">{{ time.changetime(item.createTime) }}</view>
									</view>
								</view>
								<view class="right"  :class="{ highlight: detailMsgList.replyList[index].liked }"
									@click="replaySec(detail_index,index)"
									>
									<view class="num">{{ item.praseCount }}</view>
									<u-icon v-if="!item.liked" name="thumb-up" class="like" :size="30" color="#9a9a9a" ></u-icon>
									<u-icon v-if="item.liked" name="thumb-up-fill" class="like" :size="30" ></u-icon>
								</view>
							</view>
							<!-- <view class="reply" v-if="item.reply">
								<view class="username">{{ item.reply.name }}</view>
								<view class="text">{{ item.reply.contentStr }}</view>
							</view> -->
							
							<!-- 三级 评论 @click="reply(detail_index,index)" -->
							<view class="content" >
								<!-- {{ item.content }} -->
								<rich-text
									:nodes="express.text2pic(item.content)"
									>
								</rich-text>
								<!-- <rich-text
									nodes="<span class='t-icon iconzhutou'/>88你好<span class='t-icon iconmaren'/>999"
									>
								</rich-text> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<!-- 控制 二级评论 的时间格式 -->
<wxs module="time" src="../wxs/time.wxs"></wxs>
<!-- 控制显示 表情图标 -->
<wxs module="express" src="../wxs/express.wxs"></wxs>

<script>
export default {
	data() {
		return {
			
		};
	},
	props: {
		detailMsgList: {
			type: Object //实际请求获取的用户评论数据
		},
		// 当前详细评论在整体中的序列
		detail_index:{
			type:Number
		},
		threereplayname: {
			type: String,
			default: ''
		},
		// 判断是 那个的 评论点赞
		type: {
			type: String
		}
	},
	created() {
		console.log('user-detail-comment  ==> detailMsgList', this.$props.detailMsgList);
	},
	methods: {
		//跳转到作者页
		goAuthor(userId){
			let avatarItem = {
				userId:userId
			}
			uni.navigateTo({
			   url: "/pages/author/author?item=" + JSON.stringify(avatarItem)
			});
		},
		// 获取下一页评论
		scrolltolower() {
			console.log('滚动到底部 detail 再次获取数据');
			console.log('user-detail-comment  ==> detailMsgList', this.$props.detailMsgList);
			// 调用发起请求 请求下一页数据
			// this.$emit('getComment')
		},
		// 点赞
		seeActive(id,index){
			this.type == 'video'
				? this.seeVideoActive(id,index)
				: this.type == 'txt'
				? this.seeTxtActive(id,index)
				: this.type == 'used'
				? this.seeUsedActive(id,index)
				: ''
		},
		// 对视频 页面的 评论进行点赞
		seeVideoActive(id,index){
			let _this = this
			this.api._post("comment/likeComment",{
				"commentId":id
			},function(res){
				console.log('进行评论点赞')
				// 对列表中显示的数据进行修改 应当调用父级的方法对其进行修改
				_this.$emit('changeMsgList',index)
			})
		},
		// 对 文章 的 评论 进行点赞
		seeTxtActive(id,index){
			let _this = this
			this.api._post(`article/comment/liked/${id}`,{},function(res){
				console.log('进行评论点赞')
				// 对列表中显示的数据进行修改 应当调用父级的方法对其进行修改
				_this.$emit('changeMsgList',index)
			})
		},
		// 对 二手 进行点赞
		seeUsedActive(id,index){
			let _this = this
			this.api._post(`secondGoods/comment/liked/${id}`,{},function(res){
				console.log('进行二手评论点赞')
				// 对列表中显示的数据进行修改 应当调用父级的方法对其进行修改
				_this.$emit('changeMsgList',index)
			})
		},
		
		// 进行二级评论
		reply(index,index2){
			// console.log('user-comment 进行 评论回复',index,index2)
			// 当进行回复时，要获取进行回复的对象
			// 改变input中的提示
			// console.log('回复' + e.currentTarget.dataset.name)
			this.$emit('reply',index,index2)
			// 然后将回复的评论放到二级评论中
		},
		// 对回复进行点赞
			replaySec(index,index2){
				// console.log('对回复进行点赞 id ===>',index,index2)
				// 获取回复点赞中 点击的目标 commentReplyId
				// console.log('点击的目标 commentReplyId',this.$props.msgList[index].replyList[index2])
				this.type == 'video'
					? this.replayVideoSec(index,index2)
					: this.type == 'txt'
					? this.replayTxtSec(index,index2)
					:	this.type == 'used'
					? this.replayUsedSec(index,index2)
					: ''
			},
			// 用户 对当前 视频 页面的 回复评论进行点赞
			replayVideoSec(index,index2){
				let _this = this
				this.api._post("comment/likeCommentReply",{
					"commentReplyId":_this.detailMsgList.replyList[index2].id
				},function(res){
					console.log('对评论回复 进行 点赞')
					// 请求成功后修改列表数据
					_this.$emit('changeMsgList',index,index2)
				})
			},
			// 用户 对当前 文章 页面的 回复评论进行点赞
			replayTxtSec(index,index2){
				let _this = this
				this.api._post(`article/comment/likedReply/${_this.detailMsgList.replyList[index2].id}`,
				{},function(res){
					console.log('对文章评论回复 进行 点赞')
					// 请求成功后修改列表数据
					_this.$emit('changeMsgList',index,index2)
				})
			},
			// 用户 对当前 二手 页面的 回复评论进行点赞
			replayUsedSec(index,index2){
				let _this = this
				this.api._post(`secondGoods/comment/likedReply/${_this.$props.msgList[index].replyList[index2].id}`,
				{},function(res){
					console.log('对二手评论回复 进行 点赞')
					// 请求成功后修改列表数据
					_this.$emit('changeMsgList',index,index2)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: #f2f2f2;
}
.comment {
	padding: 30rpx;
	font-size: 32rpx;
	background-color: #ffffff;
	.top {
		display: flex;
		justify-content: space-between;
	}
	.left {
		display: flex;
		.heart-photo {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.user-info {
			margin-left: 10rpx;
			.name {
				color: #5677fc;
				font-size: 28rpx;
				margin-bottom: 4rpx;
			}
			.date {
				font-size: 20rpx;
				color: $u-light-color;
			}
		}
	}
	.right {
		display: flex;
		font-size: 20rpx;
		align-items: center;
		color: #9a9a9a;
		.like {
			margin-left: 6rpx;
		}
		.num{
			font-size: 26rpx;
			color: #9a9a9a;
		}
	}
	.highlight {
		color: #ff6347;
		.num {
			color: #ff6347;
		}
	}
}
.all-reply {
	margin-top: 10rpx;
	padding-top: 20rpx;
	background-color: #ffffff;
	.all-reply-top {
		margin-left: 20rpx;
		padding-left: 20rpx;
		border-left: solid 4rpx #5677fc;
		font-size: 30rpx;
		font-weight: bold;
	}
	.item {
		border-bottom: solid 2rpx $u-border-color;
	}
	.reply {
		padding: 20rpx;
		background-color: rgb(242, 242, 242);
		border-radius: 12rpx;
		margin: 10rpx 0;
		.username {
			font-size: 24rpx;
			color: #7a7a7a;
		}
	}
}
</style>
