<template>
	<!-- @click.stop="isShow=false" -->
	<view class="content">
		<canvas @click.stop="" :style="{ width: canvasW + 'px', height: canvasH + 'px' }" canvas-id="my-canvas"></canvas>
		<view v-if="canvasW" class="save-btn" @click.stop="saveImage">保存图片</view>
	</view>
</template>

<script>
export default {
	props: {
		bgImg: {
			type: String,
			default: '' //默认的图片
		},
	},
	data() {
		return {
			canvasW: 0,
			canvasH: 0,
			ctx: null,
			// 图片基础
			qrcode: '',
			// 用户头像，动态绘制
			uImg: ''
		};
	},
	methods: {
		//显示
		showCanvas(uImg) {
			// console.log('用户头像', uImg);
			this.uImg = uImg;
			this.__init();
		},
		//初始化画布
		async __init() {
			uni.showLoading({
				title: '绘制中...',
				mask: true
			});
			/**
			 * 创建 canvas 绘图上下文(指定 canvasId)
			 * 在自定义组件下，第二个参数传入 组件实例 this
			 * 以操作 组件内的 canvas 组件
			 * 注：需要指定canvasId，该绘图上下文只作用于对应的 canvas
			 * 		返回值：CanvasContext
			 * */
			this.ctx = uni.createCanvasContext('my-canvas', this);
			//设置画布背景透明
			this.ctx.setFillStyle('rgba(255, 255, 255, 0)');
			//设置画布大小
			this.canvasW = uni.upx2px(714);
			this.canvasH = uni.upx2px(988);
			this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
			//绘制圆角背景
			this.drawRoundRect(this.ctx, 0, 0, this.canvasW, this.canvasH, uni.upx2px(18), '#FFFFFF');
			//获取 背景基础图
			let bgImg = await this.getImageInfo(this.bgImg);
			let hW = uni.upx2px(714);
			let hH = uni.upx2px(988);
			//绘制标题图   ==》 绘制 视频 封面图
			this.drawRoundImg(this.ctx, bgImg.path, (this.canvasW - hW) / 2, (this.canvasW - hW) / 2, hW, hH, uni.upx2px(16));

			// 绘制用户头像
			let uImg = await this.getImageInfo(this.uImg);
			let uhW = uni.upx2px(170);
			let uhH = uni.upx2px(170);
			//绘制标题图   ==》 绘制 视频 封面图
			this.drawRoundImg(this.ctx, uImg.path, uni.upx2px(280), uni.upx2px(100), uhW, uhH, uni.upx2px(90));

			// //延迟渲染
			setTimeout(() => {
				this.ctx.draw(true, () => {
					uni.hideLoading();
					// 然后关闭分享的弹窗
					this.$emit('close');
				});
			}, 500);
		},
		//带圆角图片
		drawRoundImg(ctx, img, x, y, width, height, radius) {
			ctx.beginPath();
			ctx.save();
			// 左上角
			ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
			// 右上角
			ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2);
			// 右下角
			ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5);
			// 左下角
			ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
			ctx.stroke();
			ctx.clip();
			ctx.drawImage(img, x, y, width, height);
			ctx.restore();
			ctx.closePath();
		},
		//圆角矩形
		drawRoundRect(ctx, x, y, width, height, radius, color) {
			ctx.save();
			ctx.beginPath();
			ctx.setFillStyle(color);
			ctx.setStrokeStyle(color);
			ctx.setLineJoin('round'); //交点设置成圆角
			ctx.setLineWidth(radius);
			ctx.strokeRect(x + radius / 2, y + radius / 2, width - radius, height - radius);
			ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
			ctx.stroke();
			ctx.closePath();
		},
		//获取图片
		getImageInfo(imgSrc) {
			return new Promise((resolve, reject) => {
				uni.getImageInfo({
					src: imgSrc,
					success: image => {
						resolve(image);
						// console.log('获取图片成功',image)
					},
					fail: err => {
						reject(err);
						console.log('获取图片失败', err);
					}
				});
			});
		},
		//保存图片到相册 进行权限验证
		saveImage() {
			let _this = this;
			//判断用户授权
			uni.getSetting({
				success(res) {
					//判断是否有相册权限
					if (!res.authSetting['scope.writePhotosAlbum']) {
						console.log('未授权保存到相册');
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success(res) {
								console.log('授权成功 res', res);
								_this.saveImageOpention();
							},
							fail() {
								uni.showModal({
									content: '检测到您未打开授权保存图片到相册的权限,是否去设置打开',
									confirmText: '确认',
									cancelText: '取消',
									success(res) {
										if (res.confirm) {
											uni.openSetting({
												success: res => {
													console.log('重新进行授权');
												},
												fail: res => {
													console.log('授权失败');
												}
											});
										}
									}
								});
							}
						});
					} else {
						console.log('已授权保存到相册');
						_this.saveImageOpention();
					}
				}
			});
		},
		// 完成图片保存操作
		saveImageOpention() {
			var that = this;
			uni.canvasToTempFilePath(
				{
					canvasId: 'my-canvas',
					quality: 1,
					complete: res => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								console.log('保存到相册成功 res', res);
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								});
								uni.navigateTo({
									url: '/pages/publish/publishNotice'
								});
							},
							fail: error => {
								console.log('调用保存到相册接口失败 error', error);
								uni.showToast({
									title: '保存到相册失败',
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				},
				this
			);
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	// background: rgba(0,0,0,.4);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 20;
	.save-btn {
		margin-top: 35rpx;
		color: #ffffff;
		background: linear-gradient(to right, #fe726b, #fe956b);
		padding: 15rpx 40rpx;
		border-radius: 50rpx;
	}
}
</style>
