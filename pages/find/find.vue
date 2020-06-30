<template>
	<view>
		<view class="find">
		  <view class="search">
		    <view class="left">
		    	<input type="text" :value="val" 
						placeholder="请搜索选手ID" @input="searchVal" 
						
						@focus="showHistory" @blur="noneHistory" 
					/>
		    	<image src="/static/search.png" mode=""></image>
		    </view>
				<view class="searchBtn" @click="search">
					搜索
				</view>
		  </view>
			
			<view class="his_box" v-if="showHis">
				<!-- 历史记录 -->
				<view class="title">历史记录</view>
				
				<!-- 循环用户本地储存的搜索记录 -->
				<view class="his_list">
					<view class="his_item" :data-val="item" v-for="(item,index) in  history" :key="index"  @click="search">
						{{item}}
					</view>
				</view>
			</view>
			
			<!-- 显示搜索的视频 -->
				<!-- 引入瀑布流组件 -->
				<view class="box">
					<scroll-view class="list"
						:style=scrollviewHigh
						scroll-y="true" 
						enable-flex="true"
						lower-threshold="160"
						@scrolltolower="lower"
						
						
					>
						<!-- 制作瀑布流 -->
						<wfalls-flow class="waterFull" :list="list" ref="wfalls" @finishLoad="getLoadNum"></wfalls-flow>
					</scroll-view>
				</view>
		 
			
		</view>
		
		<!-- 投票弹出框 -->
		<uni-popup class="pop" animation="false" ref="popup" type="center" mask-click="false">
			<uni-popup-message type="success" pop_type="ticket" message="成功消息" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
		<!-- 底部导航栏 -->
		<!-- <tabbar :active="f_active"></tabbar> -->
	</view>
	
</template>

