<template>
	<view>
		
		<view class="user_cmt" v-for="(item,index) in msgList" :key="index">
			<!-- 用户的评论 -->
				<view class="user_img" @click="goAuthor"></view>
				<view class="content">
					<view class="user_head" @click="goAuthor">
						{{item.name || '用户名'}}
					</view>
					<view class="user_body" @click="reply">
						{{item.talk || '用户说的话'}}
					</view>
					<!-- 时间  回复   点赞数 -->
					<view class="user_footer">
						<view class="left">
							<view class="time">
								{{item.time || '昨天22:36'}}
							</view>
						</view>
						<view class="right" :id=" 'right' + index " @click="seeActive(index)">
							<!-- 未关注 -->
							<image class="img" v-if="!see_active" src="../static/cmt_num.png" mode=""></image>
							<!-- 关注 -->
							<image class="actImg" v-else src="../static/like_active.png" mode=""></image>
							<view>{{item.see || '1.3w'}}</view>
						</view>
						
					</view>
					
					<!-- 判断是否有二级回复 -->
					<view class="two" v-if="item.two_cont" @click="showMore">
						<view class="replay" v-if="!showTwoMsg" @click="showTwo">—展开更多回复</view>
						<view v-if="showTwoMsg" class="user_cmt two_cmt" v-for="(item2,index2) in item.two_cont" :key="index">
							<!-- 用户的评论 -->
								<view class="user_img" @click="goAuthor"></view>
								<view class="content two_content">
									<view class="user_head" @click="goAuthor">
										{{item2.name || '用户名'}}
									</view>
									<view class="user_body" @click="reply">
										{{item2.talk || '用户说的话'}}
									</view>
									<!-- 时间  回复   点赞数 -->
									<view class="user_footer">
										<view class="left">
											<view class="time">
												{{item2.time || '昨天22:36'}}
											</view>
										</view>
										<view class="right" @click="seeActive">
											<text>{{item2.see || '1.3w'}}</text>
											<!-- 未关注 -->
											<image v-if="!see_active" src="../static/cmt_num.png" mode=""></image>
											<!-- 关注 -->
											<image v-else src="../static/like_active.png" mode=""></image>
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
			reply(){
				console.log('进行回复')
				// 当进行回复时，要获取进行回复的对象
				// 改变input中的提示
				
				
				
				// 然后将回复的评论放到二级评论中
				
				
				
			},
			seeActive(index){
				console.log('点击的关注',index)
				//然后根据被点击的第几个元素使其进行变化
				const query = uni.createSelectorQuery();
				console.log('获取节点',query.select(`#right`+ index))
				
				query.select(`#right`+ index).fields({
					properties:['display']
				},data => {
					console.log('data',data)
				}).exec()
				
				this.see_active = !this.see_active
				
				
				
				
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
			background-color: red;
			border-radius: 50%;
			margin-right: 31rpx;
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
					image{
						width: 40rpx;
						height: 40rpx;
					}
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
