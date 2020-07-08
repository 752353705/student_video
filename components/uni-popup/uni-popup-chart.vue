<template>
	<view class="uni-popup-share">
		<!-- <view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view> -->
		<view class="uni-share-content">
			<view class="uni-share-content-box">
				<!-- 输入框  :style="inputBottom"-->
				<view class="input_box height" 
					:style="inputBottom"
				>
					<!-- 输入框 -->
					<!-- <input class="uni-input"  
						cursor-spacing="10"
						type="text" :value="sendVal" 
						placeholder="发消息..."
						@input="input"
					/> -->
					<input class="uni-input"
						:focus="true"
						cursor-spacing="10"
						type="text" :value="sendVal" 
						placeholder="发消息..."
						@focus="foc"
						@input="input"
						@keyboardheightchange="keyWord"
						@confirm="end" 
						:adjust-position="false"
						:hold-keyboard="false"	
					/>
					<!-- 表情选择框 -->
					<view class="expression border" @click="showExp">
						<image src="../../static/chartExpress.png" mode="aspectFit"></image>
					</view>
					<!-- 选择图片框 -->
					<view v-if="sendVal.length === 0" class="addImg border" @click="showImg">
						<image src="../../static/chartAdd.png" mode="aspectFit"></image>
					</view>
					<!-- 发送框 当输入框中有值了 图片按钮消失 显示发送按钮 -->
					<view v-else class="send" @click="send">
						发送
					</view>
				</view>
				<!-- <view class="uni-share-content-item" v-for="(item,index) in bottomData" :key="index" @click.stop="select(item,index)">
					<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
					<text class="uni-share-text">{{item.text}}</text>
					<text class="uni-share-text">{{item.name}}</text>
				</view> -->
					
					
					<!-- 表情弹框 -->
				<!-- 	<view class="exp_box" v-if="show_exp" >
						表情
					</view> -->
					<!-- 上传图片选框 -->
					<!-- <view class="send_box" v-if="show_img">
						图片
					</view> -->
			</view>
			
			
			
			
		</view>
		<!-- <view class="uni-share-button-box">
			<button class="uni-share-button" @click="close">取消</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'UniPopupShare',
		props: {
			title: {
				type: String,
				default: '分享到'
			},
			// 控制input框的高度
			inputBottom: {
				type: String,
				default: 'bottom:227px'
			}
		},
		inject: ['popup'],
		data() {
			return {
				show_exp:false,
				show_img:false,
				sendVal:'',
				
				// 控制自定义表情图片的高度
				showHeight:''
			}
		},
		created() {
			// console.log('inputBottom',this.$props.inputBottom)
			// this.$refs.input.focus();
		},
		methods: {
			// 显示表情选择框
			showExp(){
				console.log('显示表情小图案')
				this.show_exp = !this.show_exp
			},
			// 显示选择图片框
			showImg(){
				console.log('显示 选择本机图片')
				this.show_img = !this.show_img
				// this.$refs.popupChart.open()
			},
			
	// 控制输入内容 input
			// 当进行点击发送之后
			send(){
				let _this = this
				console.log('弹框中发送消息',_this.sendVal)
				
				// 触发父级的事件
				this.$emit('send',_this.sendVal)
				// 关闭弹窗
				this.popup.close()
				// this.inputHeight = 0
				// // 将发送方的消息储存到 chartRight
				// this.chartRight.push(this.sendVal)
				// // 然后清空输入框内容
				this.sendVal = ''
			},
			// 当用户进行输入
			input(e){
				console.log('用户输入',e.detail.value)
				// 储存用户输入值
				this.sendVal = e.detail.value
			},
			foc(){
				console.log('聚焦')
				// 弹出聊天框
				// this.$refs.popupChart.open()
			},
			// 显示表情选择框
			showExp(){
				console.log('显示表情小图案')
				this.show_exp = !this.show_exp
			},
			// 显示选择图片框
			showImg(){
				console.log('显示 选择本机图片')
				this.show_img = !this.show_img
				// this.$refs.popupChart.open()
			},
			// 监控键盘高度的变化
			keyWord(e){
				console.log('键盘高度变化',e.detail.height)
				//设置键盘抬起的高度
				this.$emit('keyWord',e.detail.height)
			},
			end(e){
				console.log('点击完成时触发',e.detail)
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
			}
		}
	}
</script>
<style lang="scss" scoped>
	.input_box{
		position: absolute;
		z-index: 10;
		left: 0;
		bottom: 0px; //要根据键盘自定义 高度
		width: 100%;
		height: 105.55rpx;
		background-color: white;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		box-sizing: border-box;
		padding: 10rpx 0;
		input{
			width: 60%;
			height: 80%;
			box-sizing: border-box;
			padding-left: 20rpx;
			overflow:visible ;
			position: relative;
		}
		input::before {
			content: " ";
			position: absolute;
			top: 0;
			left: 0;
			width: 200%;
			height: 200%;
			border: 1px solid black;
			border-radius: 70rpx;
			transform-origin: 0 0;
			transform: scale(0.5);
		}
		.expression,.addImg{
			width: 60rpx;
			height: 60rpx;
			box-sizing: border-box;
			padding: 8rpx;
			border-radius: 50%;
		}
		.send{
			background-color: #5d92e2;
			color: white;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			border-radius: 40rpx;
		}
	}
	
	// 表情以及发送图片
	.exp_box,.send_box{
		position: absolute;
		z-index: 10;
		left: 0;
		bottom: 0; //要根据键盘自定义 高度
		width: 100%;
		height: 227px;
		background-color: yellow;
	}
	.uni-popup-share {
		background-color: #fff;
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
		font-size: 40rpx;
		font-weight: bolder;
		color: #666;
	}
	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		// padding-top: 10px;
	}
	
	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		width: 360px;
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
</style>
