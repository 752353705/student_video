<template>
	<view>
		<scroll-view enable-flex="true" scroll-y="true" lower-threshold="80" @scrolltolower="scrolltolower" style="height: 320px;overflow: hidden;">
			<view class="comment" 
				v-for="(item, index) in msgList" :key="item.id"
				>
				<view class="left"><image :src="item.avatarUrl" mode="aspectFill"></image></view>
				<view class="right">
					<view class="top">
						<view class="name">{{ item.userName || '用户名' }}</view>
						<view class="like" :class="{ highlight: item.liked }"
							@click="seeActive(item.id,index)"
							>
							<view class="num">{{item.praseCount || ''}}</view>
							<u-icon v-if="!item.liked" name="thumb-up" :size="30" color="#9a9a9a" ></u-icon>
							<u-icon v-if="item.liked" name="thumb-up-fill" :size="30"></u-icon>
						</view>
					</view>
					<view class="content" @click="reply(index,index2)">
						{{item.content || '用户说的话'}}
					</view>
					
					<block>
						<view class="reply-box" 
							v-if="item.replyList.length !== 0"
							>
							<view class="item" 
								v-for="(item2,index2) in comment.sec_cmt(item.replyList) " :key="item2.id"
								>
								<view class="username">{{item2.userName || '用户名'}}</view>
								<view class="text">{{item2.content || '用户说的话'}}</view>
							</view>
							<view class="all-reply" @tap="toAllReply(index)" v-if="item.replyList != undefined">
								<!-- 共{{ res.allReply }}条回复 -->
								共 {{item.replyList.length}} 条回复
								<u-icon class="more" name="arrow-right" :size="26"></u-icon>
							</view>
						</view>
					</block>
					
					
					<view class="bottom">
						{{time.changetime(item.createTime) || item.createTime }}
						<view class="reply" @click="reply(index,index2)">回复</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<!-- 二级评论显示个数 -->
<script module="comment" lang="wxs">
// 控制 二级评论 的时间格式
function sec_cmt(msg){

	var sec_cmt = msg.slice(0,3)
	return sec_cmt
}

module.exports = {
	sec_cmt: sec_cmt,
}
</script>

<script module="time" lang="wxs">
// 控制 二级评论 的时间格式
function changetime(time){
	if(!time){
		// time = new Date()
		var date = getDate(getDate().getTime())
		// 月
		var months = date.getMonth() + 1
		// 日
		var day = date.getDate()
		// 小时
		var hour = date.getHours()
		// 分钟
		var minutes = date.getMinutes()

		return months + '-' + day + ' ' + hour + ':' + minutes
	}
	//那一天
	time1 = time.split(' ')[0].split('-')[1]
	time2 = time.split(' ')[0].split('-')[2]

	//具体小时时间
	//因为后端传递 数据时 中间多了个空格
	time3 = time.split(' ')[1].split(':')[0]
	time4 = time.split(' ')[1].split(':')[1]
	// // 当用户 是在 当天发边的评论并且在当天显示
	// console.log('返回聊天记录时间',time1 + '-' + time2)

	return time1 + '-' + time2 + ' ' +  time3 + ":" + time4
	// return time
}

module.exports = {
	changetime: changetime,
}
</script>

<script>
export default {
	data() {
		return {
			
		};
	},
	props: {
		msgList: {
			type: Array //实际请求获取的用户评论数据
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
		console.log('user-comment  ==> msgList', this.$props.msgList);
		
		// 获取当前的时间
		var time = new Date();
		// 今天的时间
		// 月份
		var month = time.getMonth() + 1;
		// 几号
		var date = time.getDate();
		// 小时
		var hour = time.getHours();
		//分钟
		var minu = time.getMinutes();
		// console.log('组件中获取当前的时间 month ==> ',month,"date ==》",date)

		// this.nowtime = month + '-' + date + ' ' + hour + ':' + minu
		this.nowtime = month + '-' + date;
	},
	methods: {
		// 获取下一页评论
		scrolltolower() {
			// console.log('滚动到底部uni-popup 再次获取数据');
			// 调用发起请求 请求下一页数据
			this.$emit('getComment')
		},
		// 跳转到全部回复
		toAllReply(index) {
			// 弹出全部回复弹框
			this.$emit('showDetailComment',index);
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
		
	}
};
</script>

<style lang="scss" scoped>
.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				color: #5677fc;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
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
		.content {
			margin-bottom: 10rpx;
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}
		}
	}
}
</style>
