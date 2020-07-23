<!-- 进行评论的模板 -->
<template>
	<view class="uni-popup-share">
		<view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view>
		<view class="uni-share-content" style="height: 300px;">
			<!-- 评论内容区 
				采用 mescroll 进行 评论区的渲染
			-->
			<mescroll-uni class="mescroll" ref="mescrollRef" top="50" bottom="100" @init="mescrollInit" 
				@down="downCallback" @up="upCallback" :down="downOption" :up="upOption" 
			>
				<mescroll-empty v-if="msgList.length === 0" ></mescroll-empty>
				<user-comment v-else class="user_cmt" @reply="reply" @changeMsgList="changeMsgList"  :msgList="msgList" />
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
			<view @click="send" >发送</view>
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
			},
			// 当前视频的ID
			videoId:{
				type:String,
			}
		},
		inject: ['popup'],
		data() {
			return {
				// 上拉加载
				upOption: {
					toTop: {
						src: '' // 不显示回到顶部按钮
					},
					// auto:false
					// empty: {
					// 	use : true ,
					// 	icon : null ,
					// 	tip : "暂无相关数据",
					// 	btnText : "",
					// 	fixed: false,
					// 	top: "100rpx",
					// 	zIndex: 99
					// },
				},
				// 下拉刷新
				downOption:{
					isLock:true
				},
				// 用户头像
				userImg:'',
				//动态修改输入框中的值，进行用户之间的交流互评
				replayVal:'写评论',
				// 控制发送请求 是视频评论 还是 进行回复
				sendStyle:true, //默认是 对视频进行评论
				commentId:'',//进行评论回复的ID
				replayIndex:'',//进行评论的 在msgList中的index
				
				twoShow:false,
				val:'',
				msgList:[],
				pageNum:1 ,//默认从第0页开始请求
			}
		},
		components:{
			MescrollEmpty,
			userComment
		},
		created() {
			console.log('创建 uni-popup-comments')
		
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
			// 传递给子组件的方法，用于用户对其修改当前页面中的数据
			changeMsgList(index,index2){
				if(index2 == undefined){
					// 当对视频评论进行 点赞
					this.msgList[index].liked = true
					this.msgList[index].praseCount ++
				}else{
					// 当对回复进行点赞
					this.msgList[index].replyList[index2].liked = true
					this.msgList[index].replyList[index2].praseCount ++
				}
			},
			
			
			/**
			 * 控制mescroll 进行操作
			 * */
			/*下拉刷新的回调*/
			downCallback(){
				// 与 mescroll-body 的处理方式一致 > 
				console.log('下拉刷新')
				// this.pageNum = 1
				
				
				// 发起请求，请求评论区内容
				let _this = this
				this._get("comment/getComments",{
					"pageNum":_this.pageNum,
					"pageSize":10,
					"videoId":_this.$props.videoId
				},function(res){
					console.log('请求评论下拉刷新 ===》 res',res.data.list);
					_this.msgList = res.data.list
					_this.mescroll.endSuccess()
					
					// 进行了初始化下拉刷新请求数据，之后改变请求的页数
					// _this.pageNum =  _this.pageNum + 1
					
					// 获取用户评论的条数
					// 将评论数传递给播放页
					_this.$emit('changeCommentsNum',res.data.total)
				})
				
			},
			/*上拉加载的回调*/
			upCallback(page) {
				// 与 mescroll-body 的处理方式一致 > 
				// console.log('uni-popup-comments上拉刷新')
				// setTimeout(()=>{
				// 	this.mescroll.endSuccess(1);
				// },3000)
				
				// 上拉加载进行请求数据
				let _this = this
				this._get("comment/getComments",{
					"pageNum":  _this.pageNum ,
					"pageSize":10,
					"videoId":_this.$props.videoId
				},function(res){
					console.log('请求评论 上拉加载 ===》 res',res.data.list);
					
				
					
					
					
					
				// 修改默认的页数
				_this.pageNum = res.data.nextPage
					
					
					// 参数一：当前页获取的数据量
					_this.mescroll.endSuccess(res.data.list.length)
					
					console.log('_this.msgList ===》',_this.msgList,"res.data.list ==>",res.data.list)
					// 进行数组之间的拼接 如果请求回的内容相同 ，则不进行拼接
					if( JSON.stringify(_this.msgList) == JSON.stringify(res.data.list))  return false
					_this.msgList = _this.msgList.concat(res.data.list)
					console.log('请求下一页拼接后的数组 _this.msgList ===》',_this.msgList)
					
					
					
				})
			},
			 
			 
			/**
			 * 用户进行发表评论
			 * */
			 // 将评论推入列表中
			 sendVal(e){
				 this.val = e.detail.value; 
			 },
			 
			 // 发送评论  判断是 对视频进行的评论还是评论回复
			send(){
				 let _this = this
				 // 当用户的评论为空时不进行发表
				 if(this.val === '' || !this.val.trim()) return
				 
				 console.log('发表评论e',this.val)
				 
				 
				// 如果是对视频进行评论
				if(this.sendStyle){
					//对当前视频进行评论
					this._post("comment/add",{
								"videoId":_this.$props.videoId,//视频ID
								"content":_this.val,
							},function(res){
								console.log('发表评论 res==>',res)
								
								// 发表言论成功后，修改列表的距离
								_this.msgList.unshift({
									 avatarUrl:uni.getStorageSync("user_img"),
									 userName:uni.getStorageSync("user_name"),
									 content:_this.val,
									 createTime:'',
									 praseCount:''
								})
								
								_this.val = ''
							})
				}else{
					// 进行评论的回复
					this._post("comment/addReply",{
							"commentId":_this.commentId,//评论中的ID
							"content":_this.val,
						},function(res){
							console.log('进行评论回复 res==>',res)
							_this.sendStyle = true
							
							// 对评论列表进行修改，
							_this.msgList[_this.replayIndex].replyList.unshift({
								content:_this.val
								
							})
							
							
							_this.val = ''
						})
				}
						
			},
			 
			 // 进行评论的回复
			reply(index,index2){
				// 传递 要评论对象的 用户名
				
				console.log('父级中 reply')
				
				if(index2 == undefined){
					console.log('对视频评论进行回复')
					// 对视频评论进行回复
					
					// 修改输入框中的值
					this.replayVal = '回复' + this.msgList[index].userName
					this.commentId = this.msgList[index].id
					this.sendStyle = false
					
					// 修改评论的序号
					this.replayIndex = index
					
				}else{
					// 对 二级评论机型回复
					console.log('进行二级回复',this.msgList[index])
					// this.replayVal = '回复' + this.msgList[index].replyList[index2].id
					this.replayVal = '进行二级回复' 
					
					this.commentId = this.msgList[index].id
					this.sendStyle = false
					
					this.replayIndex = index
				}
				
				
				
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

