<template>
	<view class="pused">
		<!-- 文章标题 -->
		<input class="input" type="text" @input="nameInput" name="title" 
			:value="usedname" placeholder="商品名称" 
			/>
		<view class="uni-popup-message-text">
			<!-- 二手信息 -->
			<textarea :show-confirm-bar="false" name="area" :value="areaVal" 
				class="txt_area" @input="areaInput" placeholder="#商品信息,新旧程度,转手原因" 
				:maxlength="-1"
				/>

			<!-- 价格 -->
			<input class="price_num" @input="priceInput" type="number" :value="used_price" placeholder="价格" />

			<view class="img_box">
				<!-- 当前可以进行选择的二手个数 -->
				<view class="shownum">
					<text>{{ count }}/6</text>
				</view>
				<!-- 展示选中的二手  -->
				<view class="cont_box">
					<view @tap.stop="detailImg" style="background-color: black;" class="content" v-for="(item, index) in images" :key="index">
						<image :src="item.url" mode="aspectFit"></image>
						<image class="img" @tap.stop="clear(index)" src="../../static/close_video.png" mode=""></image>
					</view>
					<view v-if="!(images.length > 5)" class="content" @tap.stop="getImg">
						<!-- 十字图案 -->
						<view class="cross"></view>
					</view>
				</view>
			</view>

			<view class="btn" @tap.stop="pushImg">发布</view>
			<!-- 上传进度显示 
				当上传完毕之后，进度环消失
			 -->
			<!-- 	<cCircle v-if="showCir" class="c_circle" :size="60" :percent="percent">
				<span slot="content" style="color: #32CDA5;">{{ percent }}%</span>
			</cCircle> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 渲染价格
			used_price: '',
			// 二手商品的名称
			usedname:'',
			// 二手商品当前的id
			usedid:'',
			// 判断用户是否是要进行修改操作
			change: false,
			// 用户点击要进行修改的二手
			oldItem: '',
			// 进行上传二手的操作
			images: [],
			//储存上传时，请求返回的图片网络地址
			//  然后在提交的时候进行上传
			imgArr: [],
			// 用户进行修改时，老的网络图片
			oldImgArr: [],

			// 判断用户是否进行了 图片选择
			chooseImg: false,

			num: 0,
			count: 0, // 最多可以选择的图片张数
			// showCir: false, //进度环是否显示
			// percent: 0, //上传进度环的显示
			areaVal: '' //文本域内的文字
		};
	},
	onLoad(option) {
		console.log('上传文章的界面  option', option);
		if (option.usedid) {
			// 标记是要进行二手商品进行修改
			this.change = true;
			// 发起请求获取二手商品内容
			// 储存 二手商品的 id
			this.usedid = option.usedid
			this.getTxtDetail(option.usedid);
		}
	},
	onHide() {},
	onReady() {},
	methods: {
		// 用户要进行信息修改，根据文章ID获取文章的详细信息
		getTxtDetail(usedid) {
			let _this = this;
			this.api._get(`secondGoods/${usedid}`, {}, function(res) {
				console.log('获取二手的详情', res);

				_this.oldItem = res.data;
				// 将传递过来的信息 赋值给 当前页面的信息
				_this.usedname = res.data.title;
				_this.areaVal = res.data.goodsDescribe;
				_this.used_price = _this.floatDiv(res.data.price,100)
				// _this.images =
				res.data.images.split(',').forEach((item, index) => {
					_this.images.push({ url: item });
				});
				// 储存用户老的 网络图片
				_this.oldImgArr = res.data.images.split(',');
			});
		},
		// 乘法 转换当前的 价格，防止精度问题  
		floatMul(arg1, arg2) {
			 var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
			 try { m += s1.split(".")[1].length } catch (e) { }
			 try { m += s2.split(".")[1].length } catch (e) { }
			 return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
		},
		//精确除法
		 floatDiv(arg1,arg2){
				 var t1=0,t2=0,r1,r2;
				 try{t1=arg1.toString().split(".")[1].length}catch(e){}
				 try{t2=arg2.toString().split(".")[1].length}catch(e){}
				 r1=Number(arg1.toString().replace(".",""));
				 r2=Number(arg2.toString().replace(".",""));
				 return (r1/r2)*Math.pow(10,t2-t1);
		 },
		
		
		// 用户填写二手商品的价格
		priceInput(e) {
			this.used_price = e.detail.value;
			// 转换当前的 价格，防止精度问题
			// this.used_price = this.floatMul(this.used_price,100)
		},
		// 用户进行文章的编写
		nameInput(e) {
			this.usedname = e.detail.value;
		},
		// 获取文本域内输入的文字
		areaInput(e) {
			// console.log('文本域内容', e.detail.value);
			this.areaVal = e.detail.value;
		},

		// 进行图片的上传
		pushImg() {
			// 在进行上传的时候 要保证 imgArr 为 空
			// 防止 用户在已经上传了 之后 又进行修改 然后重新上传
			this.imgArr = [].concat(this.oldImgArr);
			this.num = 0;
			console.log('上传图片');
			let _this = this;
			// 改变 当前 所选图片结构
			this.images.forEach(item => {
				// console.log('上传图片的url',item.url)
				// 因为 微信小程序中只能单文件上传
				// 进行循环上传
				uni.uploadFile({
					url: _this.api.api_root + 'picture/upload', //仅为示例，非真实的接口地址
					filePath: item.url,
					name: 'file',
					header: { 'Content-Type': 'multipart/form-data' },
					success: res => {
						if (res.statusCode == 200) {
							console.log('文件上传成功', res);
							// console.log('上传成功',JSON.parse(res.data).data);
							// if( !_this.chooseImg){
							console.log('向imgArr 添加图片');
							// 如果 用户 选择了 新的图片，则进行添加
							_this.imgArr.push(JSON.parse(res.data).data);
							// }
							_this.num++;

							if (_this.num == _this.images.length || _this.imgArr.length == _this.images.length) {
								// _this.chooseImg = false

								console.log('所有图片上传完毕');

								_this.pushAll();
							}
						} else {
							console.log('res ==》', res);
						}
					}
				});
			});
		},

		// 进行整体上传
		pushAll() {
			let _this = this;

			// 判断 用户是否进行了完整的 填写
			// if (this.images.length !== 0 && this.title.length !== 0 && this.areaVal.length !== 0) {
			// 	//当选好作品之后 显示进度环
			// 	// 显示用户 正在进行上传
			// 	// this.showCir = true;
			// } else {
			// 	uni.showToast({
			// 		title: '请填写完整之后上传',
			// 		icon: 'none'
			// 	});
			// 	return;
			// }

			if (!this.change) {
				console.log('用户进行上传操作');
				// 用户进行上传操作
				this.api._post(
					'secondGoods',
					{
						coverUrl: _this.imgArr[0], //封面图
						title: _this.usedname, //二手名称
						price: _this.floatMul(_this.used_price,100), //二手价格
						images: _this.imgArr.join(','), //图片
						goodsDescribe: _this.areaVal, //二手描述
					},
					function(res) {
						console.log(res);
						// 提示上传结果
						uni.showToast({
							title: '上传' + res.errmsg,
							icon: 'none'
						});
					}
				);
			} else {
				// 用户进行 修改后的重新提交操作
				console.log('用户完成 修改操作 进行重新提交');

				this.api._put(
					'secondGoods',
					{
						id: _this.usedid,
						coverUrl: _this.imgArr[0], //封面图
						title: _this.usedname, //二手名称
						price: _this.floatMul(_this.used_price,100), //二手价格
						images: _this.imgArr.join(','), //图片
						goodsDescribe: _this.areaVal, //内容
					},
					function(res) {
						console.log(res);
					}
				);
			}
		},
		// 点击查看所选图片详情
		detailImg() {
			console.log('预览图片');
			let imgarr = [];

			// 改变 当前 相册数组结构
			this.images.forEach(item => {
				imgarr.push(item.url);
			});

			// 预览图片
			uni.previewImage({
				urls: imgarr,
				indicator: 'number',
				loop: true
			});
		},
		// 删除当前作品
		clear(index) {
			console.log('删除当前作品');
			this.$emit('clear');

			console.log('当前作品列表 ==》', this.images);

			// 操作数组删除选定的一项
			this.images.splice(index, 1);
			this.imgArr.splice(index, 1);
			if (this.change) this.oldImgArr.splice(index, 1);
			// num 与 count 数值可以相互通用
			this.num = this.num - 1;
			// 修改当前 可以进行选择的图片
			this.count = this.images.length;
			console.log('删除操作之后的作品列表 ==》', this.images);
		},

		// 获取本地拍摄的作品
		getImg() {
			// console.log('调用接口获取本地图片');
			// 调用内部接口获取拍摄的视频
			//成功获取本地视频的地址之后，显示视频的第一帧
			var that = this;
			var count = that.count; // 最多可以选择的图片张数
			uni.chooseImage({
				count: 6 - count, // 最多可以选择的图片张数
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(res) {
					that.chooseImg = true;
					var length = res.tempFilePaths.length; // 获取本次选择图片的数量
					that.count += length;

					// 判断所选图片 每张不能超过 1 M
					console.log('选择的图片', res);
					res.tempFiles.forEach((item, index) => {
						if (item.size > 1024 * 1024) {
							uni.showToast({
								title: '第' + index + '张图片大小超过1m,请重新选择',
								icon: 'none'
							});
						}
					});

					// 将选择的 图片本地地址进行存储
					res.tempFilePaths.forEach(item => {
						that.images = that.images.concat({ url: item });
					});
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.pused {
	// height: 100%;
	// overflow: auto;
	box-sizing: border-box;
	padding: 20px;
	// 文章标题
	.input{
		background-color: #f2f2f2;
		width: 80%;
		height: 73rpx;
		line-height: 73rpx;
		border-radius: 30rpx;
		overflow: hidden;
		box-sizing: border-box;
		padding-left: 20rpx;
	}
	// 文章内容
	.uni-popup-message-text {
		width: 100%;
		height: 960.52rpx;
		font-size: 14px;
		position: relative;
		box-sizing: border-box;
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		overflow: hidden;
		// 上传二手的描述
		.txt_area {
			width: 100%;
			height: 278.47rpx;
			background-color: #f2f2f2;
			border-radius: 20rpx;
			margin-top: 32rpx;
			box-sizing: border-box;
			padding: 30rpx;
		}
		// 二手物品的价格
		.price_num {
			margin-top: 35rpx;
			display: inline-block;
			background-color: #f2f2f2;
			box-sizing: border-box;
			padding-left: 20rpx;
			width: 50%;
			height: 60rpx;
			border-radius: 30rpx;
		}
		// 二手图片显示
		.img_box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			position: relative;
			// 显示还能够选择多少张二手图片
			.shownum {
				position: absolute;
				top: 16rpx;
				right: 27rpx;
				z-index: 50;
				width: 65rpx;
				height: 40rpx;
				text-align: center;
				line-height: 40rpx;
				background-color: #f2f2f2;
				border-radius: 16rpx;
			}

			.cont_box {
				display: flex;
				align-items: center;
				justify-content: start;
				flex-wrap: wrap;
				width: 100%;
				.content {
					margin-top: 76rpx;
					color: white;
					font-size: 30rpx;
					position: relative;
					width: 203.58rpx;
					height: 189.58rpx;
					background-color: #f2f2f2;
					text-align: center;
					margin-right: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-radius: 23rpx;
					image {
						width: 100%;
						height: 100%;
					}
					// 上传的十字图案
					.cross {
						background: #888888;
						height: 89.58rpx;
						position: relative;
						width: 9.88rpx;
					}
					.cross:after {
						background-color: #888888;
						content: '';
						height: 9.88rpx;
						left: -37.77rpx;
						position: absolute;
						top: 39.77rpx;
						width: 89.58rpx;
					}
					.img {
						position: absolute;
						width: 40rpx;
						height: 40rpx;
						top: 3rpx;
						right: -16rpx;
					}
				}
			}
			.contimg {
				display: inline-block;
			}
		}
		// 发布按钮样式
		.btn {
			width: 260.22rpx;
			height: 83.66rpx;
			text-align: center;
			line-height: 83.66rpx;
			background-image: linear-gradient(to bottom, #ef6a25, #f41c1f);
			border-radius: 40rpx;
			color: #db986e;
			font-size: 36rpx;
			font-weight: bolder;
			position: fixed;
			bottom: 22px;
			left: 50%;
			transform: translateX(-50%);
		}
		// 进度环
		.c_circle {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
