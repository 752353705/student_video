<template>
	<view class="uni-popup-message">
		<!-- 上传作品 -->	
		<view  class="uni-popup-message-text upload" >
			<view class="uni_head">
				<view class="bg" >
					<view class="tit" >
						上传作品
					</view>
				</view>
			</view>
			
			<!-- 没有视频的时候、 -->
			<view v-if="!video_src"  class="content" @click="getVideo" >
				<!-- 十字图案 -->
				<view class="cross" ></view>
				<view class="con_txt">
					上传视频
				</view>
			</view>
			<!-- 有视频的时候，显示上传视频的第一帧 -->
			<view v-else class="content">
				<!-- <image :src="video_src" mode="aspectFit"></image> -->
				<video :src="video_src" class="video">
				</video>
					<cover-image class="img" @click="clear"  src="../../static/close_video.png" mode=""></cover-image>
			</view>
			
			<textarea :show-confirm-bar="false" name="area" :value="areaVal" class="txt_area" @input='areaInput' placeholder="#输入话题" />
			<view class="btn" @click="submitVideo">
			<!-- <view class="btn" @click="getAddress"> -->
				发布
			</view>
			<!-- 上传进度显示 
				当上传完毕之后，进度环消失
			 -->
			<cCircle v-if="showCir" class="c_circle" :size="60" :percent="percent">
				<span slot="content" style="color: #32CDA5;">{{percent}}%</span>
			</cCircle>
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
			// 判断 是否有上传 视频
			video_src:{
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
				// video_src:'',
				uploader:'',
				videos: [],
				showCir:false,//进度环是否显示
				percent:0,//上传进度环的显示
				
				areaVal:'',//文本域内的文字
				
				// 测试官方的选取视频案例
				title: 'chooseVideo',
				sourceTypeIndex: 2,
				sourceType: ['拍摄', '相册', '拍摄或相册'],
				src: '',
				cameraList: [{
						value: 'back',
						name: '后置摄像头',
						checked: 'true'
					},
					{
						value: 'front',
						name: '前置摄像头'
					},
				],
				cameraIndex: 0
			}
		},
		created() {
			this.popup.childrenMsg = this
		},
		onHide() {
			// console.log('上传组件隐藏',this.$props)
			// this.video_src = ''
		},
		onReady() {
			console.log('push_video 上传组件准备好')
			 var that = this;
			// 构造 上传阿里的方法 
			 var uploader = new VODUpload({
					timeout: 60000,
					region:  "cn-shanghai",
					// 添加文件成功
					addFileSuccess: function (uploadInfo) {
						console.log('添加文件成功')
							console.log("addFileSuccess" + JSON.stringify(uploadInfo))
							// 显示上传视频的封面
							// that.video_src = uploadInfo.coverUrl
					},
					// 开始上传
					onUploadstarted: function (uploadInfo) {
						console.log('文件开始上传...');
						console.log("onUploadStarted:" + JSON.stringify(uploadInfo))
						
						
						
						that._post("vod/vodauth",{
							"title":"标题",
							"fileName":uploadInfo.url,
							"fileSize":uploadInfo.fileSize,
						},function(res){
							console.log('上传视频 res==>',res,"uploadInfo==>",uploadInfo)
							
							if (res.errno === 0) {
								console.log('进行上传1')
									// var akInfo = res.data.data;
									uploader.setUploadAuthAndAddress(uploadInfo, res.data.uploadAuth, res.data.uploadAddress, res.data.videoId);
								console.log('进行上传2')
							} else {
								// console.log('上传视频失败',res)
								uploader.stopUpload();
							}
							
							
						})
						

					},
					// 文件上传成功
					onUploadSucceed: function (uploadInfo) {
							console.log(JSON.stringify(uploadInfo))
							console.log('文件上传成功! ===》uploadInfo',uploadInfo)
							// 发送post请求，发送videoId，与描述
							that._post("vod/add",{
								"videoId":uploadInfo.videoId,
								"conversation":"上传视频描述"
							},function(res){
								console.log('添加视频videoID与conversation',res)
								
								
							})
							
							
					},
					// 文件上传失败
					onUploadFailed: function (uploadInfo, code, message) {
							console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
							console.log('文件上传失败!')
							uploader.stopUpload();
					},
					// 取消文件上传
					onUploadCanceled: function (uploadInfo, code, message) {
							console.log(JSON.stringify(uploadInfo) + code + message)
							console.log('文件已暂停上传!')
							uploader.stopUpload();

					},
					// 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
					onUploadProgress: function (uploadInfo, totalSize, progress) {
							var files;
							
							if (uploadInfo.isImage) {
									files = that.images;
							} else {
									files = that.videos;
							}

							files.forEach((file, idx) => {
									if (file.url === uploadInfo.url) {
											file.progress = progress;
											if (uploadInfo.isImage) {
													// that.setData({
													// 		images: files
													// })
											} else {
													that.videos = files
											}
									}
							})


							// console.log(JSON.stringify(uploadInfo) + "|" + totalSize + "|" + progress)
							// console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
							// var progressPercent = Math.ceil(progress * 100)
							// console.log('文件上传中...' + progressPercent);
							
							// 修改进度环中显示的上传进度
							console.log('文件上传初试进度', progress);
							that.percent = parseInt(progress)
							if(that.percent == 100){
								that.showCir = false
							}
							// $('#sts-progress').text(progressPercent)
							// $('#status').text('文件上传中...')

					},
					// 上传凭证超时
					onUploadTokenExpired: function (uploadInfo) {
						console.log('上传凭证超时')
							// // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
							// // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
							// // 这里是测试接口, 所以我直接获取了 STSToken
							$('#status').text('文件上传超时!')
							
							var stsUrl = 'http://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateSecurityToken?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=67999yyuuuy&AppVersion=1.0.0'
							$.get(stsUrl, function (data) {
							    var info = data.SecurityTokenInfo
							    var accessKeyId = info.AccessKeyId
							    var accessKeySecret = info.AccessKeySecret
							    var secretToken = info.SecurityToken
							    var expiration = info.Expiration
							    uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
							}, 'json')
					},
					// 全部文件上传结束
					onUploadEnd: function (uploadInfo) {
							uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 2000
							})
							console.log("文件上传完毕 onUploadEnd: uploaded all the files")
							// 然后关闭弹窗 清除数据
							that.$emit('changeVideoSrc','')
							that.percent = 0
							that.showCir = false
							that.areaVal =''
							
					}
			});
			 
			 this.uploader = uploader
			
		},
		methods: {
			// 删除当前作品
			clear(){
				console.log('删除当前作品')
				this.$emit('clear')
				
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
	//上传作品
			_getSuffix: function (filename) {
				var pos = filename.lastIndexOf('.')
				var suffix = ''
				if (pos != -1) {
						suffix = filename.substring(++pos)
				}
				return suffix;
			},
			// 获取本地拍摄的作品
			getVideo(){
				console.log('调用接口获取本地视频')
				let _this = this
				// 调用内部接口获取拍摄的视频
				//成功获取本地视频的地址之后，显示视频的第一帧
				uni.chooseVideo({
					camera: _this.cameraList[_this.cameraIndex].value,
					sourceType: ['album'],
					success: (res) => {
						// _this.video_src = res.tempFilePath
						let video = res.tempFilePath
						// console.log('_this.video_src',_this.video_src)
				
						// 进行模拟上传
						var file = {url: res.tempFilePath, coverUrl: res.thumbTempFilePath};
						_this.videos = _this.videos.concat(file)
						var uploader = _this.uploader;
						var userData = '{"Vod":{}}'
						uploader.addFile(file, null, null, null, userData)
						
						this.$emit('changeVideoSrc',video)
						// _this.video_src = video
							
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (_this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取视频，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
				
				// uni.chooseVideo({
				// 		// maxDuration:, //拍摄视频最长拍摄时间
				// 		count: 1,
				// 		sourceType: ['album'],
				// 		compressed:false,
				// 		success: function (res) {
				// 			console.log('调取获取视频接口成功res',res)
				// 			// 视频第一帧  图片
				// 			_this.video_src = res.tempFilePath
				// 			console.log('video_src',_this.video_src)
				// 			// 获取了文件的临时路径，然后对其进行文件的上传
				// 			// let tempFilePath = res.tempFilePath
				// 			// uni.uploadFile({
				// 			// 	url:'',
				// 			// 	filePath:tempFilePath,
				// 			// 	name:'file',
				// 			// 	formData:{
									
				// 			// 	},
				// 			// 	success:(uploadFileRes) => {
				// 			// 		console.log('uni上传视频 成功',uploadFileRes.data)
				// 			// 	}
				// 			// })
							
				// 			var file = {url: res.tempFilePath, coverUrl: res.thumbTempFilePath};
    //             // that.setData({
    //             //     videosCount: videosCount,
    //             //     videos: that.data.videos.concat(file)
    //             // });
				// 				_this.videos = _this.videos.concat(file)

    //             var uploader = _this.uploader;
    //             var userData = '{"Vod":{}}'
    //             uploader.addFile(file, null, null, null, userData)
							
							
				// 			// uni.showToast({
				// 			// 		icon:'none',
				// 			//     title: '上传视频成功',
				// 			//     duration: 2000
				// 			// });
							
				// 		},
						
				// 		fail:function(err){
				// 			uni.showToast({
				// 					icon:'none',
				// 			    title: '上传视频失败',
				// 			    duration: 2000
				// 			});
				// 		},
						
				// });
			},
			// 获取文本域内输入的文字
			areaInput(e){
				console.log('文本域内容',e.detail.value)
				this.areaVal = e.detail.value
			},
			
			//当点击发布之后调取接口 进行作品的上传
			submitVideo(e){
				console.log('上传作品并发布',this.areaVal)
				
				this.$emit('changeVideoSrc')
				
				if(this.$props.video_src){
					//当选好作品之后 显示进度环
					this.showCir = true
				}else{
					uni.showToast({
						title:'请选择上传作品',
						icon:'none'
						
					})
					return
				}
				
				
				
				// 将视频上传到阿里服务器，运用 postVideo
				console.log('获取uploader',this.uploader)
				
				
				// 点击上传
				this.uploader.startUpload();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-message{
		display: flex;
		flex-direction: column;
		align-items: center;
		.uni-popup-message-text{
			width: 639.58rpx;
			height: 821.52rpx;
			background-color:#f9ba59 ;
			font-size: 14px;
			border-radius: 50rpx;
			background-image: linear-gradient(to bottom, #fed353 , #ea9b70);
			position: relative;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: hidden;
			.uni_head{
				box-sizing: border-box;
				width: 80%;
				height: 100rpx;
				color: #822c37;
				font-size: 40rpx;
				font-weight: bolder;
				text-align: center;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				position: relative;
				.bg{
					width: 100%;
					height: 333rpx;
					background-color: #fed353;
					border-radius: 50%;
					position: absolute;
					top: -203rpx;
					box-shadow: 0 8px 5px #e9a631;
					.tit{
						position: absolute;
						bottom:49rpx;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
			.content{
				color: white;
				font-size: 30rpx;
				box-shadow: 8px 4px 4px #e9a631;
				position: relative;
				.video{
					width: 100%;
				}
				.img{
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					top: -12rpx;
					right: -10rpx;
				}
			}
			.btn{
				width: 181.22rpx;
				height: 60.66rpx;
				text-align: center;
				line-height: 60.66rpx;
				background-image: linear-gradient(to bottom, #ef6a25 , #f41c1f);
				border-radius: 40rpx;
				color: #db986e;
				font-size: 36rpx;
				font-weight: bolder;
				margin-top: 40rpx;
			}
		}
		// 上传作品的弹出框
		.upload{
			.content{
				width: 214.58rpx;
				height: 189.58rpx;
				background-image: linear-gradient(to bottom, #fdc453 , #f0ac65);
				margin-top: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 23rpx;
				image{
					width: 100%;
					height: 100%;
				}
				.cross {
				  background: #fa452a;
				  height: 89.58rpx;
				  position: relative;
				  width: 9.88rpx;
				}
				.cross:after {
				 background-color: #fa452a;
				 content: "";
				 height: 9.88rpx;
				 left: -37.77rpx;
				 position: absolute;
				 top: 39.77rpx;
				 width: 89.58rpx;
				}
				.con_txt{
					color: #aa7f5c;
					margin-top: 17rpx;
					font-size: 27rpx;
				}
			}
			.txt_area{
				width: 561.11rpx;
				height: 278.47rpx;
				background-image: linear-gradient(to bottom, #fdc453 , #ea9b70);
				margin-top: 20rpx;
				border-radius: 40rpx;
				box-sizing: border-box;
				padding: 30rpx;
				color: #a77142;
				box-shadow: 8px 4px 4px #e9a631;
			}
			// 进度环
			.c_circle{
				// 绝对定位，位于视频
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
	}
</style>
