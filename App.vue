<script>
	export default {
		data(){
			return {
				timeout:60000,//一分钟
				timeoutobj:null
			}
		},
		onLaunch: function() {
			// 小程序强制更新
			console.log('小程序进行强制更新')
			const updateManager = uni.getUpdateManager();
			
			updateManager.onCheckForUpdate(function (res) {
			  // 请求完新版本信息的回调
			  console.log('版本是否需要进行更新',res.hasUpdate);
			});
			
			updateManager.onUpdateReady(function (res) {
				//进行强制更新
				updateManager.applyUpdate();
			});
			
			updateManager.onUpdateFailed(function (res) {
			  // 新的版本下载失败
				uni.showToast({
				    title: '小程序更新失败',
				    duration: 2000
				});
			});
			
			// 进行webSocket链接，
				//判断是否已经进行了链接
				this.checkOpenSocket(); 
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			// 判断是否进行了链接
			checkOpenSocket () {
				let self = this;
				uni.sendSocketMessage({
					data: 'ping',
					 success: (res) => {
						return;
					},
					fail: (err) => { // 未连接打开websocket连接
						self.openConnection(); 
					}
				});
			},
			// 打开链接
			openConnection () { // 打开连接
				uni.closeSocket(); // 确保已经关闭后再重新打开
				uni.connectSocket({
					url: this.$SOCKTURL,
					method: 'POST',
					success(res) {
						console.log('连接成功 connectSocket=', res);
					},
					fail(err) {
						console.log('连接失败 connectSocket=', err);
					}
				});
				uni.onSocketOpen((res) => {
					console.log('连接成功', res);
				});
				this.onSocketMessage(2); // 打开成功监听服务器返回的消息
			},
			// 打开成功监听服务器返回的消息
			onSocketMessage (type = 1) { // 消息
				this.timeout = 60000;
				this.timeoutObj = null;
				uni.onSocketMessage((res) => {
					let giveMsg = res.data;
					// 后台绑定client_id
					if (giveMsg) {
						let msg = JSON.parse(giveMsg);
						if (msg.type ===  'init' && type === 2) {
							let clientId =  msg.client_id;
							let userId = uni.getStorageSync('userInfo');
							let para = {client_id: clientId, userId : userId  };
							uni.request({ // 前端用户跟服务器进行绑定
								url:  `htpp:/localhost:8080/v2/conference/user_binding'`,
								data: para,
							success: (res) => { // 绑定成功
								if (res.statusCode === 200) {
								this.reset(); // // 检测心跳reset,防止长时间连接导致连接关闭
								}
						}
					 });
					
							this.$API.get('conference/gateway_user_binding', para, 3).then(res => {
								if (res.status === 1) { // 绑定成功
									this.reset();
								} else if (res.status === 0) {
									console.log(res.errors[0]);
								}
							});
						}
					}
					this.getSocketMsg(res.data); // 监听到有新服务器消息
				});
			},
			// 监听到有新服务器消息
			getSocketMsg (reData) { // 监听到服务器消息
				console.log('监听到服务器消息 reData=', reData);
				let info = JSON.parse(reData);
				if (info.type  === 'notice') {
					console.log(info);
					 let options = {cover: false, title: info.time};
					 // #ifdef APP-PLUS
						plus.push.createMessage(info.content, info, options); // 弹出到状态栏中
					 // #endif
				 }	 
				console.log('app onMessage=', reData)
			},
			// 检测心跳reset
			reset () {
				clearInterval(this.timeoutObj);
				this.start(); // 启动心跳
			},
			// 启动心跳 start 
			start () {
				let self = this;
				this.timeoutObj = setInterval(function(){
					uni.sendSocketMessage({
						data: 'ping',
						 success: (res) => {
							console.log('连接中....');
						},
						fail: (err) => {
							console.log('连接失败重新连接....');
							self.openConnection();
						}
					});
				}, this.timeout);
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	.html,.body{
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	.t_c{
		text-align: center;
	}
	image{will-change: transform}
	// 隐藏滚动条
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
</style>
