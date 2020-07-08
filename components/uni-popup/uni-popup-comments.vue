<!-- 进行评论的模板 -->
<template>
	<view class="uni-popup-share">
		<view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view>
		<view class="uni-share-content">
			<!-- 评论内容区 -->
			<scroll-view class="uni-share-content-box"
				scroll-y="true"
			>
				
				<!-- 模拟用户的评论 -->
				<user-comment class="user_cmt" 
					:msgList = "msgList" 
				/>
				
				<!-- 显示二级回复 -->
				<!-- <view class="user_cmt_two" v-if="twoShow">
					<view class="two_cont" v-for="(item,index) in [1,2,3]" :key="index">
						三级
					</view>
				</view> -->
				
			</scroll-view>
		</view>
		
		
		<!-- 用户的输入评论区 -->
		<view class="msgBox">
			<!-- 用户的头像 -->
			<view class="img_user">
				
			</view>
			
			<view class="msg">
				<image src="/static/signature.png" mode=""></image>
				<input type="text" value="" :placeholder="replayVal" 
					cursor-spacing = 15
					:value="val"
					@input="sendVal"
				/>
			</view>
			
			<!-- 发表评论按钮 -->
			<view @click="send">发送</view>
		</view>
	
		<!-- 取消按钮 -->
		<view class="close">
			<image src="../../static/cmt_close.png" mode="" @click="close"></image>
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	import userComment from '../user-comment.vue'
	export default {
		name: 'UniPopupShare',
		props: {
			title: {
				type: String,
				default: '分享到'
			}
		},
		inject: ['popup'],
		data() {
			return {
				//动态修改输入框中的值，进行用户之间的交流互评
				replayVal:'写评论',
				twoShow:false,
				val:'',
				msgList:[{
						name:'1',
						talk:'',
						time:'',
						see:'',
						two_cont:[
							{name:'1-1',talk:'',time:'',see:''}
						]
					},
					{name:'2',talk:'',time:'',see:''},
					{name:'3',talk:'',time:'',see:''},
					{name:'4',talk:'',time:'',see:''},
					{name:'5',talk:'',time:'',see:''},
				]
			}
		},
		components:{
			userComment
		},
		created() {},
		methods: {
			/**
			 * 用户进行发表评论
			 * */
			 // 将评论推入列表中
			 sendVal(e){
				 this.val = e.detail.value; 
			 },
			 send(){
				 
				 // 当用户的评论为空时不进行发表
				 if(this.val === '' || !this.val.trim()) return
				 
				 console.log('发表评论e',this.val)
				 
				 // 从本地存储中获取用户的个人信息，以及头像当评论时传入列表
				 
				 this.msgList.unshift({
					 name:'6',talk:this.val,time:'',see:''
				 })
				 this.val = ''
			 },
			/**
			 * 选择内容
			 */
			select(item, index) {
				this.$emit('select', {
					item,
					index
				}, () => {
					this.popup.close()
				})
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			},
			/**
			 * 显示更多回复
			 * */
			 showMore(){
				 console.log('显示更多')
				 
				 //显示二级对话框
				 this.twoShow = true 
			 }
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-share {
		position: relative;
		background-color: #fff;
		height: 70%;
		border-radius: 20rpx 20rpx 0 0;
		box-sizing: border-box;
		// padding: 0 40rpx 0;
	}
	.uni-share-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 40px;
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
	
	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		// display: flex;
		/* #endif */
		// flex-direction: row;
		// flex-wrap: wrap;
		width: 360px;
		height: 600rpx;
	}
	
	.uni-share-content-item {
		width: 90px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding: 10px 0;
		align-items: center;
	}
	
	.uni-share-content-item:active {
		background-color: #f5f5f5;
		height: 400rpx;
	}
	
	.uni-share-image {
		width: 30px;
		height: 30px;
	}
	
	.uni-share-text {
		margin-top: 10px;
		font-size: 14px;
		color: #3B4144;
	}
	
	.uni-share-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px 15px;
	}
	
	.uni-share-button {
		flex: 1;
		border-radius: 50px;
		color: #666;
		font-size: 16px;
		background-color: transparent;
	}
	
	.uni-share-button::after {
		border-radius: 50px;
		border: none;
	}
	
	// 用户书写评论
	.msgBox{
		display: flex;
		align-items: center;
		.img_user{
			width: 60rpx;
			height: 60rpx;
			background-color: yellow;
			border-radius: 50%;
			margin-right: 20rpx;
			margin-left: 27rpx;
		}
		.msg {
			width: 70%;
			height: 66rpx;
			box-sizing: border-box;
			padding-left: 30rpx;
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
	
	.close{
		position: absolute;
		top: 14rpx;
		right: 19rpx;
		image{
			width: 60rpx;
			height: 60rpx;
		}
	}
	
	
</style>

