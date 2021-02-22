<template>
	<view class="uni-popup-message" >
		<!-- 个人资料 -->
		<view  class="uni-popup-message-text "  :style="{left:operleft,top:opertop}" >
			<view class="item" v-for="(item,index) in oper" :key="index"  @click="operchoose(index)">
				<view class="right">
					<view class="tit">{{item.tit}}</view>
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
	export default {
		name: 'UniPopupMessage',
		props: {
			// 获取点击的文章的信息
			// 进行修改 其代表的是 要进行操作的作品 id
			txtid:{
				type:String
			},
			// 判断用户要对 文章 还是 二手进行 修改
			operType:{
				type:String
			},
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
					{src:'/static/nolike.png',tit:'修改',des:'减少此类内容'},
					{src:'/static/shield.png',tit:'删除',des:'不喜欢'},
					// {src:'/static/report.png',tit:'举报',des:'内容令人不适，搬运抄袭'}
				],
			}
		},
		created() {
			this.popup.childrenMsg = this
		},
		methods: {
			// 用户点击弹窗进行操作
			operchoose(index){
				let _this = this
				// console.log('this.txtid',this.txtid,_this.operType,index)
				if(index == 0){
					// 用户进行修改操作
					// 跳转到 写文章的界面  将点击的 文章的信息传递过去
					uni.navigateTo({
						url:`/pages/changeTxt/changeTxt?txtid=${this.txtid}`
					})
				}
				else if(index == 1) {
					this.http({
						url:`article/${_this.txtid}`,
						method:'DELETE'
					}).then(res => {
						this.$emit('closeUseroperation');
						uni.showToast({
							icon:'none',
							title: '删除成功',
						})
						// 然后删除当前列表中的作品
						_this.$emit('myDelArticle');
					})
				}
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
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-message{
		display: flex;
		flex-direction: column;
		align-items: center;
		.uni-popup-message-text{
			// width: 575rpx;
			// height: 449rpx;
			background-color:white ;
			font-size: 14px;
			border-radius: 18rpx;
			position: absolute;
			box-sizing: border-box;
			padding-left: 26rpx;
			// padding-top: 31rpx;
			padding-right: 35rpx;
			// padding-bottom: 48rpx;
			display: flex;
			// flex-direction: column;
			// align-items: center;
			overflow: hidden;
		
			.item{
				display: flex;
				justify-content: start;
				box-sizing: border-box;
				// padding-left: 35rpx;
				padding-top: 13rpx;
				padding-right: 16rpx;
				padding-bottom: 19rpx;
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