<script>
	import wfallsFlow from '../../components/wfallsflow.vue'
		const list = require('../../static/data.json').list;
	export default {
		data() {
			return {
				f_active:1,
				// 用户信息
				user_name:'沈博然',
				user_id:13214816,
				// 视频
				src: '',
				danmuList: [{
								text: '第 1s 出现的弹幕',
								color: '#ff0000',
								time: 1
						},
						{
								text: '第 3s 出现的弹幕',
								color: '#ff00ff',
								time: 3
						}
				],
				danmuValue: '',
				// 票数
				see_num:27534,
				say_num:17928,
				//历史记录
				history:[],
				showHis:false,
				val:'',
				// 瀑布流
				list:[],
				scrollviewHigh:'',
				height:0
			};
		},
		components:{
			wfallsFlow
		},
		onLoad(){
			// this.$refs.popup.open()
			// 设置本地存储进行存储用户的历史记录
			
			// 瀑布流
			setTimeout(()=>{
			    this.list = list;
			    this.$refs.wfalls.init();
			},1000)
			
		},
		onReady: function(res) {
			// // #ifndef MP-ALIPAY
			// this.videoContext = uni.createVideoContext('myVideo')
			// // #endif
			let _this = this
			// 动态设置滚动区域的高度
			uni.getSystemInfo({
				success(res) {
					console.log('页面信息res',res)
						_this.phoneHeight = res.windowHeight; //获取用户设备的高度
						console.log(res.windowHeight);
						// 计算组件的高度
							let view = uni.createSelectorQuery().select('.search');
						view.boundingClientRect(data => {
							// 计算上方各元素的高度总和
							// data.forEach((item,index) => {
							// 	console.log('item',item.height)
							// 	_this.height += parseInt(item.height)
							// })
							console.log('高度 data',data)
							_this.height = data.height
							// 	console.log('高度',_this.height);
								_this.scrollviewHigh =  _this.phoneHeight - _this.height - 30;
								_this.scrollviewHigh = "height:" + _this.scrollviewHigh +"px";
								
						}).exec();
				}
			});
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
		},
		onReachBottom() {
			console.log('上拉 触底 加载') //分页 请求数据
			
		},
		methods:{
			// 是否显示历史记录
			showHistory(){
				if(this.history.length === 0) return
				this.showHis = true
			},
			noneHistory(){
				this.showHis = false
			},
			searchVal(e){
				this.val = e.detail.value;  
			},
			// 向后台传递搜索的关键词
			search(e){
				let _this = this
				// console.log('向后端传递数据 e',e.target.dataset.val)
				//判断是点击历史记录来进行搜索的还是通过输入来进行的
				if(e.target.dataset.val){
					console.log('点击的历史记录',e.target.dataset.val)
					// 点击的历史记录
					
				}else{
					if(this.val === '' || !this.val.trim()) return
					
					console.log('点击的搜索按钮',this.val)
					// 点击的搜索按钮
					
					// 请求成功后向瀑布流中传值
					
					// 搜索成功之后将搜索记录放到本地存储中
					this.history.push(this.val)
					// 对历史记录中进行去重
					this.history = [...new Set(this.history)]
					uni.setStorage({
						key:'storHisVal',
						data:JSON.stringify(_this.history),
						success:function(){
							console.log('存储成功')
						}
					})
					
				}
				
				
				
				
			},
			
			// 将后端传送回来的数据传递给瀑布流组件
			
			
			// 制作瀑布流
			getLoadNum(num){
				console.log('共加载了:'+num);
				!this.isNewRenderDone&&uni.hideLoading()
				this.isNewRenderDone = true
			},
			lower(){
				console.log('滚动到底部 ')
				//进行重新请求用户的数据
				// 模拟触底刷新
				console.log('onReachBottom');
				// 加锁，避免在加载更多时用户频繁下拉导致的重复触发而渲染异常
				if(!this.isNewRenderDone) return;   
				this.isNewRenderDone = false
				uni.showLoading({title:'正在加载更多'})
				// 模拟分页请求 (加载更多)
				setTimeout(()=>{
				    const nextData = JSON.parse(JSON.stringify(this.list.slice(0,10)))
				    this.list.push(...nextData);
				    // this.$nextTick(()=>{
				    //     this.$refs.wfalls.handleViewRender();
				    // })
				    // APP上触发不了还是setTimeout万能
				    setTimeout(()=>{
				        this.$refs.wfalls.handleViewRender();
				    },0)
				},800)
				
			},
			
			// 点击进入播放页面
			goPlayVideo(){
				uni.navigateTo({
					url: "/pages/playVideo/playVideo"
				})
			},
			
			// 控制弹窗
			open(){
				// 先判断用户是否一金进行了登录
				// 如果没有则先进行登录再进行敏感操作
				console.log('用户是否已经登录')
				
				
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			
			// 控制视频组件
		 sendDanmu: function() {
				console.log('sendDanmu')
				this.videoContext.sendDanmu({
						text: this.danmuValue,
						color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				console.log('videoErrorCallback')
				console.log('err',e.target.errMsg)
					uni.showModal({
							content: e.target.errMsg,
							showCancel: false
					})
			},
			getRandomColor: function() {
					console.log('getRandomColor')
					const rgb = []
					for (let i = 0; i < 3; ++i) {
							let color = Math.floor(Math.random() * 256).toString(16)
							color = color.length == 1 ? '0' + color : color
							rgb.push(color)
					}
					return '#' + rgb.join('')
			},
			fillScreen(){
				console.log('满屏显示')
				// 获取 video 上下文 videoContext 对象
				this.videoContext = uni.createVideoContext('myVideo');
				// 进入全屏状态
				this.videoContext.requestFullScreen({direction:0});
			}
		}
	}
</script>

<style lang="less">
.pop{
	.imgBox{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.img{
			width: 62.5rpx;
			height: 62.5rpx;
			margin-top: 20rpx;
		}
	}
}
.find{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	// background-color: #0d0737;
	box-sizing: border-box;
	padding: 33rpx 11.5rpx 0;
	color: white;
	.search{
		color: black;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 19rpx;
		.left{
			background-color:#f5f5f5 ;
			border-radius: 20rpx;
			width: 85%;
			input{
				width: 70%;
				height: 70rpx;
				display: inline-block;
				
			}
			image{
				width: 40rpx;
				height:40rpx ;
				float: left;
				transform: translateY(45%);
				margin-right: 12rpx;
				margin-left: 10rpx;
			}
		}
		
		.searchBtn{
			color: black;
		}
	}
	
	.his_box{
		position: absolute;
		z-index: 10;
		// top: 113rpx;
		width: 100%;
		background-color: gray;
		opacity: 0.8;
		border-radius: 0 0 50rpx 50rpx;
		color: black;
		.title{
			font-size: 29rpx;
			margin-top: 20rpx;
		}
		
		.his_list{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin-bottom: 20rpx;
			.his_item{
				padding: 9rpx;
				border-radius: 20rpx;
				border: 1rpx solid white;
				margin-left: 19rpx;
				margin-top: 34rpx;
				margin-right: 19rpx;
			}
		}
	}
	
	// .box{
	// 	background-color: #0d0737;
	// 	width: 100%;
	// 	height: 100%;
	// 	.list{				
	// 		position: relative;
	// 	  display: flex;
	// 	  justify-content: space-between;
	// 	  flex-wrap: wrap;
	// 		height: 500rpx;
	// 		.waterFull{
	// 			position: absolute;
	// 			width: 100%;
	// 		}
	// 	}
	// }
}
</style>
