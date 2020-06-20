<template>
	<view class="user_cmt">
		<!-- 用户的评论 -->
			<view class="user_img" />
			<view class="content">
				<view class="user_head">
					{{user.name || '用户名'}}
				</view>
				<view class="user_body">
					{{user.talk || '用户说的话'}}
				</view>
				<!-- 时间  回复   点赞数 -->
				<view class="user_footer">
					<view class="left">
						<view class="time">
							{{user.time || '昨天22:36'}}
						</view>
					</view>
					<view class="right" @click="seeActive">
						<text>{{user.see || '1.3w'}}</text>
						<!-- 未关注 -->
						<image v-if="!see_active" src="../static/cmt_num.png" mode=""></image>
						<!-- 关注 -->
						<image v-else src="../static/like_active.png" mode=""></image>
					</view>
					
				</view>
				<view class="" @click="showMore">
					— 展开更多回复
				</view>
				
				<solt></solt>
				
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				see_active:false
			};
		},
		components: {
			
		},
		methods:{
			seeActive(){
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
		.user_img{
			width: 60rpx;
			height: 60rpx;
			background-color: red;
			border-radius: 50%;
			margin-right: 31rpx;
		}
		.content{
			background-color: yellow;
			width: 100%;
			.user_footer{
				width: 100%;	
				display: flex;
				justify-content: space-between;
				.right{
					display: flex;
					align-items: center;
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}
</style>
