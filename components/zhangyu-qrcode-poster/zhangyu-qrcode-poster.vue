<template>
	<view class="content" v-if="isShow" @click.stop="isShow=false">
		<canvas @click.stop="" :style="{ width: canvasW + 'px', height: canvasH + 'px' }" canvas-id="my-canvas"></canvas>
		<view v-if="canvasW" class="save-btn" @click.stop="saveImage">
			保存图片并发布
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			headerImg:{
				type: String,
				// default: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3544005106,2960177055&fm=26&gp=0.jpg' //默认的图片
				default: '' //默认的图片
			},
			title:{
				type: String,
				default: '草莓千层蛋糕'
			},
			subTitle:{
				type: String,
				default: '鲜嫩多汁的草莓融合香甜奶油'
			},
			price:{
				type: Number,
				default: 36.89
			},
			abImg:{
				type: String,
				default: 'https://oss.zhangyubk.com/bottomab.png'
			}
		},
		data(){
			return {
				canvasW: 0,
				canvasH: 0,
				ctx: null,
				isShow: false,
				qrcode: ''
			}
		},
		methods:{
			// 在画布中绘制多行文本
			/**
				* str:要绘制的字符串
				*canvas:canvas对象
				*initX:绘制字符串起始x坐标
				*initY:绘制字符串起始y坐标
				*lineHeight:字行高，自己定义个值即可
				*maxWidth: 文本最大宽度
				*row: 最大行数
			 * */
				canvasTextAutoLine(str, ctx, initX, initY, style, font, lineHeight, maxWidth, row) {
					var lineWidth = 0;
					var lastSubStrIndex = 0;
					ctx.setFontSize(font);
					ctx.setFillStyle(style);
					ctx.setTextAlign("left");
					var currentRow = 1;
					maxWidth = Math.ceil(maxWidth);
					for (let i = 0; i < str.length; i++) {
						lineWidth += ctx.measureText(str[i]).width;
						if (lineWidth > maxWidth) {
							currentRow++;
							let newStr = str.substring(lastSubStrIndex, i + 1)
							if (currentRow > row && str.length > i) {
								newStr = str.substring(lastSubStrIndex, i - 2) + '...'
							}
							ctx.fillText(newStr, initX, initY);
							initY += lineHeight;
							lineWidth = 0;
							lastSubStrIndex = i + 1;
							if (currentRow > row) {
								break;
							}
						}
						if (i == str.length - 1) {
							ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
						}
					}
				},
			//显示
			showCanvas(qrcode){
				this.isShow = true
				this.qrcode = qrcode
				this.__init()
			},
			//初始化画布
			async __init(){
				uni.showLoading({
				    title: '加载中...',
					mask: true
				})
				this.ctx = uni.createCanvasContext('my-canvas',this)
				//设置画布背景透明
				this.ctx.setFillStyle('rgba(255, 255, 255, 0)')
				//设置画布大小
				this.canvasW = uni.upx2px(550);
				this.canvasH = uni.upx2px(600);
				this.ctx.fillRect(0,0,this.canvasW,this.canvasH)
				//绘制圆角背景
				this.drawRoundRect(this.ctx, 0, 0, this.canvasW, this.canvasH,uni.upx2px(18),'#FFFFFF')
				
				//获取标题图片  ==>  换成视频当前的截图
				let headerImg = await this.getImageInfo(this.headerImg)
				let hW = uni.upx2px(430);
				let hH = uni.upx2px(430);
			//绘制标题图   ==》 绘制 视频 封面图
				this.drawRoundImg(this.ctx,headerImg.path,((this.canvasW-hW) / 2),((this.canvasW-hW) / 2),hW,hH,uni.upx2px(16))
			//绘制标题  ==》 绘制 视频 的简介说明
				// this.ctx.setFontSize(14); //设置标题字体大小
				// this.ctx.setFillStyle('#000000'); //设置标题文本颜色
				// this.ctx.fillText('当前视频的简介展示介展示介展示介展示介展示介展示展示介展示展示介展示展示介展示',((this.canvasW-hW) / 2),(
				// ((this.canvasW-hW) / 2) + hH + uni.upx2px(60)),hW )
				// (str, ctx, initX, initY, style, font, lineHeight, maxWidth, row)
				this.canvasTextAutoLine(
					'长按关注公众号，进行充值',
					this.ctx,((this.canvasW-hW) / 2),(((this.canvasW-hW) / 2) + hH + uni.upx2px(60)),'#000000',
					14,20,hW,3
				)
				//绘制副标题
				// this.ctx.setFontSize(14);
				// this.ctx.setFillStyle('#858585');
				// let sWidth = this.ctx.measureText(this.subTitle).width
				// if(sWidth > hW){
				// 	this.ctx.fillText(this.subTitle.slice(0,17) + '...',((this.canvasW-hW) / 2),(
				// 	((this.canvasW-hW) / 2) + hH + uni.upx2px(110)))
				// }else{
				// 	this.ctx.fillText(this.subTitle,((this.canvasW-hW) / 2),(
				// 	((this.canvasW-hW) / 2) + hH + uni.upx2px(110)))
				// }
				//绘制价格
				// this.ctx.setFontSize(14);
				// this.ctx.setFillStyle('#f54545');
				// this.ctx.fillText('￥',((this.canvasW-hW) / 2),(
				// ((this.canvasW-hW) / 2) + hH + uni.upx2px(180)))
				// this.ctx.setFontSize(18);
				// this.ctx.fillText(this.price,(((this.canvasW-hW) / 2) + uni.upx2px(36)),(
				// ((this.canvasW-hW) / 2) + hH + uni.upx2px(180)))
				//绘制虚线
				// this.drawDashLine(this.ctx,uni.upx2px(20),(((this.canvasW-hW) / 2) + hH + uni.upx2px(240)) - 25,(this.canvasW-uni.upx2px(20)),(((this.canvasW-hW) / 2) + hH + uni.upx2px(240)) - 25,5)
				//左边实心圆
				// this.drawEmptyRound(this.ctx,0,(((this.canvasW-hW) / 2) + hH + uni.upx2px(240)) - 25,uni.upx2px(20))
				//右边实心圆
				// this.drawEmptyRound(this.ctx,this.canvasW,(((this.canvasW-hW) / 2) + hH + uni.upx2px(240)) - 25,uni.upx2px(20))
				//提示文案
				// this.ctx.setFontSize(12);
				// this.ctx.setFillStyle('#858585');
				// this.ctx.fillText(
				// 	// '长按识别图中"学声汇"小程序',
				// 	(((this.canvasW-hW) / 2) + uni.upx2px(34)),
				// 	(((this.canvasW-hW) / 2) + hH + uni.upx2px(300))
				// )
				//底部广告
				// let BottomAdImg = await this.getImageInfo(this.abImg)
				// this.ctx.drawImage(BottomAdImg.path,(((this.canvasW-hW) / 2)),(((this.canvasW-hW) / 2) + hH + uni.upx2px(310)),uni.upx2px(350),uni.upx2px(110))
				// //小程序码
				// let qrcodeImg = await this.getImageInfo(this.qrcode)
				// console.log('小程序码',qrcodeImg)                               //   Y 坐标
				// this.ctx.drawImage(qrcodeImg.path,uni.upx2px(384) ,(((this.canvasW-hW) / 2) + hH + uni.upx2px(264)) - 20, uni.upx2px(156), uni.upx2px(156))
				// //延迟渲染
				setTimeout(()=>{
					this.ctx.draw(true,()=>{
						uni.hideLoading()
						
						// 然后关闭分享的弹窗
						this.$emit("close")
					})
				},500)
			},
			//绘制实心圆
			drawEmptyRound(ctx,x,y,radius){
				ctx.save()
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI,true);
				ctx.setFillStyle('rgba(0, 0, 0, .4)')
				ctx.fill();
				ctx.restore()
				ctx.closePath()
			},
			//绘制虚线
			drawDashLine(ctx,x1,y1,x2,y2,dashLength){
				ctx.setStrokeStyle("#cccccc")//设置线条的颜色
				ctx.setLineWidth(1)//设置线条宽度
				var dashLen = dashLength,
				xpos = x2 - x1, //得到横向的宽度;
				ypos = y2 - y1, //得到纵向的高度;
				numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen); 
				//利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
				for(var i=0; i<numDashes; i++){
				 if(i % 2 === 0){
					 ctx.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i); 
					 //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
				  }else{
					  ctx.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
				  }
				}
				ctx.stroke();
			},
			//带圆角图片
			drawRoundImg(ctx, img, x, y, width, height, radius){
				ctx.beginPath()
				ctx.save()
				// 左上角
				ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
				// 右上角
				ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2)
				// 右下角
				ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5)
				// 左下角
				ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI)
				ctx.stroke()
				ctx.clip()
				ctx.drawImage(img, x, y, width, height);
				ctx.restore()
				ctx.closePath()
			},
			//圆角矩形
			drawRoundRect(ctx, x, y, width, height, radius, color){
				ctx.save();
				ctx.beginPath();
				ctx.setFillStyle(color); 
				ctx.setStrokeStyle(color)
				ctx.setLineJoin('round');  //交点设置成圆角
				ctx.setLineWidth(radius);
				ctx.strokeRect(x + radius/2, y + radius/2, width - radius , height - radius );
				ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
				ctx.stroke();
				ctx.closePath();
			},
			//获取图片
			getImageInfo(imgSrc){
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						success: (image) => {
							resolve(image);
							console.log('获取图片成功',image)
						},
						fail: (err) => {
							reject(err);
							console.log('获取图片失败',err)
						}
					});
				});
			},
			//保存图片到相册
			saveImage(){
				//判断用户授权
				uni.getSetting({
				   success(res) {
				      console.log('获取用户权限',res.authSetting)
					  if(Object.keys(res.authSetting).length>0){
						  //判断是否有相册权限
						  if(res.authSetting['scope.writePhotosAlbum']==undefined){
							  //打开设置权限
							  uni.openSetting({
							    success(res) {
							      console.log('设置权限',res.authSetting)
							    }
							  })
						  }else{
							  if(!res.authSetting['scope.writePhotosAlbum']){
								  //打开设置权限
								  uni.openSetting({
								    success(res) {
								      console.log('设置权限',res.authSetting)
								    }
								  })
							  }
						  }
					  }else{
						  return
					  }
				   }
				})
				var that = this
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					quality: 1,
					complete: (res) => {
						console.log('保存到相册',res);
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
								setTimeout(()=>{
									that.isShow = false
								},2000)
							}
						})
					}
				},this);
			}
		}
	}
</script>

<style scoped lang="scss">
.content{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.4);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 20;
	.save-btn{
		margin-top: 35rpx;
		color: #FFFFFF;
		background: linear-gradient(to right, #FE726B , #FE956B);
		padding: 15rpx 40rpx;
		border-radius: 50rpx;
	}
}
</style>
