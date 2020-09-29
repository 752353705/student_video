<template>
	<view class="chartRoom">
		<!-- 用户信息交流区域 采用scrollView区域渲染 -->
		<!-- <scroll-view scroll-y="true" 
			:style=scrollviewHigh
			class="scroll"
		> -->
		<!-- bottom="50%" -->
		<mescroll-body class="scroll" ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption" bottom="50%">
			<view v-if="isEnd" class="msg-end">没有更多消息了</view>
			<view class="chartBox">
				<!-- 接收方 在左侧显示 -->
				<view class="chart_left" v-for="(item, index) in chartLeft" :key="index">
					<!-- 接收方头像 -->
					<view class="left_userimg"><image src="" mode=""></image></view>
					<!-- 接收消息显示 -->
					<view class="left_msg">{{ item }}</view>
				</view>

				<!-- 发送方 在右侧显示 -->
				<view class="chart_right" v-for="(item, index) in chartRight" :key="item.id">
					<!-- 发送消息显示 -->
					<view class="right_msg">{{ item.title }}</view>
					<!-- 发送方头像 -->
					<view class="right_userimg"><image :src="rightUserImg" mode=""></image></view>
				</view>
			</view>
		</mescroll-body>
		<!-- </scroll-view> -->

		<!-- 输入框 -->
		<view class="input_box height" :style="inputBottom">
			<!-- 输入框 -->
			<input
				class="uni-input"
				cursor-spacing="10"
				type="text"
				:value="sendVal"
				placeholder="发消息..."
				@input="input"
				@keyboardheightchange="keyWord"
				@confirm="end"
				@blur="blur"
				:adjust-position="false"
				:hold-keyboard="false"
			/>
			<!-- 表情选择框 -->
			<view class="expression border" @click="showExp"><image src="../../static/chartExpress.png" mode="aspectFit"></image></view>
			<!-- 选择图片框 -->
			<view v-if="sendVal.length === 0" class="addImg border" @click="showImg"><image src="../../static/chartAdd.png" mode="aspectFit"></image></view>
			<!-- 发送框 当输入框中有值了 图片按钮消失 显示发送按钮 -->
			<view v-else class="send" @click="send">发送</view>
		</view>

		<!-- 显示选择图片 和 表情  -->
		<!-- 	<view class="choose">
			图片和表情
		</view> -->

		<!-- 弹出框 用户点击添加按钮 可以从相册选取图片 -->
		<!-- <uni-popup :selfMask="selfMask" ref="popupChart" type="share" @change="change">
			<uni-popup-chart title="评论" @select="select"></uni-popup-chart>
		</uni-popup> -->
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { apiMsgList } from '@/API/mock.js';
// 导入 发送图片的弹框
// import uniPopupChart from '../../components/uni-popup/uni-popup-chart.vue'
export default {
	mixins: [MescrollMixin],
	data() {
		return {
			// 监控 websocket 的参数
			isSocketOpen:'',
			
			
			
			// 判断是否显示表情和发送本机图片
			show_exp: false,
			show_img: false,
			// 用户的头像
			rightUserImg: '',

			sendVal: '',
			chartLeft: [],
			chartRight: [],
			scrollviewHigh: '', //滚动区域的高度
			height: 0,
			// 自定义遮罩层
			selfMask: {
				position: 'fixed',
				bottom: 0,
				top: 0,
				left: 0,
				right: 0
			},
			// 控制input框的高度
			inputBottom: '',
			// 控制自定义表情图片的高度
			showHeight: '',

			// 滚动组件
			// downOption: {
			// 	autoShowLoading: true, // 显示下拉刷新的进度条
			// 	minAngle: 70, // 增大触发下拉刷新的角度
			// 	textColor: '#000000' // 下拉刷新的文本颜色
			// },
			upOption: {
				use: false, // 禁止上拉
				toTop: {
					src: '' // 不显示回到顶部按钮
				}
			},
			pageNum: 1, // 页码
			pageSize: 10, // 页长
			isEnd: false, // 是否无消息
			msgList: []
		};
	},
	components: {
		// uniPopupChart
	},
	onLoad(option) {
		console.log('进入聊天界面');
		// this.$refs.popupChart.open()
		// 聊天室，导航栏改变成 聊天对象的名称
		uni.setNavigationBarTitle({
			title: option.uname
		});
		// 获取发送方的头像
		this.rightUserImg = uni.getStorageSync('user_img');

		// 判断两者之间是否进行了 websocket 链接
		// this.chatInit()  //socket相关操作
		
		
	},
	beforeDestroy() {
		clearInterval(this.pingpangTimes)  //清除socket心跳定时器
		uni.closeSocket()  //关闭socket
	},
	onShow() {
		// 当用户进入到聊天界面之后，将tabbar 的角标去掉
		uni.removeTabBarBadge({
			index: 3
		});
	},
	onReady() {
		let _this = this;
		// 动态设计消息滚动区域的高度
		uni.getSystemInfo({
			success(res) {
				_this.phoneHeight = res.windowHeight; //获取用户设备的高度
				// 计算组件的高度
				let view = uni.createSelectorQuery().selectAll('.height');
				view
					.boundingClientRect(data => {
						// 计算上方各元素的高度总和
						data.forEach((item, index) => {
							_this.height += parseInt(item.height);
						});
						_this.scrollviewHigh = _this.phoneHeight - _this.height;
						_this.scrollviewHigh = 'height:' + _this.scrollviewHigh + 'px';
					})
					.exec();
			}
		});
	},
	methods: {
		// 建立 websocket 连接 进行交流沟通
		chatInit() {
			this.api._get('',{},(res)=>{
				uni.closeSocket(); //创建新的socket连接前确保旧的已关闭
				// 在 res 中 返回创建的 wss 连接地址
				// let socketlink = res.data.msg
				//创建一个socket连接
				uni.connectSocket({
					url: socketlink,
					success: res => {}
				});
				//监听socket打开
				uni.onSocketOpen(() => {
					this.isSocketOpen = true;
					console.log('WebSocket连接已打开！');
				});
				//监听socket关闭
				uni.onSocketClose(() => {
					this.isSocketOpen = false;
					console.log('WebSocket连接已关闭！');
				});
				//监听socket错误
				uni.onSocketError(() => {
					this.isSocketOpen = false;
					console.log('WebSocket连接打开失败');
				});
				//监听socket消息
				uni.onSocketMessage(res => {
					let infos = JSON.parse(res.data); //socket信息是字符串，需要先转成json形式再去解析内容
					//后端规定cadmin为0--用户发言，为1--管理员发言，为2--系统提示，为3--需登录，为5--心跳信息
					if (!infos.cadmin) {
						//infos.cadmin不存在说明返回的是数组，说明是第一次获取的之前的所有聊天记录
						this.commentList = this.commentList.concat(infos);
						//设置定时器，到时间后滚动到最底部。使用scroll-view组件的scroll-top属性。
						// 只要scroll-top的值大于滚动区域的最大高度即可实现滚动到最底部
						let scrolltimes = setTimeout(() => {
							this.commentScrollCount = this.commentList.length * 200;
							clearTimeout(scrolltimes);
						}, 600);
				
						//后续每次更新一条有效的新聊天（心跳信息pong不是有效聊天），就会触发这个
					} else if (infos.cadmin == 0 || infos.cadmin == 1 || infos.cadmin == 2) {
						this.commentList = this.commentList.concat(infos);
						let scrolltimes = setTimeout(() => {
							this.commentScrollCount = this.commentList.length * 200;
							clearTimeout(scrolltimes);
						}, 150);
					} else if (infos.cadmin == 3) {
						//未登录
						this.loginPopRemind = '您尚未登录或您的登录已过期，请重新登录后发言';
						uni.removeStorageSync('kusername');
						uni.removeStorageSync('kuserid');
						uni.removeStorageSync('kuserimg');
						uni.removeStorageSync('kusertoken');
						this.$refs.noLoginPopup.open();
					}
				});
				//先确保清除了之前的心跳定时器
				clearInterval(this.pingpangTimes);
				//每过一段时间发送一次心跳，发送Ping,服务器会反馈pong，
				// 这样操作以保持socket一直是连接状态，防止断开连接，心跳停止
				this.pingpangTimes = setInterval(() => {
					uni.sendSocketMessage({
						data: 'ping',
						success: () => {},
						fail: () => {
							this.isSocketOpen = false;
						}
					});
				}, 60000);
			})
		},
		/*下拉刷新的回调 */
		downCallback() {
			// 在这里发起网络请求，用于获取聊天记录
			console.log('进行下拉请求，请求原先的聊天记录');
			//联网加载数据
			apiMsgList(this.pageNum, this.pageSize)
				.then(data => {
					console.log('下拉请求的数据 data ==》', data);
					// 需自行维护页码
					this.pageNum++;
					// 先隐藏下拉刷新的状态
					this.mescroll.endSuccess();
					// 不满一页,说明已经无更多消息 (建议根据您实际接口返回的总页码数,总消息量,是否有消息的字段来判断)
					if (data.length < this.pageSize) {
						this.isEnd = true; // 标记已无更多消息
						this.mescroll.lockDownScroll(true); // 锁定下拉
					}
					// 生成VIEW_ID,大写,避免污染源数据
					data.forEach(val => {
						val.VIEW_ID = 'msg' + val.id; // 不以数字开头
					});
					// 获取当前最顶部的VIEW_ID (注意是写在data.concat前面)
					let topMsg = this.msgList[0];
					//设置列表数据
					console.log('下拉获取数据 data', data, 'this.msgList');
					// 判断是那个用户的消息，将其放入相应的列表
					this.chartRight = data.concat(this.chartRight); // 注意不是this.msgList.concat
					this.msgscroll();
				})
				.catch(() => {
					this.pageNum--; // 联网失败,必须回减页码
					this.mescroll.endErr(); // 隐藏下拉刷新的状态
				});
		},
		// 控制消息页面的滚动
		msgscroll() {
			let topMsg = this.msgList[0];
			// 控制聊天的消息界面的滚动
			this.$nextTick(() => {
				if (this.pageNum <= 2) {
					// 第一页直接滚动到底部 ( this.pageNum已在前面加1 )
					this.mescroll.scrollTo(99999, 0);
				} else if (topMsg) {
					// 保持顶部消息的位置
					let view = uni.createSelectorQuery().select('#' + topMsg.VIEW_ID);
					view
						.boundingClientRect(v => {
							console.log('节点离页面顶部的距离=' + v.top);
							this.mescroll.scrollTo(v.top - 100, 0); // 减去上偏移量100
						})
						.exec();
				}
			});
		},
		// 当进行点击发送之后
		send() {
			console.log('发送消息', this.sendVal);
			// 判断当前 websocket 连接是否正常
			if (this.isSocketOpen) {
				//socket连接正常
				this.commentValue = val;
				// 用户发布的 聊天信息
				this.inputBottom = 0;
				// 将发送方的消息储存到 chartRight
				this.chartRight.push({ title: this.sendVal });
				// 然后清空输入框内容
				this.sendVal = '';
				// 消息界面向上进行滚动
				this.msgscroll();
				// 
				// let theValue = {
				// 	ccontent: this.commentValue
				// };
				let transedValue = JSON.stringify(theValue); //后端规定的评论数据格式:json转字符串
				uni.sendSocketMessage({
					data: transedValue,
					success: () => {
						this.commentValue = '';
						uni.showToast({ title: '发送成功', icon: 'none' });
					},
					fail: () => {
						uni.showToast({ title: '发送失败，请稍后再试或重新进入此页面尝试', icon: 'none' });
					}
				});
			} else {
				//socket已断开
				uni.showToast({ title: '聊天断开啦，请重新进入此页面尝试 ~', icon: 'none' });
			}
		},
		// 当输入框失去焦点之后
		blur() {
			this.inputBottom = 0;
		},
		// 当用户进行输入
		input(e) {
			console.log('用户输入', e.detail.value);
			// 储存用户输入值
			this.sendVal = e.detail.value;
		},
		// 显示表情选择框
		showExp() {
			console.log('显示表情小图案');
			this.show_exp = !this.show_exp;
		},
		// 显示选择图片框
		showImg() {
			console.log('显示 选择本机图片');
			this.show_img = !this.show_img;
			// this.$refs.popupChart.open()
		},
		// 监控键盘高度的变化
		keyWord(e) {
			console.log('键盘高度变化', e.detail.height);
			//设置键盘抬起的高度
			this.inputBottom = 'bottom:' + e.detail.height + 'px';
			this.showHeight = 'height:' + e.detail.height + 'px';
		},
		end(e) {
			console.log('点击完成时触发', e.detail);
		},
		/**
		 * popup 状态发生变化触发
		 * @param {Object} e
		 */
		change(e) {
			console.log('弹窗状态改变', 'popup ' + e.type + ' 状态', e.show);
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
		}
	}
};
</script>

