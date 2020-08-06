<template>
	<view class="uni-popup-message">
		<!-- 当前可以进行选择的图片个数 -->
		<view class="shownum">
			<text>{{count}}/9</text>
		</view>
		
		<!-- 上传作品 -->	
		<view  class="uni-popup-message-text upload" >
			<view class="uni_head">
				<view class="bg" >
					<view class="tit" >
						上传图文
					</view>
				</view>
			</view>
			
	<!-- 显示选择 -->
			<view class="img_box">
				<!-- 展示选中的图片  -->
				<!-- 展示选中的图片 -->
				<scroll-view  class="scroll-imgcont" scroll-x="true">
					<view class="cont_box" :style="{width:contboxwidth}">
						<view class="content" v-for="(item,index) in images" :key="index">
							<image :src="item.url" mode="aspectFit"></image>
							<image class="img" @click="clear(index)" src="../../static/close_video.png" mode=""></image>
						</view>
						<view v-if=" !(images.length > 8)" class="content" @click="getImg">
							<!-- 十字图案 -->
							<view class="cross"></view>
							<view class="con_txt">
								上传图片
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- <u-upload ref="uUpload" @on-uploaded="onUploaded" :action="action" :auto-upload="false" ></u-upload> -->

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
				// 控制滚动区域距离左侧的距离
				// scrollleft:'100rpx',
				// 控制上传图片时 内容盒子的宽度 使其自由滚动
				contboxwidth:'600rpx',
				
				// 进行上传图片的操作
				options: {},
				files: [],
				images: [],
				count: 0, // 最多可以选择的图片张数
				videos: [],
				
				// 测试上传
				// action: 'http://www.example.com/upload',
				filesArr: [],
				
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
			var that = this;
			
			var uploader = new VODUpload({
			    timeout: that.options.timeout || 60000,
			    region: that.options.region || "cn-shanghai",
			    // 添加文件成功
			    addFileSuccess: function (uploadInfo) {
			        console.log("addFileSuccess" + JSON.stringify(uploadInfo))
			    },
			    // 开始上传
			    onUploadstarted: function (uploadInfo) {
			        console.log('文件开始上传...');
			        console.log("onUploadStarted:" + JSON.stringify(uploadInfo))
			
			        var url;
			        if (uploadInfo.isImage) {
			            url = "https://alivc-demo.aliyuncs.com/demo/getImageUploadAuth?imageType=default&imageExt=" + that._getSuffix(uploadInfo.url) + "&title=title&tags=tags";
			        } else {
			            url = "https://alivc-demo.aliyuncs.com/demo/getVideoUploadAuth?title=" + uploadInfo.url + "&fileName=" + uploadInfo.url + "&fileSize=" + uploadInfo.fileSize + "&description=description&coverURL=" + uploadInfo.coverUrl + "&tags=tags";
			        }
			
			        uni.request({
			            'url': url,
			            success: (res => {
			                if (res.statusCode === 200) {
			                    var akInfo = res.data.data;
			                    uploader.setUploadAuthAndAddress(uploadInfo, akInfo.uploadAuth, akInfo.uploadAddress, akInfo.imageId);
			                } else {
			                    console.log(res)
			                  uploader.stopUpload();
			                }
			            }),
			            fail: (res => {
			                uploader.stopUpload();
			                console.log(res)
			            })
			        });
			
			    },
			    // 文件上传成功
			    onUploadSucceed: function (uploadInfo) {
			        console.log(JSON.stringify(uploadInfo))
			        console.log('文件上传成功!')
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
			                    //     images: files
			                    // })
			                } else {
			                    	that.videos = files
			                }
			            }
			        })
			
			
			        // console.log(JSON.stringify(uploadInfo) + "|" + totalSize + "|" + progress)
			        // // console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
			        // var progressPercent = Math.ceil(progress * 100)
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
			        // // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
			        // // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
			        // // 这里是测试接口, 所以我直接获取了 STSToken
			        // $('#status').text('文件上传超时!')
			        //
			        // var stsUrl = 'http://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateSecurityToken?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=67999yyuuuy&AppVersion=1.0.0'
			        // $.get(stsUrl, function (data) {
			        //     var info = data.SecurityTokenInfo
			        //     var accessKeyId = info.AccessKeyId
			        //     var accessKeySecret = info.AccessKeySecret
			        //     var secretToken = info.SecurityToken
			        //     var expiration = info.Expiration
			        //     uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
			        // }, 'json')
			    },
			    // 全部文件上传结束
			    onUploadEnd: function (uploadInfo) {
			        uni.showToast({
			            title: '上传成功',
			            icon: 'success',
			            duration: 2000
			        })
			        console.log("文件上传完毕 onUploadEnd: uploaded all the files")
							that.$emit('changeVideoSrc','')
							that.percent = 0
							that.showCir = false
							that.areaVal =''
			    }
			});
			
			this.uploader = uploader
			
		},
		methods: {
			// 测试上传
			submit() {
				this.$refs.uUpload.upload();
			},
			onUploaded(lists) {
				this.filesArr = lists;
			},
			
			// 控制滚动区域 向左进行滚动
			
			
			
			
			// 删除当前作品
			clear(index){
				console.log('删除当前作品')
				this.$emit('clear')
				
				console.log('当前作品列表 ==》',this.images)
				
				// 操作数组删除选定的一项
				this.images.splice(index,1)
				// 修改当前 可以进行选择的图片
				this.count = this.images.length
				if( this.count >= 2){
					// 当选中的图片个数大于 2 之后，加宽滚动区域的宽
					console.log('选中图片大于等于2,进行加宽')
					this.contboxwidth = 600 + (this.count + 1) * 130 + 'rpx'
					// 并且 滚动列表 向 做滚动
					
					
					
				}else{
					// 当选中的图片小于 之后 页面的 宽度进行改变
					console.log('选中图片不大于2')
					this.contboxwidth = 600 + 'rpx'
				}
				console.log('删除操作之后的作品列表 ==》',this.images)
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
			getImg(){
				console.log('调用接口获取本地图片')
				
				
				
				
				// 调用内部接口获取拍摄的视频
				//成功获取本地视频的地址之后，显示视频的第一帧
				var that = this;
				var count = that.count; // 最多可以选择的图片张数
				uni.chooseImage({
				    count: count, // 最多可以选择的图片张数
				    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				    success: function (res) {
				
				        var length = res.tempFilePaths.length; // 获取本次选择图片的数量
								// console.log('选取图片的数量 length==》',length)
				        that.count += length;
								// console.log('还可以选择选取图片的数量 count==》',that.count)
								// 判断当前获取了几张图片然后动态的改变 contboxwidth滚动区域的宽，并且使其向右滚动
								if( that.count >= 2){
									// 当选中的图片个数大于 2 之后，加宽滚动区域的宽
									console.log('选中图片大于等于2,进行加宽')
									that.contboxwidth = 600 + (that.count + 1) * 130 + 'rpx'
									// 并且 滚动列表 向 做滚动
									
									
									
								}else{
									// 当选中的图片小于 之后 页面的 宽度进行改变
									console.log('选中图片不大于2')
									
								}
								
				        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
								
								
								// console.log('获取图片',res)
								
				        res.tempFilePaths.forEach(item => {
				            that.images = that.images.concat({'url': item})
				        });
								
								// console.log('获取图片',that.images)
				        // that.setData({
				        //     count: count,
				        //     images: that.data.images
				        // });
				
				        that.images.forEach(item => {
				            var uploader = that.uploader;
				            var userData = '{"Vod":{}}';
				            uploader.addFile(item, null, null, null, userData)
				        })
				    }
				})
				
				
				// console.log('当前的图片个数 count ===》',that.count)
				
				
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
				
				if(this.images.length !== 0){
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
		overflow: auto;
		position: relative;
		// 显示还能够选择多少张图片
		.shownum{
			position: absolute;
			top:68rpx;
			right: 27rpx;
			// background-color: red;
			z-index: 50;
			width: 65rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			// background-image: linear-gradient(to bottom, #fed353 , #ea5c1a);
			border-radius: 16rpx;
		}
		
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
			
			
			
			// 上传作品的样式
			// 头部
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
			
			
			.img_box{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-evenly;
				
				.scroll-imgcont{
					// box-sizing: border-box;
					// background-color: red;
					// padding-top: 50rpx;
					height: 217.58rpx;
					// white-space: nowrap;
					// flex-wrap: nowrap;
					// display: flex;
					// align-items: center;
					// position: relative;
					.cont_box{
						// width:1000rpx;
						display:flex;
						align-items: center;
						justify-content: start;
						.content{
							// margin: auto;
							margin-top: 50rpx;
							color: white;
							font-size: 30rpx;
							box-shadow: 8px 4px 4px #e9a631;
							position: relative;
							// top: 50%;
							// left: 200rpx;
							// transform: translateY(-50%);
							
							width: 195.58rpx;
							height: 164.58rpx;
							background-image: linear-gradient(to bottom, #fdc453 , #f0ac65);
							text-align: center;
							margin-left: 20rpx;
							// display: inline-block;
							display: flex;
							
							flex-direction: column;
							justify-content: center;
							align-items: center;
							border-radius: 23rpx;
							
							image{
								width: 100%;
								height: 100%;
							}
							
							// 上传的十字图案
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
							.img{
								position: absolute;
								width: 40rpx;
								height: 40rpx;
								top: 3rpx;
								right: -16rpx;
							}
						}
					}
					
					.contimg{
						display: inline-block;
					}
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
			// 上传作品说些内容区
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
