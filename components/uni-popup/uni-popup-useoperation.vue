<template>
	<view class="uni-popup-message" >
		<!-- 个人资料 -->
		<view  class="uni-popup-message-text "  :style="{left:operleft,top:opertop}" >
			<view class="item" v-for="(item) in oper" :key="index" :data-id="index"  @click="operchoose">
				<!-- 左侧图标 -->
				<view class="left">
					<image :src=item.src mode=""></image>
				</view>
				<!-- 右侧内容 -->
				<view class="right">
					<view class="tit">{{item.tit}}</view>
					<view class="des">{{item.des}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	/**
	 * PopUp 弹出层-消息提示
	 * @description 弹出层-消息提示
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} message 消息提示文字
	 * @property {String} duration 显示时间，设置为 0 则不会自动关闭
	 */
	import { _postVideo } from '../../API/_post.js'
	import VODUpload from '../aliyun-upload-sdk-1.0.0.min.js'
	export default {
		name: 'UniPopupMessage',
		props: {
			// 控制弹窗的位置
			opertop:{
				type:String,
				default:''
			},
			operleft:{
				type:String,
				default:''
			},
			/**
			 * 判断弹出框是哪一种类型
			 * */
			pop_type:{
				type:String,
				default:''
			},
			/**
			 * 主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'success'
			},
			/**
			 * 消息文字
			 */
			message: {
				type: String,
				default: ''
			},
			/**
			 * 显示时间，设置为 0 则不会自动关闭
			 */
			duration: {
				type: Number,
				default: 3000
			}
		},
		inject: ['popup'],
		data() {
			return {
				// 显示用户操作的
				oper:[
					{src:'/static/nolike.png',tit:'不感兴趣',des:'减少此类内容'},
					{src:'/static/shield.png',tit:'屏蔽',des:'不喜欢'},
					{src:'/static/report.png',tit:'举报',des:'内容令人不适，搬运抄袭'}
				],
				
				video_src:'',
				uploader:'',
				videos: [],
				showCir:false,//进度环是否显示
				percent:0,//上传进度环的显示
			}
		},
		created() {
			this.popup.childrenMsg = this
		},
		onReady() {
			
		},
		methods: {
			// 用户点击弹窗进行操作
			operchoose(e){
				console.log('点击弹窗 e',e)
			},
			
			
			
			// 控制弹窗
			open() {
				if (this.duration === 0) return
				clearTimeout(this.popuptimer)
				this.popuptimer = setTimeout(() => {
					this.popup.close()
				}, this.duration)
			},
			close() {
				clearTimeout(this.popuptimer)
			},
			//提交个人资料
			submitUserMsg(e){
				console.log('个人资料e',e.detail.value)
			},
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-message{
		display: flex;
		flex-direction: column;
		align-items: center;
		.uni-popup-message-text{
			width: 575rpx;
			height: 449rpx;
			background-color:white ;
			font-size: 14px;
			border-radius: 18rpx;
			// background-image: linear-gradient(to bottom, #fed353 , #ea9b70);
			// position: relative;
			position: absolute;
			
			
			
			box-sizing: border-box;
			
			padding-left: 26rpx;
			// padding-top: 31rpx;
			padding-right: 35rpx;
			padding-bottom: 48rpx;
			// display: flex;
			// flex-direction: column;
			// align-items: center;
			overflow: hidden;
		
			.item{
				display: flex;
				justify-content: start;
				box-sizing: border-box;
				// padding-left: 35rpx;
				padding-top: 31rpx;
				padding-right: 35rpx;
				padding-bottom: 48rpx;
				// background-color: red;
				position: relative;
				.left{
					width: 44rpx;
					height: 42rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.right{
					margin-left: 20rpx;
					.tit{
						font-size: 30rpx;
						font-weight: bolder;
					}
					.des{
						margin-top: 10rpx;
						color:#646464 ;
						font-size: 20rpx;
					}
				}
			}
			// 每一项的底部都有一个0.5px 的线
			  .item::after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 1px;
					background: #e7e7e7;
					transform: scaleY(0.5);
				}
				// 最后一项中底部的边框线去除
				.item:nth-child(3)::after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 0px;
					background: red;
					transform: scaleY(0.5);
				}
		}
	}
</style>
