<template>
	<view class="chartRoom">
		<!-- 用户信息交流区域 采用scrollView区域渲染 -->
		<scroll-view scroll-y="true" 
			:style=scrollviewHigh
			class="scroll"
		>
			<view class="chartBox">
				111
				<!-- 接收方 在左侧显示 -->
				<view class="chart_left" v-for="(item,index) in chartLeft" :key="index" >
					<!-- 接收方头像 -->
					<view class="left_userimg"></view>
					<!-- 接收消息显示 -->
					<view class="left_msg">{{item}}</view>
				</view>
				
				<!-- 发送方 在右侧显示 -->
				<view class="chart_right" v-for="(item,index) in chartRight" :key="index">
					<!-- 发送消息显示 -->
					<view class="right_msg">{{item}}</view>
					<!-- 发送方头像 -->
					<view class="right_userimg"></view>
				</view>
			</view>
		</scroll-view>
	
		
		<!-- 输入框 -->
		<view class="input_box height"
			:style=inputBottom
		>
			<!-- 输入框 -->
			<input class="uni-input"  
				cursor-spacing="10"
				type="text" :value="sendVal" 
				placeholder="发消息..."
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
		
		<!-- 显示选择图片 和 表情  -->
		<view class="choose">
			图片和表情
		</view>
		
		
		
		<!-- 弹出框 用户点击添加按钮 可以从相册选取图片 -->
		<!-- <uni-popup :selfMask="selfMask" ref="popupChart" type="share" @change="change">
			<uni-popup-chart title="评论" @select="select"></uni-popup-chart>
		</uni-popup> -->
		
	</view>
</template>

<script>
	// 导入 发送图片的弹框
	import uniPopupChart from '../../components/uni-popup/uni-popup-chart.vue'
	export default {
		data() {
			return {
				// 判断是否显示表情和发送本机图片
				show_exp:false,
				show_img:false,
				
				sendVal:'',
				chartLeft:[],
				chartRight:[],
				scrollviewHigh:'',//滚动区域的高度
				height:0,
				// 自定义遮罩层
				selfMask:{
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
				},
				// 控制input框的高度
				inputBottom:'',
				// 控制自定义表情图片的高度
				showHeight:''
			};
		},
		components:{
			uniPopupChart
		},
		onLoad() {
			// this.$refs.popupChart.open()
			// 聊天室，导航栏改变成 聊天对象的名称
			uni.setNavigationBarTitle({
			    title: '小明'
			});
		},
		onReady() {
			let _this = this
			// 动态设计消息滚动区域的高度
			uni.getSystemInfo({
				success(res) {
						_this.phoneHeight = res.windowHeight; //获取用户设备的高度
						// 计算组件的高度
						let view = uni.createSelectorQuery().selectAll('.height');
						view.boundingClientRect(data => {
							// 计算上方各元素的高度总和
							data.forEach((item,index) => {
								_this.height += parseInt(item.height)
							})
							_this.scrollviewHigh =  _this.phoneHeight - _this.height;
							_this.scrollviewHigh = "height:" + _this.scrollviewHigh +"px";
						}).exec();
				}
			});
		},
		methods:{
			// 当进行点击发送之后
			send(){
				console.log('发送消息',this.sendVal)
				this.inputHeight = 0
				// 将发送方的消息储存到 chartRight
				this.chartRight.push(this.sendVal)
				// 然后清空输入框内容
				this.sendVal = ''
			},
			// 当用户进行输入
			input(e){
				console.log('用户输入',e.detail.value)
				// 储存用户输入值
				this.sendVal = e.detail.value
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
				this.inputBottom = "bottom:" + e.detail.height + 'px'
				this.showHeight = "height:" + e.detail.height + 'px'
			},
			end(e){
				console.log('点击完成时触发',e.detail)
			},
			/**
			 * popup 状态发生变化触发
			 * @param {Object} e
			 */
			change(e) {
				console.log('弹窗状态改变','popup ' + e.type + ' 状态', e.show)
				// console.log('popup ' + e.type + ' 状态', e.show)
				
				// let ctx = this.videoContextList[this.videoIndex]
				
				// // 当弹窗消失之后自动对视频进行播放
				// if(e.show){
				// 	// 当弹窗进行显示之后暂停当前视频
				// 	this.isPlay = false
				// 	ctx.pause();
				// }else{
				// 	this.isPlay = true
				// 	ctx.play();
				// }
				
			},
		}
	}
</script>

<style lang="less">
	.chartRoom{
		background-color: #f6f6f6;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.scroll{
			background-color: red;
			.chartBox{
				position: sticky;
				top: 0;
				.chart_right{
					width: 100%;
					box-sizing: border-box;
					padding: 0 20rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					margin: 40rpx 0;
					.right_msg{
						margin-right: 20rpx;
						background-color: #5d92e2;
						border-radius: 40rpx;
						box-sizing: border-box;
						padding: 10rpx 15rpx;
					}
					.right_userimg{
						width: 80rpx;
						height: 80rpx;
						background-color: yellow;
						border-radius: 50%;
					}
				}
				.chart_left{
					width: 100%;
					box-sizing: border-box;
					padding: 0 20rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin: 40rpx 0;
					.left_msg{
						margin-left: 20rpx;
						background-color: #5d92e2;
						border-radius: 40rpx;
						box-sizing: border-box;
						padding: 20rpx 15rpx;
					}
					.left_userimg{
						width: 80rpx;
						height: 80rpx;
						background-color: yellow;
						border-radius: 50%;
					}
				}
			}
		}
	
		
		.input_box{
			position: absolute;
			z-index: 10;
			left: 0;
			bottom: 0;
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
		
		
		.choose{
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 227px;
			background-color: yellow;
		}
		
		// 表情选择框
		// .send_user_expression{
		// 	background-color: yellow;
		// 	width: 100%;
		// 	height:277px;
		// }
		// // 传递图片
		// .send_user_img{
		// 	background-color: green;
		// 	width: 100%;
		// 	height:277px;
		// }
		
		// 0.5px的边框
		.border {
			position: relative;
		}
		.border::before {
			content: " ";
			position: absolute;
			top: 0;
			left: 0;
			width: 200%;
			height: 200%;
			border: 1px solid black;
			border-radius: 50%;
			transform-origin: 0 0;
			transform: scale(0.5);
		}
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