<style lang="less">
.chartRoom {
	// background-color: #f6f6f6;
	// position: fixed;
	// top: 0;
	// left: 0;
	// right: 0;
	// bottom: 0;
	.scroll {
		background-color: red;
		.chartBox {
			// position: sticky;
			// top: 0;
			.chart_right {
				width: 100%;
				box-sizing: border-box;
				padding: 0 20rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin: 40rpx 0;
				.right_msg {
					margin-right: 20rpx;
					background-color: #5d92e2;
					border-radius: 40rpx;
					box-sizing: border-box;
					padding: 10rpx 15rpx;
				}
				.right_userimg {
					width: 80rpx;
					height: 80rpx;
					background-color: yellow;
					border-radius: 50%;
					overflow: hidden;
				}
			}
			.chart_left {
				width: 100%;
				box-sizing: border-box;
				padding: 0 20rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin: 40rpx 0;
				.left_msg {
					margin-left: 20rpx;
					background-color: #5d92e2;
					border-radius: 40rpx;
					box-sizing: border-box;
					padding: 20rpx 15rpx;
				}
				.left_userimg {
					width: 80rpx;
					height: 80rpx;
					background-color: yellow;
					border-radius: 50%;
				}
			}
		}
	}

	.input_box {
		position: fixed;
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
		input {
			width: 60%;
			height: 80%;
			box-sizing: border-box;
			padding-left: 20rpx;
			overflow: visible;
			position: relative;
		}
		input::before {
			content: ' ';
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
		.expression,
		.addImg {
			width: 60rpx;
			height: 60rpx;
			box-sizing: border-box;
			padding: 8rpx;
			border-radius: 50%;
		}
		.send {
			background-color: #5d92e2;
			color: white;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			border-radius: 40rpx;
		}
	}

	// .choose{
	// 	position: absolute;
	// 	bottom: 0;
	// 	width: 100%;
	// 	height: 227px;
	// 	background-color: yellow;
	// }

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
		content: ' ';
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
	image {
		width: 100%;
		height: 100%;
	}
}
</style>
