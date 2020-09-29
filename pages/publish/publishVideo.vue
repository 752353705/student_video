<template>
	<view class="pvid">
		<!-- 上传作品 -->	
		<view  class="main upload" >
			<!-- 视频相关描述 -->
			<textarea  :show-confirm-bar="false" name="area" :value="areaVal" 
				class="txt_area" @input='areaInput' 
				placeholder="视频简介" 
				maxlength="50"
				/>
				
				<!-- 用户进行选择视频的封面 -->
				<!-- <view class="tit">选择最靓的视频封面吧</view> -->
				 <view class="tit" style="color:#8d8696 ;" >选择最靓的封面吧(未进行选择默认第一帧做封面)</view>
				<!-- 没有封面的时候 -->
				<view v-if="!VImg" class="content coverImg" @click="getVImg" >
					<!-- 十字图案 -->
					<view class="cross" ></view>
				</view>
				<view v-else class="content">
					<image :src="VImg" class="video" />
					<cover-image class="img" @click="clear(1)"  src="../../static/close_video.png" mode=""></cover-image>
				</view>
				
			<!-- 没有视频的时候、 -->
			<view v-if="!video_src"  class="content" @click="getVideo" >
				<!-- 十字图案 -->
				<view class="cross" ></view>
			</view>
			<!-- 有视频的时候，显示上传视频的第一帧 -->
			<view v-else class="content">
				<video :src="video_src" class="video">
				</video>
					<cover-image class="img" @click="clear(2)"  src="../../static/close_video.png" mode=""></cover-image>
			</view>
			
			<view class="btn" @click="submitVideo">
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
	import VODUpload from '../../components/aliyun-upload-sdk-1.0.0.min.js'
	export default {
		data() {
			return {
				//视频封面
				 VImg:'',
				
				
				video_src:'',
				uploader:'',
				videos: [],
				showCir:false,//进度环是否显示
				percent:0,//上传进度环的显示
				
				areaVal:'',//文本域内的文字
				
				// 测试官方的选取视频案例
				// title: 'chooseVideo',
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
		onLoad(option) {
			// 当用户是进行 视频修改的时候
			
			// 根据用户传递过来的 id 发起请求获取 当前视频的信息
			
			
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
					},
					// 开始上传
					onUploadstarted: function (uploadInfo) {
						console.log('文件开始上传...');
						console.log("onUploadStarted:" + JSON.stringify(uploadInfo))
						
						
						
						that.api._post("vod/vodauth",{
							"title":that.areaVal,
							"fileName":uploadInfo.url,
							"fileSize":uploadInfo.fileSize,
						},function(res){
							console.log('上传视频 res==>',res,"uploadInfo==>",uploadInfo)
							
							if (res.errno === 0) {
								console.log('进行上传1')
									// var akInfo = res.data.data;
									uploader.setUploadAuthAndAddress(uploadInfo, res.data.uploadAuth, res.data.uploadAddress, res.data.videoId);
									
									that.showCir = true
									
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
							that.api._post("vod/add",{
								"videoId":uploadInfo.videoId,
								"conversation":that.areaVal
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
							// if(that.percent == 100){
								
							// }
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
							that.showCir = false
							uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 2000
							})
							console.log("文件上传完毕 onUploadEnd: uploaded all the files")
							// 然后关闭弹窗 清除数据
							// that.$emit('changeVideoSrc','')
							// this.video_src = '';
							that.percent = 0
							that.showCir = false
							that.areaVal =''
							
					}
			});
			 
			 this.uploader = uploader
			
		},
		methods: {
			// 当前用户进行视频封面的选择
			getVImg(){
				// console.log('调用接口获取本地图片');
				// 调用内部接口获取拍摄的视频
				//成功获取本地视频的地址之后，显示视频的第一帧
				var that = this;
				uni.chooseImage({
					count: 1, // 最多可以选择的图片张数
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						// 判断所选图片 每张不能超过 1 M
						console.log('选择的图片', res);
						res.tempFiles.forEach((item, index) => {
							if (item.size > 1024 * 1024) {
								uni.showToast({
									title: '封面图片大小超过1m,请重新选择',
									icon: 'none'
								});
							}
						});
				
						// 将选择的 图片本地地址进行存储
						res.tempFilePaths.forEach(item => {
							that.VImg = item
						});
					}
				});
			},
			
			// 删除当前作品
			clear(num){
				console.log('删除当前作品')
				// this.$emit('clear')
				if(num == 1){
					// 用户删除封面图
					this.VImg = ''
				}else{
					// 用户删除视频
					this.video_src = ''
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
						let video = res.tempFilePath
				
						// 进行模拟上传
						var file = {url: res.tempFilePath, coverUrl: res.thumbTempFilePath};
						_this.videos = _this.videos.concat(file)
						var uploader = _this.uploader;
						var userData = '{"Vod":{}}'
						uploader.addFile(file, null, null, null, userData)
						
						// this.$emit('changeVideoSrc',video)
						this.video_src = video
							
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
			},
			// 获取文本域内输入的文字
			areaInput(e){
				// console.log('文本域内容',e.detail.value)
				this.areaVal = e.detail.value
			},
			
			//当点击发布之后调取接口 进行作品的上传
			submitVideo(e){
				console.log('上传作品并发布',this.areaVal)
				
				// 获取当前视频的封面
				
				// this.$emit('changeVideoSrc')
				
				if(!this.video_src){
					//当选好作品之后 显示进度环
					// this.showCir = true
				// }else{
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
	.pvid{
		box-sizing: border-box;
		padding: 20px 20px;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.main{
			width: 100%;
			height: 100%;
			font-size: 14px;
			border-radius: 50rpx;
			position: relative;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			// 文本域
			.txt_area{
				width: 100%;
				background-color: #f2f2f2;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 30rpx;
			}
			.content{
				color: white;
				font-size: 30rpx;
				position: relative;
				width: 214.58rpx;
				height: 189.58rpx;
				background-color: #f2f2f2;
				margin-top: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 23rpx;
				
				.video{
					width: 100%;
				}
				// 删除按钮
				.img{
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					top: -12rpx;
					right: -10rpx;
				}
			}
			// 封面提示
			.tit{
				margin-top: 25px;
			}
			// 视频封面
			.coverImg{
				margin-top: 10px;
			}
			
			// 底部按钮
			.btn{
				width: 260.22rpx;
				height: 83.66rpx;
				text-align: center;
				line-height: 83.66rpx;
				background-color: #fe2c53;
				border-radius: 40rpx;
				color: white;
				font-size: 36rpx;
				font-weight: bolder;
				position: fixed;
				bottom: 72px;
				left: 50%;
				transform: translateX(-50%);
			}
			// 进度环
			.c_circle{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
	}
	// 十字图案
	.cross {
	  background: #888888;
	  height: 89.58rpx;
	  position: relative;
	  width: 9.88rpx;
	}
	.cross:after {
	 background-color: #888888;
	 content: "";
	 height: 9.88rpx;
	 left: -37.77rpx;
	 position: absolute;
	 top: 39.77rpx;
	 width: 89.58rpx;
	}
</style>
