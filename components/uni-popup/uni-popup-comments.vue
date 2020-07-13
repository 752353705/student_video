<!-- 进行评论的模板 -->
<template>
	<view class="uni-popup-share">
		<view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view>
		<view class="uni-share-content" style="height: 300px;">
			<!-- 评论内容区 
				采用 mescroll 进行 评论区的渲染
			-->
			<mescroll-uni class="mescroll" ref="mescrollRef" top="50" bottom="100" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" >
				<mescroll-empty v-if="msgList.length === 0" ></mescroll-empty>
				<user-comment v-else class="user_cmt" :msgList="msgList" />
			</mescroll-uni>
			
			
		</view>
		
		<!-- 用户的输入评论区 -->
		<view class="msgBox">
			<!-- 用户的头像 -->
			<view class="img_user">
				<image :src="userImg" mode=""></image>
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
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	
	import userComment from '../user-comment.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin
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
				// 用户头像
				userImg:'',
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
			MescrollEmpty,
			userComment
		},
		created() {
			// console.log('创建 评论')
			
		},
		mounted() {
			let _this = this
			// console.log('挂载')
			uni.getStorage({
			    key: 'user_img',
			    success: function (res) {
			        // console.log('赋值 user_img',res);
							_this.userImg = res.data
			    }
			});
		},
		methods: {
			/**
			 * 控制mescroll 进行操作
			 * */
			/*下拉刷新的回调*/
			downCallback(){
				// 与 mescroll-body 的处理方式一致 > 
				console.log('下拉刷新')
				setTimeout(()=>{
					this.mescroll.endSuccess()
				},3000)
			},
			/*上拉加载的回调*/
			upCallback(page) {
				// 与 mescroll-body 的处理方式一致 > 
				console.log('上拉刷新')
				setTimeout(()=>{
					this.mescroll.endSuccess();
				},3000)
			},
			 
			 
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
		position: relative;
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
	.msgBox{
		display: flex;
		align-items: center;
		background-color: white;
		z-index: 10;
		position: sticky;
		bottom: 0;
		left: 0;
		.img_user{
			width: 60rpx;
			height: 60rpx;
			background-color: yellow;
			border-radius: 50%;
			margin-right: 20rpx;
			margin-left: 27rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
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
		z-index: 11;
		image{
			width: 60rpx;
			height: 60rpx;
		}
	}
	
	
</style>

