<template>
	<view>
		<view class="user_cmt" v-for="(item,index) in msgList" :key="item.id">
			<!-- 用户的评论 -->
				<view class="user_img" @click="goAuthor(item.avatarUrl)">
					<image :src="item.avatarUrl" mode=""></image>
				</view>
				<view class="content">
					<view class="user_head" @click="goAuthor(item.avatarUrl)">
						{{item.userName || '用户名'}}
					</view>
					<view class="user_body" @click="reply(index,index2)">
						{{item.content || '用户说的话'}}
					</view>
					<!-- 时间  回复   点赞数 -->
					<view class="user_footer">
						<view class="left">
							<view class="time">
								{{time.changetime(item.createTime) || item.createTime }}
							</view>
						</view>
						<view class="cmt_right" :id=" 'right' + index "  @click="seeActive(item.id,index)">
							<!-- 未点赞 -->
							<u-icon v-if="!item.liked" size="40" name="thumb-up"></u-icon>
							<u-icon v-else size="40" name="thumb-up-fill" color="#ff6347" ></u-icon>
							<view>{{item.praseCount || ''}}</view>
						</view>
					</view>
					
					
					<!-- 判断是否有二级回复 -->
					<view class="two" v-if="item.replyList.length !== 0" >
						
						<view class="two_cmt" v-for="(item2,index2) in item.replyList" :key="index">
							<!-- 用户的评论 -->
								<view class="user_img" @click="goAuthor(item2.avatarUrl)">
									<image :src="item2.avatarUrl" mode=""></image>
								</view>
								<view class="content two_content">
									<view class="user_head" @click="goAuthor(item2.avatarUrl)">
										{{item2.userName || '用户名'}}
									</view>
								<!-- 用于区分用户的 回复状态 -->
									<!-- 二级回复 是对当前 一级的回复 -->
									<view  v-if="true" class="user_body" @click="reply(index,index2)">
										{{item2.content || '用户说的话'}}
									</view>
									<!-- 回复同等级的 二级回复 -->
									<view  v-else class="user_body" @click="reply(index,index2)">
										{{threereplayname + item2.content || '用户说的话'}}
									</view>
									<!-- 时间  回复   点赞数 -->
									<view class="user_footer">
										<view class="left">
											<view class="time">
												{{time.changetime(item2.createTime) || item2.createTime}}
											</view>
										</view>
										<view class="cmt_right" @click="replaySec(index,index2)">
											<!-- 未点赞 -->
											<u-icon v-if="!item2.liked" size="40" name="thumb-up"></u-icon>
											<!-- 点赞 -->
											<u-icon v-else size="40" name="thumb-up-fill" color="#ff6347" ></u-icon>
											<text>{{item2.praseCount || ''}}</text>
										</view>
									</view>
								</view>
						</view>
						
						<!-- 当当前 评论 回复 数目超过三个 之后 显示 展开更多回复 -->
						<!-- <view class="replay" v-if="item.replyList.length > 3" @click="showTwo">
							—展开更多回复—
						</view> -->
					
					</view>
				</view>
		</view>
	</view>
</template>

<script module="time" lang="wxs">
	// 控制 二级评论 的时间格式 
	function changetime(time){
		if(!time){
			return ''
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
		props:{
			msgList:{
				type:Array, //实际请求获取的用户评论数据
			},
			threereplayname:{
				type:String,
				default:'',
			},
			// 判断是 那个的 评论点赞
			type:{
				type:String
			}
		},
		data() {
			return {
				// 当前时间，用于 当用户进行即时评论 
				nowtime:'7-28 8:37',
				// 用来储存 当前的 评论回复
				nowReply:[],
			};
		},
		created() {
			console.log('user-comment  ==> msgList',this.$props.msgList)
			// 获取当前的时间
			var time = new Date()
			// 今天的时间
				// 月份
			var month = time.getMonth() + 1  
				// 几号
			var date = time.getDate()
				// 小时
			var hour = time.getHours()
				//分钟
			var minu = time.getMinutes()
			// console.log('组件中获取当前的时间 month ==> ',month,"date ==》",date)
			
			// this.nowtime = month + '-' + date + ' ' + hour + ':' + minu
			this.nowtime = month + '-' + date
		},
		components: {
			
		},
		methods:{
			// 是否显示二级评论
			showTwo(){
				console.log('显示二级评论')
				//点击展开显示更多
			},
			//跳转到作者页
			goAuthor(avatarUrl){
				uni.navigateTo({
				   url: "/pages/author/author?avatarUrl=" + avatarUrl
				});
			},
			reply(index,index2){
				// console.log('user-comment 进行 评论回复',index,index2)
				// 当进行回复时，要获取进行回复的对象
				// 改变input中的提示
				// console.log('回复' + e.currentTarget.dataset.name)
				this.$emit('reply',index,index2)
				// 然后将回复的评论放到二级评论中
			},
			// 对 一级评论 进行点赞
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
					"commentReplyId":_this.$props.msgList[index].replyList[index2].id
				},function(res){
					console.log('对评论回复 进行 点赞')
					// 请求成功后修改列表数据
					_this.$emit('changeMsgList',index,index2)
				})
			},
			// 用户 对当前 文章 页面的 回复评论进行点赞
			replayTxtSec(index,index2){
				let _this = this
				this.api._post(`article/comment/likedReply/${_this.$props.msgList[index].replyList[index2].id}`,
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
<style lang="less">
	.user_cmt{
		display: flex;
		justify-content: start;
		padding: 32rpx 20rpx;
		color: black;
		// 时间 字体样式
		.time{
			color: #939393;
			font-size: 26rpx;
		}
		
		.user_img{
			width: 60rpx;
			height: 60rpx;
			// background-color: red;
			border-radius: 50%;
			margin-right: 31rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.content{
			// background-color: yellow;
			position: relative;
			width: 86%;
			// 底部0.5px 的底线
			position:relative;
			padding-bottom:25rpx;
			.user_footer{
				width: 100%;	
				display: flex;
				justify-content: space-between;
				.cmt_right{
					position: absolute;
					top: 10rpx;
					right: 10rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				// image{
				// 	width: 40rpx;
				// 	height: 40rpx;
				// }
			}
			
			// 二级评论
			.two{
				.replay{
					// color: blue;
				}
				.two_cmt{
					display: flex;
					justify-content: start;
					padding: 12rpx 20rpx 0;
					.user_body{
						width: 87%;
					}
					.two_content::after{
						content: " ";
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 1px;
						background: white;
						transform: scaleY(0.5);
					}
				}
			}
		}
		.content::after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 1px;
			background: gray;
			transform: scaleY(0.5);
		}
	}
</style>
