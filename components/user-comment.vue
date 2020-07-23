<template>
	<view>
		
		<view class="user_cmt" v-for="(item,index) in msgList" :key="item.id">
			<!-- 用户的评论 -->
				<view class="user_img" @click="goAuthor">
					<image :src="item.avatarUrl" mode=""></image>
				</view>
				<view class="content">
					<view class="user_head" @click="goAuthor">
						{{item.userName || '用户名'}}
					</view>
					<view class="user_body" @click="reply(index,index2)">
						{{item.content || '用户说的话'}}
					</view>
					<!-- 时间  回复   点赞数 -->
					<view class="user_footer">
						<view class="left">
							<view class="time">
								{{item.createTime || '昨天22:36'}}
								<view style="display: inline-block;margin-left: 10rpx;"   @click="reply(index,index2)">回复</view>
							</view>
						</view>
						<view class="right" :id=" 'right' + index "  @click="seeActive(item.id,index)">
							<!-- 未点赞 -->
							<image class="img" v-if="!item.liked" src="../static/zan.png" mode=""></image>
							<!-- 点赞 -->
							<image class="actImg" v-else src="../static/zan_active.png" mode=""></image>
							<view>{{item.praseCount || ''}}</view>
						</view>
						
					</view>
					
					<!-- 判断是否有二级回复 -->
					<view class="two" v-if="item.replyList.length !== 0" >
						<!-- <view class="replay" v-if="!showTwoMsg" @click="showTwo">—展开更多回复 {{item.replyList.length}} </view> -->
						<view class="user_cmt two_cmt" v-for="(item2,index2) in item.replyList" :key="index">
							<!-- 用户的评论 -->
								<view class="user_img" @click="goAuthor">
									<image :src="item2.img" mode=""></image>
								</view>
								<view class="content two_content">
									<view class="user_head" @click="goAuthor">
										{{item2.name || '用户名'}}
									</view>
									<view class="user_body" @click="reply(index,index2)">
										{{item2.content || '用户说的话'}}
									</view>
									<!-- 时间  回复   点赞数 -->
									<view class="user_footer">
										<view class="left">
											<view class="time">
												{{item2.createTime || '昨天22:36'}}
												<view style="display: inline-block;margin-left: 10rpx;" @click="reply(index,index2)">回复</view>
											</view>
										</view>
										<view class="right" @click="replaySec(index,index2)">
											
											<!-- 未关注 -->
											<image v-if="!item2.liked" src="../static/zan.png" mode=""></image>
											<!-- 关注 -->
											<image v-else src="../static/zan_active.png" mode=""></image>
											<text>{{item2.praseCount || ''}}</text>
										</view>
										
									</view>
									
									
								</view>
						</view>
					</view>
					
				</view>
		</view>
		
		<!-- 没有更多 -->
		<!-- <u-divider>暂无更多</u-divider> -->
	</view>
</template>

<script>
	export default {
		props:{
			msgList:{
				type:Array, //实际请求获取的用户评论数据
			}
		},
		data() {
			return {
				see_active:false,
				showTwoMsg:false
			};
		},
		created() {
			console.log('user-comment  ==> msgList',this.$props.msgList)
		},
		components: {
			
		},
		methods:{
			// 是否显示二级评论
			showTwo(){
				console.log('显示二级评论')
				//点击展开显示更多
				 this.showTwoMsg = true
			},
			//跳转到作者页
			goAuthor(){
				uni.navigateTo({
				   url: "/pages/author/author"
				});
			},
			reply(index,index2){
				console.log('user-comment 进行 评论回复',index,index2)
				// 当进行回复时，要获取进行回复的对象
				// 改变input中的提示
				// console.log('回复' + e.currentTarget.dataset.name)
				this.$emit('reply',index,index2)
				
				// 然后将回复的评论放到二级评论中
				
				
				
			},
			seeActive(id,index){
				console.log('对评论进行点赞')
				
				// 如果当前已经对其进行了点赞 则不在发起请求
				if(this.$props.msgList[index].liked){
					return 
				}
				
				let _this = this
				this._post("comment/likeComment",{
					"commentId":id
				},function(res){
					console.log('进行评论点赞')
					
					// 对列表中显示的数据进行修改 应当调用父级的方法对其进行修改
					_this.$emit('changeMsgList',index)
				})
				
				
			},
			replaySec(index,index2){
				let _this = this
				console.log('对回复进行点赞 id ===>',index,index2)
				// 获取回复点赞中 点击的目标 commentReplyId
				console.log('点击的目标 commentReplyId',this.$props.msgList[index].replyList[index2])
				
				// 先改变本地的点赞情况
				// this.$props.msgList[index].replyList[index2].liked = true
				// this.$props.msgList[index].replyList[index2].praseCount ++
				
				// 如果当前回复已经进行了点赞，则不再触发点赞请求
				if( this.$props.msgList[index].replyList[index2].liked) return
				
				
				this._post("comment/likeCommentReply",{
					"commentReplyId":_this.$props.msgList[index].replyList[index2].id
				},function(res){
					console.log('对评论回复 进行 点赞')
					// 请求成功后修改列表数据
					_this.$emit('changeMsgList',index,index2)
					
				})
				
			},
			/**
			 * 显示更多回复
			 * */
			 showMore(){
				 console.log('显示更多')
				 
				 //显示二级对话框
				 // this.twoShow = true 
			 }
		}
	}
</script>

<style lang="less">
	
	.user_cmt{
		display: flex;
		justify-content: start;
		padding: 32rpx 20rpx;
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
				.right{
					position: absolute;
					top: 10rpx;
					right: 10rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
			.two{
				.replay{
					// color: blue;
				}
				.two_cmt{
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
