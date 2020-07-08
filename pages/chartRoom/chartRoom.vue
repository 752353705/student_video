<template>
	<view class="chartRoom">
		<!-- 用户信息交流区域 采用scrollView区域渲染 -->
		
			<mescroll-body class="scroll" ref="mescrollRef"  @init="mescrollInit" @down="downCallback">
				<!-- 接收方 在左侧显示 -->
				<view :style=scrollviewHigh  class="chartBox">
					<view class="chart_left" v-for="(item,index) in chartLeft" :key="index">
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
			</mescroll-body>
	
		
		<!-- 输入框 -->
		<view class="input_box height"
			:style="inputBottom"
		>
			<!-- 输入框 -->
			<input class="uni-input"  
				cursor-spacing="10"
				type="text" :value="sendVal" 
				placeholder="发消息..."
				@focus="foc"
				@blur="blur"
				@input="input"
				@keyboardheightchange="keyWord"
				@confirm="end" 
				:adjust-position="false"
				:hold-keyboard="false"	
			/>
		<!-- 	<view class="uni-input input" @click="foc">
				发信息...
			</view> -->
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
	<!-- 	<view class="choose">
			图片和表情
		</view> -->
		
		
		
		<!-- 弹出框 用户点击添加按钮 可以从相册选取图片 -->
		<!-- <uni-popup :selfMask="selfMask" ref="popupChart" type="share" @change="change">
			<uni-popup-chart :inputBottom="inputBottom" title="评论" 
				@select="select" @send="send" 
				@keyWord="keyWord"
			/>
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
			// 处理mescroll 上拉加载下拉刷新
			// 控制测试的视频列表
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){
				console.log('downCallback 下拉刷新')
				// this.mescroll.endSuccess()
				// 第1种: 请求具体接口
				// uni.request({
				// 	url: 'xxxx',
				// 	success: () => {
				// 		// 请求成功,隐藏加载状态
				// 		this.mescroll.endSuccess()
				// 	},
				// 	fail: () => {
				// 		// 请求失败,隐藏加载状态
				// 		this.mescroll.endErr()
				// 	}
				// })
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				// this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				setTimeout(()=>{
					this.mescroll.endSuccess()
				},3000)
				
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			/*上拉加载的回调*/
			upCallback(page) {
				console.log('upCallback 上拉加载')
				// let pageNum = page.num; // 页码, 默认从1开始
				// let pageSize = page.size; // 页长, 默认每页10条
				// uni.request({
				// 	url: 'xxxx?pageNum='+pageNum+'&pageSize='+pageSize,
				// 	success: (data) => {
				// 		// 接口返回的当前页数据列表 (数组)
				// 		let curPageData = data.xxx; 
				// 		// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				// 		let curPageLen = curPageData.length; 
				// 		// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
				// 		let totalPage = data.xxx; 
				// 		// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
				// 		let totalSize = data.xxx; 
				// 		// 接口返回的是否有下一页 (true/false)
				// 		let hasNext = data.xxx; 
						
				// 		//设置列表数据
				// 		if(page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				// 		this.dataList = this.dataList.concat(curPageData); //追加新数据
						
				// 		// 请求成功,隐藏加载状态
				// 		//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 		this.mescroll.endByPage(curPageLen, totalPage); 
						
				// 		//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				// 		//this.mescroll.endBySize(curPageLen, totalSize); 
						
				// 		//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				// 		//this.mescroll.endSuccess(curPageLen, hasNext); 
						
				// 		//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
				// 		//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
				// 		//如果传了hasNext,则翻到第二页即可显示无更多数据.
				// 		//this.mescroll.endSuccess(curPageLen);
						
				// 		// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
				// 		// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
				// 		setTimeout(()=>{
				// 			this.mescroll.endSuccess(curPageLen)
				// 		},20)
						
				// 		//curPageLen必传的原因:
				// 		// 1. 使配置的noMoreSize 和 empty生效
				// 		// 2. 判断是否有下一页的首要依据: 
				// 		// 	 当传的值小于page.size时(说明不满页了),则一定会认为无更多数据;
				// 		// 	 比传入的totalPage, totalSize, hasNext具有更高的判断优先级;
				// 		// 3. 当传的值等于page.size时(满页),才取totalPage, totalSize, hasNext判断是否有下一页
				// 		// 传totalPage, totalSize, hasNext目的是避免方法四描述的小问题
						
				// 		// 提示: 您无需额外维护页码和判断显示空布局,mescroll已自动处理好.
				// 		// 当您发现结果和预期不一样时, 建议再认真检查以上参数是否传正确
				// 	},
				// 	fail: () => {
				// 		//  请求失败,隐藏加载状态
				// 		this.mescroll.endErr()
				// 	}
				// })
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			
			
			
			
			
			
			// 当进行点击发送之后
			send(){
				// console.log('发送消息',this.sendVal)
				
				this.inputHeight = 0
				// console.log('储存',this.sendVal)
				// 将发送方的消息储存到 chartRight
				this.chartRight.push(this.sendVal)
				// console.log('储存后 chartRight',this.chartRight)
				// 然后清空输入框内容
				this.sendVal = ''
				// 高度降下
				this.inputBottom = "bottom:" + 0 + 'px'
			},
			// 当用户进行输入
			input(e){
				// console.log('用户输入',e.detail.value)
				// 储存用户输入值
				this.sendVal = e.detail.value
				
				// console.log('输入完',this.sendVal)
			},
			
	// 调控底部自定义的表情选框
			// input框聚焦
			foc(e){
				// console.log('chart 聚焦')
				//设置键盘抬起的高度
				console.log('e',e.detail.height)
				this.inputBottom = "bottom:" + e.detail.height + 'px'
				// 弹出聊天框
				// this.$refs.popupChart.open()
			},
			blur(){
				// console.log('失焦')
				// 点击页面小键盘关闭，输入框高度调整
				this.inputBottom = "bottom:" + 0 + 'px'
				// this.sendVal = ''
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
				this.inputBottom = "bottom:" + e.detail.height + 'px'
				// this.showHeight = "height:" + val + 'px'
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
			// background-color: red;
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
				// display: flex;
				// align-items: center;
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
