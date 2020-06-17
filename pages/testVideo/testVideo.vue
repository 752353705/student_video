<template>
	<view class="reg">
		<view class="imgItems">
		<view class="grace-file-list" style="padding: 0;margin-bottom: 50upx">
		<view class="items" v-for="(item, index) in fastImgLists" :key="index">
			
			<!-- v-if="item.type == 'video'" -->
			<view
			class="video-bg"
			
			style="position:relative;background-color: rgb(98,98,98);display: flex;justify-content: center;align-items: center;"
			>
			<!-- v-show="fastImgLists[index].needload != 'true'" -->
				<image
					
					:id="item.id"
					:src="item.filePath"
					mode="aspectFit"
					:data-imgurl="item.filePath"
					@tap="showVideo(index)"
					style="width: 48upx;height: 48upx;"
				>
				</image>
			</view>
			<!-- v-else  -->
			<image 
				:src="item.filePath" 
				mode="aspectFill" 
				:data-imgurl="item.filePath" @tap="showImgs"
			>
			</image>
			
			<image
			src="../../static/cpt.png"
			class="remove"
			@tap="removeImg"
			:id="'grace-items-img-' + index"
			style="width: 38upx;height: 38upx;"
			></image>
		
		</view>
		<!-- v-if="canAdd" -->
		<view class="add-btn addImg"  @tap="actionSheetTap('fast')" >
		</view>
		<image style="width: 40rpx;height:40rpx;" src="../../static/close.png" :data-imgurl="imgSrc" mode=""></image>
		</view>
		</view>
	</view>
</template>

<script>
	var maxNum = 6
	var sourceType = [['camera'], ['camera', 'album']]
	export default {
		data() {
			return{
				canAdd: true,
				cameraList: [
					{
					value: 'back',
					name: '后置摄像头',
					checked: 'true'
					},
					{
					value: 'front',
					name: '前置摄像头'
					}
				],
				cameraIndex: 0,
				sourceTypeIndex: 0
			}
		},
		methods:{
			//选择图片还是视频
			actionSheetTap(type) {
				console.log(type);
				uni.showActionSheet({
					title: '选择类型',
					itemList: ['视频', '图片'],
					success: e => {
						console.log(e.tapIndex);
						if (e.tapIndex == 0) {
							this.chooseVideo(type);
						} else {
							this.addImg(type);
						}
					}
				});
			},
			
			//选中图片
			addImg: function(type) {
				let _this = this;
				var num = maxNum - _this.fastImgLists.length;
				console.log(_this.fastImgLists.length);
				if (num < 1) {
					return false;
				}
				uni.chooseImage({
					count: num,
					sizeType: ['compressed'],
					success: function(res) {
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							let imgitem = {};
							imgitem.type = 'img';
							imgitem.id = res.tempFilePaths[i];
							imgitem.filePath = res.tempFilePaths[i];
							imgitem.needload = false;
							_this.fastImgLists.push(imgitem);
						}
						
						//当添加的图片数量大于六时（v-for的list大于6），可添加图片的标志隐藏
						if (_this.fastImgLists.length >= maxNum) {
							_this.canAdd = false;
						}
					}
				});
			},
			
			//选中视频
			chooseVideo: function(type) {
				let _this = this;
				uni.chooseVideo({
					camera: this.cameraList[this.cameraIndex].value,
					sourceType: sourceType[this.sourceTypeIndex],
					maxDuration: 10,
					success: res => {
						console.log(res.tempFilePath);
						let imgitem = {};
						imgitem.type = 'video';
						imgitem.id = res.tempFilePath;
						imgitem.filePath = '../../static/video.png';
						imgitem.needload = false;
						_this.fastImgLists.push(imgitem);
						
						//v-for的list数量大于六时，添加标志隐藏
						if (_this.fastImgLists.length >= maxNum) {
							_this.canAdd = false;
						}
					}
				});
			},
			
			//移除
			removeImg: function(e) {
				let _this = this;
				console.log('removeImg');
				var index = e.currentTarget.id.replace('grace-items-img-', '');
				_this.fastImgLists.splice(index, 1);
				if (_this.fastImgLists.length < maxNum) {
					_this.canAdd = true;
				}
			},
			
			//点击预览图片
			showImgs: function(e) {
				var currentImg = e.currentTarget.dataset.imgurl;
				let urls = [];
				urls.push(currentImg);
				uni.previewImage({
					urls: urls,
					current: currentImg
				});
			},
			
			//点击播放视频
			showVideo(index) {
				let file = this.fastImgLists[index].id;
				console.log(file);
				if (file.indexOf('http:') > -1) {
					//未下载到本地
					this.fastImgLists[index][subindex].needload = 'true';
					this.fastImgLists[index][subindex].filePath = '';
					this.downVideoFile(index, subindex, file);
				} else {
				//已下载到本地，跳播放页
					console.log(file);
					uni.navigateTo({
						url: `../preview/previewVideo?file=${file}`
					});
				}
			},
		}
	}
</script>

<style lang="less">

</style>
